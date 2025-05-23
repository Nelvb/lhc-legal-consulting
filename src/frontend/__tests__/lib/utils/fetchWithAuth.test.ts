/**
 * fetchWithAuth.test.ts
 *
 * Tests unitarios del wrapper de autenticación fetchWithAuth.
 * Cubre:
 * - Inclusión automática de CSRF token
 * - Reintento tras 401 con token expirado
 * - Redirección a login si el refresh falla
 * - No reintento si retry ya está activo
 */

// Mock específico para "import router from 'next/router'" - SIN USAR VARIABLES EXTERNAS
jest.mock("next/router", () => ({
    __esModule: true,
    default: {
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        pathname: "/",
        query: {},
        asPath: "/",
    }
}));

// Import después del mock
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";

describe("fetchWithAuth", () => {
    // Obtener referencia al mock DESPUÉS del import
    const mockRouter = require("next/router").default;
    const mockPush = mockRouter.push;
    
    const originalFetch = global.fetch;
    const originalCookie = Object.getOwnPropertyDescriptor(document, "cookie");

    beforeEach(() => {
        jest.clearAllMocks();
        mockPush.mockClear();
        global.fetch = jest.fn();
        
        // Mock de process.env para la URL de la API
        process.env.NEXT_PUBLIC_API_URL = "http://localhost:5000";
        
        Object.defineProperty(document, "cookie", {
            value: "csrf_access_token=test-access; csrf_refresh_token=test-refresh;",
            writable: true,
            configurable: true,
        });
    });

    afterAll(() => {
        global.fetch = originalFetch;
        if (originalCookie) {
            Object.defineProperty(document, "cookie", originalCookie);
        }
    });

    it("añade token CSRF para métodos sensibles", async () => {
        (fetch as jest.Mock).mockResolvedValue({ status: 200 });

        await fetchWithAuth("/api/test", { method: "POST" });

        const callArgs = (fetch as jest.Mock).mock.calls[0][1];
        expect(callArgs?.headers?.["X-CSRF-TOKEN"]).toBe("test-access");
    });

    it("no añade CSRF para métodos GET", async () => {
        (fetch as jest.Mock).mockResolvedValue({ status: 200 });

        await fetchWithAuth("/api/test", { method: "GET" });

        const callArgs = (fetch as jest.Mock).mock.calls[0][1];
        expect(callArgs?.headers?.["X-CSRF-TOKEN"]).toBeUndefined();
    });

    it("reanuda tras 401 intentando refresh", async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({ status: 401 }) // original
            .mockResolvedValueOnce({ ok: true }) // refresh exitoso
            .mockResolvedValueOnce({ status: 200 }); // reintento exitoso

        const response = await fetchWithAuth("/api/protegido", { method: "PUT" });

        expect((fetch as jest.Mock).mock.calls.length).toBe(3);
        expect(response.status).toBe(200);
    });

    it("redirige a login si refresh falla", async () => {
        // Mock localStorage
        const mockRemoveItem = jest.fn();
        Object.defineProperty(window, 'localStorage', {
            value: {
                removeItem: mockRemoveItem,
            },
            writable: true
        });

        (fetch as jest.Mock)
            .mockResolvedValueOnce({ status: 401 }) // original falla
            .mockResolvedValueOnce({ ok: false }); // refresh falla

        await fetchWithAuth("/api/protegido", { method: "POST" });

        expect(mockPush).toHaveBeenCalledWith("/login");
        expect(mockRemoveItem).toHaveBeenCalledWith("user");
        expect(mockRemoveItem).toHaveBeenCalledWith("token");
    });

    it("no reintenta si ya se reintentó antes", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ status: 401 });

        const response = await fetchWithAuth("/api/test", {
            method: "DELETE",
            retry: true,
        });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(401);
    });

    it("usa csrf_refresh_token para rutas de refresh", async () => {
        (fetch as jest.Mock).mockResolvedValue({ status: 200 });

        await fetchWithAuth("http://localhost:5000/auth/refresh", { method: "POST" });

        const callArgs = (fetch as jest.Mock).mock.calls[0][1];
        expect(callArgs?.headers?.["X-CSRF-TOKEN"]).toBe("test-refresh");
    });
});
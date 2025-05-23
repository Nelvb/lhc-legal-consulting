/**
 * contactService.test.ts
 *
 * Tests unitarios para el servicio contactService.
 * Cubre todos los escenarios según el estado de autenticación del usuario.
 * 
 * - Mockea fetch y fetchWithAuth
 * - Verifica flujo autenticado y no autenticado
 * - Controla respuestas exitosas y con error
 */

import { contactService } from "@/lib/api/contactService";
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";

// Mock global de fetch
global.fetch = jest.fn();

// Mock del módulo fetchWithAuth
jest.mock("@/lib/utils/fetchWithAuth", () => ({
    fetchWithAuth: jest.fn(),
}));

const sampleData = {
    name: "Nelson",
    subject: "Consulta",
    message: "Hola, necesito información.",
    email: "nelson@example.com",
};

describe("contactService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("usa fetchWithAuth si el usuario está autenticado", async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });

        await expect(contactService.sendMessage(sampleData, true)).resolves.toBeUndefined();
        expect(fetchWithAuth).toHaveBeenCalledWith(
            expect.stringContaining("/account/contact"),
            expect.objectContaining({ method: "POST" })
        );
    });

    it("usa fetch normal si el usuario no está autenticado", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });

        await expect(contactService.sendMessage(sampleData, false)).resolves.toBeUndefined();
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining("/account/contact"),
            expect.objectContaining({ method: "POST" })
        );
    });

    it("lanza error si fetchWithAuth responde con error", async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ msg: "Error autenticado" }),
        });

        await expect(contactService.sendMessage(sampleData, true)).rejects.toThrow("Error autenticado");
    });

    it("lanza error si fetch normal responde con error", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ msg: "Error anónimo" }),
        });

        await expect(contactService.sendMessage(sampleData, false)).rejects.toThrow("Error anónimo");
    });
});

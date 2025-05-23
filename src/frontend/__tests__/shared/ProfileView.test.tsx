/**
 * ProfileView.test.tsx
 *
 * Test unitario del componente compartido ProfileView.
 * Valida la correcta visualización de título, subtítulo, badge
 * y datos del usuario. Verifica también que las props se pasen
 * correctamente a ProfileForm según si el usuario es admin o no.
 *
 * Cobertura:
 * - Render de textos visibles en la columna izquierda
 * - Visualización de nombre y email si están definidos
 * - Props condicionales pasadas a ProfileForm
 */

import React from "react";
import { render, screen } from "@/__tests__/utils/test-utils";
import ProfileView from "@/components/shared/ProfileView";

// Mock profesional del store Zustand
jest.mock("@/stores/useAuthStore", () => ({
    useAuthStore: jest.fn(),
}));

// Mock de ProfileForm (verifica props)
jest.mock("@/components/shared/ProfileForm", () => (props: any) => (
    <div data-testid="mock-profile-form">{JSON.stringify(props)}</div>
));

const { useAuthStore } = require("@/stores/useAuthStore");

describe("ProfileView", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useAuthStore.mockReturnValue({
            user: {
                name: "Nelson",
                email: "nelson@example.com",
                is_admin: false,
            },
        });
    });

    it("renderiza título, subtítulo y datos del usuario", () => {
        render(
            <ProfileView
                title="Mi Perfil"
                subtitle="Puedes cambiar tus datos"
                badge="Usuario"
                showEmail={true}
            />
        );

        expect(screen.getByText(/mi perfil/i)).toBeInTheDocument();
        expect(screen.getByText(/puedes cambiar tus datos/i)).toBeInTheDocument();
        expect(screen.getByText(/usuario/i)).toBeInTheDocument();
        expect(screen.getByText(/nombre actual: nelson/i)).toBeInTheDocument();
        expect(screen.getByText(/nelson@example.com/i)).toBeInTheDocument();
    });

    it("pasa correctamente showEmail y editableEmail a ProfileForm", () => {
        render(<ProfileView showEmail={true} />);

        const form = screen.getByTestId("mock-profile-form");
        expect(form.textContent).toContain('"showEmail":true');
        expect(form.textContent).toContain('"editableEmail":true');
    });

    it("cuando el usuario es admin, editableEmail se pasa como false", () => {
        useAuthStore.mockReturnValueOnce({
            user: {
                name: "Admin",
                email: "admin@boost.com",
                is_admin: true,
            },
        });

        render(<ProfileView showEmail={true} />);

        const form = screen.getByTestId("mock-profile-form");
        expect(form.textContent).toContain('"editableEmail":false');
    });
});

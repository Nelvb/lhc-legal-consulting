/**
 * Test unitario del componente AdminHeader
 *
 * Este test verifica el correcto renderizado del título, saludo personalizado al administrador
 * y funcionalidad del botón de logout y del menú hamburguesa en vista móvil.
 * Está adaptado para entornos Next.js + TypeScript, usando React Testing Library y mocks personalizados.
 */

import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import AdminHeader from '@/components/admin/layout/AdminHeader';
import { mockLogout } from '@/__mocks__/useAuth';

jest.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
        isAuthenticated: true,
        logout: mockLogout,
        user: { username: 'Alberto', is_admin: true },
    }),
}));

describe('AdminHeader', () => {
    beforeEach(() => {
        mockLogout.mockClear();
    });

    it('renderiza el título del panel correctamente', () => {
        render(<AdminHeader />);
        expect(
            screen.getByRole('heading', { name: /panel de administración/i })
        ).toBeInTheDocument();
    });

    it('muestra el saludo con el nombre del administrador', () => {
        render(<AdminHeader />);
        expect(screen.getByText(/hola alberto/i)).toBeInTheDocument();
    });

    it('muestra el botón de cerrar sesión y ejecuta logout al hacer clic', () => {
        render(<AdminHeader />);
        const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i });
        fireEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it('muestra el botón hamburguesa en móvil y abre el menú al hacer clic', () => {
        render(<AdminHeader />);
        const menuButton = screen.getByRole('button', { name: /abrir menú admin/i });
        expect(menuButton).toBeInTheDocument();
        fireEvent.click(menuButton);
    });
});

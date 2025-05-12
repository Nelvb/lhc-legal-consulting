/**
 * Test unitario del componente AdminSideMenu.tsx
 *
 * Valida que el menú lateral del admin solo se renderiza si isOpen es true,
 * y que se muestran el saludo, enlaces de navegación y el botón de logout.
 * Mockea useAuth para verificar llamada a logout y al onClose recibido como prop.
 */

import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import AdminSideMenu from '@/components/admin/sideMenu/AdminSideMenu';

// Mock de useAuth
jest.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
        user: { username: 'Alberto' },
        logout: jest.fn(),
    }),
}));

describe('AdminSideMenu', () => {
    it('no renderiza nada si isOpen es false', () => {
        const { container } = render(<AdminSideMenu isOpen={false} onClose={jest.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    it('renderiza el menú completo si isOpen es true', () => {
        render(<AdminSideMenu isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByText(/hola alberto/i)).toBeInTheDocument();
        expect(screen.getByText(/proyectos/i)).toBeInTheDocument();
        expect(screen.getByText(/blog/i)).toBeInTheDocument();
        expect(screen.getByText(/mi cuenta/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it('llama a logout y onClose al hacer clic en "Cerrar sesión"', () => {
        const { logout } = require('@/hooks/useAuth').useAuth();
        const mockOnClose = jest.fn();

        render(<AdminSideMenu isOpen={true} onClose={mockOnClose} />);

        const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i });
        fireEvent.click(logoutButton);

        expect(logout).toHaveBeenCalledTimes(1);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});

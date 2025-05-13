/**
 * Test unitario del componente AdminSideMenu.tsx
 *
 * Valida que el menú lateral del admin solo se renderiza si isOpen es true,
 * y que se muestran el saludo, enlaces de navegación y el botón de logout.
 * Utiliza un mock local de useAuth para simplificar los tests y mantener
 * la independencia entre archivos de prueba.
 */

import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import AdminSideMenu from '@/components/admin/sideMenu/AdminSideMenu';

// Creamos un mock local para logout que podemos controlar
const mockLogout = jest.fn();

// Configuramos el mock para useAuth
jest.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
        user: { username: 'Alberto' },
        logout: mockLogout
    })
}));

describe('AdminSideMenu', () => {
    beforeEach(() => {
        // Limpiamos el mock antes de cada test
        mockLogout.mockClear();
    });

    it('no renderiza nada si isOpen es false', () => {
        const { container } = render(<AdminSideMenu isOpen={false} onClose={jest.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    it('renderiza el menú completo si isOpen es true', () => {
        render(<AdminSideMenu isOpen={true} onClose={jest.fn()} />);

        // Verificar que todos los elementos principales están presentes
        expect(screen.getByText(/hola alberto/i)).toBeInTheDocument();
        expect(screen.getByText(/proyectos/i)).toBeInTheDocument();
        expect(screen.getByText(/blog/i)).toBeInTheDocument();
        expect(screen.getByText(/mi cuenta/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it('llama a logout y onClose al hacer clic en "Cerrar sesión"', () => {
        // Creamos un mock para la función onClose
        const mockOnClose = jest.fn();

        // Renderizamos el componente con el mock
        render(<AdminSideMenu isOpen={true} onClose={mockOnClose} />);

        // Encontramos el botón y simulamos un clic
        const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i });
        fireEvent.click(logoutButton);

        // Verificamos que ambas funciones fueron llamadas
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
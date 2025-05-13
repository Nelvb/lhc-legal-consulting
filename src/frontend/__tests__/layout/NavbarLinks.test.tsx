/**
 * Test unitario del componente NavbarLinks.tsx
 *
 * Valida el renderizado condicional según la ruta actual y el estado de autenticación.
 * Mockea useAuth y usePathname para cubrir distintos escenarios.
 */

import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import NavbarLinks from '@/components/layout/NavbarLinks';
import { mockLogout } from '@/__mocks__/useAuth';

// Mock antes de los tests
jest.mock('@/hooks/useAuth', () => require('@/__mocks__/useAuth'));
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('NavbarLinks (usuario autenticado)', () => {
    const { usePathname } = require('next/navigation');

    afterEach(() => {
        mockLogout.mockClear();
    });

    it('renderiza saludo y enlaces en la página principal', () => {
        usePathname.mockReturnValue('/');

        render(<NavbarLinks />);

        expect(screen.getByText((content) => content.toLowerCase().includes('hola'))).toBeInTheDocument();
        expect(screen.getByText(/área privada/i)).toBeInTheDocument();
        expect(screen.getByText(/admin/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it('renderiza saludo y enlace a inicio en /dashboard', () => {
        usePathname.mockReturnValue('/dashboard');

        render(<NavbarLinks />);

        expect(screen.getByText((content) => content.toLowerCase().includes('hola'))).toBeInTheDocument();
        expect(screen.getByText(/inicio/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it('llama a logout al hacer clic en "Cerrar sesión"', () => {
        usePathname.mockReturnValue('/dashboard');

        render(<NavbarLinks />);
        const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i });
        fireEvent.click(logoutButton);

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});

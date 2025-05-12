/**
 * Test unitario del componente NavbarLinks.tsx
 *
 * Valida el renderizado condicional según la ruta actual y el estado de autenticación.
 * Mockea useAuth y usePathname para cubrir distintos escenarios.
 */

import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import NavbarLinks from '@/components/layout/NavbarLinks';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

// Mock de useAuth (usuario autenticado por defecto)
const logoutMock = jest.fn();
jest.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
        isAuthenticated: true,
        logout: logoutMock,
        user: { username: 'Nelson', is_admin: true },
    }),
}));

const { usePathname } = require('next/navigation');

describe('NavbarLinks (usuario autenticado)', () => {
    afterEach(() => {
        logoutMock.mockClear();
    });

    it('renderiza saludo y enlaces en la página principal', () => {
        usePathname.mockReturnValue('/');

        render(<NavbarLinks />);

        expect(screen.getByText(/hola nelson/i)).toBeInTheDocument();
        expect(screen.getByText(/área privada/i)).toBeInTheDocument();
        expect(screen.getByText(/admin/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it('renderiza saludo y enlace a inicio en /dashboard', () => {
        usePathname.mockReturnValue('/dashboard');

        render(<NavbarLinks />);

        expect(screen.getByText(/hola nelson/i)).toBeInTheDocument();
        expect(screen.getByText(/inicio/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it('llama a logout al hacer clic en "Cerrar sesión"', () => {
        usePathname.mockReturnValue('/dashboard');

        render(<NavbarLinks />);
        const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i });
        fireEvent.click(logoutButton);

        expect(logoutMock).toHaveBeenCalledTimes(1);
    });
});

//
// CASO EXTRA: Usuario NO autenticado en /login
//

describe('NavbarLinks (usuario NO autenticado en /login)', () => {
    beforeAll(() => {
        jest.resetModules();
        jest.doMock('@/hooks/useAuth', () => ({
            useAuth: () => ({
                isAuthenticated: false,
            }),
        }));
    });

    it('muestra solo el botón de Registrarse y oculta Iniciar Sesión', () => {
        usePathname.mockReturnValue('/login');

        const NavbarLinksNoAuth = require('@/components/layout/NavbarLinks').default;

        render(<NavbarLinksNoAuth />);

        expect(screen.queryByText(/iniciar sesión/i)).not.toBeInTheDocument();
        expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
        expect(screen.queryByText(/hola/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/área privada/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
    });
});

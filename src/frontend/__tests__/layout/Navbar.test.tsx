/**
 * Test unitario del componente Navbar.tsx
 *
 * Valida el renderizado del logo, el botón hamburguesa y su interacción.
 * Mockea useAuth, SideMenu y NavbarLinks para centrarse solo en Navbar.
 */

import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import Navbar from '@/components/layout/Navbar';

// Mocks
jest.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
        isAuthenticated: true,
    }),
}));

jest.mock('@/components/layout/NavbarLinks', () => () => (
    <div data-testid="mock-navbar-links">NavbarLinks</div>
));

jest.mock('@/components/layout/SideMenu', () => ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="mock-side-menu">SideMenu abierto</div> : null
);

describe('Navbar', () => {
    it('renderiza el logo y el botón de menú', () => {
        render(<Navbar />);

        expect(screen.getByAltText(/boost a project logo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/abrir menú/i)).toBeInTheDocument();
        expect(screen.getByTestId('mock-navbar-links')).toBeInTheDocument();
    });

    it('muestra el menú lateral al hacer clic en la hamburguesa', () => {
        render(<Navbar />);

        const menuButton = screen.getByLabelText(/abrir menú/i);
        fireEvent.click(menuButton);

        expect(screen.getByTestId('mock-side-menu')).toBeInTheDocument();
    });
});

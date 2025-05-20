/**
 * Test unitario del componente SideMenu.tsx
 *
 * Verifica que el menú lateral público se renderiza correctamente
 * solo si isOpen es true, y que adapta su contenido según el estado
 * de autenticación y rol del usuario.
 */

import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import SideMenu from '@/components/sideMenus/SideMenu';

// Mocks
jest.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
        isAuthenticated: true,
        user: { username: 'Nelson', is_admin: true },
    }),
}));

jest.mock('next/navigation', () => ({
    usePathname: () => '/',
}));

jest.mock('@/components/layout/SideMenuHeader', () => ({ onClose }: any) => (
    <div data-testid="side-menu-header" onClick={onClose}>
        Header mock (Hola Nelson)
    </div>
));

jest.mock('@/components/common/MainMenuLinks', () => ({ onClickLink }: any) => (
    <div data-testid="main-menu-links" onClick={onClickLink}>
        Enlaces principales
    </div>
));

jest.mock('@/components/layout/SideMenuAuthSection', () => ({ onClose }: any) => (
    <div data-testid="auth-section" onClick={onClose}>
        Botón Cerrar Sesión
    </div>
));

describe('SideMenu', () => {
    it('no renderiza nada si isOpen es false', () => {
        const { container } = render(<SideMenu isOpen={false} onClose={jest.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    it('renderiza el menú completo si isOpen es true', () => {
        render(<SideMenu isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByTestId('side-menu-header')).toBeInTheDocument();
        expect(screen.getByTestId('main-menu-links')).toBeInTheDocument();
        expect(screen.getByText(/área privada/i)).toBeInTheDocument();
        expect(screen.getByText(/admin/i)).toBeInTheDocument();
        expect(screen.getByTestId('auth-section')).toBeInTheDocument();
    });
});

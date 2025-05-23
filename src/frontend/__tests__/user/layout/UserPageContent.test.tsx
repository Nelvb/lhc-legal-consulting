/**
 * UserPageContent.test.tsx
 * 
 * Tests unitarios para el componente UserPageContent.
 * Verifica todos los escenarios de protección de áreas privadas de usuario:
 * - Usuario no autenticado
 * - Usuario autenticado (cualquier rol)
 * - Estados de carga
 * - Redirecciones correctas
 * 
 * Cobertura: Flujos de autenticación y navegación para áreas privadas
 */

import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import UserPageContent from '@/components/user/layout/UserPageContent';
import { useAuthStore } from '@/stores/useAuthStore';

// Mock del router de Next.js
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock del store de autenticación
jest.mock('@/stores/useAuthStore', () => ({
    useAuthStore: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

describe('UserPageContent', () => {
    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            push: mockPush,
            replace: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
            prefetch: jest.fn(),
        } as any);

        mockPush.mockClear();
    });

    it('muestra loading mientras se verifica la autenticación', () => {
        mockUseAuthStore.mockReturnValue({
            user: null,
            loading: true,
        });

        render(
            <UserPageContent>
                <div>Contenido privado</div>
            </UserPageContent>
        );

        expect(screen.getByText('Verificando autenticación...')).toBeInTheDocument();
        expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
    });

    it('redirige a home si no hay usuario autenticado', async () => {
        mockUseAuthStore.mockReturnValue({
            user: null,
            loading: false,
        });

        render(
            <UserPageContent>
                <div>Contenido privado</div>
            </UserPageContent>
        );

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/');
        });

        expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
    });

    it('renderiza el contenido si hay usuario autenticado (rol user)', () => {
        mockUseAuthStore.mockReturnValue({
            user: {
                id: '1',
                email: 'user@test.com',
                name: 'Usuario Normal',
                is_admin: false,
            },
            loading: false,
        });

        render(
            <UserPageContent>
                <div>Contenido privado</div>
            </UserPageContent>
        );

        expect(screen.getByText('Contenido privado')).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
    });

    it('renderiza el contenido si hay usuario autenticado (rol admin)', () => {
        mockUseAuthStore.mockReturnValue({
            user: {
                id: '1',
                email: 'admin@test.com',
                name: 'Administrador',
                is_admin: true,
            },
            loading: false,
        });

        render(
            <UserPageContent>
                <div>Contenido privado</div>
            </UserPageContent>
        );

        expect(screen.getByText('Contenido privado')).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
    });

    it('no redirige durante el estado de carga', () => {
        mockUseAuthStore.mockReturnValue({
            user: null,
            loading: true,
        });

        render(
            <UserPageContent>
                <div>Contenido privado</div>
            </UserPageContent>
        );

        expect(mockPush).not.toHaveBeenCalled();
    });

    it('maneja correctamente cambios de estado de autenticación', async () => {
        const { rerender } = render(
            <UserPageContent>
                <div>Contenido privado</div>
            </UserPageContent>
        );

        // Estado inicial: cargando
        mockUseAuthStore.mockReturnValue({
            user: null,
            loading: true,
        });
        rerender(
            <UserPageContent>
                <div>Contenido privado</div>
            </UserPageContent>
        );

        // Estado después: usuario válido
        mockUseAuthStore.mockReturnValue({
            user: {
                id: '1',
                email: 'user@test.com',
                name: 'Usuario',
                is_admin: false,
            },
            loading: false,
        });
        rerender(
            <UserPageContent>
                <div>Contenido privado</div>
            </UserPageContent>
        );

        expect(screen.getByText('Contenido privado')).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
    });

    it('acepta usuarios con cualquier rol válido', () => {
        const users = [
            { id: '1', email: 'user@test.com', name: 'Usuario Normal', is_admin: false },
            { id: '2', email: 'admin@test.com', name: 'Usuario Admin', is_admin: true }
        ];

        users.forEach(user => {
            mockUseAuthStore.mockReturnValue({
                user,
                loading: false,
            });

            const { unmount } = render(
                <UserPageContent>
                    <div>Contenido privado</div>
                </UserPageContent>
            );

            expect(screen.getByText('Contenido privado')).toBeInTheDocument();
            expect(mockPush).not.toHaveBeenCalled();

            unmount();
        });
    });
});
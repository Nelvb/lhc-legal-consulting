/**
 * AdminPageContent.test.tsx
 * 
 * Tests unitarios para el componente AdminPageContent.
 * Verifica todos los escenarios de protección del área de administración:
 * - Usuario no autenticado
 * - Usuario autenticado pero sin rol admin
 * - Usuario admin válido
 * - Estados de carga
 * - Redirecciones correctas
 * 
 * Cobertura: Flujos de autenticación, autorización y navegación
 */

import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import AdminPageContent from '@/components/admin/layout/AdminPageContent';
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

describe('AdminPageContent', () => {
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
            <AdminPageContent>
                <div>Contenido protegido</div>
            </AdminPageContent>
        );

        expect(screen.getByText('Verificando acceso de administrador...')).toBeInTheDocument();
        expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument();
    });

    it('redirige a home si no hay usuario autenticado', async () => {
        mockUseAuthStore.mockReturnValue({
            user: null,
            loading: false,
        });

        render(
            <AdminPageContent>
                <div>Contenido protegido</div>
            </AdminPageContent>
        );

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/');
        });

        expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument();
    });

    it('redirige a home si el usuario no es admin', async () => {
        mockUseAuthStore.mockReturnValue({
            user: {
                id: '1',
                email: 'user@test.com',
                username: 'Usuario',
                last_name: 'Normal',
                is_admin: false,
            },
            loading: false,
        });

        render(
            <AdminPageContent>
                <div>Contenido protegido</div>
            </AdminPageContent>
        );

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/');
        });

        expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument();
    });

    it('renderiza el contenido si el usuario es admin válido', () => {
        mockUseAuthStore.mockReturnValue({
            user: {
                id: '1',
                email: 'admin@test.com',
                username: 'Administrador',
                last_name: 'Administrador',
                is_admin: true,
            },
            loading: false,
        });

        render(
            <AdminPageContent>
                <div>Contenido protegido</div>
            </AdminPageContent>
        );

        expect(screen.getByText('Contenido protegido')).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
    });

    it('no redirige durante el estado de carga', () => {
        mockUseAuthStore.mockReturnValue({
            user: null,
            loading: true,
        });

        render(
            <AdminPageContent>
                <div>Contenido protegido</div>
            </AdminPageContent>
        );

        expect(mockPush).not.toHaveBeenCalled();
    });

    it('maneja correctamente cambios de estado de autenticación', async () => {
        const { rerender } = render(
            <AdminPageContent>
                <div>Contenido protegido</div>
            </AdminPageContent>
        );

        // Estado inicial: cargando
        mockUseAuthStore.mockReturnValue({
            user: null,
            loading: true,
        });
        rerender(
            <AdminPageContent>
                <div>Contenido protegido</div>
            </AdminPageContent>
        );

        // Estado después: usuario admin válido
        mockUseAuthStore.mockReturnValue({
            user: {
                id: '1',
                email: 'admin@test.com',
                username: 'Administrador',
                last_name: 'Administrador',
                is_admin: true,
            },
            loading: false,
        });
        rerender(
            <AdminPageContent>
                <div>Contenido protegido</div>
            </AdminPageContent>
        );

        expect(screen.getByText('Contenido protegido')).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
    });
});
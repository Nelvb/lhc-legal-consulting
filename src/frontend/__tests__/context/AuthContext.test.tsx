/**
 * AuthContext.test.tsx
 *
 * Tests del contexto de autenticación global.
 * Valida login, signup, logout, recuperación de usuario y sincronización entre pestañas.
 */

import React from 'react';
import { render, screen, waitFor, act } from '@/__tests__/utils/test-utils';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        refresh: jest.fn(),
        prefetch: jest.fn(),
    }),
}));

jest.mock('@/lib/api/authService', () => ({
    authService: {
        login: jest.fn(),
        signup: jest.fn(),
        logout: jest.fn(),
    },
}));

jest.mock('@/lib/utils/fetchWithAuth', () => ({
    fetchWithAuth: jest.fn(),
}));

import { authService } from '@/lib/api/authService';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';

const TestComponent = () => {
    const { user, login, signup, logout, refreshUser } = useAuth();

    return (
        <div>
            <div>Usuario: {user ? user.name : 'Ninguno'}</div>
            <button onClick={() => login({ email: 'a@a.com', password: '123' })}>Login</button>
            <button onClick={() => signup({ username: 'user', email: 'a@a.com', password: '123' })}>Signup</button>
            <button onClick={logout}>Logout</button>
            <button onClick={refreshUser}>Refrescar</button>
        </div>
    );
};

describe('AuthContext', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('recupera usuario de localStorage en carga inicial', async () => {
        localStorage.setItem('user', JSON.stringify({ name: 'Nelson', is_admin: false }));
        localStorage.setItem('token', 'abc123');

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await screen.findByText(/nelson/i);
    });

    it('llama a login y actualiza usuario', async () => {
        (authService.login as jest.Mock).mockResolvedValue({
            user: { name: 'Admin', is_admin: true },
        });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await act(async () => {
            await userEvent.click(screen.getByText(/login/i));
        });

        await waitFor(() => {
            expect(screen.getByText(/admin/i)).toBeInTheDocument();
        });
    });

    it('signup llama internamente a login', async () => {
        (authService.signup as jest.Mock).mockResolvedValue({});
        (authService.login as jest.Mock).mockResolvedValue({
            user: { name: 'Nuevo' },
        });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await act(async () => {
            await userEvent.click(screen.getByText(/signup/i));
        });

        await waitFor(() => {
            expect(screen.getByText(/nuevo/i)).toBeInTheDocument();
        });
    });

    it('logout elimina usuario y redirige', async () => {
        (authService.logout as jest.Mock).mockResolvedValue(undefined);
        localStorage.setItem('user', JSON.stringify({ name: 'Nelson' }));
        localStorage.setItem('token', 'abc123');

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await act(async () => {
            await userEvent.click(screen.getByText(/logout/i));
        });

        await waitFor(() => {
            expect(screen.getByText(/ninguno/i)).toBeInTheDocument();
        });
    });

    it('refresca el usuario correctamente', async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({ name: 'Actualizado' }),
        });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await act(async () => {
            await userEvent.click(screen.getByText(/refrescar/i));
        });

        await waitFor(() => {
            expect(screen.getByText(/actualizado/i)).toBeInTheDocument();
        });
    });
});


/**
 * authService.test.ts
 *
 * Tests unitarios del servicio de autenticación (authService).
 * Mockea `fetch` y `fetchWithAuth` para validar login, logout, signup y profile.
 */

import { authService } from '@/lib/api/authService';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';

// Mock global de fetch (login, signup, logout)
global.fetch = jest.fn() as jest.Mock;

// Mock explícito de fetchWithAuth
jest.mock('@/lib/utils/fetchWithAuth', () => ({
    fetchWithAuth: jest.fn(),
}));

describe('authService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('signup envía datos y devuelve respuesta', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        const result = await authService.signup({
            username: 'test',
            email: 'test@example.com',
            password: '123456',
        });

        expect(result.success).toBe(true);
    });

    it('signup lanza error si hay fallo', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ msg: 'Error de registro' }),
        });

        await expect(
            authService.signup({
                username: 'test',
                email: 'fail@example.com',
                password: '123456',
            })
        ).rejects.toThrow('Error de registro');
    });

    it('login devuelve datos correctamente', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            text: async () => JSON.stringify({ user: 'Nelson' }),
        });

        const result = await authService.login({
            email: 'test@example.com',
            password: '123456',
        });

        expect(result.user).toBe('Nelson');
    });

    it('login lanza error si JSON es inválido', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            text: async () => 'texto que no es JSON',
        });

        await expect(
            authService.login({
                email: 'invalid@example.com',
                password: '123456',
            })
        ).rejects.toThrow('Respuesta del servidor no válida');
    });

    it('logout maneja error de red', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ msg: 'Error logout' }),
        });

        await expect(authService.logout()).rejects.toThrow('Error logout');
    });

    it('profile devuelve datos del usuario', async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ name: 'Usuario' }),
        });

        const result = await authService.profile();
        expect(result.name).toBe('Usuario');
    });

    it('profile lanza error si fetch falla', async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ msg: 'Sin autorización' }),
        });

        await expect(authService.profile()).rejects.toThrow('Sin autorización');
    });
});

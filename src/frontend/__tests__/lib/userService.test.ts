/**
 * userService.test.ts
 *
 * Test unitario del servicio de usuario.
 * Valida las funciones principales: actualizar perfil, cambiar contraseña,
 * solicitar y restablecer contraseña, y eliminar cuenta.
 */

import { userService } from '@/lib/api/userService'
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth'

jest.mock('@/lib/utils/fetchWithAuth', () => ({
    fetchWithAuth: jest.fn(),
}))

global.fetch = jest.fn()

const API_URL = process.env.NEXT_PUBLIC_API_URL

describe('userService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('updateNameAndEmail', () => {
        it('realiza correctamente el fetch con datos válidos', async () => {
            const mockResponse = { success: true }
                ; (fetchWithAuth as jest.Mock).mockResolvedValue({
                    ok: true,
                    json: async () => mockResponse,
                })

            const result = await userService.updateNameAndEmail({
                name: 'Nelson',
                email: 'nelson@example.com',
                current_password: '123456',
            })

            expect(fetchWithAuth).toHaveBeenCalledWith(`${API_URL}/account/update-profile`, expect.any(Object))
            expect(result).toEqual(mockResponse)
        })

        it('lanza error si la respuesta no es ok', async () => {
            ; (fetchWithAuth as jest.Mock).mockResolvedValue({
                ok: false,
                json: async () => ({ msg: 'Error' }),
            })

            await expect(
                userService.updateNameAndEmail({
                    name: 'Nelson',
                    email: 'nelson@example.com',
                    current_password: 'wrong',
                })
            ).rejects.toThrow('Error')
        })
    })

    describe('changePassword', () => {
        it('realiza correctamente el fetch', async () => {
            const mockResponse = { success: true }
                ; (fetchWithAuth as jest.Mock).mockResolvedValue({
                    ok: true,
                    json: async () => mockResponse,
                })

            const result = await userService.changePassword({
                current_password: 'old',
                new_password: 'new',
            })

            expect(fetchWithAuth).toHaveBeenCalledWith(`${API_URL}/account/change-password`, expect.any(Object))
            expect(result).toEqual(mockResponse)
        })

        it('lanza error si la respuesta no es ok', async () => {
            ; (fetchWithAuth as jest.Mock).mockResolvedValue({
                ok: false,
                json: async () => ({ msg: 'Error al cambiar contraseña' }),
            })

            await expect(
                userService.changePassword({ current_password: '123', new_password: '456' })
            ).rejects.toThrow('Error al cambiar contraseña')
        })
    })

    describe('requestPasswordReset', () => {
        it('realiza correctamente el fetch', async () => {
            const mockResponse = { msg: 'Email enviado' }
                ; (global.fetch as jest.Mock).mockResolvedValue({
                    ok: true,
                    text: async () => JSON.stringify(mockResponse),
                })

            const result = await userService.requestPasswordReset('email@example.com')
            expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/account/request-password-reset`, expect.any(Object))
            expect(result).toEqual(mockResponse)
        })

        it('lanza error si la respuesta no es ok', async () => {
            ; (global.fetch as jest.Mock).mockResolvedValue({
                ok: false,
                text: async () => JSON.stringify({ msg: 'Error' }),
            })

            await expect(userService.requestPasswordReset('fail@example.com')).rejects.toThrow('Error')
        })
    })

    describe('resetPassword', () => {
        it('realiza correctamente el fetch', async () => {
            const mockResponse = { success: true }
                ; (global.fetch as jest.Mock).mockResolvedValue({
                    ok: true,
                    json: async () => mockResponse,
                })

            const result = await userService.resetPassword({
                token: 'token123',
                new_password: 'newpass',
            })

            expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/account/reset-password`, expect.any(Object))
            expect(result).toEqual(mockResponse)
        })

        it('lanza error si el backend responde con error', async () => {
            ; (global.fetch as jest.Mock).mockResolvedValue({
                ok: false,
                json: async () => ({ msg: 'Token inválido' }),
            })

            await expect(
                userService.resetPassword({ token: 'wrong', new_password: 'abc' })
            ).rejects.toThrow('Token inválido')
        })
    })

    describe('deleteAccount', () => {
        it('realiza correctamente la eliminación', async () => {
            ; (fetchWithAuth as jest.Mock).mockResolvedValue({ ok: true })

            await expect(userService.deleteAccount()).resolves.toBeUndefined()
            expect(fetchWithAuth).toHaveBeenCalledWith(`${API_URL}/users/delete`, expect.any(Object))
        })

        it('lanza error si la respuesta no es ok', async () => {
            ; (fetchWithAuth as jest.Mock).mockResolvedValue({
                ok: false,
                json: async () => ({ msg: 'No se pudo eliminar la cuenta.' }),
            })

            await expect(userService.deleteAccount()).rejects.toThrow('No se pudo eliminar la cuenta.')
        })
    })
})

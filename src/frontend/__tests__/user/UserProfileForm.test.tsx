/**
 * UserProfileForm.test.tsx
 *
 * Test unitario del componente UserProfileForm.
 * Valida renderizado, gestión de errores de validación y flujo de envío del formulario.
 * 
 * Características principales:
 * - Prueba la renderización correcta de todos los campos del formulario
 * - Verifica que se muestren mensajes de error apropiados para:
 *   * Email inválido
 *   * Nombre vacío
 *   * Contraseñas que no coinciden
 * - Utiliza findByText() para esperar asincrónicamente la aparición de mensajes de error
 * - Mockea useAuth() y userService para aislar el componente durante las pruebas
 * 
 * Nota: Para la correcta detección de errores, se utiliza fireEvent.submit()
 * directamente en el formulario en lugar de simular clics en botones,
 * garantizando que el evento de envío se procese completamente.
 */

import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import UserProfileForm from '@/components/shared/ProfileForm';

jest.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
        user: { name: 'Nelson', email: 'nelson@example.com' },
    }),
}));

// Mock para userService
jest.mock('@/lib/api/userService', () => ({
    userService: {
        updateNameAndEmail: jest.fn(),
        changePassword: jest.fn(),
    }
}));

describe('UserProfileForm', () => {
    it('renderiza todos los campos correctamente', () => {
        render(<UserProfileForm />);

        expect(screen.getByLabelText(/^nombre$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^contraseña actual$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^nueva contraseña$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^repetir nueva contraseña$/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeInTheDocument();
    });

    it('muestra error si el email no es válido', async () => {
        render(<UserProfileForm />);

        // Obtener los elementos del formulario
        const emailInput = screen.getByLabelText(/^email$/i);
        const form = emailInput.closest('form');
        
        // Establecer un valor inválido para el email
        fireEvent.change(emailInput, {
            target: { value: 'invalido' },
        });
        
        // Enviar el formulario directamente en lugar de hacer clic en el botón
        fireEvent.submit(form);
        
        // Usar findByText en lugar de getByText + waitFor
        // findByText espera automáticamente a que aparezca el elemento
        const errorElement = await screen.findByText(/email/i, { selector: 'p.text-red-600' });
        expect(errorElement).toBeInTheDocument();
    });

    it('muestra error si el nombre está vacío', async () => {
        render(<UserProfileForm />);

        // Obtener los elementos del formulario
        const nameInput = screen.getByLabelText(/^nombre$/i);
        const form = nameInput.closest('form');
        
        // Limpiar el campo de nombre
        fireEvent.change(nameInput, {
            target: { value: '' },
        });
        
        // Enviar el formulario directamente
        fireEvent.submit(form);
        
        // Esperar a que aparezca el mensaje de error
        const errorElement = await screen.findByText(/nombre/i, { selector: 'p.text-red-600' });
        expect(errorElement).toBeInTheDocument();
    });

    it('muestra error si las contraseñas no coinciden', async () => {
        render(<UserProfileForm />);

        // Obtener los elementos del formulario
        const currentPasswordInput = screen.getByLabelText(/^contraseña actual$/i);
        const newPasswordInput = screen.getByLabelText(/^nueva contraseña$/i);
        const confirmPasswordInput = screen.getByLabelText(/^repetir nueva contraseña$/i);
        const form = currentPasswordInput.closest('form');

        // Establecer valores de contraseña que no coinciden
        fireEvent.change(currentPasswordInput, {
            target: { value: '123456' },
        });
        
        fireEvent.change(newPasswordInput, {
            target: { value: 'nueva123' },
        });
        
        fireEvent.change(confirmPasswordInput, {
            target: { value: 'diferente' },
        });
        
        // Enviar el formulario directamente
        fireEvent.submit(form);
        
        // Esperar a que aparezca el mensaje de error relacionado con las contraseñas
        const errorElement = await screen.findByText(/no coinciden/i, { selector: 'p.text-red-600' });
        expect(errorElement).toBeInTheDocument();
    });
});
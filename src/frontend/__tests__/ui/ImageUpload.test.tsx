/**
 * Test completo del componente ImageUpload.tsx con fetch simulado
 *
 * Valida el flujo completo: seleccionar imagen, vista previa, hacer clic en subir,
 * mock de fetch a /api/images/upload, y verificación del callback onImageUpload.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/test-utils';
import ImageUpload from '@/components/ui/ImageUpload';

// Mock global para evitar error con JSDOM
global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/fake-preview');

describe('ImageUpload (con fetch simulado)', () => {
    it('permite seleccionar una imagen y subirla correctamente', async () => {
        const mockOnImageUpload = jest.fn();
        render(<ImageUpload onImageUpload={mockOnImageUpload} />);

        const file = new File(['imagen'], 'imagen-prueba.jpg', { type: 'image/jpeg' });
        const hiddenInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        fireEvent.change(hiddenInput, { target: { files: [file] } });

        await waitFor(() => {
            expect(screen.getByRole('img', { name: /vista previa/i })).toBeInTheDocument();
        });

        const uploadButton = screen.getByRole('button', { name: /subir imagen/i });
        fireEvent.click(uploadButton);

        await waitFor(() => {
            expect(mockOnImageUpload).toHaveBeenCalledWith(
                'https://res.cloudinary.com/demo/image/upload/sample.jpg'
            );
            expect(screen.getByText(/imagen subida con éxito/i)).toBeInTheDocument();
        });
    });
});

/**
 * Test unitario del componente Input.tsx
 *
 * Este test valida el renderizado básico del input, su etiqueta asociada
 * y su funcionamiento al recibir texto. Es un componente fundamental en formularios
 * y debe comportarse de forma consistente en todas sus variantes.
 */

import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import Input from '@/components/ui/Input';

describe('Input', () => {
    it('renderiza el input con su etiqueta', () => {
        render(
            <Input
                label="Nombre"
                name="nombre"
                type="text"
                placeholder="Escribe tu nombre"
            />
        );
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/escribe tu nombre/i)).toBeInTheDocument();
    });

    it('permite escribir dentro del input', () => {
        render(
            <Input
                label="Email"
                name="email"
                type="email"
                placeholder="tu@email.com"
            />
        );
        const input = screen.getByPlaceholderText(/tu@email.com/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'prueba@email.com' } });
        expect(input.value).toBe('prueba@email.com');
    });

    it('muestra mensaje de error si se proporciona', () => {
        render(
            <Input
                label="Contraseña"
                name="password"
                type="password"
                placeholder="••••••••"
                error="Este campo es obligatorio"
            />
        );
        expect(screen.getByText(/este campo es obligatorio/i)).toBeInTheDocument();
    });
});

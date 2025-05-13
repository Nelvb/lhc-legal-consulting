/**
 * Test unitario del componente Input.tsx
 *
 * Valida que el campo se renderiza con su etiqueta, placeholder y que muestra errores correctamente.
 * Este test garantiza compatibilidad con validaciones y formularios reales.
 */

import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import Input from '@/components/ui/Input';

describe('Input', () => {
    it('renderiza con label y placeholder', () => {
        render(
            <Input
                label="Nombre"
                name="name"
                placeholder="Introduce tu nombre"
            />
        );

        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/introduce tu nombre/i)).toBeInTheDocument();
    });

    it('muestra mensaje de error si se proporciona', () => {
        render(
            <Input
                label="Email"
                name="email"
                placeholder="Introduce tu email"
                error="Campo obligatorio"
            />
        );

        expect(screen.getByText(/campo obligatorio/i)).toBeInTheDocument();
    });
});

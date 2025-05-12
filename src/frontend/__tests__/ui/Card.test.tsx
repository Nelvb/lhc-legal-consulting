/**
 * Test unitario del componente Card.tsx
 *
 * Este test verifica que el componente Card renderiza correctamente sus hijos
 * y aplica las clases base de estilo (bordes, sombra, fondo). Está diseñado
 * como contenedor reutilizable para mostrar contenido agrupado con diseño coherente.
 */

import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import Card from '@/components/ui/Card';

describe('Card', () => {
    it('renderiza correctamente los elementos hijos', () => {
        render(
            <Card>
                <h2>Contenido de prueba</h2>
                <p>Este es un párrafo dentro de la card.</p>
            </Card>
        );

        expect(screen.getByText(/contenido de prueba/i)).toBeInTheDocument();
        expect(screen.getByText(/este es un párrafo/i)).toBeInTheDocument();
    });

    it('aplica las clases base correctamente', () => {
        const { container } = render(<Card>Test</Card>);
        const div = container.firstChild as HTMLElement;

        expect(div).toHaveClass('bg-white');
        expect(div).toHaveClass('rounded-xl');
        expect(div).toHaveClass('shadow-md');
        expect(div).toHaveClass('border');
        expect(div).toHaveClass('border-gray-100');
    });

    it('permite pasar clases personalizadas adicionales', () => {
        const { container } = render(
            <Card className="custom-class">Contenido</Card>
        );
        const div = container.firstChild as HTMLElement;

        expect(div).toHaveClass('custom-class');
    });
});

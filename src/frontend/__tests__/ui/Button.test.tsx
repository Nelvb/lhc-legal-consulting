import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import Button from '@/components/ui/Button';


describe('Button', () => {
    it('debe renderizar el texto correctamente', () => {
        render(<Button>Click aquí</Button>);
        expect(screen.getByText('Click aquí')).toBeInTheDocument();
    });

    it('debe llamar a la función onClick cuando se hace click', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Botón Test</Button>);

        const button = screen.getByRole('button', { name: /botón test/i });
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('debe renderizar como deshabilitado si disabled=true', () => {
        render(<Button disabled>Deshabilitado</Button>);
        const button = screen.getByRole('button', { name: /deshabilitado/i });

        expect(button).toBeDisabled();
    });

    it('debe aplicar la clase correcta para variant primary', () => {
        render(<Button variant="primary">Botón Primario</Button>);
        const button = screen.getByRole('button', { name: /botón primario/i });

        expect(button).toHaveClass('bg-[#1DA1F2]');
    });

    it('debería simular fetch automáticamente', async () => {
        const response = await fetch('/api/articles');
        const data = await response.json();

        expect(Array.isArray(data.articles)).toBe(true);
        expect(data.articles.length).toBeGreaterThan(0);
        expect(data.articles[0]).toHaveProperty('title');
    });
});

/**
 * test-utils.tsx
 *
 * Archivo de utilidades para tests.
 * Centraliza el renderizado de componentes con Providers globales (por ejemplo Zustand, Router, Theme, etc.).
 * Permite mantener los tests limpios y preparados para escalar sin duplicar lógica en cada test.
 */

import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

// Aquí en el futuro se puede envolver Zustand, ThemeProvider, AuthProvider, etc.
const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <MemoryRouterProvider>
            {children}
        </MemoryRouterProvider>
    );
};

// Render custom que siempre usa Providers
const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

// Exportamos todo como antes, pero usando nuestro render ya preparado
export * from '@testing-library/react';
export { customRender as render };

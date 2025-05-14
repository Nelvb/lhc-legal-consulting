/**
 * Configuración principal de Jest para el frontend.
 *
 * - Usa `ts-jest` con soporte para Babel.
 * - Entorno jsdom para simular navegador.
 * - setupTests carga mocks globales como fetch.
 * - setupFiles carga variables de entorno desde `.env.test`.
 */
import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
    preset: 'ts-jest/presets/js-with-babel',
    testEnvironment: 'jsdom',
    rootDir: './',
    setupFiles: ['<rootDir>/jest.env.setup.ts'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    
    // La configuración de transformación para los tests
    transform: {
        '^.+\\.(ts|tsx)$': ['babel-jest', {
            // Usará .babelrc.js automáticamente
        }],
    },
    
    // Mapeo para resolución de módulos
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@frontend/(.*)$': '<rootDir>/$1',
        '^@test-utils$': '<rootDir>/__tests__/utils/test-utils.tsx',
    },
    
    // Patrones para encontrar los archivos de prueba
    testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
    
    // Extensiones que Jest procesará
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    
    // Opcional: cobertura
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/.next/**',
        '!**/coverage/**',
    ],
};

export default config;
/**
 * Configuración principal de Jest para el frontend.
 *
 * - Usa `ts-jest` con soporte para Babel.
 * - Entorno jsdom para simular navegador.
 * - setupTests carga mocks globales como fetch.
 * - setupFiles carga variables de entorno desde `.env.test`.
 * - Los alias funcionan sin duplicar `src/frontend`.
 */

import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest/presets/js-with-babel',
    testEnvironment: 'jsdom',
    rootDir: './',
    setupFiles: ['<rootDir>/jest.env.setup.ts'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@frontend/(.*)$': '<rootDir>/$1',
        '^@test-utils$': '<rootDir>/src/frontend/__tests__/utils/test-utils.tsx',
    },
    testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
};

export default config;

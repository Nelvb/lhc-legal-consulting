import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest/presets/js-with-babel',
    testEnvironment: 'jsdom',
    rootDir: './',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // <-- Así está bien
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
};

export default config;

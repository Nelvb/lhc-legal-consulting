/**
 * Configuración de Babel para testing y compatibilidad específica.
 * 
 * Este archivo está diseñado para coexistir con SWC en Next.js.
 * - Next.js usará SWC para compilación normal gracias a forceSwcTransforms
 * - Jest usará esta configuración para los tests
 */
module.exports = {
    presets: [
        ["@babel/preset-env", {
            targets: {
                node: "current",
            },
        }],
        ["@babel/preset-react", {
            runtime: "automatic",
        }],
        "@babel/preset-typescript",
    ],
    // Solo aplicar esta configuración a archivos de test y sus dependencias
    env: {
        test: {
            // Configuración específica para entorno de pruebas
            plugins: [
                // Cualquier plugin adicional necesario para tests
            ],
        },
    },
};
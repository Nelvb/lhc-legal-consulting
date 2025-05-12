// src/frontend/__mocks__/fetchMock.ts

/**
 * Simula global.fetch para diferentes endpoints de forma profesional.
 * - Si se llama a /api/images/upload (POST), devuelve una URL simulada.
 * - Para cualquier otro fetch, devuelve el objeto de prueba recibido por parámetro.
 */

export const mockFetch = (mockedData: any) => {
    global.fetch = jest.fn((url, options) => {
        if (url === '/api/images/upload' && options?.method === 'POST') {
            return Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        image: {
                            url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
                        },
                    }),
            });
        }

        // Resto de endpoints (por ejemplo /api/articles)
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockedData),
        });
    }) as jest.Mock;
};

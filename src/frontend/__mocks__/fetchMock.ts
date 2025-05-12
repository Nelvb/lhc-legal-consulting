// tests/mocks/fetchMock.ts

export const mockFetch = (mockedData: any) => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockedData),
        })
    ) as jest.Mock;
};

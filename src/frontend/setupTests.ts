// setupTests.ts

import '@testing-library/jest-dom';
import { mockFetch } from '@/__mocks__/fetchMock';
import { mockedArticles } from '@/__mocks__/mockedArticles';

beforeEach(() => {
    mockFetch(mockedArticles);
});

/**
 * __mocks__/useUiStore.ts
 *
 * Mock para el store Zustand de interfaz de usuario (useUiStore).
 * Permite controlar y espiar el estado del modal en tests.
 * Centraliza la lógica de mock para reutilizar en diferentes suites.
 */

export const mockOpenDeleteModal = jest.fn();
export const mockCloseDeleteModal = jest.fn();

let internalState = {
    showDeleteModal: false,
};

export const useUiStore = () => ({
    showDeleteModal: internalState.showDeleteModal,
    openDeleteModal: () => {
        internalState.showDeleteModal = true;
        mockOpenDeleteModal();
    },
    closeDeleteModal: () => {
        internalState.showDeleteModal = false;
        mockCloseDeleteModal();
    },
});

// Reset manual para usar en beforeEach() de los tests
export const resetUiStoreMock = () => {
    internalState = {
        showDeleteModal: false,
    };
    mockOpenDeleteModal.mockClear();
    mockCloseDeleteModal.mockClear();
};

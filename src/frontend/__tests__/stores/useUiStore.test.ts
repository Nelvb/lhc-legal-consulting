/**
 * useUiStore.test.ts
 *
 * Tests unitarios para el store Zustand de UI (useUiStore).
 * Verifica:
 * - Estado inicial
 * - Acciones openDeleteModal y closeDeleteModal
 * - Comportamiento aislado sin persistencia entre tests
 */

import { useUiStore } from "@/stores/useUiStore";

describe("useUiStore", () => {
    beforeEach(() => {
        useUiStore.setState({ showDeleteModal: false });
    });

    it("estado inicial: showDeleteModal es false", () => {
        expect(useUiStore.getState().showDeleteModal).toBe(false);
    });

    it("openDeleteModal cambia showDeleteModal a true", () => {
        useUiStore.getState().openDeleteModal();
        expect(useUiStore.getState().showDeleteModal).toBe(true);
    });

    it("closeDeleteModal cambia showDeleteModal a false", () => {
        useUiStore.getState().openDeleteModal();
        useUiStore.getState().closeDeleteModal();
        expect(useUiStore.getState().showDeleteModal).toBe(false);
    });
});

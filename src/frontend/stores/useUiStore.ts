/**
 * useUiStore.ts
 *
 * Store global de interfaz (UI) para manejar modales y elementos visuales globales.
 * Permite abrir y cerrar el modal de eliminación de cuenta desde cualquier componente.
 *
 * - Integrado con Zustand
 * - Escalable para manejar otros modales o flags de UI en el futuro
 */

import { create } from "zustand";

interface UiState {
    showDeleteModal: boolean;
    openDeleteModal: () => void;
    closeDeleteModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    showDeleteModal: false,
    openDeleteModal: () => set({ showDeleteModal: true }),
    closeDeleteModal: () => set({ showDeleteModal: false }),
}));

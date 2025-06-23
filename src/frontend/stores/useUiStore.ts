/**
 * useUiStore.ts
 *
 * Store global de interfaz (UI) para manejar modales y elementos visuales globales.
 * Incluye:
 * - Visibilidad del menú lateral (SideMenu)
 * - Modal de eliminación de cuenta
 *
 * Integrado con Zustand y preparado para escalar con otros flags visuales.
 */

import { create } from "zustand";

interface UiState {
    // Menú lateral hamburguesa
    isSideMenuOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;

    // Modal de eliminación de cuenta
    showDeleteModal: boolean;
    openDeleteModal: () => void;
    closeDeleteModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    // Menú lateral
    isSideMenuOpen: false,
    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),

    // Modal eliminar cuenta
    showDeleteModal: false,
    openDeleteModal: () => set({ showDeleteModal: true }),
    closeDeleteModal: () => set({ showDeleteModal: false }),
}));

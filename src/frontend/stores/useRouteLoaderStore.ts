/**
 * useRouteLoaderStore.ts
 *
 * Store global para controlar la navegación entre rutas.
 * Permite activar manualmente un estado de carga (ej. spinner global)
 * cuando el usuario cambia de página. Compatible con App Router.
 */

import { create } from 'zustand'

interface RouteLoaderState {
    isNavigating: boolean
    startNavigation: () => void
    endNavigation: () => void
}

export const useRouteLoaderStore = create<RouteLoaderState>((set) => ({
    isNavigating: false,
    startNavigation: () => set({ isNavigating: true }),
    endNavigation: () => set({ isNavigating: false }),
}))

/**
 * RouteChangeLoader.tsx
 *
 * Spinner sutil para indicar que se está cargando una nueva vista.
 * Muestra una barra animada en la parte superior durante la navegación.
 * Usa Zustand (useRouteLoaderStore) para controlar el estado de transición.
 */

'use client'

import { useRouteLoaderStore } from '@/stores/useRouteLoaderStore'
import { useEffect } from 'react'

const RouteChangeLoader = () => {
    const isNavigating = useRouteLoaderStore((state) => state.isNavigating)

    // Fallback de seguridad: desactiva spinner tras 8s
    useEffect(() => {
        if (isNavigating) {
            const timeout = setTimeout(() => {
                useRouteLoaderStore.getState().endNavigation()
            }, 8000)

            return () => clearTimeout(timeout)
        }
    }, [isNavigating])

    if (!isNavigating) return null

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] animate-pulse" />
    )
}

export default RouteChangeLoader

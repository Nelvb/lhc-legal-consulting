/**
 * useInView.ts
 * 
 * Hook personalizado para detectar cuando un elemento entra en el viewport.
 * Utiliza IntersectionObserver nativo para optimizar performance y proporciona
 * una API limpia para animaciones de scroll. Optimizado para LHC Legal & Consulting.
 */

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
    /** Porcentaje del elemento que debe ser visible para activar (0-1) */
    threshold?: number;
    /** Margen adicional alrededor del área de detección */
    rootMargin?: string;
    /** Si true, solo se activa una vez cuando entra por primera vez */
    triggerOnce?: boolean;
    /** Elemento raíz para la intersección (por defecto viewport) */
    root?: Element | null;
    /** Delay en milisegundos antes de activar */
    delay?: number;
}

interface UseInViewReturn {
    /** Ref que debe asignarse al elemento a observar */
    ref: React.RefObject<HTMLElement>;
    /** Estado booleano que indica si el elemento está en vista */
    inView: boolean;
    /** Entrada completa del IntersectionObserver para casos avanzados */
    entry?: IntersectionObserverEntry;
}

/**
 * Hook para detectar cuando un elemento es visible en el viewport
 * 
 * @param options - Configuración del IntersectionObserver
 * @returns Objeto con ref, estado inView y entrada del observer
 * 
 * @example
 * ```tsx
 * const { ref, inView } = useInView({
 *   threshold: 0.1,
 *   triggerOnce: true
 * });
 * 
 * return (
 *   <div 
 *     ref={ref}
 *     className={`transition-opacity ${inView ? 'opacity-100' : 'opacity-0'}`}
 *   >
 *     Contenido animado
 *   </div>
 * );
 * ```
 */
export const useInView = (options: UseInViewOptions = {}): UseInViewReturn => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true,
        root = null,
        delay = 0
    } = options;

    const [inView, setInView] = useState<boolean>(false);
    const [entry, setEntry] = useState<IntersectionObserverEntry>();
    const ref = useRef<HTMLElement>(null);
    const hasTriggered = useRef<boolean>(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Si ya se activó una vez y triggerOnce está habilitado, no hacer nada
        if (triggerOnce && hasTriggered.current) return;

        const observer = new IntersectionObserver(
            ([observerEntry]) => {
                const isIntersecting = observerEntry.isIntersecting;

                const updateState = () => {
                    setEntry(observerEntry);

                    if (isIntersecting) {
                        setInView(true);
                        if (triggerOnce) {
                            hasTriggered.current = true;
                        }
                    } else if (!triggerOnce) {
                        setInView(false);
                    }
                };

                // Aplicar delay si está configurado
                if (delay > 0 && isIntersecting) {
                    setTimeout(updateState, delay);
                } else {
                    updateState();
                }
            },
            {
                threshold,
                rootMargin,
                root
            }
        );

        observer.observe(element);

        // Cleanup function
        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce, root, delay]);

    // Reset del estado si triggerOnce cambia a false
    useEffect(() => {
        if (!triggerOnce) {
            hasTriggered.current = false;
        }
    }, [triggerOnce]);

    return { ref, inView, entry };
};

/**
 * Hook simplificado para casos de uso comunes de animaciones
 * 
 * @param threshold - Porcentaje de visibilidad requerido
 * @returns Objeto con ref y estado inView
 * 
 * @example
 * ```tsx
 * const { ref, inView } = useSimpleInView(0.2);
 * ```
 */
export const useSimpleInView = (threshold: number = 0.1) => {
    return useInView({
        threshold,
        triggerOnce: true,
        rootMargin: '50px'
    });
};

/**
 * Hook para animaciones escalonadas (múltiples elementos)
 * 
 * @param itemCount - Número de elementos a animar
 * @param delayBetween - Delay en ms entre cada elemento
 * @returns Array de objetos con ref e inView para cada elemento
 * 
 * @example
 * ```tsx
 * const animations = useStaggeredInView(items.length, 100);
 * 
 * return items.map((item, index) => (
 *   <div 
 *     key={item.id}
 *     ref={animations[index].ref}
 *     className={animations[index].inView ? 'animate-in' : 'animate-out'}
 *   >
 *     {item.content}
 *   </div>
 * ));
 * ```
 */
export const useStaggeredInView = (itemCount: number, delayBetween: number = 100) => {
    const [triggered, setTriggered] = useState<boolean>(false);
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

    const { ref: containerRef, inView: containerInView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    useEffect(() => {
        if (containerInView && !triggered) {
            setTriggered(true);

            // Activar elementos progresivamente
            Array.from({ length: itemCount }, (_, index) => {
                setTimeout(() => {
                    setVisibleItems(prev => new Set([...prev, index]));
                }, index * delayBetween);
            });
        }
    }, [containerInView, triggered, itemCount, delayBetween]);

    return {
        containerRef,
        items: Array.from({ length: itemCount }, (_, index) => ({
            inView: visibleItems.has(index),
            delay: index * delayBetween
        }))
    };
};

export default useInView;
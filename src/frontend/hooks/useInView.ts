/**
 * useInView.ts
 * 
 * Hook personalizado simple para detectar cuando un elemento entra en el viewport.
 * Utiliza IntersectionObserver nativo para detectar visibilidad y activar animaciones.
 * Configuración estándar para LHC Legal & Consulting sin complejidad innecesaria.
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
}

interface UseInViewReturn {
    /** Ref que debe asignarse al elemento a observar */
    ref: React.RefObject<HTMLDivElement>;
    /** Estado booleano que indica si el elemento está en vista */
    inView: boolean;
}

/**
 * Hook principal para detectar visibilidad de elementos
 * 
 * @param options - Configuración del IntersectionObserver
 * @returns Objeto con ref y estado inView
 * 
 * @example
 * ```tsx
 * const { ref, inView } = useInView({
 *   threshold: 0.4,
 *   triggerOnce: true
 * });
 * 
 * return (
 *   <div 
 *     ref={ref}
 *     className={`transition-all duration-700 transform ${
 *       inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
 *     }`}
 *   >
 *     Contenido animado
 *   </div>
 * );
 * ```
 */
export const useInView = (options: UseInViewOptions = {}): UseInViewReturn => {
    const {
        threshold = 0.4,
        rootMargin = '0px',
        triggerOnce = true,
        root = null
    } = options;

    const [inView, setInView] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const hasTriggered = useRef<boolean>(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Si ya se activó una vez y triggerOnce está habilitado, no hacer nada
        if (triggerOnce && hasTriggered.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting;

                if (isIntersecting) {
                    setInView(true);
                    if (triggerOnce) {
                        hasTriggered.current = true;
                    }
                } else if (!triggerOnce) {
                    setInView(false);
                }
            },
            {
                threshold,
                rootMargin,
                root
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce, root]);

    return { ref, inView };
};

export default useInView;
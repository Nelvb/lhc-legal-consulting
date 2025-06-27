/**
 * cookieManager.ts
 *
 * Utilidades para gestión de cookies del navegador en LHC Legal & Consulting.
 * Funciones helper para crear, leer, actualizar y eliminar cookies de forma segura.
 * Compatible con SSR y cumplimiento RGPD.
 */

export interface CookieOptions {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Establece una cookie en el navegador
 */
export const setCookie = (
    name: string,
    value: string,
    options: CookieOptions = {}
): void => {
    if (typeof document === 'undefined') return;

    const {
        expires,
        path = '/',
        domain,
        secure = window.location.protocol === 'https:',
        sameSite = 'lax'
    } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    // Configurar expiración
    if (expires) {
        let expiresDate: Date;

        if (typeof expires === 'number') {
            expiresDate = new Date();
            expiresDate.setTime(expiresDate.getTime() + expires * 24 * 60 * 60 * 1000);
        } else {
            expiresDate = expires;
        }

        cookieString += `; expires=${expiresDate.toUTCString()}`;
    }

    // Otras opciones
    cookieString += `; path=${path}`;

    if (domain) {
        cookieString += `; domain=${domain}`;
    }

    if (secure) {
        cookieString += '; secure';
    }

    cookieString += `; samesite=${sameSite}`;

    document.cookie = cookieString;
};

/**
 * Obtiene el valor de una cookie por su nombre
 */
export const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;

    const encodedName = encodeURIComponent(name);
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        const trimmedCookie = cookie.trim();

        if (trimmedCookie.startsWith(`${encodedName}=`)) {
            return decodeURIComponent(trimmedCookie.substring(encodedName.length + 1));
        }
    }

    return null;
};

/**
 * Elimina una cookie estableciendo su fecha de expiración en el pasado
 */
export const deleteCookie = (
    name: string,
    options: Omit<CookieOptions, 'expires'> = {}
): void => {
    setCookie(name, '', {
        ...options,
        expires: new Date(0), // Fecha en el pasado para eliminar
    });
};

/**
 * Verifica si las cookies están habilitadas en el navegador
 */
export const areCookiesEnabled = (): boolean => {
    if (typeof document === 'undefined') return false;

    try {
        const testCookie = 'lhc-cookie-test';
        setCookie(testCookie, 'test');
        const enabled = getCookie(testCookie) === 'test';
        deleteCookie(testCookie);
        return enabled;
    } catch {
        return false;
    }
};

/**
 * Obtiene todas las cookies como objeto
 */
export const getAllCookies = (): Record<string, string> => {
    if (typeof document === 'undefined') return {};

    const cookies: Record<string, string> = {};

    document.cookie.split(';').forEach(cookie => {
        const trimmedCookie = cookie.trim();
        const [name, ...valueParts] = trimmedCookie.split('=');

        if (name && valueParts.length > 0) {
            try {
                cookies[decodeURIComponent(name)] = decodeURIComponent(valueParts.join('='));
            } catch {
                // Ignorar cookies malformadas
            }
        }
    });

    return cookies;
};

/**
 * Elimina todas las cookies del sitio (solo las que podemos controlar)
 */
export const deleteAllCookies = (): void => {
    if (typeof document === 'undefined') return;

    const cookies = getAllCookies();

    Object.keys(cookies).forEach(name => {
        // Intentar eliminar con diferentes paths
        deleteCookie(name, { path: '/' });
        deleteCookie(name, { path: '/', domain: window.location.hostname });
        deleteCookie(name, { path: '/', domain: `.${window.location.hostname}` });
    });
};

/**
 * Formatea el tamaño de las cookies en bytes
 */
export const getCookieSize = (): string => {
    if (typeof document === 'undefined') return '0 bytes';

    const cookieString = document.cookie;
    const sizeInBytes = new Blob([cookieString]).size;

    if (sizeInBytes < 1024) {
        return `${sizeInBytes} bytes`;
    } else if (sizeInBytes < 1024 * 1024) {
        return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    } else {
        return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
};

/**
 * Constantes para cookies específicas de LHC
 */
export const COOKIE_NAMES = {
    CONSENT: 'lhc-cookie-consent',
    ANALYTICS: 'lhc-analytics-consent',
    FUNCTIONAL: 'lhc-functional-consent',
    SESSION: 'lhc-session',
} as const;

/**
 * Configuraciones predefinidas para diferentes tipos de cookies
 */
export const COOKIE_CONFIGS = {
    // Cookies de sesión (se eliminan al cerrar navegador)
    session: {
        path: '/',
        secure: true,
        sameSite: 'lax' as const,
    },

    // Cookies persistentes (30 días)
    persistent: {
        expires: 30,
        path: '/',
        secure: true,
        sameSite: 'lax' as const,
    },

    // Cookies de consentimiento (1 año)
    consent: {
        expires: 365,
        path: '/',
        secure: true,
        sameSite: 'lax' as const,
    },

    // Cookies analíticas (2 años, según Google Analytics)
    analytics: {
        expires: 730,
        path: '/',
        secure: true,
        sameSite: 'lax' as const,
    },
} as const;
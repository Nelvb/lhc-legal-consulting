/**
 * useCookieConsent.tsx
 *
 * Hook + Provider de consentimiento de cookies para LHC Legal & Consulting.
 * Gestiona el estado global de visibilidad, preferencias y modal de configuración.
 * Usa Zustand para persistencia en localStorage. Cumple RGPD.
 */

'use client';

import { createContext, useContext, useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  setCookie,
  getCookie,
  COOKIE_NAMES,
  COOKIE_CONFIGS
} from '@/lib/utils/cookieManager';

// Tipos para preferencias de cookies
type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
};

interface CookieConsentState {
  isVisible: boolean;
  showModal: boolean;
  preferences: CookiePreferences;
  initConsent: () => void;
  acceptAll: () => void;
  acceptNecessary: () => void;
  updatePreference: (key: keyof CookiePreferences, value: boolean) => void;
  saveModalPreferences: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  functional: false,
};

// Zustand store con persistencia en localStorage
const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set, get) => ({
      isVisible: false,
      showModal: false,
      preferences: defaultPreferences,

      initConsent: () => {
        const existing = getCookie(COOKIE_NAMES.CONSENT);
        if (!existing) {
          set({ isVisible: true });
        }
      },

      acceptAll: () => {
        set({
          preferences: {
            necessary: true,
            analytics: true,
            functional: true,
          },
          isVisible: false,
          showModal: false,
        });

        setCookie(COOKIE_NAMES.CONSENT, 'true', COOKIE_CONFIGS.consent);
        setCookie(COOKIE_NAMES.ANALYTICS, 'true', COOKIE_CONFIGS.analytics);
        setCookie(COOKIE_NAMES.FUNCTIONAL, 'true', COOKIE_CONFIGS.persistent);
      },

      acceptNecessary: () => {
        set({
          preferences: {
            necessary: true,
            analytics: false,
            functional: false,
          },
          isVisible: false,
          showModal: false,
        });

        setCookie(COOKIE_NAMES.CONSENT, 'true', COOKIE_CONFIGS.consent);
        setCookie(COOKIE_NAMES.ANALYTICS, 'false', COOKIE_CONFIGS.analytics);
        setCookie(COOKIE_NAMES.FUNCTIONAL, 'false', COOKIE_CONFIGS.persistent);
      },

      updatePreference: (key, value) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value,
          },
        }));
      },

      saveModalPreferences: () => {
        const prefs = get().preferences;

        set({
          isVisible: false,
          showModal: false,
        });

        setCookie(COOKIE_NAMES.CONSENT, 'true', COOKIE_CONFIGS.consent);
        setCookie(COOKIE_NAMES.ANALYTICS, String(prefs.analytics), COOKIE_CONFIGS.analytics);
        setCookie(COOKIE_NAMES.FUNCTIONAL, String(prefs.functional), COOKIE_CONFIGS.persistent);
      },

      openModal: () => set({ showModal: true }),
      closeModal: () => set({ showModal: false }),
    }),
    {
      name: 'lhc-cookie-consent', // key en localStorage
    }
  )
);

// Contexto de consentimiento
const CookieConsentContext = createContext<CookieConsentState | null>(null);

// Provider que inicializa y comparte el estado
export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useCookieConsentStore();

  useEffect(() => {
    store.initConsent();
  }, []);

  return (
    <CookieConsentContext.Provider value={store}>
      {children}
    </CookieConsentContext.Provider>
  );
};

// Hook para acceder al contexto
export const useCookieConsent = (): CookieConsentState => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent debe usarse dentro de <CookieConsentProvider>');
  }
  return context;
};

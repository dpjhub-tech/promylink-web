"use client";

import { useState, useEffect, useCallback } from "react";

export interface CookiePreferences {
  essential: true;
  analytics: boolean;
}

const STORAGE_KEY = "cookie_consent";

function getSavedPreferences(): CookiePreferences | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

export function useCookieConsent() {
  // Starts "consented" (banner hidden) until mounted, since localStorage
  // isn't available during SSR and reading it during render would cause a
  // hydration mismatch — the real value loads in the effect below.
  const [preferences, setPreferences] = useState<CookiePreferences | null | undefined>(undefined);

  useEffect(() => {
    setPreferences(getSavedPreferences());
  }, []);

  const hasConsented = preferences === undefined ? true : preferences !== null;

  const acceptAll = useCallback(() => {
    const prefs: CookiePreferences = { essential: true, analytics: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
  }, []);

  const acceptEssentialOnly = useCallback(() => {
    const prefs: CookiePreferences = { essential: true, analytics: false };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
  }, []);

  const updatePreferences = useCallback((prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPreferences(null);
  }, []);

  return { preferences, hasConsented, acceptAll, acceptEssentialOnly, updatePreferences, resetConsent };
}

import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from './translations';
import { SITE } from '../config/site';

const LanguageContext = createContext(null);

// Locale lives in the URL prefix: /  → ru (default), /en/...  → en, /tr/...  → tr.
// Putting it in the path (not querystring or cookie) is what lets each language
// have its own canonical URL — search engines index them as separate documents.

const PREFIX_TO_LANG = { en: 'en', tr: 'tr' };

export function detectLanguageFromPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return 'ru';
  const first = segments[0];
  return PREFIX_TO_LANG[first] || 'ru';
}

// Given a logical route like '/services' and a target language, return the
// actual URL: /services for ru, /en/services for en, /tr/services for tr.
export function localizedPath(logicalPath, language) {
  const cleanPath = logicalPath.startsWith('/') ? logicalPath : `/${logicalPath}`;
  if (language === 'ru') return cleanPath === '/' ? '/' : cleanPath;
  return cleanPath === '/' ? `/${language}` : `/${language}${cleanPath}`;
}

// Inverse: strip the language prefix from a real URL to get the logical route.
export function logicalPathFromUrl(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && PREFIX_TO_LANG[segments[0]]) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname || '/';
}

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const language = detectLanguageFromPath(location.pathname);

  // Keep <html lang="..."> in sync — assistive tech and Google use it.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = useMemo(() => {
    const dict = translations[language] || translations.ru;
    const t = (key) => {
      // dot-path lookup: t('seo.home.title')
      const path = key.split('.');
      let cur = dict;
      for (const k of path) {
        if (cur && typeof cur === 'object' && k in cur) cur = cur[k];
        else return key; // fallback to key — makes missing translations visible
      }
      return cur;
    };
    const changeLanguage = (newLang) => {
      if (!SITE.supportedLanguages.includes(newLang)) return;
      const logical = logicalPathFromUrl(location.pathname);
      navigate(localizedPath(logical, newLang) + location.search, { replace: false });
    };
    return { language, t, changeLanguage, supportedLanguages: SITE.supportedLanguages };
  }, [language, location.pathname, location.search, navigate]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Render outside provider (e.g., during prerender bootstrap) — return defaults.
    return {
      language: 'ru',
      t: (k) => k,
      changeLanguage: () => {},
      supportedLanguages: SITE.supportedLanguages,
    };
  }
  return ctx;
}

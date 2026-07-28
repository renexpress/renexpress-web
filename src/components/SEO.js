import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE } from '../config/site';
import { useTranslation, logicalPathFromUrl, localizedPath } from '../i18n/LanguageContext';

// One component, one source of truth for per-page SEO.
//
// Usage from a page:
//   <SEO
//     titleKey="seo.home.title"
//     descriptionKey="seo.home.description"
//     image="https://renexpress.online/og-home.jpg"   // optional, falls back to site default
//     breadcrumbs={[{ name: t('common.home'), path: '/' }]}
//     jsonLd={[ /* any extra Schema.org objects */ ]}
//   />

// Default OG image — branded 1200×630 card built from the RENEXPRESS app logomark
// (scripts/gen-og.js → public/og-default.jpg). Shown as the link preview everywhere
// the site is shared (WhatsApp/Telegram/social). Real file, no 404.
const DEFAULT_OG_IMAGE = `${SITE.url}/og-default.jpg`;

export default function SEO({
  titleKey,
  descriptionKey,
  title,                 // override (raw string, takes precedence over titleKey)
  description,           // override
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  breadcrumbs,           // [{ name, path }] — path is logical, NOT language-prefixed
  jsonLd = [],           // extra Schema.org objects to inject
  ogType = 'website',
  translatedLanguages,   // optional: list of languages this page has REAL body translation for.
                         // If current language is NOT in this list, we noindex it. Prevents
                         // shipping EN meta + RU body (which Google treats as cloaking).
}) {
  const { language, t } = useTranslation();
  const { pathname } = useLocation();

  // Force noindex if caller didn't translate body copy for this language
  const effectiveNoindex = noindex || (
    Array.isArray(translatedLanguages) && !translatedLanguages.includes(language)
  );

  const finalTitle = title || (titleKey ? t(titleKey) : SITE.name);
  const finalDescription = description || (descriptionKey ? t(descriptionKey) : '');

  const logicalPath = logicalPathFromUrl(pathname);
  const canonical = `${SITE.url}${localizedPath(logicalPath, language)}`;

  // hreflang links, plus x-default → RU.
  // If the page declared which languages it actually has a real body translation for,
  // only advertise hreflang for those — advertising /en, /tr for a RU-only page is
  // hreflang-asymmetry (points at pages that don't exist in the sitemap).
  const hreflangLangs = Array.isArray(translatedLanguages) && translatedLanguages.length > 0
    ? SITE.supportedLanguages.filter((l) => translatedLanguages.includes(l))
    : SITE.supportedLanguages;
  const hreflangs = hreflangLangs.map((lang) => ({
    lang,
    href: `${SITE.url}${localizedPath(logicalPath, lang)}`,
  }));

  // BreadcrumbList JSON-LD (if breadcrumbs provided)
  const breadcrumbJsonLd = breadcrumbs && breadcrumbs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `${SITE.url}${localizedPath(b.path, language)}`,
        })),
      }
    : null;

  const allJsonLd = [
    ...(breadcrumbJsonLd ? [breadcrumbJsonLd] : []),
    ...jsonLd,
  ];

  return (
    <Helmet>
      <html lang={language} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {effectiveNoindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* hreflang per supported language */}
      {hreflangs.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE.url}${localizedPath(logicalPath, 'ru')}`} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={language === 'ru' ? 'ru_RU' : language === 'tr' ? 'tr_TR' : 'en_US'} />
      {SITE.supportedLanguages.filter((l) => l !== language).map((l) => (
        <meta key={l} property="og:locale:alternate" content={l === 'ru' ? 'ru_RU' : l === 'tr' ? 'tr_TR' : 'en_US'} />
      ))}

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Extra JSON-LD (BreadcrumbList + page-specific) */}
      {allJsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}

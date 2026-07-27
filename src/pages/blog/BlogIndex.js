import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SEO from '../../components/SEO';
import useIsMobile from '../../hooks/useIsMobile';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { COLORS, SHADOW } from '../../config/theme';
import { ARTICLES } from '../../config/articles';

// Blog index — lists all articles. RU-only (noindex on /en, /tr).

export default function BlogIndex({ isAuthenticated, setIsAuthenticated }) {
  const { language, t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: 'Inter, -apple-system, sans-serif', color: COLORS.text }}>
      <SEO
        title="Статьи о доставке из Турции в Россию | RENEXPRESS"
        description="Полезные статьи о карго из Турции в Россию: как заказать доставку, сколько стоит, авиа или авто, растаможка и маркировка. Отвечаем на частые вопросы просто и по делу."
        translatedLanguages={['ru']}
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: 'Статьи', path: '/blog' },
        ]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <main style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '24px 16px 48px' : '48px 32px 96px' }}>
        <header style={{ marginBottom: isMobile ? 24 : 40 }}>
          <h1 style={{ fontSize: isMobile ? 30 : 46, fontWeight: 800, lineHeight: 1.15, marginBottom: 14, color: COLORS.text }}>Статьи о доставке из Турции</h1>
          <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color: '#475569', maxWidth: 700 }}>
            Разбираем всё, что важно знать про карго из Турции в Россию: как заказать, сколько стоит,
            какой тариф выбрать и как проходит таможня. Просто и по делу.
          </p>
        </header>

        <div style={{ display: 'grid', gap: 16 }}>
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              to={localizedPath(`/blog/${a.slug}`, language)}
              style={{
                display: 'block', textDecoration: 'none', color: 'inherit',
                background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card,
                borderRadius: 16, padding: isMobile ? 20 : 28,
              }}
            >
              <h2 style={{ fontSize: isMobile ? 19 : 24, fontWeight: 700, marginBottom: 10, color: COLORS.text }}>{a.h1}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: '#475569', margin: 0 }}>{a.description}</p>
              <span style={{ display: 'inline-block', marginTop: 14, color: COLORS.primaryText, fontWeight: 600, fontSize: 14 }}>Читать →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

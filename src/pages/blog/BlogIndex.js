import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SEO from '../../components/SEO';
import useIsMobile from '../../hooks/useIsMobile';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { COLORS, GRADIENT, SHADOW, FOCUS_CSS } from '../../config/theme';
import { ARTICLES } from '../../config/articles';

// Blog index — lists all articles. RU-only (noindex on /en, /tr).

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
function formatDate(iso) {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

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

      {/* Hero */}
      <section style={{ background: COLORS.bgTert, borderBottom: `1px solid ${COLORS.divider}`, padding: isMobile ? '96px 16px 40px' : '128px 24px 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: COLORS.primaryText, marginBottom: 14 }}>Блог RENEXPRESS</div>
          <h1 style={{ fontSize: isMobile ? 30 : 48, fontWeight: 800, lineHeight: 1.12, marginBottom: 16, color: COLORS.text }}>Статьи о доставке из Турции</h1>
          <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color: COLORS.textSecond, maxWidth: 640, margin: 0 }}>
            Разбираем всё, что важно знать про карго из Турции в Россию: как заказать, сколько стоит,
            какой тариф выбрать и как проходит таможня. Просто и по делу.
          </p>
          <div style={{ height: 4, width: 72, background: GRADIENT, borderRadius: 4, marginTop: 24 }} />
        </div>
      </section>

      {/* Cards */}
      <main style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '28px 16px 64px' : '48px 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 16 : 24 }}>
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              to={localizedPath(`/blog/${a.slug}`, language)}
              className="blog-card"
              style={{
                display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit',
                background: '#FFFFFF', border: `1px solid ${COLORS.cardBorder}`, boxShadow: SHADOW.card,
                borderRadius: 20, padding: isMobile ? 22 : 28, transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', background: GRADIENT, padding: '4px 12px', borderRadius: 999, textShadow: '0 1px 1px rgba(10,37,53,.3)' }}>{a.tag}</span>
                <span style={{ fontSize: 13, color: COLORS.textMuted }}>{a.readMin} мин · {formatDate(a.datePublished)}</span>
              </div>
              <h2 style={{ fontSize: isMobile ? 20 : 23, fontWeight: 700, lineHeight: 1.3, marginBottom: 12, color: COLORS.text }}>{a.h1}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: COLORS.textSecond, margin: '0 0 18px' }}>{a.description}</p>
              <span className="blog-readmore" style={{ marginTop: 'auto', color: COLORS.primaryText, fontWeight: 700, fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Читать <span className="blog-arrow" style={{ transition: 'transform .2s ease', display: 'inline-block' }}>→</span>
              </span>
            </Link>
          ))}
        </div>
      </main>

      <style>{`
        ${FOCUS_CSS}
        .blog-card:hover {
          transform: translateY(-3px);
          box-shadow: ${SHADOW.cardHover};
          border-color: ${COLORS.primary};
        }
        .blog-card:hover .blog-arrow { transform: translateX(4px); }
      `}</style>
    </div>
  );
}

import React from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SEO from '../../components/SEO';
import useIsMobile from '../../hooks/useIsMobile';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { SITE } from '../../config/site';
import { COLORS, GRADIENT, SHADOW, FOCUS_CSS } from '../../config/theme';
import { getArticle } from '../../config/articles';

// Renders one blog article by :slug. RU-only (noindex on /en, /tr via
// translatedLanguages). Article + FAQPage schema. Content from config/articles.js.

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
function formatDate(iso) {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function TariffsTable({ isMobile }) {
  return (
    <div style={{ overflowX: 'auto', margin: '4px 0 8px', border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, boxShadow: SHADOW.card }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? 14 : 15, minWidth: 440 }}>
        <thead>
          <tr style={{ textAlign: 'left', background: COLORS.bgSecond, color: COLORS.text }}>
            <th style={{ padding: '12px 14px', fontWeight: 700 }}>Тариф</th>
            <th style={{ padding: '12px 14px', fontWeight: 700 }}>Способ</th>
            <th style={{ padding: '12px 14px', fontWeight: 700 }}>Цена</th>
            <th style={{ padding: '12px 14px', fontWeight: 700 }}>Срок</th>
          </tr>
        </thead>
        <tbody>
          {SITE.tariffs.map((tr, i) => (
            <tr key={tr.id} style={{ background: i % 2 ? COLORS.bgTert : '#FFFFFF' }}>
              <td style={{ padding: '12px 14px', fontWeight: 700 }}>{tr.name}</td>
              <td style={{ padding: '12px 14px', color: COLORS.textSecond }}>{tr.mode === 'road' ? 'Авто' : 'Авиа'}</td>
              <td style={{ padding: '12px 14px', color: COLORS.primaryText, fontWeight: 700 }}>${tr.pricePerKg}/кг</td>
              <td style={{ padding: '12px 14px' }}>{tr.transitDaysMin}–{tr.transitDaysMax} дней</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Article({ isAuthenticated, setIsAuthenticated }) {
  const { slug } = useParams();
  const { language, t } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const article = getArticle(slug);

  if (!article) return <Navigate to={localizedPath('/blog', language)} replace />;

  const url = `${SITE.url}/blog/${article.slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.h1,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/favicon.svg` },
    },
    mainEntityOfPage: url,
    image: `${SITE.url}/meeting.png`,
  };

  const faqJsonLd = article.faq && article.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: 'Inter, -apple-system, sans-serif', color: COLORS.text }}>
      <SEO
        title={article.title}
        description={article.description}
        translatedLanguages={['ru']}
        ogType="article"
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: 'Статьи', path: '/blog' },
          { name: article.h1, path: `/blog/${article.slug}` },
        ]}
        jsonLd={faqJsonLd ? [articleJsonLd, faqJsonLd] : [articleJsonLd]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* Header band */}
      <section style={{ background: COLORS.bgTert, borderBottom: `1px solid ${COLORS.divider}`, padding: isMobile ? '92px 16px 32px' : '120px 24px 44px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <nav aria-label="breadcrumb" style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>
            <Link to={localizedPath('/blog', language)} className="blog-crumb" style={{ color: COLORS.primaryText, textDecoration: 'none', fontWeight: 600 }}>Статьи</Link>
            <span> · {article.tag}</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', background: GRADIENT, padding: '4px 12px', borderRadius: 999, textShadow: '0 1px 1px rgba(10,37,53,.3)' }}>{article.tag}</span>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>{article.readMin} мин чтения · {formatDate(article.datePublished)}</span>
          </div>
          <h1 style={{ fontSize: isMobile ? 28 : 44, fontWeight: 800, lineHeight: 1.18, margin: 0, color: COLORS.text }}>{article.h1}</h1>
        </div>
      </section>

      <main style={{ maxWidth: 780, margin: '0 auto', padding: isMobile ? '28px 16px 56px' : '44px 24px 96px' }}>
        {/* Lead */}
        <p style={{
          fontSize: isMobile ? 17 : 20, lineHeight: 1.6, color: COLORS.text, fontWeight: 500,
          borderLeft: `3px solid ${COLORS.primary}`, paddingLeft: 18, margin: '0 0 32px',
        }}>{article.lead}</p>

        {/* Body */}
        <article className="blog-body">
          {article.sections.map((section, si) => (
            <section key={si} style={{ marginBottom: isMobile ? 28 : 40 }}>
              <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, marginBottom: 16, color: COLORS.text, lineHeight: 1.25 }}>{section.h2}</h2>
              {section.blocks.map((block, bi) => {
                if (block.type === 'p') {
                  return <p key={bi} style={{ fontSize: isMobile ? 16 : 17, lineHeight: 1.8, color: '#334155', marginBottom: 16 }}>{block.text}</p>;
                }
                if (block.type === 'ul') {
                  return (
                    <ul key={bi} style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
                      {block.items.map((it, ii) => (
                        <li key={ii} style={{ position: 'relative', paddingLeft: 28, marginBottom: 12, fontSize: isMobile ? 16 : 17, lineHeight: 1.7, color: '#334155' }}>
                          <span style={{ position: 'absolute', left: 0, top: 1, color: COLORS.primary, fontWeight: 800 }}>✓</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === 'tariffs') {
                  return <TariffsTable key={bi} isMobile={isMobile} />;
                }
                return null;
              })}
            </section>
          ))}
        </article>

        {/* FAQ */}
        {article.faq && article.faq.length > 0 && (
          <section aria-labelledby="faq-heading" style={{ marginTop: isMobile ? 12 : 24, marginBottom: isMobile ? 28 : 44 }}>
            <h2 id="faq-heading" style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, marginBottom: 18 }}>Вопросы и ответы</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {article.faq.map((f, i) => (
                <details key={i} className="blog-faq" style={{ background: '#FFFFFF', border: `1px solid ${COLORS.cardBorder}`, boxShadow: SHADOW.card, borderRadius: 12, padding: '16px 20px' }}>
                  <summary style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, cursor: 'pointer', listStyle: 'none', color: COLORS.text }}>{f.q}</summary>
                  <p style={{ color: COLORS.textSecond, lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(42,171,171,.08), rgba(23,128,128,.05))',
          border: `1px solid ${COLORS.primary}`, borderRadius: 20, padding: isMobile ? 24 : 36, textAlign: 'center', marginTop: 8,
        }}>
          <h2 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 800, marginBottom: 8, color: COLORS.text }}>Готовы отправить груз из Турции?</h2>
          <p style={{ color: COLORS.textSecond, marginBottom: 22, fontSize: isMobile ? 15 : 16 }}>Рассчитайте стоимость за минуту или напишите менеджеру.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => navigate(localizedPath('/calculator', language))}
              className="blog-cta-btn"
              style={{ background: GRADIENT, color: '#FFFFFF', border: 'none', padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', textShadow: '0 1px 2px rgba(10,37,53,.35)', minHeight: 48, boxShadow: SHADOW.cta }}
            >
              Калькулятор стоимости
            </button>
            <Link
              to={localizedPath('/contacts', language)}
              className="blog-cta-btn"
              style={{ background: '#FFFFFF', color: COLORS.primaryText, border: `1.5px solid ${COLORS.primary}`, padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: 'none', minHeight: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Связаться с менеджером
            </Link>
          </div>
        </section>

        {/* Related */}
        <nav aria-label="Читайте также" style={{ marginTop: isMobile ? 32 : 48, paddingTop: 24, borderTop: `1px solid ${COLORS.divider}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: COLORS.textMuted, marginBottom: 14 }}>Читайте также</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {(article.related || []).map((r, i) => (
              <Link key={i} to={localizedPath(r.path, language)} className="blog-chip" style={{ color: COLORS.primaryText, textDecoration: 'none', fontSize: 14, fontWeight: 600, background: COLORS.bgSecond, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 999, padding: '8px 16px', transition: 'all .2s ease' }}>{r.label}</Link>
            ))}
            <Link to={localizedPath('/blog', language)} className="blog-chip" style={{ color: COLORS.primaryText, textDecoration: 'none', fontSize: 14, fontWeight: 600, background: COLORS.bgSecond, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 999, padding: '8px 16px', transition: 'all .2s ease' }}>Все статьи</Link>
          </div>
        </nav>
      </main>

      <style>{`
        ${FOCUS_CSS}
        .blog-faq summary::-webkit-details-marker { display: none; }
        .blog-faq[open] { border-color: ${COLORS.primary}; background: rgba(42,171,171,.04); }
        .blog-cta-btn:hover { transform: translateY(-2px); }
        .blog-cta-btn { transition: transform .2s ease; }
        .blog-chip:hover { background: #FFFFFF; border-color: ${COLORS.primary}; }
        .blog-crumb:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}

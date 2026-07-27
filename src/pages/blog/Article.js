import React from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SEO from '../../components/SEO';
import useIsMobile from '../../hooks/useIsMobile';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { SITE } from '../../config/site';
import { COLORS, GRADIENT, SHADOW } from '../../config/theme';
import { getArticle } from '../../config/articles';

// Renders one blog article by :slug. RU-only (noindex on /en, /tr via
// translatedLanguages). Article + FAQPage schema. Content from config/articles.js.

function TariffsTable({ isMobile }) {
  return (
    <div style={{ overflowX: 'auto', margin: '8px 0 4px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? 14 : 15, minWidth: 420 }}>
        <thead>
          <tr style={{ textAlign: 'left', color: COLORS.textSecond }}>
            <th style={{ padding: '10px 12px', borderBottom: '1px solid #E8E8E8' }}>Тариф</th>
            <th style={{ padding: '10px 12px', borderBottom: '1px solid #E8E8E8' }}>Способ</th>
            <th style={{ padding: '10px 12px', borderBottom: '1px solid #E8E8E8' }}>Цена</th>
            <th style={{ padding: '10px 12px', borderBottom: '1px solid #E8E8E8' }}>Срок</th>
          </tr>
        </thead>
        <tbody>
          {SITE.tariffs.map((tr) => (
            <tr key={tr.id}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0F0F0', fontWeight: 700 }}>{tr.name}</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0F0F0' }}>{tr.mode === 'road' ? 'Авто' : 'Авиа'}</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0F0F0', color: COLORS.primaryText, fontWeight: 700 }}>${tr.pricePerKg}/кг</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0F0F0' }}>{tr.transitDaysMin}–{tr.transitDaysMax} дней</td>
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

      <main style={{ maxWidth: 820, margin: '0 auto', padding: isMobile ? '24px 16px 48px' : '48px 32px 96px' }}>
        <nav aria-label="breadcrumb" style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>
          <Link to={localizedPath('/blog', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>Статьи</Link>
          <span> / {article.h1}</span>
        </nav>

        <header style={{ marginBottom: isMobile ? 20 : 32 }}>
          <h1 style={{ fontSize: isMobile ? 28 : 42, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: COLORS.text }}>{article.h1}</h1>
          <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.65, color: '#475569' }}>{article.lead}</p>
        </header>

        <article>
          {article.sections.map((section, si) => (
            <section key={si} style={{ marginBottom: isMobile ? 24 : 36 }}>
              <h2 style={{ fontSize: isMobile ? 21 : 27, fontWeight: 700, marginBottom: 14, color: COLORS.text }}>{section.h2}</h2>
              {section.blocks.map((block, bi) => {
                if (block.type === 'p') {
                  return <p key={bi} style={{ fontSize: 16, lineHeight: 1.75, color: '#334155', marginBottom: 14 }}>{block.text}</p>;
                }
                if (block.type === 'ul') {
                  return (
                    <ul key={bi} style={{ paddingLeft: 22, marginBottom: 14, color: '#334155', lineHeight: 1.8, fontSize: 16 }}>
                      {block.items.map((it, ii) => <li key={ii} style={{ marginBottom: 6 }}>{it}</li>)}
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
          <section aria-labelledby="faq-heading" style={{ marginTop: isMobile ? 8 : 24, marginBottom: isMobile ? 24 : 40 }}>
            <h2 id="faq-heading" style={{ fontSize: isMobile ? 21 : 27, fontWeight: 700, marginBottom: 16 }}>Вопросы и ответы</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {article.faq.map((f, i) => (
                <details key={i} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 12, padding: '16px 20px' }}>
                  <summary style={{ fontSize: 16, fontWeight: 600, cursor: 'pointer', listStyle: 'none' }}>{f.q}</summary>
                  <p style={{ color: '#475569', lineHeight: 1.6, marginTop: 12, marginBottom: 0 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 16, padding: isMobile ? 24 : 32, textAlign: 'center', marginTop: 8 }}>
          <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, marginBottom: 8 }}>Готовы отправить груз из Турции?</h2>
          <p style={{ color: COLORS.textSecond, marginBottom: 20, fontSize: 15 }}>Рассчитайте стоимость за минуту или напишите менеджеру.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => navigate(localizedPath('/calculator', language))}
              style={{ background: GRADIENT, color: '#FFFFFF', border: 'none', padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', textShadow: '0 1px 2px rgba(10,37,53,.35)', minHeight: 48 }}
            >
              Калькулятор стоимости
            </button>
            <Link
              to={localizedPath('/contacts', language)}
              style={{ background: '#FFFFFF', color: COLORS.primaryText, border: '1.5px solid #2AABAB', padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: 'none', minHeight: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Связаться с менеджером
            </Link>
          </div>
        </section>

        {/* Related */}
        <nav aria-label="Читайте также" style={{ marginTop: isMobile ? 32 : 48, padding: '24px 0', borderTop: '1px solid #EEEEEE', display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14 }}>
          {(article.related || []).map((r, i) => (
            <Link key={i} to={localizedPath(r.path, language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>{r.label}</Link>
          ))}
          <Link to={localizedPath('/blog', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>Все статьи</Link>
        </nav>
      </main>
    </div>
  );
}

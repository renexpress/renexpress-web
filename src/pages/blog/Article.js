import React from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { SITE } from '../../config/site';
import { getArticle } from '../../config/articles';
import '../../styles/home-redesign.css';

// Renders one blog article by :slug. RU-only (noindex on /en, /tr via
// translatedLanguages). Article + FAQPage schema. Content from config/articles.js.

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
function formatDate(iso) {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function TariffsTable() {
  return (
    <div className="hx-tf-table" style={{ margin: '4px 0 8px' }}>
      <div className="hx-tf-cols hx-tf-header">
        <span>Тариф</span><span>Режим</span><span>Срок</span><span>Категория груза</span><span>Цена за кг</span>
      </div>
      {SITE.tariffs.map((tf) => (
        <div className="hx-tf-cols hx-tf-row" key={tf.id}>
          <span className="hx-tf-name">{tf.name}<span className="sub">{tf.mode === 'air' ? 'Авиа' : 'Авто'} · {tf.deliveryDays} · {tf.category}</span></span>
          <span className="hx-tf-mode">{tf.mode === 'air' ? 'Авиа' : 'Авто'}</span>
          <span className="hx-tf-days">{tf.deliveryDays}</span>
          <span className="hx-tf-cat">{tf.category}</span>
          <span className="hx-tf-price">${tf.pricePerKg}<small>/кг</small></span>
        </div>
      ))}
    </div>
  );
}

const PROSE = { maxWidth: '72ch' };

export default function Article({ isAuthenticated, setIsAuthenticated }) {
  const { slug } = useParams();
  const { language, t } = useTranslation();
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
    <div className="hx">
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

      {/* hero */}
      <section className="hx-sec hx-hero-sec">
        <div className="hx-eyebrow"><i />Блог · {article.tag}</div>
        <h1 className="hx-h1" style={{ marginBottom: 18 }}>{article.h1}</h1>
        <p className="hx-hero-lede" style={{ maxWidth: '70ch', marginBottom: 14 }}>{article.lead}</p>
        <p style={{ fontSize: 13, color: 'var(--faint)' }}>{article.readMin} мин чтения · {formatDate(article.datePublished)}</p>
      </section>

      {/* body */}
      <section className="hx-sec">
        {article.sections.map((section, si) => (
          <div key={si} style={{ marginTop: si === 0 ? 0 : 44 }}>
            <h2 className="hx-h2" style={{ ...PROSE, fontSize: 'clamp(21px, 2.4vw, 28px)', marginBottom: 16 }}>{section.h2}</h2>
            {section.blocks.map((block, bi) => {
              if (block.type === 'p') {
                return <p key={bi} className="hx-lede" style={{ ...PROSE, fontSize: 16, lineHeight: 1.75, marginBottom: 16 }}>{block.text}</p>;
              }
              if (block.type === 'ul') {
                return (
                  <ul key={bi} style={{ ...PROSE, listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                    {block.items.map((it, ii) => (
                      <li key={ii} style={{ position: 'relative', paddingLeft: 26, marginBottom: 12, fontSize: 16, lineHeight: 1.75, color: 'var(--muted)' }}>
                        <span style={{ position: 'absolute', left: 0, top: 1, color: 'var(--teal)', fontWeight: 800 }}>✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'tariffs') {
                return <TariffsTable key={bi} />;
              }
              return null;
            })}
          </div>
        ))}
      </section>

      {/* faq */}
      {article.faq && article.faq.length > 0 && (
        <section className="hx-sec hx-sec--gray">
          <div className="hx-faq">
            <div>
              <div className="hx-eyebrow"><i />FAQ</div>
              <h2 className="hx-h2">Вопросы и ответы</h2>
            </div>
            <div className="hx-faq-list">
              {article.faq.map((f, i) => (
                <details key={i}>
                  <summary>{f.q}<i aria-hidden="true">+</i></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* cta + related */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Готовы отправить груз из Турции?</h2>
        <p className="hx-lede" style={{ maxWidth: '52ch', marginBottom: 24 }}>Рассчитайте стоимость за минуту или напишите менеджеру.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <button type="button" className="hx-cta" onClick={() => navigate(localizedPath('/calculator', language))}>
            Калькулятор стоимости
          </button>
          <Link to={localizedPath('/contacts', language)} className="hx-ghost">
            Связаться с менеджером
          </Link>
        </div>
        <nav aria-label="Читайте также" className="hx-hub" style={{ marginTop: 40, marginBottom: 0 }}>
          <Link to={localizedPath('/blog', language)}><span aria-hidden="true">←</span> Все статьи</Link>
          {(article.related || []).map((r, i) => (
            <Link key={i} to={localizedPath(r.path, language)}>{r.label} <span aria-hidden="true">→</span></Link>
          ))}
        </nav>
      </section>

      <Footer />
    </div>
  );
}

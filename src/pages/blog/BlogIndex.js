import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { ARTICLES } from '../../config/articles';
import '../../styles/home-redesign.css';

// Blog index — lists all articles. RU-only (noindex on /en, /tr).

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
function formatDate(iso) {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default function BlogIndex({ isAuthenticated, setIsAuthenticated }) {
  const { language, t } = useTranslation();

  return (
    <div className="hx">
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

      {/* hero */}
      <section className="hx-sec hx-hero-sec">
        <div className="hx-eyebrow"><i />Блог</div>
        <h1 className="hx-h1" style={{ marginBottom: 18 }}>Статьи о доставке из Турции</h1>
        <p className="hx-hero-lede" style={{ maxWidth: '70ch' }}>
          Разбираем всё, что важно знать про карго из Турции в Россию: как заказать, сколько стоит,
          какой тариф выбрать и как проходит таможня. Просто и по делу.
        </p>
      </section>

      {/* article cards */}
      <section className="hx-sec">
        <div className="hx-features" style={{ margin: 0 }}>
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              to={localizedPath(`/blog/${a.slug}`, language)}
              className="hx-feature"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              <div className="hx-eyebrow" style={{ marginBottom: 12 }}>
                <i />{a.tag} · {a.readMin} мин · {formatDate(a.datePublished)}
              </div>
              <h3>{a.h1}</h3>
              <p>{a.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* related */}
      <section className="hx-sec">
        <div className="hx-eyebrow"><i />Ещё по теме</div>
        <h2 className="hx-h2" style={{ marginBottom: 24 }}>Полезные разделы</h2>
        <nav aria-label="Related pages" className="hx-hub" style={{ marginBottom: 0 }}>
          <Link to={localizedPath('/calculator', language)}>{t('common.calculator')} <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/delivery-turkey-russia', language)}>Доставка Турция–Россия <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/delivery-istanbul-moscow', language)}>Стамбул → Москва <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/customs-clearance', language)}>Таможенное оформление <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/services', language)}>{t('common.services')} <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/contacts', language)}>{t('common.contacts')} <span aria-hidden="true">→</span></Link>
        </nav>
      </section>

      <Footer />
    </div>
  );
}

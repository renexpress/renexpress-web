import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import '../styles/responsive.css';
import useIsMobile from '../hooks/useIsMobile';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CalcWidget from '../components/CalcWidget';
import LeadForm from '../components/LeadForm';
import { useTranslation } from '../i18n/LanguageContext';
import { SITE } from '../config/site';
import { COLORS, GRADIENT, SHADOW } from '../config/theme';

const PRIMARY = COLORS.primary;         // #2AABAB — fills, icon strokes, big numbers
const PRIMARY_TEXT = COLORS.primaryText; // #157070 — teal text / links / prices on white

// Single source for the home FAQ — used BOTH in the visible <details> accordion
// and in the FAQPage JSON-LD, so Google sees identical Q/A in HTML and schema.
const HOME_FAQ = [
  { q: 'Сколько стоит доставка из Турции в Россию?', a: 'AVTO EXPRESS — $4/кг (14-18 дней), AVIA U3 — $8.5/кг (4-5 дней), AVIA EX MARKA — $10/кг (3-4 дня). Минимальный вес отправки — 10 кг.' },
  { q: 'Какие сроки доставки из Стамбула в Москву?', a: 'Авто доставка занимает 14-18 дней. Авиа U3 — 4-5 дней, авиа EX MARKA — 3-4 дня.' },
  { q: 'Какие товары можно отправить через RENEXPRESS?', a: 'Домашний текстиль, турецкий текстиль, брендовый текстиль, б/у текстиль, обувь турецкого производства, брендовую и б/у обувь.' },
  { q: 'Где находится склад RENEXPRESS в Москве?', a: 'Московский склад: ул. Южнопортовая 7а, стр 2, склад 8, ворота 1. Режим работы: Пн-Пт 09:00-18:00.' },
  { q: 'Есть ли мобильное приложение для отслеживания?', a: 'Да, приложение RENEXPRESS доступно в App Store (iOS) и Google Play (Android). В приложении можно отслеживать доставки и общаться с поддержкой.' },
];

function Home({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const isMobile = useIsMobile();
  const heroRef = useRef(null);

  // Sticky CTA threshold via IntersectionObserver (no per-scroll setState → no INP hit,
  // no scroll-fade of the hero copy). Bar shows once the hero has scrolled out of view.
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { rootMargin: '0px 0px -100% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollToCalc = () => document.getElementById('calc')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToLead = () => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth' });
  const waManager = `https://wa.me/${SITE.whatsapp.istanbulManager.wa}`;

  const CACHE_KEY = 'home_cache_v2';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    // Always fetch fresh data
    localStorage.removeItem(CACHE_KEY);
    fetchData(false);
  }, []);

  const fetchData = async (background = false) => {
    if (!background) setLoading(true);
    try {
      const timestamp = Date.now();
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_URL}/products/?_t=${timestamp}`),
        axios.get(`${API_URL}/categories/?_t=${timestamp}`)
      ]);

      const productsData = productsRes.data.results || productsRes.data || [];
      const categoriesData = categoriesRes.data.results || categoriesRes.data || [];

      setProducts(productsData);
      setCategories(categoriesData);

      // Save to cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        products: productsData,
        categories: categoriesData,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const client = JSON.parse(localStorage.getItem('client') || '{}');

  // Split products for different sections
  const editorPicks = products.slice(0, 3);
  const trendingProducts = products.slice(3, 9);

  const categoryIcons = {
    'default': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    )
  };

  // Home-page FAQ schema — built from the same HOME_FAQ array rendered visibly below,
  // so schema and on-page HTML stay identical (one source, changed in one place).
  const homeFaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div style={styles.page}>
      <SEO
        titleKey="seo.home.title"
        descriptionKey="seo.home.description"
        breadcrumbs={[{ name: t('common.home'), path: '/' }]}
        jsonLd={[homeFaqJsonLd]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* Hero Section — light, flat (no 3D tilt, no scroll-fade), one dominant CTA + store badges */}
      <section ref={heroRef} className="hero-section" style={{...styles.heroWrapper, ...(isMobile ? {padding: '32px 16px 24px'} : {})}}>
        <div style={{...styles.heroInner, ...(isMobile ? { gridTemplateColumns: '1fr', gap: 28 } : {})}}>
          {/* Left: copy */}
          <div style={styles.heroContent}>
            <span style={styles.heroBadge}>Карго Турция → Россия · с {SITE.foundingYear}</span>
            <h1 style={{ ...styles.heroTitle, fontSize: isMobile ? 28 : 46 }}>
              Карго из Турции в Россию — доставка из Стамбула в Москву от $4/кг
            </h1>
            <p style={styles.heroLede}>
              Только направление Турция → Россия. Минимальный вес отправки — 10 кг.
              Свои склады в Стамбуле и Москве.
            </p>
            <ul style={{ ...styles.heroBullets, ...(isMobile ? { gap: 8, marginBottom: 20 } : {}) }}>
              {[
                'Цена от $4/кг — 5 тарифов, авто и авиа',
                'Сроки от 3 дней — авиа-экспресс из Стамбула',
                'Честный знак · WB и OZON — маркировка и поставка',
              ].map((b, i) => (
                <li key={i} style={styles.heroBullet}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="3" style={{ flexShrink: 0, marginTop: 2 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="hero-button" onClick={scrollToCalc} style={{...styles.heroButton, ...(isMobile ? {width: '100%', justifyContent: 'center'} : {})}}>
                Рассчитать и оставить заявку
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 8 }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <a href={waManager} target="_blank" rel="noopener noreferrer" style={{...styles.heroSecondaryBtn, ...(isMobile ? {width: '100%', justifyContent: 'center'} : {})}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" style={{ marginRight: 8 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
                Написать в WhatsApp
              </a>
            </div>
            {/* Store badges next to the hero CTA (owner requirement) — App Store + Google Play */}
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap', ...(isMobile ? { justifyContent: 'center' } : {}) }}>
              <a href={SITE.social.appStore} target="_blank" rel="noopener noreferrer" style={styles.heroStoreBtn}>
                <svg width="16" height="20" viewBox="0 0 384 512" fill={COLORS.text} style={{ opacity: 0.9 }}><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <span style={styles.heroStoreText}>App Store</span>
              </a>
              <a href={SITE.social.googlePlay} target="_blank" rel="noopener noreferrer" style={styles.heroStoreBtn}>
                <svg width="16" height="18" viewBox="0 0 512 512" fill={COLORS.text} style={{ opacity: 0.9 }}><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z"/></svg>
                <span style={styles.heroStoreText}>Google Play</span>
              </a>
            </div>
          </div>

          {/* Right: light brand-gradient visual card (placeholder for a real warehouse/truck photo) */}
          {/* TODO[ЗАПОЛНИТЬ]: заменить градиент-плейсхолдер на реальный кадр склада/фуры RENEXPRESS (hero.webp ≤150КБ, 1600×900). */}
          {!isMobile && (
            <div style={styles.heroVisual} aria-hidden="true">
              <div style={styles.heroVisualInner}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <span style={styles.heroVisualText}>Стамбул → Москва</span>
                <span style={styles.heroVisualSub}>Авто и авиа · трекинг в приложении</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust strip — real numbers from SITE */}
      <section style={{ ...styles.trustSection, ...(isMobile ? { padding: '28px 16px' } : {}) }}>
        <div style={styles.trustInner}>
          {[
            { big: `с ${SITE.foundingYear}`, small: 'на маршруте Турция–Россия' },
            { big: '3000+', small: 'клиентов' }, /* TODO[ЗАПОЛНИТЬ]: подтвердить/уточнить цифру клиентов */
            { big: `${SITE.tariffs.length} тарифов`, small: 'авто и авиа' },
            { big: 'Свои офисы', small: 'в Стамбуле и Москве' },
            { big: 'Таможня — на нас', small: 'без доп. документов' },
          ].map((c, i) => (
            <div key={i} style={styles.trustChip}>
              <span style={styles.trustBig}>{c.big}</span>
              <span style={styles.trustSmall}>{c.small}</span>
            </div>
          ))}
        </div>
        <p style={styles.trustMarketplaces}>Доставляем на склады <strong style={{ color: COLORS.text }}>Wildberries</strong> и <strong style={{ color: COLORS.text }}>OZON</strong></p>
      </section>

      {/* TARIFFS — moved up, prominent. 5 real types from SITE.tariffs (name/price/term/category) */}
      <section style={{ ...styles.tariffsSection, ...(isMobile ? { padding: '48px 16px' } : {}) }}>
        <h2 style={{ ...styles.tariffsTitle, fontSize: isMobile ? 24 : 34 }}>Тарифы на карго доставку</h2>
        <p style={styles.tariffsSubtitle}>5 тарифов авто и авиа. Цена фиксирована за килограмм, минимум 10 кг</p>
        <div style={{ ...styles.tariffsGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(210px, 1fr))' }}>
          {SITE.tariffs.map((tf, i) => (
            <div key={tf.id} style={styles.tariffCard} className="tariff-card">
              <div style={styles.tariffCardTop}>
                <span style={styles.tariffModeIcon}>
                  {tf.mode === 'air' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  )}
                </span>
                <span style={styles.tariffMode}>{tf.mode === 'air' ? 'Авиа' : 'Авто'}</span>
              </div>
              <h3 style={styles.tariffName}>{tf.name}</h3>
              <div style={styles.tariffPriceRow}>
                <span style={styles.tariffPrice}>${tf.pricePerKg}</span>
                <span style={styles.tariffPriceUnit}>/кг</span>
              </div>
              <span style={styles.tariffDays}>{tf.deliveryDays}</span>
              <p style={styles.tariffCategory}>{tf.category}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <button onClick={scrollToCalc} style={styles.tariffsCta}>Рассчитать стоимость</button>
        </div>
      </section>

      {/* How it works — 4 steps */}
      <section style={{ ...styles.stepsSection, ...(isMobile ? { padding: '48px 16px' } : {}) }}>
        <h2 style={{ ...styles.stepsTitle, fontSize: isMobile ? 22 : 32 }}>Как работает карго доставка — 4 шага</h2>
        <p style={styles.stepsIntro}>
          Карго — это когда мы принимаем ваш товар на складе в Стамбуле, объединяем в одну отправку,
          везём авто или авиа и растаможиваем. Вы платите за килограмм, без своих документов на таможне,
          и отслеживаете груз в приложении RENEXPRESS.
        </p>
        <div style={{ ...styles.stepsGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)' }}>
          {[
            { n: 1, t: 'Приём в Стамбуле', d: 'Привозите или отправляете товар на наш стамбульский склад. Байер может закупить за вас.' },
            { n: 2, t: 'Консолидация и вес', d: 'Собираем груз от разных поставщиков, взвешиваем и фиксируем стоимость по тарифу.' },
            { n: 3, t: 'Отправка авто / авиа', d: 'Отправляем выбранным тарифом. Таможенное оформление берём на себя — без доп. документов от вас.' },
            { n: 4, t: 'Выдача в Москве', d: 'Забираете груз на складе Южнопортовая 7а или заказываете доставку. Отслеживание в приложении.' },
          ].map((s) => (
            <div key={s.n} style={styles.stepCard}>
              <span style={styles.stepNum}>{s.n}</span>
              <h3 style={styles.stepCardTitle}>{s.t}</h3>
              <p style={styles.stepCardDesc}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RENCARGO vs RENEXPRESS + 3 delivery options in Moscow */}
      <section style={{ ...styles.explainSection, ...(isMobile ? { padding: '48px 16px' } : {}) }}>
        <div style={styles.explainInner}>
          <h2 style={{ ...styles.explainTitle, fontSize: isMobile ? 22 : 32 }}>Два формата доставки</h2>
          <div style={{ ...styles.explainTwoCol, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
            <div style={styles.explainCard}>
              <span style={styles.explainTag}>RENCARGO</span>
              <h3 style={styles.explainCardTitle}>Обычное карго</h3>
              <p style={styles.explainCardText}>
                Стандартная доставка товара из Стамбула в Москву авто или авиа.
                Подходит, когда маркировка и таможенные документы для маркетплейсов не нужны.
              </p>
            </div>
            <div style={styles.explainCard}>
              <span style={styles.explainTag}>RENEXPRESS</span>
              <h3 style={styles.explainCardTitle}>С ТН ВЭД и «Честным знаком»</h3>
              <p style={styles.explainCardText}>
                Доставка с оформлением по коду ТН ВЭД и маркировкой «Честный знак» для легальной
                продажи в России и поставки на склады Wildberries и OZON.
              </p>
            </div>
          </div>

          <h2 style={{ ...styles.explainTitle, fontSize: isMobile ? 22 : 32, marginTop: isMobile ? 40 : 56 }}>3 варианта получения в Москве</h2>
          <div style={{ ...styles.explainThreeCol, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)' }}>
            {[
              { t: 'Забрать самому', price: 'Бесплатно', d: 'Заберите груз на нашем складе: ул. Южнопортовая 7а, стр 2. Пн–Пт, 09:00–18:00.' },
              { t: 'Доставка по России', price: 'Бесплатно до ТК', d: 'Бесплатно довозим до транспортной компании в Москве — дальше ТК доставит в ваш город.' },
              { t: 'Доставка по Москве', price: 'Платно', d: 'Курьерская доставка по Москве до двери. Стоимость рассчитывается отдельно.' },
            ].map((o, i) => (
              <div key={i} style={styles.optionCard}>
                <h3 style={styles.optionTitle}>{o.t}</h3>
                <span style={styles.optionPrice}>{o.price}</span>
                <p style={styles.optionText}>{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator + jump-to-lead (anchor target of the hero CTA) */}
      <section id="calc" style={{ ...styles.calcSection, ...(isMobile ? { padding: '48px 16px' } : {}) }}>
        <div style={styles.calcContainer}>
          <h2 style={{ ...styles.sectionHeading, fontSize: isMobile ? 22 : 32 }}>Рассчитайте стоимость за 10 секунд</h2>
          <p style={styles.sectionSubheading}>Отправьте заявку — менеджер подтвердит расчёт и сроки</p>
          <CalcWidget isMobile={isMobile} />
        </div>
      </section>

      {/* Lead form — Phase 1 WhatsApp deep-link */}
      <section id="lead" style={{ ...styles.leadSection, ...(isMobile ? { padding: '48px 16px' } : {}) }}>
        <div style={styles.leadContainer}>
          <h2 style={{ ...styles.sectionHeading, fontSize: isMobile ? 22 : 32 }}>Оставьте заявку — ответим в течение рабочего дня</h2>
          <p style={styles.sectionSubheading}>Заполните 3 поля — продолжим в WhatsApp</p>
          <div style={styles.leadCard}>
            <LeadForm isMobile={isMobile} source="home" />
          </div>
        </div>
      </section>

      {/* App Store + Google Play Banner — brand-gradient card (blobs removed) */}
      <section className="app-banner-section" style={styles.appBannerSection}>
        <div style={styles.liquidPill}>
          {/* Gradient surface */}
          <div style={{...styles.liquidSurface, ...(isMobile ? {flexDirection: 'column', textAlign: 'center'} : {})}}>
            {/* App icon */}
            <div className="liquid-glass-icon" style={styles.liquidIcon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="10" fill="rgba(255,255,255,0.15)" />
                <rect x="1" y="1" width="30" height="30" rx="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"/>
                <text x="16" y="22" fontSize="16" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
              </svg>
            </div>
            {/* Text */}
            <div style={styles.liquidTextBlock}>
              <span style={styles.liquidTitle}>Скачайте RENEXPRESS</span>
              <span style={styles.liquidDesc}>Отслеживание доставок, заказы, поддержка</span>
            </div>
            {/* Store badges — App Store (iOS) + Google Play (Android) */}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, ...(isMobile ? { width: '100%', justifyContent: 'center', flexWrap: 'wrap' } : {}) }}>
              <a href={SITE.social.appStore} target="_blank" rel="noopener noreferrer" className="liquid-glass-badge" style={styles.liquidBadge}>
                <svg width="16" height="20" viewBox="0 0 384 512" fill="#fff" style={{opacity:0.9}}>
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <span style={styles.liquidBadgeText}>App Store</span>
              </a>
              <a href={SITE.social.googlePlay} target="_blank" rel="noopener noreferrer" className="liquid-glass-badge" style={styles.liquidBadge}>
                <svg width="16" height="18" viewBox="0 0 512 512" fill="#fff" style={{opacity:0.9}}>
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z"/>
                </svg>
                <span style={styles.liquidBadgeText}>Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content — About RENEXPRESS */}
      <section style={styles.seoHeroSection}>
        <div className="seo-content" style={styles.seoContainer}>

          {/* Headline */}
          <h2 style={{...styles.seoHeadline, fontSize: isMobile ? 22 : 36}}>Доставка из Турции в Россию —<br/>быстро, надёжно, прозрачно</h2>
          <p style={styles.seoSubhead}>
            RENEXPRESS — карго компания с 2017 года. Более 3000 клиентов из России и Турции
            доверяют нам доставку текстиля, обуви и товаров из Стамбула в Москву.
          </p>

          {/* Feature Grid */}
          <div className="seo-features" style={{...styles.seoFeatures, gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'}}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
                title: 'Авто и авиа доставка',
                text: 'Пять тарифов: авто от $4/кг за 14-18 дней, авиа от $8/кг за 3-4 дня. Ежедневные отправки из Стамбула.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
                title: 'Честный знак и маркировка',
                text: 'Маркируем товары для легальной продажи в России. Доставляем напрямую на склады Wildberries и OZON.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                title: 'Склады в Москве и Стамбуле',
                text: 'Московский склад: ул. Южнопортовая 7а. Стамбульский офис принимает товары от поставщиков ежедневно.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
                title: 'Приложение RENEXPRESS',
                text: 'Отслеживайте грузы в реальном времени, создавайте заказы и общайтесь с поддержкой — всё в одном приложении.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
                title: 'Прозрачные сроки и цены',
                text: 'Фиксированная стоимость за килограмм без скрытых платежей. Минимальный вес отправки — 10 кг.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
                title: 'Байер в Стамбуле',
                text: 'Наш байер найдёт и закупит товары у турецких поставщиков. Фото и видео отчёты при приёмке на складе.' },
            ].map((f, i) => (
              <div key={i} className="seo-feature-card" style={styles.seoFeatureCard}>
                <div style={styles.seoFeatureIcon}>{f.icon}</div>
                <h3 style={styles.seoFeatureTitle}>{f.title}</h3>
                <p style={styles.seoFeatureText}>{f.text}</p>
              </div>
            ))}
          </div>

          {/* Tariff detail lives in the prominent TARIFFS section above; here just a text link */}
          <p style={styles.seoTariffNote}>
            <a href="/calculator" style={{color: PRIMARY_TEXT, fontWeight: 600, textDecoration: 'none'}}>Рассчитать стоимость</a> доставки онлайн или <a href="/services" style={{color: PRIMARY_TEXT, fontWeight: 600, textDecoration: 'none'}}>подробнее об услугах</a>
          </p>

          {/* Long SEO text */}
          <div style={styles.seoTextBlock}>
            <h3 style={styles.seoTextTitle}>Карго из Стамбула в Москву — полный цикл доставки</h3>
            <p style={styles.seoText}>
              Компания RENEXPRESS осуществляет грузоперевозки из Турции в Россию с 2017 года.
              Мы специализируемся на карго доставке текстиля, обуви и других товаров турецкого производства
              из Стамбула в Москву. Наши клиенты — оптовые покупатели, индивидуальные предприниматели
              и продавцы маркетплейсов Wildberries и OZON, которые закупают товары в Турции для продажи
              на российском рынке.
            </p>
            <p style={styles.seoText}>
              Мы предлагаем пять тарифов доставки, адаптированных под разные категории товаров.
              Автомобильная доставка подходит для крупных партий текстиля и обуви — стоимость от $4 до $5
              за килограмм, сроки 14-18 дней. Авиадоставка — для срочных отправок: от $8 до $10 за килограмм,
              сроки от 3 до 8 дней. Минимальный вес отправки составляет 10 килограмм.
            </p>
            <p style={styles.seoText}>
              Помимо транспортировки грузов мы оказываем полный спектр сопутствующих услуг:
              маркировка товаров системой «Честный знак» для легальной продажи в России,
              доставка на склады Wildberries и OZON, закупка товаров у турецких поставщиков через нашего
              байера в Стамбуле, консолидация грузов от разных поставщиков, профессиональная упаковка
              и фото-видео отчёты при приёмке товара. Каждый клиент получает персональный код REN
              для удобного отслеживания заказов через мобильное приложение RENEXPRESS, доступное в App Store.
            </p>
            <p style={styles.seoText}>
              Наш московский склад расположен по адресу ул. Южнопортовая 7а, стр 2 и работает
              с понедельника по пятницу с 09:00 до 18:00. Офис в Стамбуле координирует приём товаров
              и ежедневные отправки. Связаться с нами можно по телефону +905070107070 (Турция)
              или +7 928 970 7010 (Россия), а также через WhatsApp менеджеров в Стамбуле и Москве.
            </p>
          </div>

          {/* CTA Buttons */}
          <div style={styles.seoCta}>
            <button onClick={() => navigate('/contacts')} style={{...styles.seoCtaPrimary, width: isMobile ? '100%' : 'auto'}}>Связаться с нами</button>
            <button onClick={() => navigate('/about')} style={{...styles.seoCtaSecondary, width: isMobile ? '100%' : 'auto'}}>Подробнее о компании</button>
            <button onClick={() => navigate('/faq')} style={{...styles.seoCtaSecondary, width: isMobile ? '100%' : 'auto'}}>Частые вопросы</button>
          </div>
        </div>
      </section>

      {/* FAQ — visible accordion, identical Q/A to the FAQPage JSON-LD above */}
      <section style={{ ...styles.faqSection, ...(isMobile ? { padding: '48px 16px' } : {}) }}>
        <div style={styles.faqContainer}>
          <h2 style={{ ...styles.sectionHeading, fontSize: isMobile ? 22 : 32, marginBottom: 28 }}>Частые вопросы</h2>
          {HOME_FAQ.map((f, i) => (
            <details key={i} style={styles.faqItem}>
              <summary style={styles.faqSummary}>
                {f.q}
                <span style={styles.faqChevron} aria-hidden="true">+</span>
              </summary>
              <p style={styles.faqAnswer}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Creative Footer */}
      <footer className="footer" style={{...styles.footer, paddingBottom: isMobile ? 148 : 24}}>
        {/* Gradient CTA Card */}
        <div style={styles.footerCtaCard} className="footer-cta-card">
          <div style={styles.footerCtaCardInner}>
            <div style={styles.footerCtaLeft}>
              <h2 style={styles.footerCtaTitle}>Готовы начать доставку из Турции?</h2>
              <p style={styles.footerCtaDesc}>
                Присоединяйтесь к 3000+ клиентам, которые доверяют нам грузоперевозки.
                Авиа от 3 дней, авто от 14 дней.
              </p>
              <div style={styles.footerCtaButtons}>
                <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="footer-cta-btn" style={styles.footerCtaWhatsapp}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Написать в WhatsApp
                </a>
                <a href={SITE.social.appStore} target="_blank" rel="noopener noreferrer" className="footer-cta-btn" style={styles.footerCtaApp}>
                  <svg width="16" height="18" viewBox="0 0 384 512" fill="#fff"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  App Store
                </a>
                <a href={SITE.social.googlePlay} target="_blank" rel="noopener noreferrer" className="footer-cta-btn" style={styles.footerCtaApp}>
                  <svg width="16" height="18" viewBox="0 0 512 512" fill="#fff"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z"/></svg>
                  Google Play
                </a>
              </div>
            </div>
            <div style={styles.footerCtaRight} className="footer-cta-right">
              <div style={styles.footerCtaStats}>
                <div style={styles.footerCtaStat}>
                  <span style={styles.footerCtaStatNum}>3000+</span>
                  <span style={styles.footerCtaStatLabel}>клиентов</span>
                </div>
                <div style={styles.footerCtaStat}>
                  <span style={styles.footerCtaStatNum}>с {SITE.foundingYear}</span>
                  <span style={styles.footerCtaStatLabel}>на рынке</span>
                </div>
                <div style={styles.footerCtaStat}>
                  <span style={styles.footerCtaStatNum}>{SITE.tariffs.length}</span>
                  <span style={styles.footerCtaStatLabel}>тарифов</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer columns grid */}
        <div className="footer-content" style={{...styles.footerGrid, gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : '1.5fr 1fr 1fr 1fr 1.2fr'}}>
          {/* Brand column */}
          <div style={styles.footerBrand}>
            <div style={styles.footerLogo}>
              <div style={styles.footerLogoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={styles.footerLogoText}>RENEXPRESS</span>
            </div>
            <p style={styles.footerDesc}>
              Надёжная доставка грузов из Турции в Россию с 2017 года. Текстиль, обувь, брендовые товары.
              Авто и авиа перевозки с отслеживанием в приложении.
            </p>
            <div style={styles.footerSocials}>
              <a href="https://instagram.com/renat_karaliev" target="_blank" rel="noopener noreferrer" className="footer-social" style={styles.footerSocialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="footer-social" style={styles.footerSocialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://www.rencargo.com" target="_blank" rel="noopener noreferrer" className="footer-social" style={styles.footerSocialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
              <a href="tel:+905070107070" className="footer-social" style={styles.footerSocialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div style={styles.footerCol}>
            <h5 style={styles.footerColTitle}>Услуги</h5>
            <a href="/services" className="footer-link" style={styles.footerLink}>Авто доставка</a>
            <a href="/services" className="footer-link" style={styles.footerLink}>Авиа доставка</a>
            <a href="/services" className="footer-link" style={styles.footerLink}>Маркировка «Честный знак»</a>
            <a href="/services" className="footer-link" style={styles.footerLink}>Доставка на WB / OZON</a>
            <a href="/calculator" className="footer-link" style={styles.footerLink}>Калькулятор стоимости</a>
          </div>

          {/* Company column */}
          <div style={styles.footerCol}>
            <h5 style={styles.footerColTitle}>Компания</h5>
            <a href="/about" className="footer-link" style={styles.footerLink}>О компании</a>
            <a href="/about" className="footer-link" style={styles.footerLink}>Наша команда</a>
            <a href="/faq" className="footer-link" style={styles.footerLink}>Вопросы и ответы</a>
            <a href="/shop" className="footer-link" style={styles.footerLink}>Каталог товаров</a>
          </div>

          {/* Help column */}
          <div style={styles.footerCol}>
            <h5 style={styles.footerColTitle}>Помощь</h5>
            <a href="/faq" className="footer-link" style={styles.footerLink}>FAQ</a>
            <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="footer-link" style={styles.footerLink}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                Онлайн чат
                <span className="footer-live-dot" style={styles.liveDotWrap}>
                  <span className="footer-live-ping" style={styles.liveDotPing} />
                  <span style={styles.liveDot} />
                </span>
              </span>
            </a>
            <a href="/contacts" className="footer-link" style={styles.footerLink}>Поддержка</a>
            <a href={SITE.social.appStore} target="_blank" rel="noopener noreferrer" className="footer-link" style={styles.footerLink}>Приложение для iOS</a>
            <a href={SITE.social.googlePlay} target="_blank" rel="noopener noreferrer" className="footer-link" style={styles.footerLink}>Приложение для Android</a>
          </div>

          {/* Contact column with icons */}
          <div style={styles.footerCol}>
            <h5 style={styles.footerColTitle}>Контакты</h5>
            <a href="mailto:info@renexpress.online" className="footer-link" style={styles.footerContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>info@renexpress.online</span>
            </a>
            <a href="tel:+905070107070" className="footer-link" style={styles.footerContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+90 507 010 70 70</span>
            </a>
            <a href="tel:+79289707010" className="footer-link" style={styles.footerContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+7 928 970 70 10</span>
            </a>
            <div className="footer-link" style={styles.footerContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <address style={styles.footerAddress}>Москва, ул. Южнопортовая 7а, стр 2</address>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={styles.footerDivider} />
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© 2026 RENEXPRESS. Все права защищены.</p>
          <div style={styles.footerBrands}>
            <span style={styles.footerBrandTag}>RENCARGO</span>
            <span style={styles.footerBrandTag}>RENSHOPPING</span>
            <span style={styles.footerBrandTag}>RENFABRIK</span>
          </div>
          <div style={styles.footerLegal}>
            <a href="/about" className="footer-link" style={styles.footerLegalLink}>Политика конфиденциальности</a>
            <a href="/about" className="footer-link" style={styles.footerLegalLink}>Условия использования</a>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA bar — sits ABOVE the Navbar's bottom nav (z 100), appears after hero */}
      {isMobile && showStickyBar && (
        <div style={styles.stickyBar}>
          <button onClick={scrollToLead} style={styles.stickyPrimary}>Оставить заявку</button>
          <a href={waManager} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={styles.stickyWa}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
          </a>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    fontFamily: 'Inter, -apple-system, sans-serif',
  },

  // Hero — light, flat
  heroWrapper: {
    padding: '56px 24px 48px',
    backgroundColor: COLORS.bg,
    overflow: 'hidden',
  },
  heroInner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.15fr 0.85fr',
    gap: 48,
    alignItems: 'center',
  },
  heroContent: {
    width: '100%',
    boxSizing: 'border-box',
  },
  heroBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(42,171,171,0.08)',
    color: PRIMARY_TEXT,
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 16px',
    borderRadius: 20,
    marginBottom: 16,
    letterSpacing: 0.5,
    border: '1px solid rgba(42,171,171,0.25)',
  },
  heroTitle: {
    fontSize: 46,
    fontWeight: 700,
    color: COLORS.text,
    lineHeight: 1.15,
    marginBottom: 14,
  },
  heroLede: {
    fontSize: 16,
    color: COLORS.textSecond,
    lineHeight: 1.6,
    marginBottom: 20,
    maxWidth: 540,
  },
  heroButton: {
    display: 'inline-flex',
    alignItems: 'center',
    background: GRADIENT,
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    padding: '14px 28px',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: SHADOW.cta,
    textShadow: '0 1px 2px rgba(10,37,53,.35)',
  },
  heroSecondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 600,
    padding: '13px 24px',
    minHeight: 48,
    boxSizing: 'border-box',
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 10,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  heroStoreBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '9px 16px',
    backgroundColor: COLORS.bg,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 10,
    textDecoration: 'none',
    boxShadow: SHADOW.card,
  },
  heroStoreText: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.text,
    whiteSpace: 'nowrap',
  },
  heroBullets: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    maxWidth: 560,
  },
  heroBullet: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 1.4,
  },
  heroVisual: {
    borderRadius: 24,
    padding: 6,
    background: COLORS.bg,
    border: '1px solid ' + COLORS.cardBorder,
    boxShadow: SHADOW.cardHover,
  },
  heroVisualInner: {
    height: 360,
    borderRadius: 20,
    background: GRADIENT,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    color: '#fff',
    textAlign: 'center',
    padding: 24,
  },
  heroVisualText: {
    fontSize: 22,
    fontWeight: 700,
    color: '#fff',
    textShadow: '0 1px 2px rgba(10,37,53,.35)',
  },
  heroVisualSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },

  // Trust strip
  trustSection: {
    backgroundColor: COLORS.bgSecond,
    padding: '32px 24px',
    textAlign: 'center',
    borderTop: '1px solid ' + COLORS.divider,
    borderBottom: '1px solid ' + COLORS.divider,
  },
  trustInner: {
    maxWidth: 1080,
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  trustChip: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '14px 20px',
    minWidth: 130,
    background: COLORS.bg,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 16,
    boxShadow: SHADOW.card,
  },
  trustBig: {
    fontSize: 18,
    fontWeight: 700,
    color: PRIMARY_TEXT,
  },
  trustSmall: {
    fontSize: 12,
    color: COLORS.textSecond,
  },
  trustMarketplaces: {
    marginTop: 20,
    fontSize: 15,
    color: COLORS.textSecond,
  },

  // How it works — steps
  stepsSection: {
    backgroundColor: COLORS.bg,
    padding: '72px 24px',
    textAlign: 'center',
  },
  stepsTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 16,
  },
  stepsIntro: {
    maxWidth: 720,
    margin: '0 auto 40px',
    fontSize: 15,
    color: COLORS.textSecond,
    lineHeight: 1.7,
  },
  stepsGrid: {
    maxWidth: 1080,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
  },
  stepCard: {
    position: 'relative',
    padding: '28px 22px',
    background: COLORS.bgTert,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 20,
    textAlign: 'left',
    boxShadow: SHADOW.card,
  },
  stepNum: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: 'rgba(42,171,171,0.1)',
    color: PRIMARY_TEXT,
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 14,
  },
  stepCardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 8,
  },
  stepCardDesc: {
    fontSize: 14,
    color: COLORS.textSecond,
    lineHeight: 1.6,
    margin: 0,
  },

  // Tariffs section (prominent, moved up)
  tariffsSection: {
    backgroundColor: COLORS.bgTert,
    padding: '72px 24px',
    textAlign: 'center',
  },
  tariffsTitle: {
    fontSize: 34,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 10,
  },
  tariffsSubtitle: {
    fontSize: 15,
    color: COLORS.textSecond,
    marginBottom: 36,
  },
  tariffsGrid: {
    maxWidth: 1120,
    margin: '0 auto',
    display: 'grid',
    gap: 18,
  },
  tariffCard: {
    background: COLORS.bg,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 18,
    padding: '24px 22px',
    textAlign: 'left',
    boxShadow: SHADOW.card,
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
  },
  tariffCardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  tariffModeIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(42,171,171,0.1)',
  },
  tariffMode: {
    fontSize: 12,
    fontWeight: 600,
    color: PRIMARY_TEXT,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tariffName: {
    fontSize: 17,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 10,
  },
  tariffPriceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 2,
  },
  tariffPrice: {
    fontSize: 38,
    fontWeight: 700,
    color: PRIMARY,
  },
  tariffPriceUnit: {
    fontSize: 16,
    fontWeight: 500,
    color: COLORS.textSecond,
  },
  tariffDays: {
    display: 'inline-block',
    marginTop: 6,
    fontSize: 13,
    fontWeight: 600,
    color: PRIMARY_TEXT,
  },
  tariffCategory: {
    marginTop: 12,
    paddingTop: 12,
    borderTop: '1px solid ' + COLORS.divider,
    fontSize: 13,
    color: COLORS.textSecond,
    lineHeight: 1.5,
  },
  tariffsCta: {
    padding: '14px 32px',
    background: GRADIENT,
    color: '#fff',
    border: 'none',
    borderRadius: 50,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: SHADOW.cta,
    textShadow: '0 1px 2px rgba(10,37,53,.35)',
  },

  // Explain section (RENCARGO vs RENEXPRESS + delivery options)
  explainSection: {
    backgroundColor: COLORS.bgSecond,
    padding: '72px 24px',
  },
  explainInner: {
    maxWidth: 1080,
    margin: '0 auto',
  },
  explainTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 1.2,
  },
  explainTwoCol: {
    display: 'grid',
    gap: 18,
  },
  explainCard: {
    background: COLORS.bgTert,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 18,
    padding: '28px 26px',
    boxShadow: SHADOW.card,
  },
  explainTag: {
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.5,
    color: '#fff',
    background: GRADIENT,
    padding: '4px 12px',
    borderRadius: 20,
    marginBottom: 14,
  },
  explainCardTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 10,
  },
  explainCardText: {
    fontSize: 15,
    color: COLORS.textSecond,
    lineHeight: 1.7,
    margin: 0,
  },
  explainThreeCol: {
    display: 'grid',
    gap: 18,
  },
  optionCard: {
    background: COLORS.bg,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 18,
    padding: '24px 22px',
    boxShadow: SHADOW.card,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 8,
  },
  optionPrice: {
    display: 'inline-block',
    fontSize: 14,
    fontWeight: 700,
    color: PRIMARY_TEXT,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.textSecond,
    lineHeight: 1.6,
    margin: 0,
  },

  // Section headings (calc / lead / faq)
  sectionHeading: {
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  sectionSubheading: {
    fontSize: 15,
    color: COLORS.textSecond,
    textAlign: 'center',
    marginBottom: 32,
  },

  // Calc section
  calcSection: {
    backgroundColor: COLORS.bgTert,
    padding: '72px 24px',
  },
  calcContainer: {
    maxWidth: 560,
    margin: '0 auto',
  },

  // Lead section
  leadSection: {
    backgroundColor: COLORS.bgSecond,
    padding: '72px 24px',
  },
  leadContainer: {
    maxWidth: 560,
    margin: '0 auto',
  },
  leadCard: {
    padding: '32px 28px',
    background: COLORS.bg,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 24,
    boxShadow: SHADOW.cardHover,
  },

  // FAQ
  faqSection: {
    backgroundColor: COLORS.bgSecond,
    padding: '72px 24px',
  },
  faqContainer: {
    maxWidth: 760,
    margin: '0 auto',
  },
  faqItem: {
    background: COLORS.bgTert,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 14,
    padding: '4px 20px',
    marginBottom: 12,
    boxShadow: SHADOW.card,
  },
  faqSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: '16px 0',
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.text,
    cursor: 'pointer',
    listStyle: 'none',
  },
  faqChevron: {
    fontSize: 22,
    fontWeight: 400,
    color: PRIMARY,
    flexShrink: 0,
    lineHeight: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: COLORS.textSecond,
    lineHeight: 1.7,
    margin: '0 0 16px',
  },

  // Sticky mobile CTA bar
  stickyBar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 'calc(64px + env(safe-area-inset-bottom, 0px))',
    zIndex: 90,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.97)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: '1px solid ' + COLORS.cardBorder,
  },
  stickyPrimary: {
    flex: 1,
    padding: '14px',
    minHeight: 48,
    background: GRADIENT,
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    textShadow: '0 1px 2px rgba(10,37,53,.35)',
  },
  stickyWa: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    flexShrink: 0,
    backgroundColor: '#25D366',
    borderRadius: 12,
    textDecoration: 'none',
  },

  // App Store Banner — brand-gradient card
  appBannerSection: {
    display: 'flex',
    justifyContent: 'center',
    padding: '32px 24px',
    backgroundColor: COLORS.bgTert,
  },
  liquidPill: {
    position: 'relative',
    maxWidth: 540,
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    textDecoration: 'none',
    color: '#fff',
    display: 'block',
  },
  liquidSurface: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '20px 24px',
    background: GRADIENT,
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 28,
    boxShadow: SHADOW.cta,
  },
  liquidIcon: {
    flexShrink: 0,
  },
  liquidTextBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    flex: 1,
    minWidth: 0,
  },
  liquidTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#fff',
  },
  liquidDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  liquidBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 50,
    flexShrink: 0,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  liquidBadgeText: {
    fontSize: 13,
    fontWeight: 600,
    color: '#fff',
    whiteSpace: 'nowrap',
  },

  // SEO Content Section
  seoHeroSection: {
    backgroundColor: '#fff',
    padding: '64px 24px',
  },
  seoContainer: {
    maxWidth: 1080,
    margin: '0 auto',
  },
  seoHeadline: {
    fontSize: 36,
    fontWeight: 700,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 1.2,
    marginBottom: 16,
  },
  seoSubhead: {
    fontSize: 17,
    color: COLORS.textSecond,
    textAlign: 'center',
    lineHeight: 1.7,
    maxWidth: 700,
    margin: '0 auto 48px',
  },
  seoFeatures: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
    marginBottom: 48,
  },
  seoFeatureCard: {
    padding: 24,
    borderRadius: 16,
    border: '1px solid ' + COLORS.cardBorder,
    backgroundColor: COLORS.bgTert,
    boxShadow: SHADOW.card,
  },
  seoFeatureIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(42,171,171,0.1)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  seoFeatureTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 6,
  },
  seoFeatureText: {
    fontSize: 14,
    color: COLORS.textSecond,
    lineHeight: 1.7,
  },
  seoTariffNote: {
    fontSize: 14,
    color: COLORS.textSecond,
    textAlign: 'center',
    marginBottom: 40,
  },
  seoTextBlock: {
    marginBottom: 40,
  },
  seoTextTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 16,
  },
  seoText: {
    fontSize: 15,
    color: COLORS.textSecond,
    lineHeight: 1.8,
    marginBottom: 14,
  },
  seoCta: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  seoCtaPrimary: {
    padding: '14px 32px',
    background: GRADIENT,
    color: '#fff',
    border: 'none',
    borderRadius: 50,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: SHADOW.cta,
    textShadow: '0 1px 2px rgba(10,37,53,.35)',
  },
  seoCtaSecondary: {
    padding: '14px 28px',
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 50,
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
  },

  // Footer — light, matches converted pages (Calculator/Contacts)
  footer: {
    position: 'relative',
    backgroundColor: COLORS.bgTert,
    borderTop: '1px solid ' + COLORS.divider,
    padding: '56px 0 24px',
    overflow: 'hidden',
  },

  // Gradient CTA Card (deliberate brand anchor)
  footerCtaCard: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1080,
    margin: '0 auto 56px',
    padding: '0 24px',
  },
  footerCtaCardInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 40,
    padding: '40px 48px',
    background: GRADIENT,
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 24,
    boxShadow: SHADOW.cta,
  },
  footerCtaLeft: {
    flex: 1,
    minWidth: 0,
  },
  footerCtaTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 12,
    lineHeight: 1.25,
  },
  footerCtaDesc: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.7,
    marginBottom: 24,
    maxWidth: 460,
  },
  footerCtaButtons: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  footerCtaWhatsapp: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 24px',
    backgroundColor: '#25D366',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 12,
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
  },
  footerCtaApp: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 24px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 12,
    textDecoration: 'none',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'transform 0.2s, background 0.2s',
  },
  footerCtaRight: {
    flexShrink: 0,
  },
  footerCtaStats: {
    display: 'flex',
    gap: 24,
  },
  footerCtaStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '16px 20px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    minWidth: 80,
  },
  footerCtaStatNum: {
    fontSize: 22,
    fontWeight: 700,
    color: '#fff',
  },
  footerCtaStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: 500,
  },

  // Footer grid
  footerGrid: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px 40px',
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.2fr',
    gap: 40,
  },
  footerBrand: {
    paddingRight: 16,
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  footerLogoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: PRIMARY,
    borderRadius: '50%',
    flexShrink: 0,
  },
  footerLogoText: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  footerDesc: {
    fontSize: 14,
    color: COLORS.textSecond,
    lineHeight: 1.7,
    marginBottom: 20,
  },
  footerSocials: {
    display: 'flex',
    gap: 8,
  },
  footerSocialBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    color: COLORS.textSecond,
    backgroundColor: COLORS.bgSecond,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: '50%',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  footerColTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: 4,
  },
  footerLink: {
    fontSize: 14,
    color: COLORS.textSecond,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  footerContactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: COLORS.textSecond,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  footerAddress: {
    fontStyle: 'normal',
    fontSize: 14,
    color: COLORS.textSecond,
    lineHeight: 1.5,
  },

  // Live dot (pulsing green indicator)
  liveDotWrap: {
    position: 'relative',
    display: 'inline-flex',
    width: 8,
    height: 8,
  },
  liveDotPing: {
    position: 'absolute',
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#25D366',
    opacity: 0.75,
    animation: 'footerLivePing 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  },
  liveDot: {
    position: 'relative',
    display: 'inline-flex',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#25D366',
  },

  // Bottom bar
  footerDivider: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px',
    height: 1,
    background: 'linear-gradient(90deg, transparent, ' + COLORS.divider + ', transparent)',
  },
  footerBottom: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1280,
    margin: '0 auto',
    padding: '20px 24px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  copyright: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  footerBrands: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  footerBrandTag: {
    fontSize: 11,
    fontWeight: 600,
    color: COLORS.textMuted,
    padding: '4px 12px',
    backgroundColor: COLORS.bgSecond,
    border: '1px solid ' + COLORS.cardBorder,
    borderRadius: 50,
    letterSpacing: 0.5,
  },
  footerLegal: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
  },
  footerLegalLink: {
    fontSize: 13,
    color: COLORS.textMuted,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
};

export default Home;

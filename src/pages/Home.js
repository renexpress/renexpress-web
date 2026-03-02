import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import '../styles/responsive.css';

const PRIMARY = '#3D8B8B';

function Home({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('/');
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
        setScrollY(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div style={styles.page}>
      {/* Tubelight Floating Navbar */}
      <nav className="tubelight-nav" style={styles.tubelightWrapper}>
        <div className="tubelight-bar" style={styles.tubelightBar}>
          {/* Logo */}
          <a href="/" style={styles.tubelightLogo}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill={PRIMARY} />
              <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
            </svg>
          </a>

          {/* Nav Links */}
          {[
            { name: 'Главная', url: '/' },
            { name: 'Услуги', url: '/services' },
            { name: 'Калькулятор', url: '/calculator' },
            { name: 'FAQ', url: '/faq' },
            { name: 'О нас', url: '/about' },
            { name: 'Контакты', url: '/contacts' },
          ].map((item) => (
            <a
              key={item.url}
              href={item.url}
              className={`tubelight-link ${activeNav === item.url ? 'tubelight-active' : ''}`}
              onMouseEnter={() => setActiveNav(item.url)}
              style={{
                ...styles.tubelightLink,
                ...(activeNav === item.url ? styles.tubelightLinkActive : {}),
              }}
            >
              {activeNav === item.url && <span className="tubelight-glow" style={styles.tubelightGlow} />}
              <span style={{ position: 'relative', zIndex: 1 }}>{item.name}</span>
            </a>
          ))}

          {/* Auth Button */}
          {isAuthenticated ? (
            <button onClick={handleLogout} style={styles.tubelightAuthBtn}>Выйти</button>
          ) : (
            <button onClick={() => navigate('/login')} style={styles.tubelightAuthBtn}>Войти</button>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-bottom-nav" style={styles.mobileBottomNav}>
        {[
          { name: 'Главная', url: '/', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
          { name: 'Каталог', url: '/shop', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
          { name: 'Услуги', url: '/services', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
          { name: 'О нас', url: '/about', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
          { name: 'Ещё', url: '#more', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg> },
        ].map((item) => (
          <a
            key={item.url}
            href={item.url === '#more' ? undefined : item.url}
            onClick={item.url === '#more' ? (e) => { e.preventDefault(); setMobileMenuOpen(true); } : undefined}
            className={`mobile-bottom-link ${activeNav === item.url ? 'mobile-bottom-active' : ''}`}
            style={{
              ...styles.mobileBottomLink,
              color: activeNav === item.url ? PRIMARY : '#6B7280',
            }}
          >
            {item.icon}
            <span style={styles.mobileBottomLabel}>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill={PRIMARY} />
                <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
              </svg>
              <span style={{fontSize:18,fontWeight:700,color:'#111827'}}>RENEXPRESS</span>
            </div>
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <a href="/" className="active">Главная</a>
            <a href="/shop">Каталог</a>
            <a href="/about">О нас</a>
            <a href="/services">Услуги</a>
            <a href="/faq">FAQ</a>
            <a href="/calculator">Калькулятор</a>
            <a href="/contacts">Контакты</a>
          </nav>
          <div className="mobile-menu-footer">
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>Выйти</button>
            ) : (
              <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>Войти</button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section with Scroll Animation */}
      <section ref={heroRef} className="hero-section" style={styles.heroWrapper}>
        <div style={{
          ...styles.heroInner,
          perspective: '1000px',
        }}>
          <div style={{
            ...styles.heroCard,
            transform: `rotateX(${20 - scrollY * 20}deg) scale(${1.05 - scrollY * 0.05})`,
            transition: 'transform 0.1s linear',
          }}>
            <img src="/room.png" alt="RENEXPRESS доставка из Турции" style={styles.heroImage} />
            <div style={styles.heroOverlay}>
              <div className="hero-content" style={styles.heroContent}>
                <span style={styles.heroBadge}>Доставка из Турции</span>
                <h1 className="hero-title" style={{
                  ...styles.heroTitle,
                  opacity: 1 - scrollY * 0.8,
                  transform: `translateY(${scrollY * -40}px)`,
                  transition: 'opacity 0.1s, transform 0.1s',
                }}>Карго доставка из<br/>Стамбула в Москву</h1>
                <p className="hero-subtitle" style={{
                  ...styles.heroSubtitle,
                  opacity: 1 - scrollY * 1.2,
                  transform: `translateY(${scrollY * -20}px)`,
                  transition: 'opacity 0.1s, transform 0.1s',
                }}>
                  Авиа и авто перевозки текстиля, обуви и товаров из Турции.<br/>
                  От $5/кг. Сроки от 3 дней. Более 3000 клиентов доверяют нам.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', opacity: 1 - scrollY * 1.5, transition: 'opacity 0.1s' }}>
                  <button className="hero-button" onClick={() => navigate('/calculator')} style={styles.heroButton}>
                    Рассчитать стоимость
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 8 }}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <button onClick={() => navigate('/services')} style={styles.heroSecondaryBtn}>
                    Наши услуги
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Display Cards - Key Features */}
      <section className="display-cards-section" style={styles.displayCardsSection}>
        <h2 style={styles.displayCardsTitle}>Почему выбирают RENEXPRESS</h2>
        <p style={styles.displayCardsSubtitle}>Карго доставка из Турции для бизнеса и частных клиентов</p>
        <div className="display-cards-grid" style={{ minHeight: 280 }}>
          {/* Card 1 */}
          <div className="display-card display-card--1">
            <div className="display-card__header">
              <span className="display-card__icon" style={{ backgroundColor: 'rgba(59,130,246,0.3)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#93C5FD" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </span>
              <p className="display-card__title" style={{ color: '#93C5FD' }}>Авто доставка</p>
            </div>
            <p className="display-card__desc">От $5/кг — текстиль за 12-15 дней</p>
            <p className="display-card__date">6 тарифов на выбор</p>
          </div>
          {/* Card 2 */}
          <div className="display-card display-card--2">
            <div className="display-card__header">
              <span className="display-card__icon" style={{ backgroundColor: 'rgba(59,130,246,0.3)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#93C5FD" strokeWidth="2">
                  <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </span>
              <p className="display-card__title" style={{ color: '#93C5FD' }}>Авиа доставка</p>
            </div>
            <p className="display-card__desc">От $9/кг — экспресс за 3-4 дня</p>
            <p className="display-card__date">Ежедневные отправки</p>
          </div>
          {/* Card 3 */}
          <div className="display-card display-card--3">
            <div className="display-card__header">
              <span className="display-card__icon" style={{ backgroundColor: 'rgba(61,139,139,0.4)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <p className="display-card__title" style={{ color: '#5EEAD4' }}>3000+ клиентов</p>
            </div>
            <p className="display-card__desc">Доверяют нам с 2017 года</p>
            <p className="display-card__date">Россия, Турция, Узбекистан, Казахстан</p>
          </div>
        </div>
      </section>

      {/* App Store Banner — Liquid Glass */}
      <section className="app-banner-section" style={styles.appBannerSection}>
        <a
          href="https://apps.apple.com/app/renexpress/id6757761284"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass-pill"
          style={styles.liquidPill}
        >
          {/* Animated liquid blobs behind the glass */}
          <div className="liquid-glass-bg" style={styles.liquidBg}>
            <div className="liquid-blob liquid-blob-1" />
            <div className="liquid-blob liquid-blob-2" />
            <div className="liquid-blob liquid-blob-3" />
          </div>

          {/* Glass surface */}
          <div className="liquid-glass-surface" style={styles.liquidSurface}>
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
            {/* Badge */}
            <div className="liquid-glass-badge" style={styles.liquidBadge}>
              <svg width="16" height="20" viewBox="0 0 384 512" fill="#fff" style={{opacity:0.9}}>
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <span style={styles.liquidBadgeText}>App Store</span>
            </div>
          </div>
        </a>
      </section>

      {/* SEO Content — About RENEXPRESS */}
      <section style={styles.seoHeroSection}>
        <div className="seo-content" style={styles.seoContainer}>

          {/* Headline */}
          <h2 style={styles.seoHeadline}>Доставка из Турции в Россию —<br/>быстро, надёжно, прозрачно</h2>
          <p style={styles.seoSubhead}>
            RENEXPRESS — карго компания с 2017 года. Более 3000 клиентов из России, Турции, Узбекистана и Казахстана
            доверяют нам доставку текстиля, обуви и товаров из Стамбула в Москву.
          </p>

          {/* Feature Grid */}
          <div className="seo-features" style={styles.seoFeatures}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
                title: 'Авто и авиа доставка',
                text: 'Шесть тарифов: авто от $5/кг за 12-15 дней, авиа от $9/кг за 3-4 дня. Ежедневные отправки из Стамбула.' },
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

          {/* Tariff Summary */}
          <div style={styles.seoTariffBlock}>
            <h3 style={styles.seoTariffTitle}>Тарифы на карго доставку из Турции</h3>
            <div className="seo-tariff-row" style={styles.seoTariffRow}>
              {[
                { name: 'AVTO EXPRESS', price: '$5/кг', days: '12-15 дн', type: 'Текстиль' },
                { name: 'AVTO EX MARKA', price: '$7/кг', days: '12-15 дн', type: 'Бренд текстиль' },
                { name: 'AVTO ОБУВЬ', price: '$7/кг', days: '14-15 дн', type: 'Обувь' },
                { name: 'AVIA U2 MARKA', price: '$9/кг', days: '7-8 дн', type: 'Бренд текстиль' },
                { name: 'AVIA EX MARKA', price: '$11/кг', days: '3-4 дн', type: 'Экспресс' },
                { name: 'AVIA U2 ОБУВЬ', price: '$11/кг', days: '7-8 дн', type: 'Бренд обувь' },
              ].map((t, i) => (
                <div key={i} style={styles.seoTariffChip}>
                  <span style={styles.seoTariffName}>{t.name}</span>
                  <span style={styles.seoTariffPrice}>{t.price}</span>
                  <span style={styles.seoTariffDays}>{t.days}</span>
                </div>
              ))}
            </div>
            <p style={styles.seoTariffNote}>
              <a href="/calculator" style={{color: PRIMARY, fontWeight: 600, textDecoration: 'none'}}>Рассчитать стоимость</a> доставки онлайн или <a href="/services" style={{color: PRIMARY, fontWeight: 600, textDecoration: 'none'}}>подробнее об услугах</a>
            </p>
          </div>

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
              Мы предлагаем шесть тарифов доставки, адаптированных под разные категории товаров.
              Автомобильная доставка подходит для крупных партий текстиля и обуви — стоимость от $5 до $7
              за килограмм, сроки 12-15 дней. Авиадоставка — для срочных отправок: от $9 до $11 за килограмм,
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
            <button onClick={() => navigate('/contacts')} style={styles.seoCtaPrimary}>Связаться с нами</button>
            <button onClick={() => navigate('/about')} style={styles.seoCtaSecondary}>Подробнее о компании</button>
            <button onClick={() => navigate('/faq')} style={styles.seoCtaSecondary}>Частые вопросы</button>
          </div>
        </div>
      </section>

      {/* Creative Footer */}
      <footer className="footer" style={styles.footer}>
        {/* Animated gradient blobs */}
        <div className="footer-blobs" style={styles.footerBlobs}>
          <div className="footer-blob footer-blob-1" />
          <div className="footer-blob footer-blob-2" />
          <div className="footer-blob footer-blob-3" />
        </div>

        {/* Glass CTA Card */}
        <div style={styles.footerCtaCard} className="footer-cta-card">
          <div style={styles.footerCtaCardInner}>
            <div style={styles.footerCtaLeft}>
              <h2 style={styles.footerCtaTitle}>Готовы начать доставку из Турции?</h2>
              <p style={styles.footerCtaDesc}>
                Присоединяйтесь к 3000+ клиентам, которые доверяют нам грузоперевозки.
                Авиа от 3 дней, авто от 12 дней.
              </p>
              <div style={styles.footerCtaButtons}>
                <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="footer-cta-btn" style={styles.footerCtaWhatsapp}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Написать в WhatsApp
                </a>
                <a href="https://apps.apple.com/app/renexpress/id6757761284" target="_blank" rel="noopener noreferrer" className="footer-cta-btn" style={styles.footerCtaApp}>
                  <svg width="16" height="18" viewBox="0 0 384 512" fill="#fff"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  Скачать приложение
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
                  <span style={styles.footerCtaStatNum}>7 лет</span>
                  <span style={styles.footerCtaStatLabel}>на рынке</span>
                </div>
                <div style={styles.footerCtaStat}>
                  <span style={styles.footerCtaStatNum}>6</span>
                  <span style={styles.footerCtaStatLabel}>тарифов</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer columns grid */}
        <div className="footer-content" style={styles.footerGrid}>
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
            <a href="https://apps.apple.com/app/renexpress/id6757761284" target="_blank" rel="noopener noreferrer" className="footer-link" style={styles.footerLink}>Приложение iOS</a>
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
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    fontFamily: 'Inter, -apple-system, sans-serif',
  },

  // Tubelight Navbar
  tubelightWrapper: {
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
    paddingTop: 16,
  },
  tubelightBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(17,24,39,0.85)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    padding: '4px 6px',
    borderRadius: 50,
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  tubelightLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 10px',
    textDecoration: 'none',
    flexShrink: 0,
  },
  tubelightLink: {
    position: 'relative',
    padding: '8px 18px',
    fontSize: 14,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    borderRadius: 50,
    transition: 'color 0.3s',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  tubelightLinkActive: {
    color: '#fff',
    backgroundColor: 'rgba(61,139,139,0.15)',
  },
  tubelightGlow: {
    position: 'absolute',
    top: -2,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 32,
    height: 4,
    backgroundColor: PRIMARY,
    borderRadius: '4px 4px 0 0',
    boxShadow: `0 0 12px 4px rgba(61,139,139,0.4), 0 0 24px 8px rgba(61,139,139,0.2)`,
  },
  tubelightAuthBtn: {
    padding: '8px 18px',
    fontSize: 13,
    fontWeight: 600,
    color: '#fff',
    backgroundColor: PRIMARY,
    border: 'none',
    borderRadius: 50,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    marginLeft: 4,
  },

  // Mobile Bottom Nav
  mobileBottomNav: {
    display: 'none',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: '1px solid #E5E7EB',
    padding: '6px 0 env(safe-area-inset-bottom, 8px)',
    justifyContent: 'space-around',
  },
  mobileBottomLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    textDecoration: 'none',
    padding: '4px 0',
    fontSize: 10,
    fontWeight: 500,
    minWidth: 56,
  },
  mobileBottomLabel: {
    fontSize: 10,
    fontWeight: 500,
  },

  // Hero
  heroWrapper: {
    padding: '40px 20px 20px',
    backgroundColor: '#111827',
    overflow: 'hidden',
  },
  heroInner: {
    maxWidth: 1280,
    margin: '0 auto',
  },
  heroCard: {
    position: 'relative',
    height: 480,
    borderRadius: 24,
    overflow: 'hidden',
    border: '4px solid #333',
    boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 100%)',
    display: 'flex',
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 40px',
    width: '100%',
    boxSizing: 'border-box',
  },
  heroBadge: {
    display: 'inline-block',
    backgroundColor: PRIMARY,
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 16px',
    borderRadius: 20,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 44,
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.15,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.7,
    marginBottom: 28,
    maxWidth: 520,
  },
  heroButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: PRIMARY,
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    padding: '14px 28px',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
  },
  heroSecondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    padding: '14px 28px',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: 10,
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
  },

  // Display Cards
  displayCardsSection: {
    backgroundColor: '#111827',
    padding: '64px 24px 80px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  displayCardsTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 8,
  },
  displayCardsSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 48,
  },

  // App Store Banner — Liquid Glass
  appBannerSection: {
    display: 'flex',
    justifyContent: 'center',
    padding: '32px 24px',
    backgroundColor: '#111827',
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
  liquidBg: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    borderRadius: 28,
  },
  liquidSurface: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '18px 22px',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(40px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 28,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.2)',
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
    color: 'rgba(255,255,255,0.55)',
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
    color: '#111827',
    textAlign: 'center',
    lineHeight: 1.2,
    marginBottom: 16,
  },
  seoSubhead: {
    fontSize: 17,
    color: '#6B7280',
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
    border: '1px solid #E5E7EB',
    backgroundColor: '#FAFAFA',
  },
  seoFeatureIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(61,139,139,0.08)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  seoFeatureTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 6,
  },
  seoFeatureText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 1.7,
  },
  seoTariffBlock: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: '36px 32px',
    marginBottom: 48,
  },
  seoTariffTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  seoTariffRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  seoTariffChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 18px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 50,
    backdropFilter: 'blur(8px)',
  },
  seoTariffName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#fff',
  },
  seoTariffPrice: {
    fontSize: 14,
    fontWeight: 700,
    color: PRIMARY,
  },
  seoTariffDays: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  seoTariffNote: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  seoTextBlock: {
    marginBottom: 40,
  },
  seoTextTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 16,
  },
  seoText: {
    fontSize: 15,
    color: '#4B5563',
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
    backgroundColor: PRIMARY,
    color: '#fff',
    border: 'none',
    borderRadius: 50,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
  seoCtaSecondary: {
    padding: '14px 28px',
    backgroundColor: 'transparent',
    color: '#374151',
    border: '1px solid #D1D5DB',
    borderRadius: 50,
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
  },

  // Creative Footer
  footer: {
    position: 'relative',
    backgroundColor: '#0B1120',
    padding: '0 0 24px',
    overflow: 'hidden',
  },
  footerBlobs: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },

  // Glass CTA Card
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
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(24px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 24,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 16px 48px rgba(0,0,0,0.25)',
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
    color: 'rgba(255,255,255,0.6)',
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
    color: PRIMARY,
  },
  footerCtaStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
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
    color: '#fff',
    letterSpacing: 0.5,
  },
  footerDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
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
    color: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
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
    color: '#fff',
    marginBottom: 4,
  },
  footerLink: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  footerContactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  footerAddress: {
    fontStyle: 'normal',
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
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
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
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
    color: 'rgba(255,255,255,0.3)',
  },
  footerBrands: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  footerBrandTag: {
    fontSize: 11,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.3)',
    padding: '4px 12px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
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
    color: 'rgba(255,255,255,0.3)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
};

export default Home;

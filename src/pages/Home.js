import React, { useState, useEffect } from 'react';
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

  const CACHE_KEY = 'home_cache';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    // Try to load from cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { products: cachedProducts, categories: cachedCategories, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setProducts(cachedProducts);
          setCategories(cachedCategories);
          setLoading(false);
          // Refresh in background
          fetchData(true);
          return;
        }
      } catch (e) {}
    }
    fetchData(false);
  }, []);

  const fetchData = async (background = false) => {
    if (!background) setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_URL}/products/`),
        axios.get(`${API_URL}/categories/`)
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
      {/* Header */}
      <header style={styles.header}>
        <div className="header-content" style={styles.headerContent}>
          {/* Logo */}
          <div className="header-logo" style={styles.logo}>
            <div style={styles.logoIcon}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill={PRIMARY} />
                <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
              </svg>
            </div>
            <span style={styles.logoText}>RENEXPRESS</span>
          </div>

          {/* Search */}
          <div className="header-search" style={styles.searchContainer}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" style={styles.searchIcon}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Nav */}
          <nav className="header-nav" style={styles.nav}>
            <a href="#" style={styles.navLink}>Каталог</a>
            <a href="#" style={styles.navLink}>О нас</a>
            <a href="#" style={styles.navLink}>Контакты</a>
          </nav>

          {/* Icons */}
          <div className="header-icons" style={styles.headerIcons}>
            {isAuthenticated ? (
              <button onClick={handleLogout} style={styles.iconButton} title="Выйти">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            ) : (
              <button onClick={() => navigate('/login')} style={styles.signInButton}>
                Войти
              </button>
            )}
            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              style={styles.mobileMenuBtn}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <div style={styles.logo}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill={PRIMARY} />
                <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
              </svg>
              <span style={styles.logoText}>RENEXPRESS</span>
            </div>
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <a href="/" className="active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Главная
            </a>
            <a href="/shop">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              Каталог
            </a>
            <a href="#">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
              О нас
            </a>
            <a href="#">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/>
              </svg>
              Контакты
            </a>
          </nav>
          <div className="mobile-menu-footer">
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                Выйти
              </button>
            ) : (
              <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                Войти
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section" style={styles.hero}>
        <img src="/room.png" alt="" style={styles.heroImage} />
        <div style={styles.heroOverlay}>
          <div className="hero-content" style={styles.heroContent}>
            <span style={styles.heroBadge}>Новинки</span>
            <h1 className="hero-title" style={styles.heroTitle}>Маркетплейс для<br/>современного профессионала</h1>
            <p className="hero-subtitle" style={styles.heroSubtitle}>
              Откройте для себя проверенные товары от надёжных продавцов.<br/>
              Улучшите своё пространство качественными товарами и декором.
            </p>
            <button className="hero-button" style={styles.heroButton}>
              Смотреть каталог
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 8 }}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={styles.categoriesSection}>
        <div className="categories-container" style={styles.categoriesContainer}>
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              className="category-tab"
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              style={{
                ...styles.categoryTab,
                ...(selectedCategory === cat.id ? styles.categoryTabActive : {})
              }}
            >
              {categoryIcons.default}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content" style={styles.main}>
        {/* Editor's Picks */}
        <section style={styles.editorSection}>
          <div className="section-header" style={styles.sectionHeader}>
            <h2 className="section-title" style={styles.sectionTitle}>
              <span style={styles.sectionIcon}>★</span> Выбор редакции
            </h2>
            <a href="/shop" style={styles.viewAll}>Смотреть все</a>
          </div>

          <div style={styles.editorCards}>
            {loading ? (
              <p>Загрузка...</p>
            ) : editorPicks.map((product, index) => (
              <div key={product.id} className="editor-card" style={styles.editorCard} onClick={() => navigate(`/product/${product.id}`)}>
                <div className="editor-card-image" style={styles.editorCardImage}>
                  {product.primary_image ? (
                    <img src={product.primary_image} alt={product.name} style={styles.productImage} />
                  ) : (
                    <div style={styles.noImage}>Нет фото</div>
                  )}
                </div>
                <div className="editor-card-content" style={styles.editorCardContent}>
                  <span style={styles.productCategory}>{product.category_name || 'Товар'}</span>
                  <h3 className="editor-card-title" style={styles.editorCardTitle}>{product.name}</h3>
                  <p style={styles.editorCardDesc}>{product.description?.slice(0, 80)}...</p>
                  <div style={styles.editorCardFooter}>
                    <div style={styles.priceContainer}>
                      {product.discount_price && product.retail_price ? (
                        <>
                          <span style={styles.oldPrice}>{product.retail_price} ₽</span>
                          <span className="product-price" style={styles.productPrice}>{product.discount_price} ₽</span>
                        </>
                      ) : (
                        <span className="product-price" style={styles.productPrice}>{product.retail_price || product.price || 0} ₽</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section style={styles.trendingSection}>
          <div className="section-header" style={styles.sectionHeader}>
            <h2 className="section-title" style={styles.sectionTitle}>
              <span style={styles.sectionIcon}>🔥</span> Популярное
            </h2>
          </div>

          <div className="trending-grid" style={styles.trendingGrid}>
            {loading ? (
              <p>Загрузка...</p>
            ) : trendingProducts.map((product) => (
              <div key={product.id} style={styles.trendingCard} onClick={() => navigate(`/product/${product.id}`)}>
                <div style={styles.trendingCardImage}>
                  {product.primary_image ? (
                    <img src={product.primary_image} alt={product.name} style={styles.productImage} />
                  ) : (
                    <div style={styles.noImage}>Нет фото</div>
                  )}
                  {product.discount_price && product.retail_price && (
                    <span style={styles.discountBadge}>
                      -{Math.round((1 - product.discount_price / product.retail_price) * 100)}%
                    </span>
                  )}
                </div>
                <div style={styles.trendingCardContent}>
                  <h4 className="trending-card-title" style={styles.trendingCardTitle}>{product.name}</h4>
                  <div style={styles.trendingCardFooter}>
                    {product.discount_price && product.retail_price ? (
                      <>
                        <span className="trending-price" style={styles.trendingPrice}>{product.discount_price} ₽</span>
                        <span style={styles.oldPrice}>{product.retail_price} ₽</span>
                      </>
                    ) : (
                      <span className="trending-price" style={styles.trendingPrice}>{product.retail_price || product.price || 0} ₽</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Trust Badges */}
      <section className="trust-section" style={styles.trustSection}>
        <div className="trust-container" style={styles.trustContainer}>
          <div style={styles.trustItem}>
            <div style={styles.trustIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <div>
              <h4 className="trust-title" style={styles.trustTitle}>Безопасные платежи</h4>
              <p className="trust-desc" style={styles.trustDesc}>Все транзакции защищены и зашифрованы</p>
            </div>
          </div>
          <div style={styles.trustItem}>
            <div style={styles.trustIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <div>
              <h4 className="trust-title" style={styles.trustTitle}>Проверенные продавцы</h4>
              <p className="trust-desc" style={styles.trustDesc}>Все продавцы проходят верификацию</p>
            </div>
          </div>
          <div style={styles.trustItem}>
            <div style={styles.trustIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <div>
              <h4 className="trust-title" style={styles.trustTitle}>Быстрая доставка</h4>
              <p className="trust-desc" style={styles.trustDesc}>Доставка по всему миру с отслеживанием</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={styles.footer}>
        <div className="footer-content" style={styles.footerContent}>
          <div style={styles.footerMain}>
            <div style={styles.footerLogo}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill={PRIMARY} />
                <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
              </svg>
              <span style={styles.footerLogoText}>RENEXPRESS</span>
            </div>
            <p style={styles.footerDesc}>
              Ведущая площадка для профессионалов.<br/>
              Покупайте и продавайте уникальные товары.
            </p>
          </div>

          <div className="footer-links" style={styles.footerLinks}>
            <div style={styles.footerColumn}>
              <h5 style={styles.footerColumnTitle}>Магазин</h5>
              <a href="#" style={styles.footerLink}>Все товары</a>
              <a href="#" style={styles.footerLink}>Новинки</a>
              <a href="#" style={styles.footerLink}>Популярное</a>
            </div>
            <div style={styles.footerColumn}>
              <h5 style={styles.footerColumnTitle}>Поддержка</h5>
              <a href="#" style={styles.footerLink}>Центр помощи</a>
              <a href="#" style={styles.footerLink}>Безопасность</a>
              <a href="#" style={styles.footerLink}>Условия</a>
            </div>
            <div style={styles.footerColumn}>
              <h5 style={styles.footerColumnTitle}>Компания</h5>
              <a href="#" style={styles.footerLink}>О нас</a>
              <a href="#" style={styles.footerLink}>Блог</a>
              <a href="#" style={styles.footerLink}>Контакты</a>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© 2024 RENEXPRESS. Все права защищены.</p>
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

  // Header
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #E5E7EB',
    padding: '12px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 32,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  },
  logoIcon: {
    display: 'flex',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
  },
  searchContainer: {
    flex: 1,
    maxWidth: 480,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  searchInput: {
    width: '100%',
    padding: '10px 16px 10px 44px',
    fontSize: 14,
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    outline: 'none',
    boxSizing: 'border-box',
  },
  nav: {
    display: 'flex',
    gap: 24,
  },
  navLink: {
    fontSize: 14,
    color: '#374151',
    textDecoration: 'none',
    fontWeight: 500,
  },
  headerIcons: {
    display: 'flex',
    gap: 8,
    flexShrink: 0,
  },
  iconButton: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  mobileMenuBtn: {
    display: 'none',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  signInButton: {
    padding: '10px 20px',
    backgroundColor: PRIMARY,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },

  // Hero
  hero: {
    position: 'relative',
    height: 400,
    overflow: 'hidden',
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
    background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px',
    width: '100%',
    boxSizing: 'border-box',
  },
  heroBadge: {
    display: 'inline-block',
    backgroundColor: PRIMARY,
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: 4,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.2,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.6,
    marginBottom: 24,
  },
  heroButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: PRIMARY,
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    padding: '14px 24px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },

  // Categories
  categoriesSection: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #E5E7EB',
    padding: '16px 0',
  },
  categoriesContainer: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    gap: 12,
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  categoryTab: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 16px',
    backgroundColor: '#F3F4F6',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: '#374151',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  categoryTabActive: {
    backgroundColor: PRIMARY,
    color: '#fff',
  },

  // Main Content
  main: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '32px 24px',
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: 48,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  sectionIcon: {
    fontSize: 16,
  },
  viewAll: {
    fontSize: 14,
    color: PRIMARY,
    textDecoration: 'none',
    fontWeight: 500,
  },

  // Editor's Picks
  editorSection: {},
  editorCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  editorCard: {
    display: 'flex',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid #E5E7EB',
    cursor: 'pointer',
  },
  editorCardImage: {
    width: 140,
    height: 140,
    flexShrink: 0,
    backgroundColor: '#E5E7EB',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  noImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9CA3AF',
    fontSize: 12,
  },
  editorCardContent: {
    flex: 1,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  productCategory: {
    fontSize: 11,
    fontWeight: 600,
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  editorCardTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 4,
  },
  editorCardDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 1.4,
    marginBottom: 12,
    flex: 1,
    overflow: 'hidden',
  },
  editorCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  oldPrice: {
    fontSize: 13,
    color: '#9CA3AF',
    textDecoration: 'line-through',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
  },

  // Trending Now
  trendingSection: {},
  trendingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
  },
  trendingCard: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  trendingCardImage: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
    backgroundColor: '#F5EBE6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EF4444',
    color: '#fff',
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: 4,
  },
  trendingCardContent: {
    paddingTop: 12,
  },
  trendingCardTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: '#111827',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  trendingCardFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  trendingPrice: {
    fontSize: 15,
    fontWeight: 600,
    color: '#111827',
  },

  // Trust Section
  trustSection: {
    backgroundColor: '#F9FAFB',
    padding: '48px 24px',
  },
  trustContainer: {
    maxWidth: 1280,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    gap: 64,
    flexWrap: 'wrap',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  trustIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #E5E7EB',
    flexShrink: 0,
  },
  trustTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 4,
  },
  trustDesc: {
    fontSize: 13,
    color: '#6B7280',
  },

  // Footer
  footer: {
    backgroundColor: '#111827',
    padding: '48px 24px 24px',
  },
  footerContent: {
    maxWidth: 1280,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 32,
    borderBottom: '1px solid #374151',
    flexWrap: 'wrap',
    gap: 32,
  },
  footerMain: {
    maxWidth: 280,
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  footerLogoText: {
    fontSize: 18,
    fontWeight: 700,
    color: '#fff',
  },
  footerDesc: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 1.6,
  },
  footerLinks: {
    display: 'flex',
    gap: 64,
    flexWrap: 'wrap',
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  footerColumnTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
    marginBottom: 4,
  },
  footerLink: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecoration: 'none',
  },
  footerBottom: {
    maxWidth: 1280,
    margin: '0 auto',
    paddingTop: 24,
  },
  copyright: {
    fontSize: 13,
    color: '#6B7280',
  },
};

export default Home;

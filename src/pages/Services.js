import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/responsive.css';

const PRIMARY = '#3D8B8B';

function Services({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/services');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const deliveryTypes = [
    { name: 'AVTO EXPRESS', price: 4, days: '14-18', desc: 'Домашний текстиль, Турецкий текстиль', icon: 'truck' },
    { name: 'AVTO EX MARKA', price: 5, days: '14-18', desc: 'Домашний текстиль, Бренд/Марка текстиль, Турецкий текстиль', icon: 'truck' },
    { name: 'AVTO ОБУВЬ', price: 5, days: '14-18', desc: 'Турецкие производители обуви (не марка, не бренд)', icon: 'truck' },
    { name: 'AVIA U2 MARKA', price: 7.5, days: '7-8', desc: 'Турецкий текстиль, Бренд/Марка текстиль', icon: 'plane' },
    { name: 'AVIA U3', price: 8, days: '4-5', desc: 'Обувь (марка, турецкое производство)', icon: 'plane' },
    { name: 'AVIA EX MARKA', price: 10, days: '3-4', desc: 'Турецкое производство, Бренд/Марка текстиль', icon: 'plane' },
  ];

  const steps = [
    { num: '01', title: 'Оформление заказа', desc: 'Свяжитесь с нами или оформите заказ через приложение RENEXPRESS. Получите персональный код REN.' },
    { num: '02', title: 'Сбор груза в Стамбуле', desc: 'Наш менеджер в Стамбуле координирует приём товаров от поставщиков и доставку на наш склад.' },
    { num: '03', title: 'Упаковка и отправка', desc: 'Профессиональная упаковка, консолидация и ежедневная отправка грузов из Турции в Россию.' },
    { num: '04', title: 'Получение в Москве', desc: 'Получите груз на нашем складе в Москве или мы доставим его на склад WB/OZON.' },
  ];

  const additionalServices = [
    { title: 'Маркировка Честный знак', desc: 'Маркировка товаров в соответствии с требованиями российского законодательства для легальной продажи.', icon: 'shield' },
    { title: 'Доставка на склады WB/OZON', desc: 'Доставляем грузы напрямую на склады Wildberries и OZON для продавцов маркетплейсов.', icon: 'warehouse' },
    { title: 'Закупка товаров в Турции', desc: 'Наш байер в Стамбуле поможет найти и закупить товары у турецких поставщиков.', icon: 'cart' },
    { title: 'Консолидация грузов', desc: 'Собираем товары от разных поставщиков на одном складе и отправляем единой партией.', icon: 'consolidate' },
    { title: 'Фото и видео отчёты', desc: 'Фиксируем состояние груза при приёмке на складе в Стамбуле и отправляем отчёт клиенту.', icon: 'camera' },
    { title: 'Страхование груза', desc: 'Защитите ваш груз от повреждений и потерь при транспортировке из Турции в Россию.', icon: 'insurance' },
  ];

  const additionalIcons = {
    shield: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    warehouse: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
        <path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/>
        <path d="M9 21v-6h6v6"/>
      </svg>
    ),
    cart: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    consolidate: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3"/>
        <line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
      </svg>
    ),
    camera: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    insurance: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M12 8v4"/><path d="M12 16h.01"/>
      </svg>
    ),
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B1120', fontFamily: 'Inter, -apple-system, sans-serif' }}>

      {/* ======= CSS for hover/animations ======= */}
      <style>{`
        .services-tariff-card:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(61,139,139,0.4) !important;
          box-shadow: 0 20px 48px rgba(0,0,0,0.4), 0 0 32px rgba(61,139,139,0.15) !important;
        }
        .services-step-card:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(61,139,139,0.3) !important;
          background: rgba(255,255,255,0.08) !important;
        }
        .services-addon-card:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(61,139,139,0.3) !important;
          box-shadow: 0 16px 40px rgba(0,0,0,0.3) !important;
        }
        .services-hero-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(61,139,139,0.4) !important;
        }
        .services-hero-btn-secondary:hover {
          background: rgba(255,255,255,0.15) !important;
          border-color: rgba(255,255,255,0.4) !important;
        }
        .services-cta-whatsapp:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(37,211,102,0.4) !important;
        }
        .services-cta-calc:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(61,139,139,0.4) !important;
        }
        .services-cta-contact:hover {
          background: rgba(255,255,255,0.12) !important;
          border-color: rgba(255,255,255,0.3) !important;
        }
        .services-days-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: rgba(61,139,139,0.15);
          border: 1px solid rgba(61,139,139,0.25);
          border-radius: 20px;
          font-size: 13px;
          color: ${PRIMARY};
          font-weight: 500;
        }
        .services-blob-1 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(61,139,139,0.15), transparent 70%);
          top: -100px;
          right: -100px;
          filter: blur(60px);
          animation: servicesBlobFloat 8s ease-in-out infinite;
          pointer-events: none;
        }
        .services-blob-2 {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(94,234,212,0.1), transparent 70%);
          bottom: -50px;
          left: -80px;
          filter: blur(60px);
          animation: servicesBlobFloat 10s ease-in-out infinite reverse;
          pointer-events: none;
        }
        .services-blob-3 {
          position: absolute;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(129,140,248,0.08), transparent 70%);
          top: 40%;
          left: 30%;
          filter: blur(50px);
          animation: servicesBlobFloat 12s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes servicesBlobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -15px) scale(1.08); }
          66% { transform: translate(-15px, 10px) scale(0.95); }
        }
        .footer-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          animation: servicesBlobFloat 8s ease-in-out infinite;
        }
        .footer-blob-1 {
          width: 300px;
          height: 300px;
          background: rgba(61,139,139,0.12);
          top: 0;
          left: -100px;
          animation-delay: 0s;
        }
        .footer-blob-2 {
          width: 250px;
          height: 250px;
          background: rgba(94,234,212,0.08);
          top: 50%;
          right: -50px;
          animation-delay: -3s;
        }
        .footer-blob-3 {
          width: 200px;
          height: 200px;
          background: rgba(129,140,248,0.06);
          bottom: 0;
          left: 40%;
          animation-delay: -6s;
        }
        .footer-social:hover {
          color: #fff !important;
          background: rgba(61,139,139,0.3) !important;
          border-color: rgba(61,139,139,0.5) !important;
        }
        .footer-link:hover {
          color: rgba(255,255,255,0.8) !important;
        }
        .footer-cta-btn:hover {
          transform: translateY(-2px) !important;
        }
        @keyframes footerLivePing {
          0% { transform: scale(1); opacity: 0.75; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .services-step-line {
          position: absolute;
          top: 36px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(61,139,139,0.3), rgba(61,139,139,0.3), transparent);
          z-index: 0;
        }
      `}</style>

      {/* ======= TUBELIGHT NAVBAR ======= */}
      <nav className="tubelight-nav" style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        paddingTop: 16,
      }}>
        <div className="tubelight-bar" style={{
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
        }}>
          {/* Logo */}
          <a href="/" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 10px',
            textDecoration: 'none',
            flexShrink: 0,
          }}>
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
              onMouseLeave={() => setActiveNav('/services')}
              style={{
                position: 'relative',
                padding: '8px 18px',
                fontSize: 14,
                fontWeight: 600,
                color: activeNav === item.url ? '#fff' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                borderRadius: 50,
                transition: 'color 0.3s',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                ...(activeNav === item.url ? { backgroundColor: 'rgba(61,139,139,0.15)' } : {}),
              }}
            >
              {activeNav === item.url && (
                <span className="tubelight-glow" style={{
                  position: 'absolute',
                  top: -2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 32,
                  height: 4,
                  backgroundColor: PRIMARY,
                  borderRadius: '4px 4px 0 0',
                  boxShadow: '0 0 12px 4px rgba(61,139,139,0.4), 0 0 24px 8px rgba(61,139,139,0.2)',
                }} />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{item.name}</span>
            </a>
          ))}

          {/* Auth Button */}
          {isAuthenticated ? (
            <button onClick={handleLogout} style={{
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
            }}>Выйти</button>
          ) : (
            <button onClick={() => navigate('/login')} style={{
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
            }}>Войти</button>
          )}
        </div>
      </nav>

      {/* ======= MOBILE BOTTOM NAV ======= */}
      <nav className="mobile-bottom-nav" style={{
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
      }}>
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
            className={`mobile-bottom-link ${item.url === '/services' ? 'mobile-bottom-active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              textDecoration: 'none',
              padding: '4px 0',
              fontSize: 10,
              fontWeight: 500,
              minWidth: 56,
              color: item.url === '/services' ? PRIMARY : '#6B7280',
            }}
          >
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: 500 }}>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* ======= MOBILE MENU OVERLAY ======= */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill={PRIMARY} />
                <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
              </svg>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>RENEXPRESS</span>
            </div>
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <a href="/">Главная</a>
            <a href="/shop">Каталог</a>
            <a href="/about">О нас</a>
            <a href="/services" className="active">Услуги</a>
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

      {/* ======= DARK HERO ======= */}
      <section style={{
        position: 'relative',
        backgroundColor: '#111827',
        paddingTop: 100,
        paddingBottom: 80,
        overflow: 'hidden',
      }}>
        {/* Blobs behind hero */}
        <div className="services-blob-1" />
        <div className="services-blob-2" />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'rgba(61,139,139,0.15)',
            border: '1px solid rgba(61,139,139,0.3)',
            color: PRIMARY,
            fontSize: 13,
            fontWeight: 600,
            padding: '6px 18px',
            borderRadius: 50,
            marginBottom: 24,
            letterSpacing: 0.5,
          }}>
            6 тарифов доставки
          </span>
          <h1 style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: 20,
            letterSpacing: -0.5,
          }}>
            Услуги доставки из Турции<br/>в Россию
          </h1>
          <p style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7,
            maxWidth: 600,
            margin: '0 auto 36px',
          }}>
            6 тарифов на карго доставку из Стамбула в Москву. Авиа и авто перевозки текстиля, обуви и брендовых товаров.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="services-hero-btn"
              onClick={() => navigate('/calculator')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: PRIMARY,
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                padding: '14px 28px',
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 16px rgba(61,139,139,0.3)',
              }}
            >
              Рассчитать стоимость
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button
              className="services-hero-btn-secondary"
              onClick={() => navigate('/contacts')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                padding: '14px 28px',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s',
                backdropFilter: 'blur(4px)',
              }}
            >
              Связаться
            </button>
          </div>
        </div>
      </section>

      {/* ======= TARIFF CARDS SECTION ======= */}
      <section style={{
        position: 'relative',
        backgroundColor: '#0B1120',
        padding: '80px 24px',
        overflow: 'hidden',
      }}>
        <div className="services-blob-3" />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            marginBottom: 12,
          }}>Тарифы на доставку</h2>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
            lineHeight: 1.7,
            maxWidth: 720,
            margin: '0 auto 48px',
          }}>
            Выберите оптимальный тариф в зависимости от типа товара и требуемых сроков доставки. Минимальный вес отправки — 10 кг.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }} className="services-tariff-grid">
            {deliveryTypes.map((dt, i) => (
              <div
                key={i}
                className="services-tariff-card"
                style={{
                  padding: 28,
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    backgroundColor: PRIMARY,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(61,139,139,0.3)',
                  }}>
                    {dt.icon === 'plane' ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                        <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                    )}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{dt.name}</h3>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 40, fontWeight: 700, color: PRIMARY }}>${dt.price}</span>
                  <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginLeft: 2 }}>/кг</span>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <span className="services-days-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {dt.days} дней
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{dt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= HOW IT WORKS ======= */}
      <section style={{
        backgroundColor: '#fff',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#111827',
            textAlign: 'center',
            marginBottom: 12,
          }}>Как это работает</h2>
          <p style={{
            fontSize: 16,
            color: '#6B7280',
            textAlign: 'center',
            lineHeight: 1.7,
            maxWidth: 600,
            margin: '0 auto 56px',
          }}>
            Простой и прозрачный процесс доставки грузов из Турции
          </p>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="services-steps-grid">
            {/* Connecting line */}
            <div className="services-step-line" />

            {steps.map((step, i) => (
              <div
                key={i}
                className="services-step-card"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  padding: 28,
                  background: '#FAFAFA',
                  borderRadius: 20,
                  border: '1px solid #E5E7EB',
                  transition: 'transform 0.3s, border-color 0.3s, background 0.3s',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  backgroundColor: 'rgba(61,139,139,0.1)',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <span style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: PRIMARY,
                    lineHeight: 1,
                  }}>{step.num}</span>
                </div>
                <h3 style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: 8,
                }}>{step.title}</h3>
                <p style={{
                  fontSize: 14,
                  color: '#6B7280',
                  lineHeight: 1.7,
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= ADDITIONAL SERVICES ======= */}
      <section style={{
        position: 'relative',
        backgroundColor: '#111827',
        padding: '80px 24px',
        overflow: 'hidden',
      }}>
        <div className="services-blob-1" style={{ opacity: 0.5 }} />
        <div className="services-blob-2" style={{ opacity: 0.5 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            marginBottom: 12,
          }}>Дополнительные услуги</h2>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
            lineHeight: 1.7,
            maxWidth: 720,
            margin: '0 auto 48px',
          }}>
            Помимо доставки грузов мы предлагаем полный спектр сопутствующих услуг для вашего бизнеса
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }} className="services-addon-grid">
            {additionalServices.map((svc, i) => (
              <div
                key={i}
                className="services-addon-card"
                style={{
                  padding: 28,
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  backgroundColor: 'rgba(61,139,139,0.12)',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  {additionalIcons[svc.icon]}
                </div>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: 8,
                }}>{svc.title}</h3>
                <p style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7,
                }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA SECTION ======= */}
      <section style={{
        position: 'relative',
        backgroundColor: '#0B1120',
        padding: '80px 24px',
        overflow: 'hidden',
      }}>
        <div className="services-blob-3" />
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 720,
          margin: '0 auto',
          padding: '48px 40px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 24,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 16px 48px rgba(0,0,0,0.25)',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 12,
          }}>Готовы отправить груз?</h2>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 480,
            margin: '0 auto 32px',
          }}>
            Свяжитесь с нами или рассчитайте стоимость доставки онлайн
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/905511898288"
              target="_blank"
              rel="noopener noreferrer"
              className="services-cta-whatsapp"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                backgroundColor: '#25D366',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                borderRadius: 12,
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                border: 'none',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <button
              className="services-cta-calc"
              onClick={() => navigate('/calculator')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                backgroundColor: PRIMARY,
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 16px rgba(61,139,139,0.3)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="2"/>
                <line x1="8" y1="6" x2="16" y2="6"/>
                <line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/>
                <line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/>
                <line x1="8" y1="18" x2="16" y2="18"/>
              </svg>
              Калькулятор
            </button>
            <button
              className="services-cta-contact"
              onClick={() => navigate('/contacts')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 28px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s',
                backdropFilter: 'blur(4px)',
              }}
            >
              Связаться
            </button>
          </div>
        </div>
      </section>

      {/* ======= SEO TEXT ======= */}
      <section style={{
        backgroundColor: '#fff',
        padding: '64px 24px',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#111827',
            marginBottom: 20,
          }}>Карго доставка из Турции в Россию — услуги RENEXPRESS</h2>
          <p style={{
            fontSize: 15,
            color: '#4B5563',
            lineHeight: 1.8,
            marginBottom: 16,
          }}>
            Компания RENEXPRESS предоставляет полный комплекс услуг по грузоперевозкам из Турции в Россию.
            Мы осуществляем карго доставку текстиля, обуви и других товаров турецкого производства из Стамбула
            в Москву автомобильным и авиационным транспортом. Наши тарифы рассчитаны на различные категории
            товаров: домашний текстиль, турецкий текстиль, брендовый текстиль, обувь турецкого и импортного
            производства. Стоимость доставки начинается от $4 за килограмм при автомобильной перевозке
            и от $7.5 при авиадоставке. Сроки доставки составляют от 3 до 18 дней в зависимости от выбранного тарифа.
          </p>
          <p style={{
            fontSize: 15,
            color: '#4B5563',
            lineHeight: 1.8,
            marginBottom: 16,
          }}>
            Помимо транспортировки грузов, RENEXPRESS оказывает услуги по маркировке товаров системой «Честный знак»,
            что позволяет нашим клиентам легально продавать импортированные товары на территории России.
            Мы также осуществляем доставку грузов напрямую на склады маркетплейсов Wildberries и OZON,
            что особенно удобно для продавцов, работающих на этих платформах. Наш байер в Стамбуле поможет
            с поиском и закупкой товаров у турецких поставщиков. Для оформления заказа свяжитесь с нашим
            менеджером по WhatsApp или скачайте мобильное приложение RENEXPRESS в App Store.
          </p>
        </div>
      </section>

      {/* ======= CREATIVE FOOTER ======= */}
      <footer className="footer" style={{
        position: 'relative',
        backgroundColor: '#0B1120',
        padding: '0 0 24px',
        overflow: 'hidden',
      }}>
        {/* Animated gradient blobs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="footer-blob footer-blob-1" />
          <div className="footer-blob footer-blob-2" />
          <div className="footer-blob footer-blob-3" />
        </div>

        {/* Glass divider at top */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
          marginBottom: 48,
        }} />

        {/* Footer columns grid */}
        <div className="footer-content" style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px 40px',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.2fr',
          gap: 40,
        }}>
          {/* Brand column */}
          <div style={{ paddingRight: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                backgroundColor: PRIMARY,
                borderRadius: '50%',
                flexShrink: 0,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: 0.5 }}>RENEXPRESS</span>
            </div>
            <p style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              marginBottom: 20,
            }}>
              Надёжная доставка грузов из Турции в Россию с 2017 года. Текстиль, обувь, брендовые товары.
              Авто и авиа перевозки с отслеживанием в приложении.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="https://instagram.com/renat_karaliev" target="_blank" rel="noopener noreferrer" className="footer-social" style={{
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
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="footer-social" style={{
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
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://www.rencargo.com" target="_blank" rel="noopener noreferrer" className="footer-social" style={{
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
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
              <a href="tel:+905070107070" className="footer-social" style={{
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
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h5 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Услуги</h5>
            <a href="/services" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Авто доставка</a>
            <a href="/services" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Авиа доставка</a>
            <a href="/services" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Маркировка «Честный знак»</a>
            <a href="/services" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Доставка на WB / OZON</a>
            <a href="/calculator" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Калькулятор стоимости</a>
          </div>

          {/* Company column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h5 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Компания</h5>
            <a href="/about" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>О компании</a>
            <a href="/about" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Наша команда</a>
            <a href="/faq" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Вопросы и ответы</a>
            <a href="/shop" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Каталог товаров</a>
          </div>

          {/* Help column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h5 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Помощь</h5>
            <a href="/faq" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>FAQ</a>
            <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                Онлайн чат
                <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
                  <span className="footer-live-ping" style={{
                    position: 'absolute',
                    display: 'inline-flex',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    opacity: 0.75,
                    animation: 'footerLivePing 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                  }} />
                  <span style={{
                    position: 'relative',
                    display: 'inline-flex',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                  }} />
                </span>
              </span>
            </a>
            <a href="/contacts" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Поддержка</a>
            <a href="https://apps.apple.com/app/renexpress/id6757761284" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Приложение iOS</a>
          </div>

          {/* Contact column with icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h5 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Контакты</h5>
            <a href="mailto:info@renexpress.online" className="footer-link" style={{
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>info@renexpress.online</span>
            </a>
            <a href="tel:+905070107070" className="footer-link" style={{
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+90 507 010 70 70</span>
            </a>
            <a href="tel:+79289707010" className="footer-link" style={{
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+7 928 970 70 10</span>
            </a>
            <div className="footer-link" style={{
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <address style={{ fontStyle: 'normal', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>Москва, ул. Южнопортовая 7а, стр 2</address>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
        }} />
        <div style={{
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
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 RENEXPRESS. Все права защищены.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.3)',
              padding: '4px 12px',
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 50,
              letterSpacing: 0.5,
            }}>RENCARGO</span>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.3)',
              padding: '4px 12px',
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 50,
              letterSpacing: 0.5,
            }}>RENSHOPPING</span>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.3)',
              padding: '4px 12px',
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 50,
              letterSpacing: 0.5,
            }}>RENFABRIK</span>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <a href="/about" className="footer-link" style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}>Политика конфиденциальности</a>
            <a href="/about" className="footer-link" style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}>Условия использования</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Services;

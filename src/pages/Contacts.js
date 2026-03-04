import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/responsive.css';
import useIsMobile from '../hooks/useIsMobile';

const PRIMARY = '#3D8B8B';

function Contacts({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/contacts');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const contacts = [
    { title: 'Телефон (Турция)', value: '+90 507 010 70 70', link: 'tel:+905070107070', icon: 'phone' },
    { title: 'Телефон (Россия)', value: '+7 928 970 70 10', link: 'tel:+79289707010', icon: 'phone' },
    { title: 'Офис Стамбул', value: '0212 522 55 50', link: 'tel:02125225550', icon: 'office' },
    { title: 'WhatsApp (Стамбул)', value: '+90 551 189 82 88', link: 'https://wa.me/905511898288', icon: 'whatsapp' },
    { title: 'WhatsApp (Москва)', value: '+90 551 189 82 99', link: 'https://wa.me/905511898299', icon: 'whatsapp' },
    { title: 'Байер (закупки)', value: '+90 551 189 82 89', link: 'https://wa.me/905511898289', icon: 'whatsapp' },
  ];

  const PhoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );

  const OfficeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  const renderContactIcon = (icon) => {
    if (icon === 'phone') return <PhoneIcon />;
    if (icon === 'office') return <OfficeIcon />;
    if (icon === 'whatsapp') return <WhatsAppIcon />;
    return null;
  };

  return (
    <div style={styles.page}>
      {/* ============ TUBELIGHT NAVBAR ============ */}
      <nav className="tubelight-nav" style={styles.tubelightWrapper}>
        <div className="tubelight-bar" style={styles.tubelightBar}>
          <a href="/" style={styles.tubelightLogo}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill={PRIMARY} />
              <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
            </svg>
          </a>
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
          {isAuthenticated ? (
            <button onClick={handleLogout} style={styles.tubelightAuthBtn}>Выйти</button>
          ) : (
            <button onClick={() => navigate('/login')} style={styles.tubelightAuthBtn}>Войти</button>
          )}
        </div>
      </nav>

      {/* ============ MOBILE BOTTOM NAV ============ */}
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

      {/* ============ MOBILE MENU OVERLAY ============ */}
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
            <a href="/services">Услуги</a>
            <a href="/faq">FAQ</a>
            <a href="/calculator">Калькулятор</a>
            <a href="/contacts" className="active">Контакты</a>
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

      {/* ============ DARK HERO ============ */}
      <section style={{ ...styles.hero, ...(isMobile ? { padding: '80px 16px 48px' } : {}) }}>
        {/* Floating blobs */}
        <div style={styles.heroBlobContainer}>
          <div style={{ ...styles.heroBlob, width: 200, height: 200, background: PRIMARY, top: -60, left: '10%', opacity: 0.25, filter: 'blur(80px)' }} />
          <div style={{ ...styles.heroBlob, width: 160, height: 160, background: '#5EEAD4', top: 20, right: '15%', opacity: 0.18, filter: 'blur(60px)' }} />
          <div style={{ ...styles.heroBlob, width: 120, height: 120, background: '#818CF8', bottom: -40, left: '45%', opacity: 0.15, filter: 'blur(70px)' }} />
        </div>
        <div style={styles.heroContent}>
          <h1 style={{ ...styles.heroTitle, ...(isMobile ? { fontSize: 26 } : {}) }}>Контакты RENEXPRESS</h1>
          <p style={{ ...styles.heroSubtitle, ...(isMobile ? { fontSize: 14 } : {}) }}>
            Свяжитесь с нами любым удобным способом. Менеджеры в Стамбуле и Москве на связи для вас.
          </p>
        </div>
      </section>

      {/* ============ CONTACT CARDS ============ */}
      <section style={{ ...styles.contactSection, ...(isMobile ? { padding: '48px 16px' } : {}) }}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitleLight}>Наши контакты</h2>
          <p style={styles.sectionSubtitleLight}>Выберите удобный способ связи с нашей командой</p>
          <div style={{ ...styles.contactGrid, ...(isMobile ? { gridTemplateColumns: '1fr' } : {}) }}>
            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.link}
                target={c.link.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="contact-glass-card"
                style={{ ...styles.contactCard, ...(isMobile ? { padding: 20 } : {}) }}
              >
                <div style={styles.contactIconCircle}>
                  {renderContactIcon(c.icon)}
                </div>
                <h3 style={styles.contactTitle}>{c.title}</h3>
                <p style={styles.contactValue}>{c.value}</p>
                <span style={styles.contactArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOCIAL & BRANDS ============ */}
      <section style={{ ...styles.socialSection, ...(isMobile ? { padding: '48px 16px' } : {}) }}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitleLight}>Мы в соцсетях</h2>
          <div style={{ ...styles.socialGrid, ...(isMobile ? { gridTemplateColumns: '1fr' } : {}) }}>
            <a href="https://instagram.com/renat_karaliev" target="_blank" rel="noopener noreferrer" className="contact-glass-card" style={{ ...styles.socialCard, ...(isMobile ? { padding: '24px 16px' } : {}) }}>
              <div style={styles.socialIconCircle}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <h3 style={styles.socialTitle}>Instagram</h3>
              <p style={styles.socialHandle}>@renat_karaliev</p>
            </a>
            <a href="https://www.rencargo.com" target="_blank" rel="noopener noreferrer" className="contact-glass-card" style={{ ...styles.socialCard, ...(isMobile ? { padding: '24px 16px' } : {}) }}>
              <div style={{ ...styles.socialIconCircle, background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 style={styles.socialTitle}>RENCARGO</h3>
              <p style={styles.socialHandle}>www.rencargo.com</p>
            </a>
          </div>
          <div style={{ ...styles.brandsRow, ...(isMobile ? { flexWrap: 'wrap', justifyContent: 'center' } : {}) }}>
            {['RENEXPRESS', 'RENCARGO TRANSPORTATION', 'RENSHOPPING ISTANBUL', 'RENFABRIK'].map((brand) => (
              <span key={brand} className="contact-glass-card" style={styles.brandTag}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WAREHOUSES ============ */}
      <section style={{ ...styles.warehouseSection, ...(isMobile ? { padding: '48px 16px' } : {}) }}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitleDark, ...(isMobile ? { fontSize: 22 } : {}) }}>Наши склады</h2>
          <p style={styles.sectionSubtitleDark}>Складские помещения для приёма и отправки грузов</p>
          <div style={{ ...styles.warehouseGrid, ...(isMobile ? { gridTemplateColumns: '1fr' } : {}) }}>
            {/* Moscow */}
            <div style={styles.warehouseCard}>
              <div style={{ ...styles.warehouseHeader, ...(isMobile ? { padding: '20px 20px 0' } : {}) }}>
                <div style={styles.warehouseBadge}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Россия</span>
                </div>
                <h3 style={styles.warehouseTitle}>Склад в Москве</h3>
              </div>
              <div style={{ ...styles.warehouseBody, ...(isMobile ? { padding: '12px 20px' } : {}) }}>
                <div style={styles.warehouseDetail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>ул. Южнопортовая 7а, стр 2, склад 8, ворота 1</span>
                </div>
                <div style={styles.warehouseDetail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Пн-Пт: 09:00-18:00</span>
                </div>
                <div style={styles.warehouseDetail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>Менеджер: <a href="https://wa.me/905511898299" style={{ color: PRIMARY, textDecoration: 'none', fontWeight: 600 }}>+90 551 189 82 99</a></span>
                </div>
              </div>
              <div style={{ ...styles.mapContainer, ...(isMobile ? { padding: '0 20px 20px' } : {}) }}>
                <iframe
                  title="Склад RENEXPRESS Москва"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2247.5!2d37.6573!3d55.7058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0YPQuy4g0K7QttC90L7Qv9C-0YDRgtC-0LLQsNGPIDdhLCDRgdGC0YAgMg!5e0!3m2!1sru!2sru!4v1700000000000"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Istanbul */}
            <div style={styles.warehouseCard}>
              <div style={{ ...styles.warehouseHeader, ...(isMobile ? { padding: '20px 20px 0' } : {}) }}>
                <div style={styles.warehouseBadge}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Турция</span>
                </div>
                <h3 style={styles.warehouseTitle}>Офис в Стамбуле</h3>
              </div>
              <div style={{ ...styles.warehouseBody, ...(isMobile ? { padding: '12px 20px' } : {}) }}>
                <div style={styles.warehouseDetail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>Телефон офиса: 0212 522 55 50</span>
                </div>
                <div style={styles.warehouseDetail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Пн-Сб: 09:00-19:00</span>
                </div>
                <div style={styles.warehouseDetail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>Менеджер: <a href="https://wa.me/905511898288" style={{ color: PRIMARY, textDecoration: 'none', fontWeight: 600 }}>+90 551 189 82 88</a></span>
                </div>
                <div style={styles.warehouseDetail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>Байер: <a href="https://wa.me/905511898289" style={{ color: PRIMARY, textDecoration: 'none', fontWeight: 600 }}>+90 551 189 82 89</a></span>
                </div>
              </div>
              <div style={{ ...styles.warehouseDescBox, ...(isMobile ? { padding: '0 20px 20px' } : {}) }}>
                <p style={styles.warehouseDesc}>
                  Стамбульский офис координирует приём товаров от поставщиков, упаковку, консолидацию
                  и ежедневную отправку грузов в Россию. Наш байер поможет с поиском и закупкой товаров
                  у турецких поставщиков.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ APP CTA ============ */}
      <section style={{ ...styles.appCtaSection, ...(isMobile ? { padding: '48px 16px' } : {}) }}>
        <div style={styles.container}>
          <div className="contact-glass-card" style={{ ...styles.appCtaCard, ...(isMobile ? { padding: 24 } : {}) }}>
            <div style={{ ...styles.appCtaContent, ...(isMobile ? { flexDirection: 'column', textAlign: 'center' } : {}) }}>
              <div style={styles.appCtaText}>
                <h3 style={styles.appCtaTitle}>Скачайте приложение RENEXPRESS</h3>
                <p style={styles.appCtaDesc}>Отслеживайте доставки, создавайте заказы и общайтесь с поддержкой в приложении</p>
              </div>
              <div style={{ ...styles.appCtaButtons, ...(isMobile ? { flexDirection: 'column', alignItems: 'stretch', width: '100%' } : {}) }}>
                <a href="https://apps.apple.com/app/renexpress/id6757761284" target="_blank" rel="noopener noreferrer" style={{ ...styles.appStoreBtn, ...(isMobile ? { justifyContent: 'center', width: '100%' } : {}) }}>
                  <svg width="20" height="24" viewBox="0 0 384 512" fill="#fff">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Загрузите в</div>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>App Store</div>
                  </div>
                </a>
                <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" style={{ ...styles.whatsappBtn, ...(isMobile ? { justifyContent: 'center', width: '100%' } : {}) }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href="tel:+905070107070" style={{ ...styles.callBtn, ...(isMobile ? { justifyContent: 'center', width: '100%' } : {}) }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SEO TEXT ============ */}
      <section style={{ ...styles.seoSection, ...(isMobile ? { padding: '40px 16px' } : {}) }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={styles.seoTitle}>Контакты карго компании RENEXPRESS — доставка из Турции в Россию</h2>
          <p style={styles.seoText}>
            RENEXPRESS — карго компания с офисами в Стамбуле и Москве, специализирующаяся на доставке грузов
            из Турции в Россию. Связаться с нами можно по телефону, через WhatsApp или в мобильном приложении.
            Наш турецкий номер: +905070107070, российский: +7 928 970 7010. Менеджеры в Стамбуле и Москве
            доступны в WhatsApp для консультаций по тарифам, оформлению заказов и отслеживанию доставок.
            Склад в Москве расположен по адресу ул. Южнопортовая 7а, стр 2 и работает с понедельника
            по пятницу с 09:00 до 18:00. Офис в Стамбуле работает с понедельника по субботу с 09:00 до 19:00.
            Мы являемся частью группы компаний: RENEXPRESS, RENCARGO TRANSPORTATION, RENSHOPPING ISTANBUL, RENFABRIK.
            Скачайте приложение RENEXPRESS из App Store для удобного отслеживания доставок и связи с поддержкой.
          </p>
        </div>
      </section>

      {/* ============ CREATIVE FOOTER ============ */}
      <footer className="footer" style={{ ...styles.footer, ...(isMobile ? { paddingBottom: 80 } : {}) }}>
        {/* Animated gradient blobs */}
        <div className="footer-blobs" style={styles.footerBlobs}>
          <div className="footer-blob footer-blob-1" />
          <div className="footer-blob footer-blob-2" />
          <div className="footer-blob footer-blob-3" />
        </div>

        {/* Glass divider at top */}
        <div style={styles.footerTopDivider} />

        {/* Footer columns grid */}
        <div className="footer-content" style={{ ...styles.footerGrid, ...(isMobile ? { gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 } : {}) }}>
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
          <p style={styles.copyright}>&copy; 2026 RENEXPRESS. Все права защищены.</p>
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

      {/* ============ INLINE STYLE TAG FOR HOVER EFFECTS ============ */}
      <style>{`
        .contact-glass-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
        }
        .contact-glass-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 40px rgba(61,139,139,0.2), inset 0 1px 0 rgba(255,255,255,0.15) !important;
          border-color: rgba(61,139,139,0.4) !important;
        }
        @media (max-width: 768px) {
          .contacts-grid-responsive {
            grid-template-columns: 1fr 1fr !important;
          }
          .warehouse-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .social-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .brands-row-responsive {
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          .app-cta-buttons-responsive {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .app-cta-content-responsive {
            flex-direction: column !important;
            text-align: center !important;
          }
        }
        @media (max-width: 480px) {
          .contacts-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
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
    boxShadow: '0 0 12px 4px rgba(61,139,139,0.4), 0 0 24px 8px rgba(61,139,139,0.2)',
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
  hero: {
    position: 'relative',
    backgroundColor: '#111827',
    paddingTop: 100,
    paddingBottom: 64,
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroBlobContainer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  heroBlob: {
    position: 'absolute',
    borderRadius: '50%',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 800,
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 16,
    lineHeight: 1.15,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.7,
    maxWidth: 560,
    margin: '0 auto',
  },

  // Container
  container: {
    maxWidth: 1280,
    margin: '0 auto',
  },

  // Contact Cards Section
  contactSection: {
    backgroundColor: '#0B1120',
    padding: '72px 24px',
  },
  sectionTitleLight: {
    fontSize: 36,
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  sectionSubtitleLight: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 48,
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
    maxWidth: 960,
    margin: '0 auto',
  },
  contactCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 32,
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.08)',
    textDecoration: 'none',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  contactIconCircle: {
    width: 60,
    height: 60,
    background: `linear-gradient(135deg, ${PRIMARY}, #2a6b6b)`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    boxShadow: '0 4px 20px rgba(61,139,139,0.3)',
  },
  contactTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 17,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 8,
  },
  contactArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    backgroundColor: 'rgba(61,139,139,0.15)',
    borderRadius: '50%',
    marginTop: 4,
  },

  // Social Section
  socialSection: {
    backgroundColor: '#111827',
    padding: '72px 24px',
  },
  socialGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
    maxWidth: 640,
    margin: '0 auto 40px',
  },
  socialCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 24px',
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.08)',
    textDecoration: 'none',
    textAlign: 'center',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  socialIconCircle: {
    width: 56,
    height: 56,
    background: 'linear-gradient(135deg, #E1306C, #C13584)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    boxShadow: '0 4px 20px rgba(225,48,108,0.3)',
  },
  socialTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 4,
  },
  socialHandle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  brandsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  brandTag: {
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 50,
    fontSize: 13,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.5,
    cursor: 'default',
  },

  // Warehouses
  warehouseSection: {
    backgroundColor: '#fff',
    padding: '72px 24px',
  },
  sectionTitleDark: {
    fontSize: 36,
    fontWeight: 700,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  sectionSubtitleDark: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 48,
  },
  warehouseGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 32,
    maxWidth: 1080,
    margin: '0 auto',
  },
  warehouseCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    border: '1px solid #E5E7EB',
    overflow: 'hidden',
  },
  warehouseHeader: {
    padding: '24px 28px 0',
  },
  warehouseBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    backgroundColor: 'rgba(61,139,139,0.08)',
    borderRadius: 50,
    fontSize: 13,
    fontWeight: 600,
    color: PRIMARY,
    marginBottom: 12,
  },
  warehouseTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 4,
  },
  warehouseBody: {
    padding: '16px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  warehouseDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 1.5,
  },
  warehouseDescBox: {
    padding: '0 28px 28px',
  },
  warehouseDesc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 1.7,
    padding: 16,
    backgroundColor: 'rgba(61,139,139,0.04)',
    borderRadius: 12,
    borderLeft: `3px solid ${PRIMARY}`,
  },
  mapContainer: {
    padding: '0 28px 28px',
  },

  // App CTA
  appCtaSection: {
    backgroundColor: '#0B1120',
    padding: '72px 24px',
  },
  appCtaCard: {
    maxWidth: 960,
    margin: '0 auto',
    padding: 48,
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderRadius: 24,
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 48px rgba(0,0,0,0.25)',
  },
  appCtaContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32,
    flexWrap: 'wrap',
  },
  appCtaText: {
    flex: 1,
    minWidth: 280,
  },
  appCtaTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 8,
    lineHeight: 1.3,
  },
  appCtaDesc: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.6,
  },
  appCtaButtons: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  appStoreBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#000',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: 12,
    textDecoration: 'none',
    transition: 'transform 0.2s',
    border: '1px solid rgba(255,255,255,0.15)',
  },
  whatsappBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 24px',
    backgroundColor: '#25D366',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 12,
    textDecoration: 'none',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
  },
  callBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 24px',
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

  // SEO Section
  seoSection: {
    padding: '56px 24px',
    backgroundColor: '#F9FAFB',
    borderTop: '1px solid #E5E7EB',
  },
  seoTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 16,
  },
  seoText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 1.8,
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
  footerTopDivider: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1280,
    margin: '0 auto 48px',
    padding: '0 24px',
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
  },
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

export default Contacts;

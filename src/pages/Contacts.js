import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/responsive.css';
import useIsMobile from '../hooks/useIsMobile';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { useTranslation } from '../i18n/LanguageContext';
import { SITE } from '../config/site';
import { COLORS, GRADIENT, SHADOW } from '../config/theme';

function Contacts({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const contacts = [
    { title: 'Телефон (Турция)', value: '+90 551 189 82 88', link: 'tel:+905511898288', icon: 'phone' },
    { title: 'Телефон (Россия)', value: '+7 928 970 70 10', link: 'tel:+79289707010', icon: 'phone' },
    { title: 'WhatsApp', value: '+90 551 189 82 88', link: 'https://wa.me/905511898288', icon: 'whatsapp' },
    { title: 'Email', value: 'Inforencargo@gmail.com', link: 'mailto:Inforencargo@gmail.com', icon: 'mail' },
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

  const MailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>
    </svg>
  );

  const renderContactIcon = (icon) => {
    if (icon === 'phone') return <PhoneIcon />;
    if (icon === 'office') return <OfficeIcon />;
    if (icon === 'whatsapp') return <WhatsAppIcon />;
    if (icon === 'mail') return <MailIcon />;
    return null;
  };

  return (
    <div style={styles.page}>
      <SEO
        titleKey="seo.contacts.title"
        descriptionKey="seo.contacts.description"
        translatedLanguages={['ru']}
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: t('common.contacts'), path: '/contacts' },
        ]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* ============ HERO ============ */}
      <section style={{ ...styles.hero, ...(isMobile ? { padding: '80px 16px 48px' } : {}) }}>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2">
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
            <a href="https://instagram.com/rencargo" target="_blank" rel="noopener noreferrer" className="contact-glass-card" style={{ ...styles.socialCard, ...(isMobile ? { padding: '24px 16px' } : {}) }}>
              <div style={styles.socialIconCircle}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <h3 style={styles.socialTitle}>Instagram</h3>
              <p style={styles.socialHandle}>@rencargo</p>
            </a>
            <a href="https://t.me/RENEXPRESS" target="_blank" rel="noopener noreferrer" className="contact-glass-card" style={{ ...styles.socialCard, ...(isMobile ? { padding: '24px 16px' } : {}) }}>
              <div style={{ ...styles.socialIconCircle, background: 'linear-gradient(135deg, #37BBFE, #007DBB)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                  <path d="M21.94 4.68a1.5 1.5 0 0 0-1.56-.24L3.3 11.2c-1.1.45-1.06 2.03.06 2.42l4.2 1.46 1.6 5.05a1 1 0 0 0 1.7.38l2.3-2.42 4.3 3.16a1.5 1.5 0 0 0 2.35-.94l2.9-14.1a1.5 1.5 0 0 0-.77-1.63zM9.9 14.2l8-5.02-6.6 6.03a1 1 0 0 0-.3.6l-.25 2.02z"/>
                </svg>
              </div>
              <h3 style={styles.socialTitle}>Telegram</h3>
              <p style={styles.socialHandle}>t.me/RENEXPRESS</p>
            </a>
            <a href="https://youtube.com/@Renat_Karaliev" target="_blank" rel="noopener noreferrer" className="contact-glass-card" style={{ ...styles.socialCard, ...(isMobile ? { padding: '24px 16px' } : {}) }}>
              <div style={{ ...styles.socialIconCircle, background: 'linear-gradient(135deg, #FF4E45, #C4302B)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/>
                </svg>
              </div>
              <h3 style={styles.socialTitle}>YouTube</h3>
              <p style={styles.socialHandle}>@Renat_Karaliev</p>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
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
                  <span>WhatsApp: <a href="https://wa.me/905511898288" style={{ color: COLORS.primaryText, textDecoration: 'none', fontWeight: 600 }}>+90 551 189 82 88</a></span>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Турция</span>
                </div>
                <h3 style={styles.warehouseTitle}>Офис в Стамбуле</h3>
              </div>
              <div style={{ ...styles.warehouseBody, ...(isMobile ? { padding: '12px 20px' } : {}) }}>
                <div style={styles.warehouseDetail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <a href="https://goo.gl/maps/n5zZ2eL27Uq98eQH6" target="_blank" rel="noopener noreferrer" style={{ color: '#374151', textDecoration: 'none' }}>Kemalpaşa Mah., Atatürk Blv., Emlak Pasajı No:30/1, 34134 İstanbul</a>
                </div>
                <div style={styles.warehouseDetail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Пн-Пт: 09:00-18:00</span>
                </div>
                <div style={styles.warehouseDetail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>WhatsApp: <a href="https://wa.me/905511898288" style={{ color: COLORS.primaryText, textDecoration: 'none', fontWeight: 600 }}>+90 551 189 82 88</a></span>
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
                <a href={SITE.social.googlePlay} target="_blank" rel="noopener noreferrer" style={{ ...styles.appStoreBtn, ...(isMobile ? { justifyContent: 'center', width: '100%' } : {}) }}>
                  <svg width="20" height="22" viewBox="0 0 512 512" fill="#fff">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Загрузите в</div>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>Google Play</div>
                  </div>
                </a>
                <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" style={{ ...styles.whatsappBtn, ...(isMobile ? { justifyContent: 'center', width: '100%' } : {}) }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href="tel:+905511898288" style={{ ...styles.callBtn, ...(isMobile ? { justifyContent: 'center', width: '100%' } : {}) }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#157070" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
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
            Наш турецкий номер и WhatsApp: +90 551 189 82 88, российский: +7 928 970 70 10.
            Email: Inforencargo@gmail.com. Мы доступны в WhatsApp для консультаций по тарифам,
            оформлению заказов и отслеживанию доставок.
            Склад в Москве расположен по адресу ул. Южнопортовая 7а, стр 2 и работает с понедельника
            по пятницу с 09:00 до 18:00. Офис в Стамбуле работает с понедельника по пятницу с 09:00 до 18:00.
            Мы являемся частью группы компаний: RENEXPRESS, RENCARGO TRANSPORTATION, RENSHOPPING ISTANBUL, RENFABRIK.
            Скачайте приложение RENEXPRESS из App Store для удобного отслеживания доставок и связи с поддержкой.
          </p>
        </div>
      </section>

      {/* ============ CREATIVE FOOTER ============ */}
      <footer className="footer" style={{ ...styles.footer, ...(isMobile ? { paddingBottom: 80 } : {}) }}>
        {/* Divider at top */}
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
              <a href="https://instagram.com/rencargo" target="_blank" rel="noopener noreferrer" className="footer-social" style={styles.footerSocialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="footer-social" style={styles.footerSocialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://www.rencargo.com" target="_blank" rel="noopener noreferrer" className="footer-social" style={styles.footerSocialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
              <a href="tel:+905511898288" className="footer-social" style={styles.footerSocialBtn}>
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
            <a href={SITE.social.appStore} target="_blank" rel="noopener noreferrer" className="footer-link" style={styles.footerLink}>Приложение iOS</a>
            <a href={SITE.social.googlePlay} target="_blank" rel="noopener noreferrer" className="footer-link" style={styles.footerLink}>Приложение Android</a>
          </div>

          {/* Contact column with icons */}
          <div style={styles.footerCol}>
            <h5 style={styles.footerColTitle}>Контакты</h5>
            <a href="mailto:Inforencargo@gmail.com" className="footer-link" style={styles.footerContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2" style={{ flexShrink: 0 }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>Inforencargo@gmail.com</span>
            </a>
            <a href="tel:+905511898288" className="footer-link" style={styles.footerContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+90 551 189 82 88</span>
            </a>
            <a href="tel:+79289707010" className="footer-link" style={styles.footerContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+7 928 970 70 10</span>
            </a>
            <div className="footer-link" style={styles.footerContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
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
          box-shadow: 0 8px 24px rgba(16,24,40,0.08) !important;
          border-color: rgba(42,171,171,0.4) !important;
        }
        .footer .footer-link:hover { color: #157070 !important; }
        .footer .footer-social:hover {
          color: #157070 !important;
          background: rgba(42,171,171,0.12) !important;
          border-color: rgba(42,171,171,0.4) !important;
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

  // Hero
  hero: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    paddingTop: 100,
    paddingBottom: 64,
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: 'center',
    overflow: 'hidden',
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
    color: COLORS.text,
    marginBottom: 16,
    lineHeight: 1.15,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 18,
    color: COLORS.textSecond,
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
    backgroundColor: '#F5F5F5',
    padding: '72px 24px',
  },
  sectionTitleLight: {
    fontSize: 36,
    fontWeight: 700,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  sectionSubtitleLight: {
    fontSize: 16,
    color: COLORS.textSecond,
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
    background: '#FFFFFF',
    borderRadius: 20,
    border: '1px solid #E8E8E8',
    textDecoration: 'none',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: SHADOW.card,
  },
  contactIconCircle: {
    width: 60,
    height: 60,
    background: GRADIENT,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    boxShadow: '0 4px 20px rgba(42,171,171,0.28)',
  },
  contactTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.textSecond,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 17,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 8,
  },
  contactArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    backgroundColor: 'rgba(42,171,171,0.12)',
    borderRadius: '50%',
    marginTop: 4,
  },

  // Social Section
  socialSection: {
    backgroundColor: '#FFFFFF',
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
    background: '#FFFFFF',
    borderRadius: 20,
    border: '1px solid #E8E8E8',
    textDecoration: 'none',
    textAlign: 'center',
    boxShadow: SHADOW.card,
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
    color: COLORS.text,
    marginBottom: 4,
  },
  socialHandle: {
    fontSize: 14,
    color: COLORS.textSecond,
  },
  brandsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  brandTag: {
    padding: '10px 20px',
    background: '#FFFFFF',
    border: '1px solid #E8E8E8',
    borderRadius: 50,
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.textSecond,
    letterSpacing: 0.5,
    cursor: 'default',
  },

  // Warehouses
  warehouseSection: {
    backgroundColor: '#FAFAFA',
    padding: '72px 24px',
  },
  sectionTitleDark: {
    fontSize: 36,
    fontWeight: 700,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  sectionSubtitleDark: {
    fontSize: 16,
    color: COLORS.textSecond,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    border: '1px solid #E8E8E8',
    boxShadow: SHADOW.card,
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
    backgroundColor: 'rgba(42,171,171,0.10)',
    borderRadius: 50,
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.primaryText,
    marginBottom: 12,
  },
  warehouseTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.text,
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
    color: COLORS.textSecond,
    lineHeight: 1.5,
  },
  warehouseDescBox: {
    padding: '0 28px 28px',
  },
  warehouseDesc: {
    fontSize: 14,
    color: COLORS.textSecond,
    lineHeight: 1.7,
    padding: 16,
    backgroundColor: 'rgba(42,171,171,0.06)',
    borderRadius: 12,
    borderLeft: `3px solid ${COLORS.primary}`,
  },
  mapContainer: {
    padding: '0 28px 28px',
  },

  // App CTA
  appCtaSection: {
    backgroundColor: '#F5F5F5',
    padding: '72px 24px',
  },
  appCtaCard: {
    maxWidth: 960,
    margin: '0 auto',
    padding: 48,
    background: '#FFFFFF',
    borderRadius: 24,
    border: '1px solid #E8E8E8',
    boxShadow: SHADOW.card,
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
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 1.3,
  },
  appCtaDesc: {
    fontSize: 15,
    color: COLORS.textSecond,
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
    justifyContent: 'center',
    gap: 8,
    padding: '14px 24px',
    minHeight: 48,
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #2AABAB',
    color: COLORS.primaryText,
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 12,
    textDecoration: 'none',
    transition: 'transform 0.2s, background 0.2s',
  },

  // SEO Section
  seoSection: {
    padding: '56px 24px',
    backgroundColor: '#FAFAFA',
    borderTop: '1px solid #EEEEEE',
  },
  seoTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 16,
  },
  seoText: {
    fontSize: 15,
    color: COLORS.textSecond,
    lineHeight: 1.8,
  },

  // Footer
  footer: {
    position: 'relative',
    backgroundColor: '#F5F5F5',
    padding: '0 0 24px',
    overflow: 'hidden',
  },
  footerTopDivider: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1280,
    margin: '0 auto 48px',
    padding: '0 24px',
    height: 1,
    background: '#EEEEEE',
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
    backgroundColor: COLORS.primary,
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
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E8E8',
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
    background: '#EEEEEE',
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
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E8E8',
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
    color: COLORS.textSecond,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
};

export default Contacts;

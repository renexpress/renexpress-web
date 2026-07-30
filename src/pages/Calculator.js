import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/responsive.css';
import useIsMobile from '../hooks/useIsMobile';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CalcWidget from '../components/CalcWidget';
import { useTranslation } from '../i18n/LanguageContext';
import { SITE } from '../config/site';
import { COLORS, GRADIENT, SHADOW } from '../config/theme';

const PRIMARY = COLORS.primary; // #2AABAB — fills / icon strokes / borders / big numbers

function Calculator({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  // Single source of truth — tariffs come from SITE.tariffs (synced with DB / mobile app).
  // Used by the tariff comparison grid below; the calculator itself is <CalcWidget/>.
  const deliveryTypes = SITE.tariffs.map(tf => ({
    code: tf.id,
    name: tf.name,
    price: tf.pricePerKg,
    days: `${tf.transitDaysMin}-${tf.transitDaysMax}`,
    desc: tf.category,
    mode: tf.mode,
  }));

  return (
    <div style={styles.page}>
      <SEO
        titleKey="seo.calculator.title"
        descriptionKey="seo.calculator.description"
        translatedLanguages={['ru']}
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: t('common.calculator'), path: '/calculator' },
        ]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />



      {/* ====== HERO ====== */}
      <section style={{...styles.hero, ...(isMobile ? {padding: '80px 16px 48px'} : {})}}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
              <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
            </svg>
            <span>Онлайн-расчёт</span>
          </div>
          <h1 style={{...styles.heroTitle, fontSize: isMobile ? 26 : 48}}>Калькулятор стоимости доставки</h1>
          <p style={{...styles.heroSubtitle, fontSize: isMobile ? 14 : 17}}>
            Рассчитайте стоимость доставки груза из Турции в Россию онлайн.
            Выберите тип доставки и укажите вес — получите результат мгновенно.
          </p>
        </div>
      </section>

      {/* ====== CALCULATOR SECTION ====== */}
      <section style={{...styles.calcSection, ...(isMobile ? {padding: '40px 16px 60px'} : {})}}>
        <div style={styles.calcContainer}>
          <CalcWidget isMobile={isMobile} />
        </div>
      </section>

      {/* ====== TARIFF COMPARISON SECTION ====== */}
      <section style={{...styles.tariffSection, ...(isMobile ? {padding: '48px 16px'} : {})}}>
        <div style={styles.tariffContainer}>
          <h2 style={{...styles.tariffSectionTitle, fontSize: isMobile ? 22 : 36}}>Все тарифы</h2>
          <p style={styles.tariffSectionSubtitle}>{SITE.tariffs.length} тарифов доставки из Стамбула в Москву</p>
          <div className="tariff-grid" style={{...styles.tariffGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 24}}>
            {deliveryTypes.map((dt, i) => (
              <div key={i} className="tariff-card" style={{...styles.tariffCard, padding: isMobile ? 20 : 28}}>
                <div style={styles.tariffCardShimmer} />
                <div style={styles.tariffIconWrap}>
                  {dt.mode !== 'air' ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                      <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  )}
                </div>
                <h3 style={styles.tariffName}>{dt.name}</h3>
                <div style={{...styles.tariffPrice, fontSize: isMobile ? 32 : 40}}>
                  ${dt.price}<span style={styles.tariffUnit}>/кг</span>
                </div>
                <div style={styles.tariffDays}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" style={{ marginRight: 6, flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {dt.days} дней
                </div>
                <p style={styles.tariffDesc}>{dt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaCard}>
          {/* Accent shimmer */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(42,171,171,0.35), transparent)',
          }} />
          <h2 style={{...styles.ctaTitle, fontSize: isMobile ? 22 : 32}}>Готовы отправить груз?</h2>
          <p style={styles.ctaDesc}>Свяжитесь с нами для оформления заказа или скачайте приложение</p>
          <div style={{...styles.ctaButtons, ...(isMobile ? {flexDirection: 'column', alignItems: 'stretch'} : {})}}>
            <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="cta-btn-whatsapp" style={{...styles.ctaWhatsappBtn, ...(isMobile ? {width: '100%', justifyContent: 'center', boxSizing: 'border-box'} : {})}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Написать в WhatsApp
            </a>
            <button onClick={() => navigate('/contacts')} className="cta-btn-contacts" style={{...styles.ctaContactsBtn, ...(isMobile ? {width: '100%', justifyContent: 'center', boxSizing: 'border-box'} : {})}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#157070" strokeWidth="2" style={{ marginRight: 8 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Контакты
            </button>
            <a href={SITE.social.appStore} target="_blank" rel="noopener noreferrer" className="cta-btn-appstore" style={{...styles.ctaAppBtn, ...(isMobile ? {width: '100%', justifyContent: 'center', boxSizing: 'border-box'} : {})}}>
              <svg width="16" height="18" viewBox="0 0 384 512" fill="#1A1A1A"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              App Store
            </a>
            <a href={SITE.social.googlePlay} target="_blank" rel="noopener noreferrer" className="cta-btn-appstore" style={{...styles.ctaAppBtn, ...(isMobile ? {width: '100%', justifyContent: 'center', boxSizing: 'border-box'} : {})}}>
              <svg width="16" height="18" viewBox="0 0 512 512" fill="#1A1A1A"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z"/></svg>
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* ====== SEO TEXT SECTION ====== */}
      <section style={styles.seoSection}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={styles.seoTitle}>Калькулятор доставки из Турции в Россию — RENEXPRESS</h2>
          <p style={styles.seoText}>
            Онлайн-калькулятор RENEXPRESS позволяет быстро рассчитать стоимость доставки груза из Стамбула
            в Москву. Выберите тип доставки в зависимости от категории вашего товара и укажите вес —
            система автоматически рассчитает итоговую стоимость перевозки. Мы предлагаем пять тарифов:
            два вида автомобильной доставки (AVTO EXPRESS $4/кг, AVTO ОБУВЬ $5/кг)
            и три вида авиадоставки (AVIA U2 MARKA $8/кг, AVIA U3 $8.5/кг, AVIA EX MARKA $10/кг).
            Минимальный вес отправки составляет 10 килограмм для всех тарифов.
          </p>
          <p style={styles.seoText}>
            Сроки доставки варьируются от 3 до 18 дней. Самая быстрая доставка — AVIA EX MARKA (3-4 дня),
            самая экономичная — AVTO EXPRESS (14-18 дней, $4/кг). Для брендовых товаров и товаров с маркировкой
            рекомендуем тарифы с пометкой MARKA. Для обуви предусмотрены специальные тарифы AVTO ОБУВЬ и AVIA U3.
            Рассчитайте стоимость доставки прямо сейчас и оформите заказ через приложение RENEXPRESS или свяжитесь
            с нашим менеджером по WhatsApp.
          </p>
        </div>
      </section>

      {/* ====== CREATIVE FOOTER ====== */}
      <footer style={{...styles.footer, ...(isMobile ? {paddingBottom: 80} : {})}}>
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
            <a href="/services" className="footer-link" style={styles.footerLink}>Маркировка "Честный знак"</a>
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

          {/* Contact column */}
          <div style={styles.footerCol}>
            <h5 style={styles.footerColTitle}>Контакты</h5>
            <a href="mailto:Inforencargo@gmail.com" className="footer-link" style={styles.footerContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>Inforencargo@gmail.com</span>
            </a>
            <a href="tel:+905511898288" className="footer-link" style={styles.footerContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+90 551 189 82 88</span>
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

        {/* Glass divider */}
        <div style={styles.footerDivider} />

        {/* Bottom bar */}
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
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: COLORS.bg,
    fontFamily: 'Inter, -apple-system, sans-serif',
  },

  // ==================== TUBELIGHT NAVBAR ====================
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
    backgroundColor: '#fff',
    border: '1px solid #E8E8E8',
    padding: '4px 6px',
    borderRadius: 50,
    boxShadow: SHADOW.card,
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
    color: COLORS.textSecond,
    textDecoration: 'none',
    borderRadius: 50,
    transition: 'color 0.3s',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  tubelightLinkActive: {
    color: COLORS.text,
    backgroundColor: 'rgba(42,171,171,0.08)',
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
    boxShadow: '0 0 12px 4px rgba(42,171,171,0.4), 0 0 24px 8px rgba(42,171,171,0.2)',
  },
  tubelightAuthBtn: {
    padding: '8px 18px',
    fontSize: 13,
    fontWeight: 600,
    color: '#fff',
    background: GRADIENT,
    textShadow: '0 1px 2px rgba(10,37,53,.35)',
    border: 'none',
    borderRadius: 50,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    marginLeft: 4,
  },

  // ==================== MOBILE BOTTOM NAV ====================
  mobileBottomNav: {
    display: 'none',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '#fff',
    borderTop: '1px solid #E8E8E8',
    boxShadow: SHADOW.card,
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

  // ==================== HERO ====================
  hero: {
    position: 'relative',
    backgroundColor: COLORS.bgSecond,
    paddingTop: 100,
    paddingBottom: 64,
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroBlobs: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 720,
    margin: '0 auto',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 18px',
    backgroundColor: 'rgba(42,171,171,0.08)',
    border: '1px solid rgba(42,171,171,0.25)',
    borderRadius: 50,
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.primaryText,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 700,
    color: COLORS.text,
    lineHeight: 1.15,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 17,
    color: COLORS.textSecond,
    lineHeight: 1.7,
    maxWidth: 580,
    margin: '0 auto',
  },

  // ==================== CALCULATOR SECTION ====================
  calcSection: {
    padding: '64px 24px 80px',
    backgroundColor: COLORS.bg,
  },
  calcContainer: {
    maxWidth: 560,
    margin: '0 auto',
  },
  calcCard: {
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #E8E8E8',
    borderRadius: 24,
    padding: '40px 36px',
    boxShadow: SHADOW.card,
    overflow: 'hidden',
  },
  calcTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  calcSubtitle: {
    fontSize: 14,
    color: COLORS.textSecond,
    textAlign: 'center',
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.textSecond,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  select: {
    width: '100%',
    padding: '14px 16px',
    minHeight: 48,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: '#F5F5F5',
    border: '1px solid #E0E0E0',
    borderRadius: 12,
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, background-color 0.2s',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    backgroundSize: 16,
    paddingRight: 40,
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    minHeight: 48,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: '#F5F5F5',
    border: '1px solid #E0E0E0',
    borderRadius: 12,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, background-color 0.2s',
  },
  calcBtn: {
    width: '100%',
    padding: '16px',
    minHeight: 48,
    background: GRADIENT,
    color: '#fff',
    textShadow: '0 1px 2px rgba(10,37,53,.35)',
    border: 'none',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: SHADOW.cta,
  },
  warning: {
    color: '#EF4444',
    fontSize: 13,
    marginTop: 12,
    textAlign: 'center',
    padding: '8px 12px',
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderRadius: 8,
    border: '1px solid rgba(239,68,68,0.15)',
  },

  // ==================== RESULT CARD ====================
  resultCard: {
    marginTop: 28,
    padding: 28,
    backgroundColor: 'rgba(42,171,171,0.08)',
    borderRadius: 16,
    border: `1px solid rgba(42,171,171,0.3)`,
  },
  resultHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.text,
    margin: 0,
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 14,
    color: COLORS.textSecond,
  },
  resultValue: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text,
  },
  resultDivider: {
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(42,171,171,0.4), transparent)',
    margin: '16px 0',
  },
  resultTotal: {
    fontSize: 32,
    fontWeight: 700,
    color: PRIMARY,
  },

  // ==================== TARIFF COMPARISON ====================
  tariffSection: {
    padding: '80px 24px',
    backgroundColor: COLORS.bgSecond,
  },
  tariffContainer: {
    maxWidth: 1080,
    margin: '0 auto',
    textAlign: 'center',
  },
  tariffSectionTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 8,
  },
  tariffSectionSubtitle: {
    fontSize: 16,
    color: COLORS.textSecond,
    marginBottom: 48,
  },
  tariffGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
  },
  tariffCard: {
    position: 'relative',
    padding: '32px 24px',
    backgroundColor: '#fff',
    border: '1px solid #E8E8E8',
    borderRadius: 20,
    textAlign: 'center',
    overflow: 'hidden',
    boxShadow: SHADOW.card,
    transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
  },
  tariffCardShimmer: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(42,171,171,0.2), transparent)',
  },
  tariffIconWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    backgroundColor: 'rgba(42,171,171,0.08)',
    borderRadius: 14,
    marginBottom: 16,
  },
  tariffName: {
    fontSize: 15,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  tariffPrice: {
    fontSize: 36,
    fontWeight: 700,
    color: PRIMARY,
    marginBottom: 6,
  },
  tariffUnit: {
    fontSize: 15,
    color: COLORS.textSecond,
    fontWeight: 500,
  },
  tariffDays: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 14,
    color: COLORS.textSecond,
    marginBottom: 12,
  },
  tariffDesc: {
    fontSize: 13,
    color: COLORS.textSecond,
    lineHeight: 1.6,
  },

  // ==================== CTA SECTION ====================
  ctaSection: {
    padding: '80px 24px',
    backgroundColor: COLORS.bg,
    display: 'flex',
    justifyContent: 'center',
  },
  ctaCard: {
    position: 'relative',
    maxWidth: 700,
    width: '100%',
    textAlign: 'center',
    padding: '48px 40px',
    backgroundColor: '#fff',
    border: '1px solid #E8E8E8',
    borderRadius: 24,
    boxShadow: SHADOW.card,
    overflow: 'hidden',
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 12,
  },
  ctaDesc: {
    fontSize: 16,
    color: COLORS.textSecond,
    marginBottom: 32,
    lineHeight: 1.6,
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 14,
    flexWrap: 'wrap',
  },
  ctaWhatsappBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 28px',
    backgroundColor: '#25D366',
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 12,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
  },
  ctaContactsBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '14px 28px',
    backgroundColor: '#fff',
    color: COLORS.primaryText,
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 12,
    border: '1.5px solid #2AABAB',
    cursor: 'pointer',
    transition: 'transform 0.2s, background 0.2s',
  },
  ctaAppBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 24px',
    backgroundColor: '#fff',
    color: COLORS.text,
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 12,
    textDecoration: 'none',
    border: '1px solid #E8E8E8',
    boxShadow: SHADOW.card,
    transition: 'transform 0.2s',
  },

  // ==================== SEO SECTION ====================
  seoSection: {
    padding: '64px 24px',
    backgroundColor: COLORS.bgSecond,
    borderTop: '1px solid #EEEEEE',
  },
  seoTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 20,
  },
  seoText: {
    fontSize: 15,
    color: COLORS.textSecond,
    lineHeight: 1.8,
    marginBottom: 16,
  },

  // ==================== CREATIVE FOOTER ====================
  footer: {
    position: 'relative',
    backgroundColor: COLORS.bgTert,
    borderTop: '1px solid #EEEEEE',
    padding: '0 0 24px',
    overflow: 'hidden',
  },
  footerBlobs: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  footerGrid: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1280,
    margin: '0 auto',
    padding: '56px 24px 40px',
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
    backgroundColor: '#F5F5F5',
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

  // Glass divider
  footerDivider: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px',
    height: 1,
    background: 'linear-gradient(90deg, transparent, #EEEEEE, transparent)',
  },

  // Bottom bar
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
    backgroundColor: '#F5F5F5',
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

export default Calculator;

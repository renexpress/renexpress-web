import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/responsive.css';
import useIsMobile from '../hooks/useIsMobile';
import Navbar from '../components/Navbar';

const PRIMARY = '#3D8B8B';

function About({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const stats = [
    { number: '3000+', label: 'клиентов' },
    { number: '7+', label: 'лет опыта' },
    { number: '6', label: 'типов доставки' },
    { number: '365', label: 'дней в году' },
  ];

  const advantages = [
    {
      title: 'Собственные склады',
      desc: 'Складские помещения в Стамбуле и Москве для надёжного хранения и обработки грузов',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 21v-4h6v4"/>
        </svg>
      ),
    },
    {
      title: 'Мобильное приложение',
      desc: 'Отслеживайте доставку в реальном времени, создавайте заказы и общайтесь с поддержкой',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      ),
    },
    {
      title: 'Доставка до ВБ и OZON',
      desc: 'Доставляем грузы напрямую на склады Wildberries и OZON для продавцов маркетплейсов',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
    },
    {
      title: 'Честный знак',
      desc: 'Помогаем с маркировкой товаров в соответствии с требованиями российского законодательства',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
        </svg>
      ),
    },
    {
      title: 'Прозрачные тарифы',
      desc: 'Фиксированные цены за килограмм без скрытых платежей и дополнительных сборов',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={styles.page}>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* ====== Dark Hero Section ====== */}
      <section style={{...styles.hero, padding: isMobile ? '80px 16px 48px' : '140px 24px 80px'}}>
        {/* Animated blobs */}
        <div style={styles.heroBlobs}>
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-blob hero-blob-3" />
        </div>

        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>О компании</div>
          <h1 style={{...styles.heroTitle, fontSize: isMobile ? 26 : 48, padding: isMobile ? '0 8px' : 0}}>О компании RENEXPRESS</h1>
          <p style={{...styles.heroSubtitle, fontSize: isMobile ? 14 : 18}}>
            Надёжная доставка грузов из Турции в Россию с 2017 года. Карго из Стамбула в Москву для бизнеса и частных клиентов.
          </p>
          <div style={styles.heroButtons}>
            <button onClick={() => navigate('/contacts')} style={{...styles.heroBtnPrimary, width: isMobile ? '100%' : 'auto', padding: isMobile ? '12px 24px' : '14px 32px'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginRight: 8 }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Связаться
            </button>
            <button onClick={() => navigate('/calculator')} style={{...styles.heroBtnSecondary, width: isMobile ? '100%' : 'auto', padding: isMobile ? '12px 24px' : '14px 32px'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginRight: 8 }}>
                <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/>
              </svg>
              Калькулятор
            </button>
          </div>
        </div>
      </section>

      {/* ====== Stats Section ====== */}
      <section style={{...styles.statsSection, padding: isMobile ? '40px 16px' : '64px 24px'}}>
        <div className="statsGrid" style={{...styles.statsGrid, gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20}}>
          {stats.map((stat, i) => (
            <div key={i} style={{...styles.statCard, padding: isMobile ? 20 : 32}}>
              <div className="statNumber" style={{...styles.statNumber, fontSize: isMobile ? 28 : 40}}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== Story Section ====== */}
      <section style={{...styles.storySection, padding: isMobile ? '48px 16px' : '80px 24px'}}>
        <div style={styles.container}>
          <h2 style={{...styles.storySectionTitle, fontSize: isMobile ? 22 : 36}}>Наша история</h2>
          <div style={styles.storyContent}>
            <p style={styles.storyText}>
              Компания RENEXPRESS была основана в 2017 году как карго служба по доставке грузов из Стамбула в Москву.
              Начав с небольших отправок текстиля, мы постепенно расширили географию и ассортимент услуг, став одной
              из ведущих компаний в сфере грузоперевозок из Турции в Россию.
            </p>
            <p style={styles.storyText}>
              Сегодня RENEXPRESS обслуживает более 3000 клиентов из России, Турции, Узбекистана и Казахстана.
              Мы предлагаем шесть различных тарифов на доставку, включая авиа и авто перевозки, а также
              специализированные услуги по маркировке товаров системой «Честный знак» и доставке на склады
              маркетплейсов Wildberries и OZON.
            </p>
            <p style={styles.storyText}>
              Наша миссия — сделать доставку из Турции быстрой, надёжной и доступной для каждого клиента.
              Мы отправляем грузы ежедневно и обеспечиваем полное отслеживание через мобильное приложение RENEXPRESS,
              доступное в App Store. Каждый клиент получает персональный код REN для удобного управления заказами
              и отслеживания доставок.
            </p>
          </div>
        </div>
      </section>

      {/* ====== Advantages Section ====== */}
      <section style={{...styles.advantagesSection, padding: isMobile ? '48px 16px' : '80px 24px'}}>
        <div style={styles.container}>
          <h2 style={{...styles.advantagesSectionTitle, fontSize: isMobile ? 22 : 36}}>Почему выбирают RENEXPRESS</h2>
          <p style={styles.advantagesSectionSubtitle}>
            Мы предоставляем комплексные решения для доставки грузов из Турции в Россию,
            учитывая специфику каждого типа товара и потребности клиента.
          </p>
          <div className="advantagesGrid" style={{...styles.advantagesGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20}}>
            {advantages.map((adv, i) => (
              <div key={i} style={{...styles.advantageCard, padding: isMobile ? 20 : 32}}>
                <div style={styles.advantageIconCircle}>
                  {adv.icon}
                </div>
                <h3 style={styles.advantageTitle}>{adv.title}</h3>
                <p style={styles.advantageDesc}>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Warehouses Section ====== */}
      <section style={{...styles.warehouseSection, padding: isMobile ? '48px 16px' : '80px 24px'}}>
        <div style={styles.container}>
          <h2 style={{...styles.warehouseSectionTitle, fontSize: isMobile ? 22 : 36}}>Наши склады</h2>
          <div className="warehouseGrid" style={{...styles.warehouseGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 28}}>
            <div style={{...styles.warehouseCard, padding: isMobile ? 20 : 32}}>
              <div style={styles.warehouseCardHeader}>
                <div style={styles.warehouseIconCircle}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h3 style={styles.warehouseTitle}>Склад в Москве</h3>
                  <p style={styles.warehouseHours}>Пн-Пт: 09:00-18:00</p>
                </div>
              </div>
              <div style={styles.warehouseDivider} />
              <p style={styles.warehouseAddr}>ул. Южнопортовая 7а, стр 2, склад 8, ворота 1</p>
              <p style={styles.warehouseDesc}>
                Московский склад принимает, хранит и выдаёт грузы клиентам. Удобное расположение рядом
                с транспортными развязками для быстрого получения товара.
              </p>
            </div>
            <div style={{...styles.warehouseCard, padding: isMobile ? 20 : 32}}>
              <div style={styles.warehouseCardHeader}>
                <div style={styles.warehouseIconCircle}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h3 style={styles.warehouseTitle}>Офис в Стамбуле</h3>
                  <p style={styles.warehouseHours}>Пн-Сб: 09:00-19:00</p>
                </div>
              </div>
              <div style={styles.warehouseDivider} />
              <p style={styles.warehouseAddr}>Тел: +90 551 189 82 88</p>
              <p style={styles.warehouseDesc}>
                Стамбульский офис координирует приём товаров от поставщиков, упаковку, консолидацию
                и ежедневную отправку грузов в Россию.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA Section ====== */}
      <section style={styles.ctaSection}>
        <div style={{...styles.ctaCard, padding: isMobile ? '28px 20px' : '48px 40px'}}>
          <h2 style={{...styles.ctaTitle, fontSize: isMobile ? 22 : 32}}>Начните доставку с RENEXPRESS</h2>
          <p style={styles.ctaDesc}>Скачайте приложение или свяжитесь с нами для оформления заказа</p>
          <div style={styles.ctaButtons}>
            <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="footer-cta-btn" style={{...styles.ctaWhatsapp, width: isMobile ? '100%' : 'auto'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Написать в WhatsApp
            </a>
            <a href="https://apps.apple.com/app/renexpress/id6757761284" target="_blank" rel="noopener noreferrer" className="footer-cta-btn" style={{...styles.ctaAppStore, width: isMobile ? '100%' : 'auto'}}>
              <svg width="16" height="18" viewBox="0 0 384 512" fill="#fff"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              App Store
            </a>
            <a href="tel:+905070107070" className="footer-cta-btn" style={{...styles.ctaCall, width: isMobile ? '100%' : 'auto'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Позвонить
            </a>
          </div>
        </div>
      </section>

      {/* ====== SEO Text Section ====== */}
      <section style={styles.seoSection}>
        <div style={styles.container}>
          <h2 style={styles.seoTitle}>Карго доставка из Турции в Россию - RENEXPRESS</h2>
          <p style={styles.seoText}>
            RENEXPRESS — это ведущая компания в сфере грузоперевозок из Турции в Россию, специализирующаяся
            на карго доставке текстиля, обуви и других товаров турецкого производства. Наш опыт работы
            на рынке международных перевозок с 2017 года позволяет предлагать клиентам оптимальные решения
            по доставке грузов из Стамбула в Москву и другие города России. Мы работаем как с крупными
            оптовыми покупателями, так и с индивидуальными предпринимателями, которые закупают товары
            в Турции для продажи на российских маркетплейсах Wildberries и OZON. Карго служба RENEXPRESS
            обеспечивает бесперебойную логистическую цепочку от момента забора груза у турецкого поставщика
            до его выдачи на складе в Москве. Прозрачное ценообразование, различные тарифы для разных
            категорий товаров, профессиональная упаковка и маркировка, таможенное оформление, отслеживание
            груза в реальном времени через мобильное приложение — всё это делает RENEXPRESS надёжным
            партнёром для вашего бизнеса.
          </p>
        </div>
      </section>

      {/* ====== Creative Footer ====== */}
      <footer className="footer" style={{...styles.footer, paddingBottom: isMobile ? 80 : 24}}>
        {/* Animated gradient blobs */}
        <div className="footer-blobs" style={styles.footerBlobs}>
          <div className="footer-blob footer-blob-1" />
          <div className="footer-blob footer-blob-2" />
          <div className="footer-blob footer-blob-3" />
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
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0B1120',
    fontFamily: 'Inter, -apple-system, sans-serif',
  },

  // ====== Tubelight Navbar ======
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

  // ====== Mobile Bottom Nav ======
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

  // ====== Dark Hero ======
  hero: {
    position: 'relative',
    backgroundColor: '#111827',
    padding: '140px 24px 80px',
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
    maxWidth: 800,
    margin: '0 auto',
  },
  heroBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(61,139,139,0.15)',
    color: PRIMARY,
    fontSize: 13,
    fontWeight: 600,
    padding: '6px 20px',
    borderRadius: 50,
    border: '1px solid rgba(61,139,139,0.3)',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.15,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.7,
    marginBottom: 36,
    maxWidth: 640,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 14,
    flexWrap: 'wrap',
  },
  heroBtnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '14px 32px',
    backgroundColor: PRIMARY,
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    border: 'none',
    borderRadius: 50,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(61,139,139,0.35)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  heroBtnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '14px 32px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 50,
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'transform 0.2s, background 0.2s',
  },

  // ====== Stats Section ======
  statsSection: {
    backgroundColor: '#0B1120',
    padding: '64px 24px',
  },
  statsGrid: {
    maxWidth: 1080,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
  },
  statCard: {
    padding: 32,
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 20,
    textAlign: 'center',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
  },
  statNumber: {
    fontSize: 40,
    fontWeight: 700,
    color: PRIMARY,
    marginBottom: 8,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 500,
  },

  // ====== Story Section ======
  storySection: {
    backgroundColor: '#fff',
    padding: '80px 24px',
  },
  container: {
    maxWidth: 1280,
    margin: '0 auto',
  },
  storySectionTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 1.2,
  },
  storyContent: {
    maxWidth: 860,
    margin: '0 auto',
  },
  storyText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 1.8,
    marginBottom: 20,
  },

  // ====== Advantages Section ======
  advantagesSection: {
    backgroundColor: '#111827',
    padding: '80px 24px',
  },
  advantagesSectionTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 1.2,
  },
  advantagesSectionSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 1.7,
    maxWidth: 720,
    margin: '0 auto 48px',
  },
  advantagesGrid: {
    maxWidth: 1080,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
  },
  advantageCard: {
    padding: 32,
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 20,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
    transition: 'border-color 0.3s, transform 0.3s',
  },
  advantageIconCircle: {
    width: 52,
    height: 52,
    backgroundColor: PRIMARY,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    boxShadow: '0 4px 16px rgba(61,139,139,0.3)',
  },
  advantageTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#fff',
    marginBottom: 10,
  },
  advantageDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.7,
  },

  // ====== Warehouses Section ======
  warehouseSection: {
    backgroundColor: '#fff',
    padding: '80px 24px',
  },
  warehouseSectionTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 1.2,
  },
  warehouseGrid: {
    maxWidth: 900,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 28,
  },
  warehouseCard: {
    padding: 32,
    backgroundColor: '#FAFAFA',
    border: '1px solid #E5E7EB',
    borderRadius: 20,
    borderTop: `3px solid ${PRIMARY}`,
  },
  warehouseCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  warehouseIconCircle: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(61,139,139,0.08)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  warehouseTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 2,
  },
  warehouseHours: {
    fontSize: 13,
    color: PRIMARY,
    fontWeight: 500,
  },
  warehouseDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  warehouseAddr: {
    fontSize: 15,
    color: '#374151',
    fontWeight: 500,
    marginBottom: 10,
  },
  warehouseDesc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 1.7,
  },

  // ====== CTA Section ======
  ctaSection: {
    backgroundColor: '#0B1120',
    padding: '80px 24px',
  },
  ctaCard: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '48px 40px',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 24,
    textAlign: 'center',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.25)',
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 12,
    lineHeight: 1.25,
  },
  ctaDesc: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 32,
    lineHeight: 1.6,
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 14,
    flexWrap: 'wrap',
  },
  ctaWhatsapp: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 28px',
    backgroundColor: '#25D366',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 50,
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
  },
  ctaAppStore: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 28px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 50,
    textDecoration: 'none',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'transform 0.2s, background 0.2s',
  },
  ctaCall: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 28px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 50,
    textDecoration: 'none',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'transform 0.2s, background 0.2s',
  },

  // ====== SEO Section ======
  seoSection: {
    backgroundColor: '#F9FAFB',
    padding: '64px 24px',
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

  // ====== Creative Footer ======
  footer: {
    position: 'relative',
    backgroundColor: '#0B1120',
    padding: '64px 0 24px',
    overflow: 'hidden',
  },
  footerBlobs: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
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

  // Live dot
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

export default About;

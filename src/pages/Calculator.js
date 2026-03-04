import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/responsive.css';

const PRIMARY = '#3D8B8B';

function Calculator({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/calculator');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const deliveryTypes = [
    { code: 'avto_express', name: 'AVTO EXPRESS', price: 4, days: '14-18', desc: 'Домашний текстиль, Турецкий текстиль' },
    { code: 'avto_ex_marka', name: 'AVTO EX MARKA', price: 5, days: '14-18', desc: 'Домашний текстиль, Бренд/Марка текстиль, Турецкий текстиль' },
    { code: 'avto_obuv', name: 'AVTO ОБУВЬ', price: 5, days: '14-18', desc: 'Турецкие производители обуви (не марка, не бренд)' },
    { code: 'avia_u2_marka', name: 'AVIA U2 MARKA', price: 7.5, days: '7-8', desc: 'Турецкий текстиль, Бренд/Марка текстиль' },
    { code: 'avia_u3', name: 'AVIA U3', price: 8, days: '4-5', desc: 'Обувь (марка, турецкое производство)' },
    { code: 'avia_ex_marka', name: 'AVIA EX MARKA', price: 10, days: '3-4', desc: 'Турецкое производство, Бренд/Марка текстиль' },
  ];

  const calculate = () => {
    const type = deliveryTypes.find(t => t.code === selectedType);
    const w = parseFloat(weight);
    if (!type || !w || w < 10) {
      setResult(null);
      return;
    }
    setResult({ type: type.name, weight: w, pricePerKg: type.price, days: type.days, total: w * type.price });
  };

  return (
    <div style={styles.page}>
      {/* ====== TUBELIGHT FLOATING NAVBAR ====== */}
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

      {/* ====== MOBILE BOTTOM NAV ====== */}
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

      {/* ====== MOBILE MENU OVERLAY ====== */}
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
            <a href="/calculator" className="active">Калькулятор</a>
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

      {/* ====== DARK HERO ====== */}
      <section style={styles.hero}>
        {/* Decorative blobs */}
        <div style={styles.heroBlobs}>
          <div style={{
            position: 'absolute', top: -120, right: -80, width: 400, height: 400,
            background: `radial-gradient(circle, rgba(61,139,139,0.15) 0%, transparent 70%)`,
            borderRadius: '50%', filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute', bottom: -100, left: -60, width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(61,139,139,0.1) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(50px)',
          }} />
        </div>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
              <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
            </svg>
            <span>Онлайн-расчёт</span>
          </div>
          <h1 style={styles.heroTitle}>Калькулятор стоимости доставки</h1>
          <p style={styles.heroSubtitle}>
            Рассчитайте стоимость доставки груза из Турции в Россию онлайн.
            Выберите тип доставки и укажите вес — получите результат мгновенно.
          </p>
        </div>
      </section>

      {/* ====== CALCULATOR SECTION ====== */}
      <section style={styles.calcSection}>
        <div style={styles.calcContainer}>
          <div style={styles.calcCard}>
            {/* Glass shimmer top edge */}
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
              background: `linear-gradient(90deg, transparent, rgba(61,139,139,0.4), transparent)`,
            }} />

            <h2 style={styles.calcTitle}>Рассчитать стоимость</h2>
            <p style={styles.calcSubtitle}>Укажите параметры груза для расчёта</p>

            <div style={styles.formGroup}>
              <label style={styles.label}>Тип доставки</label>
              <select
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value); setResult(null); }}
                style={styles.select}
                className="calc-select"
              >
                <option value="">Выберите тип доставки</option>
                {deliveryTypes.map(dt => (
                  <option key={dt.code} value={dt.code}>{dt.name} — ${dt.price}/кг ({dt.days} дней)</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Вес груза (кг)</label>
              <input
                type="number"
                min="10"
                value={weight}
                onChange={(e) => { setWeight(e.target.value); setResult(null); }}
                placeholder="Минимум 10 кг"
                style={styles.input}
                className="calc-input"
              />
            </div>

            <button onClick={calculate} style={styles.calcBtn} className="calc-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginRight: 8 }}>
                <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
              </svg>
              Рассчитать
            </button>

            {weight && parseFloat(weight) < 10 && parseFloat(weight) > 0 && (
              <p style={styles.warning}>Минимальный вес для отправки — 10 кг</p>
            )}

            {result && (
              <div style={styles.resultCard}>
                <div style={styles.resultHeader}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <h3 style={styles.resultTitle}>Результат расчёта</h3>
                </div>
                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Тип доставки</span>
                  <span style={styles.resultValue}>{result.type}</span>
                </div>
                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Вес груза</span>
                  <span style={styles.resultValue}>{result.weight} кг</span>
                </div>
                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Тариф</span>
                  <span style={styles.resultValue}>${result.pricePerKg}/кг</span>
                </div>
                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Срок доставки</span>
                  <span style={styles.resultValue}>{result.days} дней</span>
                </div>
                <div style={styles.resultDivider} />
                <div style={styles.resultRow}>
                  <span style={{ ...styles.resultLabel, fontWeight: 700, fontSize: 18, color: '#fff' }}>Итого:</span>
                  <span style={styles.resultTotal}>${result.total}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== TARIFF COMPARISON SECTION ====== */}
      <section style={styles.tariffSection}>
        <div style={styles.tariffContainer}>
          <h2 style={styles.tariffSectionTitle}>Все тарифы</h2>
          <p style={styles.tariffSectionSubtitle}>Шесть тарифов доставки из Стамбула в Москву</p>
          <div className="tariff-grid" style={styles.tariffGrid}>
            {deliveryTypes.map((dt, i) => (
              <div key={i} className="tariff-card" style={styles.tariffCard}>
                <div style={styles.tariffCardShimmer} />
                <div style={styles.tariffIconWrap}>
                  {i < 3 ? (
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
                <div style={styles.tariffPrice}>
                  ${dt.price}<span style={styles.tariffUnit}>/кг</span>
                </div>
                <div style={styles.tariffDays}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" style={{ marginRight: 6, flexShrink: 0 }}>
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
          {/* Glass shimmer */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(61,139,139,0.35), transparent)',
          }} />
          <h2 style={styles.ctaTitle}>Готовы отправить груз?</h2>
          <p style={styles.ctaDesc}>Свяжитесь с нами для оформления заказа или скачайте приложение</p>
          <div style={styles.ctaButtons}>
            <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="cta-btn-whatsapp" style={styles.ctaWhatsappBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Написать в WhatsApp
            </a>
            <button onClick={() => navigate('/contacts')} className="cta-btn-contacts" style={styles.ctaContactsBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginRight: 8 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Контакты
            </button>
            <a href="https://apps.apple.com/app/renexpress/id6757761284" target="_blank" rel="noopener noreferrer" className="cta-btn-appstore" style={styles.ctaAppBtn}>
              <svg width="16" height="18" viewBox="0 0 384 512" fill="#fff"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              App Store
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
            система автоматически рассчитает итоговую стоимость перевозки. Мы предлагаем шесть тарифов:
            три вида автомобильной доставки (AVTO EXPRESS от $4/кг, AVTO EX MARKA и AVTO ОБУВЬ от $5/кг)
            и три вида авиадоставки (AVIA U2 MARKA от $7.5/кг, AVIA U3 от $8/кг, AVIA EX MARKA от $10/кг).
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
      <footer style={styles.footer}>
        {/* Background blobs */}
        <div style={styles.footerBlobs}>
          <div style={{
            position: 'absolute', top: -100, right: '10%', width: 350, height: 350,
            background: `radial-gradient(circle, rgba(61,139,139,0.08) 0%, transparent 70%)`,
            borderRadius: '50%', filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute', bottom: -80, left: '5%', width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(61,139,139,0.06) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(50px)',
          }} />
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
            <a href="https://apps.apple.com/app/renexpress/id6757761284" target="_blank" rel="noopener noreferrer" className="footer-link" style={styles.footerLink}>Приложение iOS</a>
          </div>

          {/* Contact column */}
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
    backgroundColor: '#0B1120',
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

  // ==================== MOBILE BOTTOM NAV ====================
  mobileBottomNav: {
    display: 'none',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(11,17,32,0.95)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
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

  // ==================== DARK HERO ====================
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
    backgroundColor: 'rgba(61,139,139,0.12)',
    border: '1px solid rgba(61,139,139,0.25)',
    borderRadius: 50,
    fontSize: 13,
    fontWeight: 600,
    color: PRIMARY,
    marginBottom: 24,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
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
    fontSize: 17,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.7,
    maxWidth: 580,
    margin: '0 auto',
  },

  // ==================== CALCULATOR SECTION ====================
  calcSection: {
    padding: '64px 24px 80px',
    backgroundColor: '#0B1120',
  },
  calcContainer: {
    maxWidth: 560,
    margin: '0 auto',
  },
  calcCard: {
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(24px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 24,
    padding: '40px 36px',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
  calcTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  calcSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
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
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  select: {
    width: '100%',
    padding: '14px 16px',
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, background-color 0.2s',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    backgroundSize: 16,
    paddingRight: 40,
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, background-color 0.2s',
  },
  calcBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: PRIMARY,
    color: '#fff',
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
    boxShadow: '0 4px 20px rgba(61,139,139,0.3)',
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
    backgroundColor: 'rgba(61,139,139,0.08)',
    borderRadius: 16,
    border: `1px solid rgba(61,139,139,0.3)`,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
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
    color: '#fff',
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
    color: 'rgba(255,255,255,0.5)',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
  },
  resultDivider: {
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(61,139,139,0.4), transparent)',
    margin: '16px 0',
  },
  resultTotal: {
    fontSize: 32,
    fontWeight: 700,
    color: PRIMARY,
    textShadow: '0 0 20px rgba(61,139,139,0.3)',
  },

  // ==================== TARIFF COMPARISON ====================
  tariffSection: {
    padding: '80px 24px',
    backgroundColor: '#111827',
  },
  tariffContainer: {
    maxWidth: 1080,
    margin: '0 auto',
    textAlign: 'center',
  },
  tariffSectionTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 8,
  },
  tariffSectionSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.45)',
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
    backgroundColor: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20,
    textAlign: 'center',
    overflow: 'hidden',
    transition: 'border-color 0.3s, transform 0.3s',
  },
  tariffCardShimmer: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
  },
  tariffIconWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    backgroundColor: 'rgba(61,139,139,0.12)',
    borderRadius: 14,
    marginBottom: 16,
  },
  tariffName: {
    fontSize: 15,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  tariffPrice: {
    fontSize: 36,
    fontWeight: 700,
    color: PRIMARY,
    marginBottom: 6,
    textShadow: '0 0 24px rgba(61,139,139,0.2)',
  },
  tariffUnit: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 500,
  },
  tariffDays: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 12,
  },
  tariffDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    lineHeight: 1.6,
  },

  // ==================== CTA SECTION ====================
  ctaSection: {
    padding: '80px 24px',
    backgroundColor: '#0B1120',
    display: 'flex',
    justifyContent: 'center',
  },
  ctaCard: {
    position: 'relative',
    maxWidth: 700,
    width: '100%',
    textAlign: 'center',
    padding: '48px 40px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(24px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 24,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.25)',
    overflow: 'hidden',
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 12,
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
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.15)',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'transform 0.2s, background 0.2s',
  },
  ctaAppBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 24px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 12,
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.15)',
    transition: 'transform 0.2s',
  },

  // ==================== SEO SECTION ====================
  seoSection: {
    padding: '64px 24px',
    backgroundColor: '#111827',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  seoTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 20,
  },
  seoText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.8,
    marginBottom: 16,
  },

  // ==================== CREATIVE FOOTER ====================
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

  // Glass divider
  footerDivider: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px',
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
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

export default Calculator;

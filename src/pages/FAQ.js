import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/responsive.css';
import useIsMobile from '../hooks/useIsMobile';

const PRIMARY = '#3D8B8B';

function FAQ({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/faq');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const faqItems = [
    // Общие вопросы
    { q: 'Что такое RENEXPRESS?', a: 'RENEXPRESS — это карго компания, специализирующаяся на доставке грузов из Турции в Россию. Мы работаем с 2017 года и обслуживаем более 3000 клиентов. Предлагаем авиа и авто доставку текстиля, обуви и других товаров турецкого производства из Стамбула в Москву.', cat: 'Общие вопросы' },
    { q: 'Какие товары можно отправить через RENEXPRESS?', a: 'Мы доставляем домашний текстиль, турецкий текстиль, брендовый/маркированный текстиль, б/у текстиль, обувь турецкого производства, а также брендовую и б/у обувь. Для каждой категории товаров предусмотрен свой тариф доставки.', cat: 'Общие вопросы' },
    { q: 'Что такое код REN?', a: 'Код REN — это ваш персональный идентификатор в системе RENEXPRESS (например, REN123). Он присваивается при регистрации и используется для маркировки грузов, отслеживания заказов и идентификации клиента. Укажите ваш код REN при передаче товара поставщику.', cat: 'Общие вопросы' },

    // Доставка и сроки
    { q: 'Сколько стоит доставка из Турции?', a: 'Стоимость зависит от типа товара и способа доставки. Авто доставка: от $4/кг (AVTO EXPRESS) до $5/кг (AVTO EX MARKA, AVTO ОБУВЬ). Авиа доставка: от $7.5/кг (AVIA U2 MARKA) до $10/кг (AVIA EX MARKA). Обувь авиа — AVIA U3 $8/кг. Минимальный вес отправки — 10 кг.', cat: 'Доставка и сроки' },
    { q: 'Какие сроки доставки из Стамбула в Москву?', a: 'Авто доставка занимает 14-18 дней (текстиль и обувь). Авиа доставка: AVIA EX MARKA — 3-4 дня, AVIA U3 — 4-5 дней, AVIA U2 MARKA — 7-8 дней. Точные сроки зависят от загруженности маршрутов и таможенного оформления.', cat: 'Доставка и сроки' },
    { q: 'Какой минимальный вес для отправки?', a: 'Минимальный вес для отправки через RENEXPRESS составляет 10 килограмм. Это относится ко всем тарифам — как авто, так и авиа доставке. Если ваш груз меньше 10 кг, мы можем консолидировать его с другими отправками.', cat: 'Доставка и сроки' },
    { q: 'Отправляете ли вы грузы каждый день?', a: 'Да, мы осуществляем отправку грузов из Стамбула ежедневно. Это позволяет минимизировать время хранения товара на складе и обеспечить максимально быструю доставку вашего груза в Москву.', cat: 'Доставка и сроки' },

    // Типы грузов
    { q: 'Что такое тариф AVTO EXPRESS?', a: 'AVTO EXPRESS — самый доступный тариф по цене $4/кг. Подходит для домашнего текстиля и турецкого текстиля без брендовых маркировок. Срок доставки — 14-18 дней автотранспортом.', cat: 'Типы грузов' },
    { q: 'В чём разница между AVTO EXPRESS и AVTO EX MARKA?', a: 'AVTO EXPRESS ($4/кг) предназначен только для домашнего и турецкого текстиля без брендов. AVTO EX MARKA ($5/кг) включает доставку брендового/маркированного текстиля и турецкого текстиля. Сроки доставки одинаковые — 14-18 дней.', cat: 'Типы грузов' },
    { q: 'Можно ли отправить брендовую обувь?', a: 'Да, для обуви (марка, турецкое производство) предусмотрен тариф AVIA U3 по цене $8/кг со сроком 4-5 дней. Тариф AVTO ОБУВЬ ($5/кг, 14-18 дней) предназначен для обуви турецкого производства без брендовых маркировок.', cat: 'Типы грузов' },

    // Отслеживание
    { q: 'Как отслеживать свой груз?', a: 'Скачайте мобильное приложение RENEXPRESS из App Store. После авторизации по вашему коду REN вы увидите все ваши заказы с актуальными статусами доставки. Также вы можете связаться с менеджером через чат поддержки в приложении.', cat: 'Отслеживание' },
    { q: 'Есть ли мобильное приложение?', a: 'Да, приложение RENEXPRESS доступно в App Store для iOS. В приложении вы можете отслеживать доставки, создавать заказы, просматривать каталог товаров и общаться с поддержкой в режиме реального времени.', cat: 'Отслеживание' },

    // Склады
    { q: 'Где находится склад в Москве?', a: 'Наш московский склад расположен по адресу: ул. Южнопортовая 7а, стр 2, склад 8, ворота 1. Режим работы: понедельник-пятница с 09:00 до 18:00. Здесь вы можете получить свой груз лично или оформить доставку на склады WB/OZON.', cat: 'Склады' },
    { q: 'Есть ли офис в Стамбуле?', a: 'Да, наш офис и склад в Стамбуле координирует приём товаров от турецких поставщиков, упаковку, консолидацию и ежедневную отправку грузов. Для связи с менеджером в Стамбуле используйте WhatsApp: +905511898288.', cat: 'Склады' },

    // Дополнительные услуги
    { q: 'Что такое маркировка Честный знак?', a: 'Честный знак — это система обязательной маркировки товаров в России. RENEXPRESS предоставляет услугу маркировки импортируемых товаров, что позволяет легально продавать их на российском рынке, включая маркетплейсы Wildberries и OZON.', cat: 'Доп. услуги' },
    { q: 'Доставляете ли вы на склады Wildberries и OZON?', a: 'Да, мы осуществляем доставку грузов напрямую на склады маркетплейсов Wildberries и OZON. Это особенно удобно для продавцов, которые закупают товары в Турции для продажи на российских маркетплейсах.', cat: 'Доп. услуги' },
    { q: 'Можете ли вы помочь с закупкой товаров?', a: 'Да, наш байер в Стамбуле поможет найти и закупить товары у турецких поставщиков. Для связи с байером: WhatsApp +905511898289. Мы также организуем фото и видео отчёты при приёмке товара на складе.', cat: 'Доп. услуги' },

    // Оплата
    { q: 'Как производится оплата?', a: 'Оплата производится за фактический вес груза по тарифу выбранного типа доставки. Стоимость рассчитывается в долларах за килограмм. Точную сумму к оплате вы увидите в приложении или можете рассчитать через наш онлайн-калькулятор.', cat: 'Оплата' },
    { q: 'Как связаться с RENEXPRESS?', a: 'Телефон (Турция): +905070107070. Телефон (Россия): +7 928 970 7010. WhatsApp менеджер (Стамбул): +905511898288. WhatsApp менеджер (Москва): +905511898299. Instagram: @renat_karaliev. Также доступен чат поддержки в мобильном приложении.', cat: 'Контакты' },
  ];

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B1120', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      {/* Tubelight Floating Navbar */}
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
                backgroundColor: activeNav === item.url ? 'rgba(61,139,139,0.15)' : 'transparent',
              }}
            >
              {activeNav === item.url && (
                <span style={{
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

      {/* Mobile Bottom Nav */}
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
            className={`mobile-bottom-link ${activeNav === item.url ? 'mobile-bottom-active' : ''}`}
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
              color: activeNav === item.url ? PRIMARY : '#6B7280',
            }}
          >
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: 500 }}>{item.name}</span>
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
            <a href="/faq" className="active">FAQ</a>
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

      {/* Dark Hero Section */}
      <section style={{
        backgroundColor: '#111827',
        padding: isMobile ? '80px 16px 48px' : undefined,
        paddingTop: isMobile ? undefined : 100,
        paddingBottom: isMobile ? undefined : 64,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Blobs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,139,139,0.3) 0%, transparent 70%)',
            top: -80,
            left: '10%',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute',
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(129,140,248,0.2) 0%, transparent 70%)',
            bottom: -60,
            right: '15%',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(94,234,212,0.15) 0%, transparent 70%)',
            top: '50%',
            left: '60%',
            filter: 'blur(50px)',
          }} />
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 24px' }}>
          <h1 style={{
            fontSize: isMobile ? 26 : 48,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 16,
            lineHeight: 1.15,
            letterSpacing: -0.5,
          }}>Часто задаваемые вопросы</h1>
          <p style={{
            fontSize: isMobile ? 14 : 18,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 560,
            margin: '0 auto 40px',
          }}>
            Ответы на популярные вопросы о доставке грузов из Турции в Россию через RENEXPRESS
          </p>

          {/* Decorative search pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: isMobile ? '10px 20px' : '14px 28px',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 50,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
              Поиск по вопросам...
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{
        backgroundColor: '#0B1120',
        padding: isMobile ? '40px 16px 60px' : '64px 24px 80px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqItems.map((item, i) => {
            const showCat = i === 0 || faqItems[i - 1].cat !== item.cat;
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                {showCat && (
                  <h3 style={{
                    fontSize: isMobile ? 16 : 18,
                    fontWeight: 700,
                    color: PRIMARY,
                    marginTop: i === 0 ? 0 : 40,
                    marginBottom: 16,
                    paddingLeft: 16,
                    borderLeft: `3px solid ${PRIMARY}`,
                    letterSpacing: 0.3,
                  }}>{item.cat}</h3>
                )}
                <div
                  className="faq-item"
                  style={{
                    marginBottom: 8,
                    borderRadius: 14,
                    border: isOpen ? `1px solid ${PRIMARY}` : '1px solid rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                    backgroundColor: isOpen ? 'rgba(61,139,139,0.06)' : 'rgba(255,255,255,0.04)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <button
                    onClick={() => toggle(i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '18px 22px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: 16,
                    }}
                  >
                    <span style={{
                      fontSize: isMobile ? 14 : 16,
                      fontWeight: 600,
                      color: '#fff',
                      lineHeight: 1.5,
                    }}>{item.q}</span>
                    <svg
                      width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke={isOpen ? PRIMARY : 'rgba(255,255,255,0.4)'}
                      strokeWidth="2"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease, stroke 0.3s ease',
                        flexShrink: 0,
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 22px 20px',
                      fontSize: isMobile ? 14 : 15,
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.8,
                    }}>{item.a}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: '#0B1120',
        padding: '0 24px 80px',
      }}>
        <div style={{
          maxWidth: 700,
          margin: '0 auto',
          padding: isMobile ? '32px 20px' : '48px 40px',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24,
          textAlign: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 48px rgba(0,0,0,0.2)',
        }}>
          <h2 style={{
            fontSize: isMobile ? 22 : 28,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 12,
          }}>Не нашли ответ?</h2>
          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 440,
            margin: '0 auto 32px',
          }}>
            Свяжитесь с нами любым удобным способом — мы ответим на все вопросы о доставке из Турции
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
            <a
              href="https://wa.me/905511898288"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px 28px',
                backgroundColor: '#25D366',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 12,
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                width: isMobile ? '100%' : undefined,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="https://apps.apple.com/app/renexpress/id6757761284"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px 28px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 12,
                textDecoration: 'none',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                transition: 'transform 0.2s, background 0.2s',
                width: isMobile ? '100%' : undefined,
              }}
            >
              <svg width="16" height="18" viewBox="0 0 384 512" fill="#fff">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              App Store
            </a>
            <button
              onClick={() => navigate('/contacts')}
              className="footer-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px 28px',
                backgroundColor: PRIMARY,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: `0 4px 16px rgba(61,139,139,0.3)`,
                width: isMobile ? '100%' : undefined,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Связаться
            </button>
          </div>
        </div>
      </section>

      {/* SEO Text Section */}
      <section style={{
        backgroundColor: '#111827',
        padding: '64px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 20,
          }}>Доставка из Турции в Россию — вопросы и ответы</h2>
          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.8,
          }}>
            RENEXPRESS — одна из ведущих карго компаний, осуществляющих грузоперевозки из Турции в Россию.
            Мы предлагаем шесть тарифов доставки из Стамбула в Москву, адаптированных под разные типы товаров:
            домашний текстиль, турецкий текстиль, брендовый текстиль, обувь. Стоимость доставки начинается
            от $5 за килограмм при автомобильной перевозке и от $9 при авиадоставке.
            Сроки доставки составляют от 3 до 15 дней в зависимости от выбранного тарифа.
            Минимальный вес отправки — 10 кг. Для оформления заказа свяжитесь с менеджером по WhatsApp
            или скачайте приложение RENEXPRESS в App Store. Каждый клиент получает персональный код REN
            для удобного управления заказами. Наша компания также предлагает услуги маркировки товаров
            системой «Честный знак» и доставку на склады Wildberries и OZON.
          </p>
        </div>
      </section>

      {/* Creative Footer */}
      <footer className="footer" style={{
        position: 'relative',
        backgroundColor: '#0B1120',
        padding: '0 0 24px',
        paddingBottom: isMobile ? 80 : 24,
        overflow: 'hidden',
      }}>
        {/* Animated gradient blobs */}
        <div className="footer-blobs" style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          <div className="footer-blob footer-blob-1" />
          <div className="footer-blob footer-blob-2" />
          <div className="footer-blob footer-blob-3" />
        </div>

        {/* Glass divider */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto 48px',
          padding: '0 24px',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
        }} />

        {/* Footer columns grid */}
        <div className="footer-content" style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px 40px',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : '1.5fr 1fr 1fr 1fr 1.2fr',
          gap: isMobile ? 24 : 40,
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
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 20 }}>
              Надёжная доставка грузов из Турции в Россию с 2017 года. Текстиль, обувь, брендовые товары.
              Авто и авиа перевозки с отслеживанием в приложении.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="https://instagram.com/renat_karaliev" target="_blank" rel="noopener noreferrer" className="footer-social" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38,
                color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.2s',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/905511898288" target="_blank" rel="noopener noreferrer" className="footer-social" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38,
                color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.2s',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://www.rencargo.com" target="_blank" rel="noopener noreferrer" className="footer-social" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38,
                color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.2s',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
              <a href="tel:+905070107070" className="footer-social" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38,
                color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', textDecoration: 'none', transition: 'all 0.2s',
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
                  <span style={{
                    position: 'absolute', display: 'inline-flex', width: '100%', height: '100%',
                    borderRadius: '50%', backgroundColor: '#25D366', opacity: 0.75,
                    animation: 'footerLivePing 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                  }} />
                  <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#25D366' }} />
                </span>
              </span>
            </a>
            <a href="/contacts" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Поддержка</a>
            <a href="https://apps.apple.com/app/renexpress/id6757761284" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>Приложение iOS</a>
          </div>

          {/* Contact column with icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h5 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Контакты</h5>
            <a href="mailto:info@renexpress.online" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>info@renexpress.online</span>
            </a>
            <a href="tel:+905070107070" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+90 507 010 70 70</span>
            </a>
            <a href="tel:+79289707010" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+7 928 970 70 10</span>
            </a>
            <div className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}>
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
              fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)',
              padding: '4px 12px', backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, letterSpacing: 0.5,
            }}>RENCARGO</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)',
              padding: '4px 12px', backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, letterSpacing: 0.5,
            }}>RENSHOPPING</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)',
              padding: '4px 12px', backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, letterSpacing: 0.5,
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

export default FAQ;

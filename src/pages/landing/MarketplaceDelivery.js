import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SEO from '../../components/SEO';
import useIsMobile from '../../hooks/useIsMobile';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { SITE } from '../../config/site';
import { COLORS, GRADIENT, SHADOW } from '../../config/theme';

// SEO landing for marketplace sellers (Wildberries / OZON).
// Distinct commercial intent: LEGAL ("белый") import — customs clearance, TNVED,
// «Честный знак» marking, service contract. All facts grounded in the business
// (RENEXPRESS = white service_type). RU-only page: noindex on /en, /tr via
// translatedLanguages={['ru']}. No invented services.

export default function MarketplaceDelivery({ isAuthenticated, setIsAuthenticated }) {
  const { language, t } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const h1 = 'Доставка из Турции для маркетплейсов Wildberries и OZON';
  const lead = 'Продаёте на Wildberries или OZON? RENEXPRESS привозит товар из Турции «в белую»: с таможенным оформлением, кодами ТН ВЭД и маркировкой «Честный знак». Груз приходит на склад в Москве готовым к поставке на маркетплейс.';

  const included = [
    { title: 'Таможенное оформление', text: 'Растаможка и декларирование берём на себя. Товар ввозится легально — с документами, которые нужны для продажи на маркетплейсе.' },
    { title: 'Код ТН ВЭД', text: 'Подбираем и подтверждаем код ТН ВЭД для вашего товара, фиксируем цену за кг до отправки.' },
    { title: 'Маркировка «Честный знак»', text: 'Оформление с маркировкой «Честный знак» — для категорий, где она обязательна (текстиль, обувь).' },
    { title: 'Договор на услугу', text: 'Работаем по договору: получатель подписывает его в приложении перед отправкой. Прозрачно и официально.' },
    { title: 'Отслеживание в приложении', text: 'Каждый статус — от приёма в Стамбуле до выдачи в Москве — виден в приложении RENEXPRESS.' },
    { title: 'Доставка Стамбул → Москва', text: 'Авто (14–18 дней) или авиа (3–8 дней) — по выбранному тарифу. Выдача на складе в Москве или пересылка по России.' },
  ];

  const steps = [
    { n: 1, title: 'Товар на складе в Стамбуле', text: 'Вы или ваш поставщик привозите товар на наш склад в Стамбуле. Мы принимаем, проверяем и взвешиваем.' },
    { n: 2, title: 'Оформление и договор', text: 'Подбираем код ТН ВЭД, фиксируем цену. Вы принимаете её и подписываете договор в приложении.' },
    { n: 3, title: 'Отправка и растаможка', text: 'Груз идёт из Стамбула в Москву. Таможенное оформление и «Честный знак» — на нас.' },
    { n: 4, title: 'Готово к поставке на WB/OZON', text: 'Товар приходит на склад в Москве легально оформленным. Забираете самовывозом или пересылаем по России.' },
  ];

  const faqs = [
    { q: 'Подходит ли доставка для продажи на Wildberries и OZON?', a: 'Да. Сервис RENEXPRESS — это «белый» импорт: таможенное оформление, код ТН ВЭД и маркировка «Честный знак». Товар ввозится легально и готов к поставке на маркетплейс.' },
    { q: 'Оформляете ли «Честный знак»?', a: 'Да. Маркировка «Честный знак» входит в услугу RENEXPRESS для категорий, где она обязательна (в первую очередь текстиль и обувь).' },
    { q: 'Какие товары возите из Турции?', a: 'Домашний и брендовый текстиль, новую и б/у одежду, обувь турецкого производства, брендовую и б/у обувь. Работаем и с розницей, и с оптом.' },
    { q: 'Сколько стоит и сколько идёт доставка?', a: 'Тарифы от $4 до $10 за кг в зависимости от способа: авто 14–18 дней, авиа 3–8 дней. Минимальный вес отправки — 10 кг.' },
    { q: 'Куда приходит товар?', a: `На наш склад в Москве: ${SITE.warehouses.moscow.address}. Можно забрать самовывозом бесплатно, переслать транспортной компанией по России (бесплатно до Москвы) или заказать платную доставку по Москве.` },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Import from Turkey for Russian marketplaces (Wildberries, OZON)',
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: [{ '@type': 'Country', name: 'Russia' }, { '@type': 'Country', name: 'Turkey' }],
    offers: SITE.tariffs.map((tariff) => ({
      '@type': 'Offer',
      name: tariff.name,
      price: tariff.pricePerKg,
      priceCurrency: tariff.currency,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: tariff.pricePerKg,
        priceCurrency: tariff.currency,
        unitText: 'kg',
      },
    })),
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: 'Inter, -apple-system, sans-serif', color: COLORS.text }}>
      <SEO
        titleKey="seo.marketplace.title"
        descriptionKey="seo.marketplace.description"
        translatedLanguages={['ru']}
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: t('common.services'), path: '/services' },
          { name: 'Доставка для Wildberries и OZON', path: '/wildberries-ozon' },
        ]}
        jsonLd={[serviceJsonLd, faqJsonLd]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '24px 16px 48px' : '48px 32px 96px' }}>
        <header style={{ marginBottom: isMobile ? 24 : 48 }}>
          <h1 style={{ fontSize: isMobile ? 30 : 48, fontWeight: 800, lineHeight: 1.15, marginBottom: 16, color: COLORS.text }}>{h1}</h1>
          <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color: '#475569', maxWidth: 820 }}>{lead}</p>
        </header>

        {/* What's included */}
        <section aria-labelledby="incl-heading" style={{ marginBottom: isMobile ? 32 : 64 }}>
          <h2 id="incl-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 24 }}>Что входит в «белую» доставку</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
            {included.map((item, i) => (
              <article key={i} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 12, padding: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Tariffs */}
        <section aria-labelledby="tariffs-heading" style={{ marginBottom: isMobile ? 32 : 64 }}>
          <h2 id="tariffs-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 8 }}>Тарифы доставки из Турции</h2>
          <p style={{ color: '#64748B', marginBottom: 24, fontSize: 14 }}>Минимальный вес отправки — 10 кг. Цена включает таможенное оформление и доставку до московского склада.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {SITE.tariffs.map((tariff) => (
              <article key={tariff.id} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: COLORS.primaryText, fontWeight: 700, marginBottom: 6 }}>
                  {tariff.mode === 'road' ? 'Авто' : 'Авиа'}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{tariff.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 34, fontWeight: 800, color: COLORS.text }}>${tariff.pricePerKg}</span>
                  <span style={{ color: '#64748B' }}>/ {t('common.kg')}</span>
                </div>
                <div style={{ color: COLORS.text, fontWeight: 600 }}>{tariff.transitDaysMin}-{tariff.transitDaysMax} {t('common.days')}</div>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-heading" style={{ marginBottom: isMobile ? 32 : 64 }}>
          <h2 id="how-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 24 }}>Как проходит поставка</h2>
          <ol style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
            {steps.map((step) => (
              <li key={step.n} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: COLORS.primary, color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{step.n}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{step.title}</h3>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" style={{ marginBottom: isMobile ? 32 : 64 }}>
          <h2 id="faq-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 24 }}>Вопросы и ответы</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 12, padding: '16px 20px' }}>
                <summary style={{ fontSize: 16, fontWeight: 600, cursor: 'pointer', listStyle: 'none' }}>{f.q}</summary>
                <p style={{ color: '#475569', lineHeight: 1.6, marginTop: 12, marginBottom: 0 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="cta-heading" style={{ background: '#FFFFFF', color: COLORS.text, border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 16, padding: isMobile ? 24 : 40, textAlign: 'center' }}>
          <h2 id="cta-heading" style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, marginBottom: 8 }}>Везёте товар для маркетплейса?</h2>
          <p style={{ color: COLORS.textSecond, marginBottom: 24, fontSize: 16 }}>Рассчитайте стоимость в калькуляторе или свяжитесь с менеджером — подскажем по оформлению и «Честному знаку».</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => navigate(localizedPath('/calculator', language))}
              style={{ background: GRADIENT, color: '#FFFFFF', border: 'none', padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', textShadow: '0 1px 2px rgba(10,37,53,.35)', minHeight: 48 }}
            >
              Калькулятор стоимости
            </button>
            <Link
              to={localizedPath('/contacts', language)}
              style={{ background: '#FFFFFF', color: COLORS.primaryText, border: '1.5px solid #2AABAB', padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: 'none', minHeight: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Связаться с менеджером
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <nav aria-label="Related pages" style={{ marginTop: isMobile ? 32 : 48, padding: '24px 0', borderTop: '1px solid #EEEEEE', display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14 }}>
          <Link to={localizedPath('/delivery-turkey-russia', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>Доставка Турция-Россия</Link>
          <Link to={localizedPath('/customs-clearance', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>Таможенное оформление</Link>
          <Link to={localizedPath('/calculator', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>{t('common.calculator')}</Link>
          <Link to={localizedPath('/contacts', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>{t('common.contacts')}</Link>
        </nav>
      </main>
    </div>
  );
}

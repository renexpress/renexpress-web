import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { SITE } from '../../config/site';
import '../../styles/home-redesign.css';

// SEO landing for marketplace sellers (Wildberries / OZON).
// Distinct commercial intent: LEGAL ("белый") import — customs clearance, TNVED,
// «Честный знак» marking, service contract. All facts grounded in the business
// (RENEXPRESS = white service_type). RU-only page: noindex on /en, /tr via
// translatedLanguages={['ru']}. No invented services.

export default function MarketplaceDelivery({ isAuthenticated, setIsAuthenticated }) {
  const { language, t } = useTranslation();
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

  const tariffsRoad = SITE.tariffs.filter((tf) => tf.mode === 'road');
  const tariffsAir = SITE.tariffs.filter((tf) => tf.mode === 'air');

  return (
    <div className="hx">
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

      {/* hero */}
      <section className="hx-sec hx-hero-sec">
        <div className="hx-eyebrow"><i />Wildberries · OZON</div>
        <h1 className="hx-h1" style={{ marginBottom: 18 }}>{h1}</h1>
        <p className="hx-hero-lede" style={{ maxWidth: '70ch' }}>{lead}</p>
      </section>

      {/* what's included */}
      <section className="hx-sec hx-sec--gray">
        <h2 className="hx-h2">Что входит в «белую» доставку</h2>
        <div className="hx-features">
          {included.map((item, i) => (
            <div className="hx-feature" key={i}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* tariffs table */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Тарифы доставки из Турции</h2>
        <p className="hx-lede" style={{ maxWidth: '60ch', marginBottom: 28 }}>Минимальный вес отправки — 10 кг. Цена включает таможенное оформление и доставку до московского склада.</p>
        <div className="hx-tf-table">
          <div className="hx-tf-cols hx-tf-header">
            <span>{t('common.tariff') || 'Тариф'}</span><span>Режим</span><span>Срок</span><span>Категория груза</span><span>Цена за кг</span>
          </div>
          {[...tariffsRoad, ...tariffsAir].map((tf) => (
            <div className="hx-tf-cols hx-tf-row" key={tf.id}>
              <span className="hx-tf-name">{tf.name}<span className="sub">{tf.mode === 'air' ? 'Авиа' : 'Авто'} · {tf.deliveryDays} · {tf.category}</span></span>
              <span className="hx-tf-mode">{tf.mode === 'air' ? 'Авиа' : 'Авто'}</span>
              <span className="hx-tf-days">{tf.deliveryDays}</span>
              <span className="hx-tf-cat">{tf.category}</span>
              <span className="hx-tf-price">${tf.pricePerKg}<small>/кг</small></span>
            </div>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 24 }}>Как проходит поставка</h2>
        <div className="hx-steps">
          {steps.map((step) => (
            <div key={step.n}>
              <div className="hx-step-n">{step.n}</div>
              <h3 className="hx-step-t">{step.title}</h3>
              <p className="hx-step-d">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* faq */}
      <section className="hx-sec hx-sec--gray">
        <div className="hx-faq">
          <div>
            <div className="hx-eyebrow"><i />FAQ</div>
            <h2 className="hx-h2">Вопросы и ответы</h2>
          </div>
          <div className="hx-faq-list">
            {faqs.map((f, i) => (
              <details key={i}>
                <summary>{f.q}<i aria-hidden="true">+</i></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Везёте товар для маркетплейса?</h2>
        <p className="hx-lede" style={{ maxWidth: '52ch', marginBottom: 24 }}>Рассчитайте стоимость в калькуляторе или свяжитесь с менеджером — подскажем по оформлению и «Честному знаку».</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <button type="button" className="hx-cta" onClick={() => navigate(localizedPath('/calculator', language))}>
            Калькулятор стоимости
          </button>
          <Link className="hx-cta hx-cta--solid" to={localizedPath('/contacts', language)}>
            Связаться с менеджером
          </Link>
        </div>
        <nav aria-label="Related pages" className="hx-hub" style={{ marginTop: 40 }}>
          <Link to={localizedPath('/delivery-turkey-russia', language)}>Доставка Турция-Россия <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/customs-clearance', language)}>Таможенное оформление <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/calculator', language)}>{t('common.calculator')} <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/contacts', language)}>{t('common.contacts')} <span aria-hidden="true">→</span></Link>
        </nav>
      </section>

      <Footer />
    </div>
  );
}

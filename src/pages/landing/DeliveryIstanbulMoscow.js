import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SEO from '../../components/SEO';
import useIsMobile from '../../hooks/useIsMobile';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { SITE } from '../../config/site';
import { COLORS, GRADIENT, SHADOW } from '../../config/theme';

export default function DeliveryIstanbulMoscow({ isAuthenticated, setIsAuthenticated }) {
  const { language, t } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const copy = {
    ru: {
      h1: 'Доставка из Стамбула в Москву',
      lead: 'Прямой карго-маршрут Стамбул → Москва. Пять тарифов от $4 за кг: автомобильная и авиа доставка. Свои склады с обеих сторон, таможенное оформление включено.',
      h2Route: 'О маршруте',
      routeText: `Стамбул и Москва — основа нашей сети. Стамбульский офис принимает товары от поставщиков, консолидирует партии и ежедневно отправляет в Россию. Прибывшие грузы поступают на склад в Москве на ${SITE.warehouses.moscow.address}.`,
      h2Options: 'Варианты доставки Стамбул → Москва',
      h2Process: 'Этапы доставки',
      processSteps: [
        'Приём товара в офисе RENEXPRESS в Стамбуле, упаковка и взвешивание.',
        'Консолидация с другими грузами для этого тарифа.',
        'Отправка авто-фурой или авиарейсом по выбранному маршруту.',
        'Таможенное оформление при ввозе в Россию.',
        'Выдача на складе в Москве (Южнопортовая 7а) или курьерская доставка.',
      ],
      h2Faq: 'Частые вопросы',
      ctaTitle: 'Отправить груз Стамбул → Москва',
      ctaText: 'Рассчитайте стоимость в калькуляторе или свяжитесь с менеджером.',
    },
    en: {
      h1: 'Cargo from Istanbul to Moscow',
      lead: 'Direct Istanbul → Moscow cargo route. Five tariffs from $4 per kg: road and air. Our own warehouses on both sides, customs clearance included.',
      h2Route: 'About the route',
      routeText: `Istanbul and Moscow are the backbone of our network. The Istanbul office receives goods from suppliers, consolidates batches, and dispatches daily to Russia. Arriving cargo lands at the Moscow warehouse at ${SITE.warehouses.moscow.address}.`,
      h2Options: 'Istanbul → Moscow delivery options',
      h2Process: 'Stages',
      processSteps: [
        'Pickup at the RENEXPRESS Istanbul office, packing and weighing.',
        'Consolidation with other cargo on the same tariff.',
        'Departure by truck or air based on the selected option.',
        'Customs clearance on import to Russia.',
        'Handover at the Moscow warehouse (Yuzhnoportovaya 7a) or courier delivery.',
      ],
      h2Faq: 'FAQ',
      ctaTitle: 'Ship from Istanbul to Moscow',
      ctaText: 'Calculate the price or talk to a manager.',
    },
    tr: {
      h1: 'İstanbul\'dan Moskova\'ya kargo',
      lead: 'Doğrudan İstanbul → Moskova kargo rotası. Kg başına $4\'ten başlayan beş tarife: karayolu ve havayolu. Her iki tarafta kendi depolarımız, gümrük işlemleri dahil.',
      h2Route: 'Rota hakkında',
      routeText: `İstanbul ve Moskova ağımızın temelidir. İstanbul ofisi tedarikçilerden ürünleri alır, partileri birleştirir ve günlük olarak Rusya\'ya gönderir. Gelen kargolar Moskova\'daki depoya iner: ${SITE.warehouses.moscow.address}.`,
      h2Options: 'İstanbul → Moskova teslimat seçenekleri',
      h2Process: 'Aşamalar',
      processSteps: [
        'RENEXPRESS İstanbul ofisinde teslim alma, paketleme ve tartım.',
        'Aynı tarifedeki diğer kargolarla konsolidasyon.',
        'Seçilen seçeneğe göre karayolu veya havayolu ile sevkiyat.',
        'Rusya\'ya ithalatta gümrük işlemleri.',
        'Moskova deposunda (Yujnoportovaya 7a) teslim veya kurye.',
      ],
      h2Faq: 'SSS',
      ctaTitle: 'İstanbul → Moskova gönderim',
      ctaText: 'Fiyatı hesaplayın veya bir yöneticiyle konuşun.',
    },
  };
  const c = copy[language] || copy.ru;

  const faqs = {
    ru: [
      { q: 'Сколько идёт груз из Стамбула в Москву?', a: 'Зависит от тарифа: авто 14-18 дней, авиа U3 4-5 дней, авиа EX MARKA 3-4 дня.' },
      { q: 'Где забрать груз в Москве?', a: `Со склада: ${SITE.warehouses.moscow.address}. Режим работы пн-пт 09:00-18:00.` },
      { q: 'Можно ли заказать курьерскую доставку по Москве?', a: 'Да, доступна по запросу — обсуждается с менеджером отдельно при отправке.' },
      { q: 'Какой минимальный вес для отправки?', a: 'Минимум 10 кг на одну отправку, без верхнего ограничения по весу.' },
    ],
    en: [
      { q: 'How long does Istanbul to Moscow delivery take?', a: 'Depends on tariff: road 14-18 days, air U3 4-5 days, air EX MARKA 3-4 days.' },
      { q: 'Where do I pick up cargo in Moscow?', a: `From the warehouse: ${SITE.warehouses.moscow.address}. Open Mon-Fri 09:00-18:00.` },
      { q: 'Can I get courier delivery inside Moscow?', a: 'Yes, available on request — arranged with your manager separately at shipping time.' },
      { q: 'What is the minimum shipment weight?', a: 'Minimum 10 kg per shipment, no upper weight limit.' },
    ],
    tr: [
      { q: 'İstanbul-Moskova kargo ne kadar sürer?', a: 'Tarifeye bağlı: karayolu 14-18 gün, havayolu U3 4-5 gün, havayolu EX MARKA 3-4 gün.' },
      { q: 'Moskova\'da kargoyu nereden alırım?', a: `Depodan: ${SITE.warehouses.moscow.address}. Pzt-Cum 09:00-18:00.` },
      { q: 'Moskova içi kurye hizmeti var mı?', a: 'Evet, talep üzerine — gönderim sırasında yöneticinizle ayrıca konuşulur.' },
      { q: 'Minimum gönderi ağırlığı nedir?', a: 'Gönderi başına minimum 10 kg, üst sınır yoktur.' },
    ],
  };
  const faqList = faqs[language] || faqs.ru;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: 'Inter, -apple-system, sans-serif', color: COLORS.text }}>
      <SEO
        titleKey="seo.deliveryIstanbulMoscow.title"
        descriptionKey="seo.deliveryIstanbulMoscow.description"
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: t('common.services'), path: '/services' },
          { name: c.h1, path: '/delivery-istanbul-moscow' },
        ]}
        jsonLd={[faqJsonLd]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '24px 16px 48px' : '48px 32px 96px' }}>
        <header style={{ marginBottom: isMobile ? 24 : 48 }}>
          <h1 style={{ fontSize: isMobile ? 32 : 52, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>{c.h1}</h1>
          <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color: '#475569', maxWidth: 760 }}>{c.lead}</p>
        </header>

        <section aria-labelledby="route-heading" style={{ marginBottom: isMobile ? 32 : 48 }}>
          <h2 id="route-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 16 }}>{c.h2Route}</h2>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: 16 }}>{c.routeText}</p>
        </section>

        <section aria-labelledby="options-heading" style={{ marginBottom: isMobile ? 32 : 48 }}>
          <h2 id="options-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 24 }}>{c.h2Options}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {SITE.tariffs.map((tariff) => (
              <article key={tariff.id} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{tariff.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 32, fontWeight: 800 }}>${tariff.pricePerKg}</span>
                  <span style={{ color: '#64748B' }}>/ {t('common.kg')}</span>
                </div>
                <div style={{ color: COLORS.text, fontWeight: 600 }}>{tariff.transitDaysMin}-{tariff.transitDaysMax} {t('common.days')}</div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="process-heading" style={{ marginBottom: isMobile ? 32 : 48 }}>
          <h2 id="process-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 16 }}>{c.h2Process}</h2>
          <ol style={{ paddingLeft: 24, color: '#475569', lineHeight: 1.8, fontSize: 16 }}>
            {c.processSteps.map((step, i) => (
              <li key={i} style={{ marginBottom: 8 }}>{step}</li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-heading" style={{ marginBottom: isMobile ? 32 : 48 }}>
          <h2 id="faq-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 24 }}>{c.h2Faq}</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {faqList.map((f, i) => (
              <details key={i} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 12, padding: '16px 20px' }}>
                <summary style={{ fontSize: 16, fontWeight: 600, cursor: 'pointer', listStyle: 'none' }}>{f.q}</summary>
                <p style={{ color: '#475569', lineHeight: 1.6, marginTop: 12, marginBottom: 0 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ background: '#FFFFFF', color: COLORS.text, border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 16, padding: isMobile ? 24 : 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, marginBottom: 8 }}>{c.ctaTitle}</h2>
          <p style={{ color: COLORS.textSecond, marginBottom: 24 }}>{c.ctaText}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => navigate(localizedPath('/calculator', language))}
              style={{ background: GRADIENT, color: '#FFFFFF', border: 'none', padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', textShadow: '0 1px 2px rgba(10,37,53,.35)', minHeight: 48 }}
            >
              {t('common.orderNow')}
            </button>
          </div>
        </section>

        <nav aria-label="Related pages" style={{ marginTop: 48, padding: '24px 0', borderTop: '1px solid #EEEEEE', display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14 }}>
          <Link to={localizedPath('/delivery-turkey-russia', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>
            {language === 'ru' ? 'Доставка Турция-Россия' : language === 'tr' ? 'Türkiye-Rusya kargo' : 'Turkey-Russia cargo'}
          </Link>
          <Link to={localizedPath('/customs-clearance', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>
            {language === 'ru' ? 'Таможенное оформление' : language === 'tr' ? 'Gümrük işlemleri' : 'Customs clearance'}
          </Link>
          <Link to={localizedPath('/calculator', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>{t('common.calculator')}</Link>
          <Link to={localizedPath('/contacts', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>{t('common.contacts')}</Link>
        </nav>
      </main>
    </div>
  );
}

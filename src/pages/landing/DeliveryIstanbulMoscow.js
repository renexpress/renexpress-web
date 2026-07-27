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
      lead: 'Прямой карго-маршрут между двумя городами: принимаем товар в Стамбуле, консолидируем и отправляем в Москву, выдаём на собственном складе. Если вы не в Москве — бесплатно передаём груз транспортной компании до вашего города России.',
      h2Route: 'Маршрут двух городов',
      routeText: `Стамбул и Москва — опорные точки сети RENEXPRESS. Стамбульский офис принимает товар от поставщиков и ежедневно отправляет партии в Россию. В Москве груз приходит на собственный склад по адресу ${SITE.warehouses.moscow.address}, откуда его забирают самовывозом или пересылают дальше по стране.`,
      h2Istanbul: 'Приём и отправка в Стамбуле',
      istanbulText: 'Товар от ваших поставщиков привозят в наш офис в Стамбуле — или мы организуем забор. Каждую партию проверяем, взвешиваем, упаковываем и присваиваем номер отправки, видимый в приложении. Дальше груз консолидируется с другими и уходит в Москву авто-фурой или авиарейсом — по выбранному тарифу.',
      h2Moscow: 'Получение в Москве и по России',
      moscowText: `В Москве груз поступает на склад: ${SITE.warehouses.moscow.address} (пн–пт 09:00–18:00). Забрать можно самовывозом — бесплатно. Если вы в другом городе, бесплатно довозим груз до транспортной компании в Москве и отправляем в ваш регион (стоимость перевозки ТК зависит от направления). Курьерская доставка по Москве до двери — по запросу, платно.`,
      h2Options: 'Тарифы на маршруте Стамбул → Москва',
      h2Faq: 'Частые вопросы',
      ctaTitle: 'Отправить груз Стамбул → Москва',
      ctaText: 'Рассчитайте стоимость в калькуляторе или свяжитесь с менеджером.',
    },
    en: {
      h1: 'Cargo from Istanbul to Moscow',
      lead: 'A direct cargo route between the two cities: we receive goods in Istanbul, consolidate and ship to Moscow, and hand them over at our own warehouse. Not in Moscow? We forward your cargo free to a transport company for onward delivery to your city in Russia.',
      h2Route: 'A route between two cities',
      routeText: `Istanbul and Moscow are the anchor points of the RENEXPRESS network. The Istanbul office receives goods from suppliers and dispatches batches to Russia daily. In Moscow the cargo arrives at our own warehouse at ${SITE.warehouses.moscow.address}, where it is picked up or forwarded onward across the country.`,
      h2Istanbul: 'Intake and dispatch in Istanbul',
      istanbulText: 'Your suppliers deliver goods to our Istanbul office — or we arrange pickup. Each batch is inspected, weighed, packed, and assigned a shipment number visible in the app. The cargo is then consolidated with others and leaves for Moscow by truck or air, based on your chosen tariff.',
      h2Moscow: 'Pickup in Moscow & across Russia',
      moscowText: `In Moscow the cargo arrives at the warehouse: ${SITE.warehouses.moscow.address} (Mon-Fri 09:00-18:00). You can collect it yourself — free of charge. If you are in another city, we deliver the cargo free to a transport company in Moscow and send it to your region (the carrier's fee depends on the destination). Door-to-door courier within Moscow is available on request, for a fee.`,
      h2Options: 'Tariffs on the Istanbul → Moscow route',
      h2Faq: 'FAQ',
      ctaTitle: 'Ship from Istanbul to Moscow',
      ctaText: 'Calculate the price or talk to a manager.',
    },
    tr: {
      h1: 'İstanbul\'dan Moskova\'ya kargo',
      lead: 'İki şehir arasında doğrudan kargo rotası: ürünü İstanbul\'da teslim alır, birleştirip Moskova\'ya gönderir ve kendi depomuzda teslim ederiz. Moskova\'da değilseniz — kargonuzu ücretsiz olarak bir nakliye şirketine devrederek Rusya\'daki şehrinize ulaştırırız.',
      h2Route: 'İki şehrin rotası',
      routeText: `İstanbul ve Moskova, RENEXPRESS ağının çıpa noktalarıdır. İstanbul ofisi tedarikçilerden ürün alır ve her gün Rusya\'ya parti gönderir. Moskova\'da kargo kendi depomuza gelir: ${SITE.warehouses.moscow.address}; buradan teslim alınır veya ülke geneline aktarılır.`,
      h2Istanbul: 'İstanbul\'da teslim alma ve sevkiyat',
      istanbulText: 'Tedarikçileriniz ürünleri İstanbul ofisimize getirir — ya da alımı biz ayarlarız. Her parti kontrol edilir, tartılır, paketlenir ve uygulamada görünen bir sevkiyat numarası alır. Ardından kargo diğerleriyle birleştirilir ve seçtiğiniz tarifeye göre karayolu veya havayolu ile Moskova\'ya gider.',
      h2Moscow: 'Moskova\'da ve Rusya genelinde teslim',
      moscowText: `Moskova\'da kargo depoya gelir: ${SITE.warehouses.moscow.address} (Pzt-Cum 09:00-18:00). Kendiniz ücretsiz teslim alabilirsiniz. Başka bir şehirdeyseniz, kargoyu Moskova\'daki bir nakliye şirketine ücretsiz ulaştırır ve bölgenize göndeririz (nakliye ücreti varış yerine bağlıdır). Moskova içi kapıya kurye, talep üzerine ücretlidir.`,
      h2Options: 'İstanbul → Moskova rotasında tarifeler',
      h2Faq: 'SSS',
      ctaTitle: 'İstanbul → Moskova gönderim',
      ctaText: 'Fiyatı hesaplayın veya bir yöneticiyle konuşun.',
    },
  };
  const c = copy[language] || copy.ru;

  const faqs = {
    ru: [
      { q: 'Сколько идёт груз из Стамбула в Москву?', a: 'Зависит от тарифа: авто 14-18 дней, авиа U3 4-5 дней, авиа EX MARKA 3-4 дня.' },
      { q: 'Где забрать груз в Москве?', a: `Со склада: ${SITE.warehouses.moscow.address}. Режим работы пн-пт 09:00-18:00. Самовывоз бесплатный.` },
      { q: 'Доставляете в другие города России?', a: 'Да. До транспортной компании в Москве довозим бесплатно и отправляем в ваш город; стоимость перевозки транспортной компании зависит от направления.' },
      { q: 'Можно ли заказать курьерскую доставку по Москве?', a: 'Да, доставка по Москве до двери доступна по запросу — платно, обсуждается с менеджером при отправке.' },
      { q: 'Какой минимальный вес для отправки?', a: 'Минимум 10 кг на одну отправку, без верхнего ограничения по весу.' },
    ],
    en: [
      { q: 'How long does Istanbul to Moscow delivery take?', a: 'Depends on tariff: road 14-18 days, air U3 4-5 days, air EX MARKA 3-4 days.' },
      { q: 'Where do I pick up cargo in Moscow?', a: `From the warehouse: ${SITE.warehouses.moscow.address}. Open Mon-Fri 09:00-18:00. Self-pickup is free.` },
      { q: 'Do you deliver to other Russian cities?', a: 'Yes. We deliver free to a transport company in Moscow and send it to your city; the carrier\'s fee depends on the destination.' },
      { q: 'Can I get courier delivery inside Moscow?', a: 'Yes, door-to-door delivery within Moscow is available on request — for a fee, arranged with your manager at shipping time.' },
      { q: 'What is the minimum shipment weight?', a: 'Minimum 10 kg per shipment, no upper weight limit.' },
    ],
    tr: [
      { q: 'İstanbul-Moskova kargo ne kadar sürer?', a: 'Tarifeye bağlı: karayolu 14-18 gün, havayolu U3 4-5 gün, havayolu EX MARKA 3-4 gün.' },
      { q: 'Moskova\'da kargoyu nereden alırım?', a: `Depodan: ${SITE.warehouses.moscow.address}. Pzt-Cum 09:00-18:00. Teslim alma ücretsizdir.` },
      { q: 'Rusya\'nın diğer şehirlerine teslimat var mı?', a: 'Evet. Moskova\'daki bir nakliye şirketine ücretsiz ulaştırır ve şehrinize göndeririz; nakliye şirketinin ücreti varış yerine bağlıdır.' },
      { q: 'Moskova içi kurye hizmeti var mı?', a: 'Evet, Moskova içi kapıya teslim talep üzerine mevcuttur — ücretlidir, gönderim sırasında yöneticinizle ayarlanır.' },
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

        <section aria-labelledby="istanbul-heading" style={{ marginBottom: isMobile ? 32 : 48 }}>
          <h2 id="istanbul-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 16 }}>{c.h2Istanbul}</h2>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: 16, maxWidth: 820 }}>{c.istanbulText}</p>
        </section>

        <section aria-labelledby="moscow-heading" style={{ marginBottom: isMobile ? 32 : 48 }}>
          <h2 id="moscow-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 16 }}>{c.h2Moscow}</h2>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: 16, maxWidth: 820 }}>{c.moscowText}</p>
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
          {language === 'ru' && (
            <Link to={localizedPath('/wildberries-ozon', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>
              Доставка для Wildberries и OZON
            </Link>
          )}
          <Link to={localizedPath('/calculator', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>{t('common.calculator')}</Link>
          <Link to={localizedPath('/contacts', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>{t('common.contacts')}</Link>
        </nav>
      </main>
    </div>
  );
}

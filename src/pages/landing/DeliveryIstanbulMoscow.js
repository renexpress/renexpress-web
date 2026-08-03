import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { SITE } from '../../config/site';
import '../../styles/home-redesign.css';

export default function DeliveryIstanbulMoscow({ isAuthenticated, setIsAuthenticated }) {
  const { language, t } = useTranslation();
  const navigate = useNavigate();

  const copy = {
    ru: {
      eyebrow: 'Направление · Стамбул → Москва',
      h1: 'Доставка из Стамбула в Москву',
      lead: 'Прямой карго-маршрут между двумя городами: принимаем товар в Стамбуле, консолидируем и отправляем в Москву, выдаём на собственном складе. Если вы не в Москве — бесплатно передаём груз транспортной компании до вашего города России.',
      h2Route: 'Маршрут двух городов',
      routeText: `Стамбул и Москва — опорные точки сети RENEXPRESS. Стамбульский офис принимает товар от поставщиков и ежедневно отправляет партии в Россию. В Москве груз приходит на собственный склад по адресу ${SITE.warehouses.moscow.address}, откуда его забирают самовывозом или пересылают дальше по стране.`,
      h2Istanbul: 'Приём и отправка в Стамбуле',
      istanbulText: 'Товар от ваших поставщиков привозят в наш офис в Стамбуле — или мы организуем забор. Каждую партию проверяем, взвешиваем, упаковываем и присваиваем номер отправки, видимый в приложении. Дальше груз консолидируется с другими и уходит в Москву авто-фурой или авиарейсом — по выбранному тарифу.',
      h2Moscow: 'Получение в Москве и по России',
      moscowText: `В Москве груз поступает на склад: ${SITE.warehouses.moscow.address} (пн–пт 09:00–18:00). Забрать можно самовывозом — бесплатно. Если вы в другом городе, бесплатно довозим груз до транспортной компании в Москве и отправляем в ваш регион (стоимость перевозки ТК зависит от направления). Курьерская доставка по Москве до двери — по запросу, платно.`,
      h2Options: 'Тарифы на маршруте Стамбул → Москва',
      optionsText: 'Цена фиксируется за килограмм после взвешивания в Стамбуле. Минимум — 10 кг на отправку.',
      h2Faq: 'Частые вопросы',
      ctaTitle: 'Отправить груз Стамбул → Москва',
      ctaText: 'Рассчитайте стоимость в калькуляторе или свяжитесь с менеджером.',
    },
    en: {
      eyebrow: 'Route · Istanbul → Moscow',
      h1: 'Cargo from Istanbul to Moscow',
      lead: 'A direct cargo route between the two cities: we receive goods in Istanbul, consolidate and ship to Moscow, and hand them over at our own warehouse. Not in Moscow? We forward your cargo free to a transport company for onward delivery to your city in Russia.',
      h2Route: 'A route between two cities',
      routeText: `Istanbul and Moscow are the anchor points of the RENEXPRESS network. The Istanbul office receives goods from suppliers and dispatches batches to Russia daily. In Moscow the cargo arrives at our own warehouse at ${SITE.warehouses.moscow.address}, where it is picked up or forwarded onward across the country.`,
      h2Istanbul: 'Intake and dispatch in Istanbul',
      istanbulText: 'Your suppliers deliver goods to our Istanbul office — or we arrange pickup. Each batch is inspected, weighed, packed, and assigned a shipment number visible in the app. The cargo is then consolidated with others and leaves for Moscow by truck or air, based on your chosen tariff.',
      h2Moscow: 'Pickup in Moscow & across Russia',
      moscowText: `In Moscow the cargo arrives at the warehouse: ${SITE.warehouses.moscow.address} (Mon-Fri 09:00-18:00). You can collect it yourself — free of charge. If you are in another city, we deliver the cargo free to a transport company in Moscow and send it to your region (the carrier's fee depends on the destination). Door-to-door courier within Moscow is available on request, for a fee.`,
      h2Options: 'Tariffs on the Istanbul → Moscow route',
      optionsText: 'The price is fixed per kilogram after weighing in Istanbul. Minimum — 10 kg per shipment.',
      h2Faq: 'FAQ',
      ctaTitle: 'Ship from Istanbul to Moscow',
      ctaText: 'Calculate the price or talk to a manager.',
    },
    tr: {
      eyebrow: 'Rota · İstanbul → Moskova',
      h1: 'İstanbul\'dan Moskova\'ya kargo',
      lead: 'İki şehir arasında doğrudan kargo rotası: ürünü İstanbul\'da teslim alır, birleştirip Moskova\'ya gönderir ve kendi depomuzda teslim ederiz. Moskova\'da değilseniz — kargonuzu ücretsiz olarak bir nakliye şirketine devrederek Rusya\'daki şehrinize ulaştırırız.',
      h2Route: 'İki şehrin rotası',
      routeText: `İstanbul ve Moskova, RENEXPRESS ağının çıpa noktalarıdır. İstanbul ofisi tedarikçilerden ürün alır ve her gün Rusya\'ya parti gönderir. Moskova\'da kargo kendi depomuza gelir: ${SITE.warehouses.moscow.address}; buradan teslim alınır veya ülke geneline aktarılır.`,
      h2Istanbul: 'İstanbul\'da teslim alma ve sevkiyat',
      istanbulText: 'Tedarikçileriniz ürünleri İstanbul ofisimize getirir — ya da alımı biz ayarlarız. Her parti kontrol edilir, tartılır, paketlenir ve uygulamada görünen bir sevkiyat numarası alır. Ardından kargo diğerleriyle birleştirilir ve seçtiğiniz tarifeye göre karayolu veya havayolu ile Moskova\'ya gider.',
      h2Moscow: 'Moskova\'da ve Rusya genelinde teslim',
      moscowText: `Moskova\'da kargo depoya gelir: ${SITE.warehouses.moscow.address} (Pzt-Cum 09:00-18:00). Kendiniz ücretsiz teslim alabilirsiniz. Başka bir şehirdeyseniz, kargoyu Moskova\'daki bir nakliye şirketine ücretsiz ulaştırır ve bölgenize göndeririz (nakliye ücreti varış yerine bağlıdır). Moskova içi kapıya kurye, talep üzerine ücretlidir.`,
      h2Options: 'İstanbul → Moskova rotasında tarifeler',
      optionsText: 'Fiyat, İstanbul\'da tartıldıktan sonra kilogram başına sabitlenir. Minimum — gönderi başına 10 kg.',
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

  const tariffsRoad = SITE.tariffs.filter((tf) => tf.mode === 'road');
  const tariffsAir = SITE.tariffs.filter((tf) => tf.mode === 'air');

  return (
    <div className="hx">
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

      {/* hero */}
      <section className="hx-sec hx-hero-sec">
        <div className="hx-eyebrow"><i />{c.eyebrow}</div>
        <h1 className="hx-h1" style={{ marginBottom: 18 }}>{c.h1}</h1>
        <p className="hx-hero-lede" style={{ maxWidth: '70ch' }}>{c.lead}</p>
      </section>

      {/* route */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>{c.h2Route}</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>{c.routeText}</p>
      </section>

      {/* istanbul */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>{c.h2Istanbul}</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>{c.istanbulText}</p>
      </section>

      {/* moscow */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>{c.h2Moscow}</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>{c.moscowText}</p>
      </section>

      {/* tariffs table */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>{c.h2Options}</h2>
        <p className="hx-lede" style={{ maxWidth: '60ch', marginBottom: 28 }}>{c.optionsText}</p>
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

      {/* faq */}
      <section className="hx-sec hx-sec--gray">
        <div className="hx-faq">
          <div>
            <div className="hx-eyebrow"><i />FAQ</div>
            <h2 className="hx-h2">{c.h2Faq}</h2>
          </div>
          <div className="hx-faq-list">
            {faqList.map((f, i) => (
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
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>{c.ctaTitle}</h2>
        <p className="hx-lede" style={{ maxWidth: '52ch', marginBottom: 24 }}>{c.ctaText}</p>
        <button type="button" className="hx-cta" onClick={() => navigate(localizedPath('/calculator', language))}>
          {t('common.orderNow')}
        </button>
        <nav aria-label="Related pages" className="hx-hub" style={{ marginTop: 40 }}>
          <Link to={localizedPath('/delivery-turkey-russia', language)}>
            {language === 'ru' ? 'Доставка Турция–Россия' : language === 'tr' ? 'Türkiye-Rusya kargo' : 'Turkey-Russia cargo'} <span aria-hidden="true">→</span>
          </Link>
          <Link to={localizedPath('/customs-clearance', language)}>
            {language === 'ru' ? 'Таможенное оформление' : language === 'tr' ? 'Gümrük işlemleri' : 'Customs clearance'} <span aria-hidden="true">→</span>
          </Link>
          {language === 'ru' && (
            <Link to={localizedPath('/wildberries-ozon', language)}>Доставка для Wildberries и OZON <span aria-hidden="true">→</span></Link>
          )}
          <Link to={localizedPath('/calculator', language)}>{t('common.calculator')} <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/contacts', language)}>{t('common.contacts')} <span aria-hidden="true">→</span></Link>
          {language === 'ru' && (
            <Link to={localizedPath('/blog', language)}>Статьи <span aria-hidden="true">→</span></Link>
          )}
        </nav>
      </section>

      <Footer />
    </div>
  );
}

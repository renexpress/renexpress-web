import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SEO from '../../components/SEO';
import useIsMobile from '../../hooks/useIsMobile';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { SITE } from '../../config/site';
import { COLORS, GRADIENT, SHADOW } from '../../config/theme';

// Long-form SEO landing page for the main route Turkey → Russia.
// All numbers come from SITE.tariffs (single source of truth). No invented data.

export default function DeliveryTurkeyRussia({ isAuthenticated, setIsAuthenticated }) {
  const { language, t } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // FAQ content is duplicated as JSON-LD (FAQPage schema) + visible HTML.
  // Same Q/A text in both places — Google rewards consistency.
  const faqs = {
    ru: [
      {
        q: 'Сколько стоит доставка из Турции в Россию?',
        a: 'Стоимость зависит от способа доставки. Автомобильный тариф AVTO EXPRESS — $4 за кг, доставка занимает 14-18 дней. Авиа тариф AVIA U3 — $8.5 за кг, 4-5 дней. Премиум-авиа AVIA EX MARKA — $10 за кг, 3-4 дня. Минимальный вес отправки — 10 кг.',
      },
      {
        q: 'Какие сроки доставки из Турции в Россию?',
        a: 'Авто: 14-18 дней. Авиа U3: 4-5 дней. Авиа EX MARKA: 3-4 дня. Срок отсчитывается от приёма груза на склад в Стамбуле до выдачи на московском складе.',
      },
      {
        q: 'Где находится склад в России?',
        a: 'Московский склад RENEXPRESS расположен по адресу: ул. Южнопортовая 7а, стр 2, склад 8, ворота 1. Режим работы: пн-пт 09:00-18:00. Со склада груз можно забрать самовывозом.',
      },
      {
        q: 'Какие документы нужны для отправки?',
        a: 'Для отправителя достаточно фото товара, описания, веса и контактов получателя. Таможенное оформление RENEXPRESS берёт на себя — отдельных документов от вас не требуется. Для физлиц-получателей нужен паспорт при выдаче груза.',
      },
      {
        q: 'Какие товары можно отправлять?',
        a: 'Принимаем: домашний и брендовый текстиль, новую и б/у одежду, обувь турецкого производства, брендовую и б/у обувь. Запрещённые товары: оружие, лекарства, скоропортящиеся продукты, опасные грузы (по списку ИАТА).',
      },
      {
        q: 'Можно ли отслеживать груз?',
        a: 'Да. В мобильном приложении RENEXPRESS (iOS) вы видите статус доставки в реальном времени: «Принят на складе», «В пути», «На таможне», «Прибыл в Москву», «Готов к выдаче».',
      },
    ],
    en: [
      {
        q: 'How much does cargo from Turkey to Russia cost?',
        a: 'Cost depends on the shipping method. Road tariff AVTO EXPRESS — $4 per kg, 14-18 days. Air tariff AVIA U3 — $8.5 per kg, 4-5 days. Premium air AVIA EX MARKA — $10 per kg, 3-4 days. Minimum shipment weight is 10 kg.',
      },
      {
        q: 'How long does delivery from Turkey to Russia take?',
        a: 'Road: 14-18 days. Air U3: 4-5 days. Air EX MARKA: 3-4 days. The timer starts when cargo is accepted at the Istanbul warehouse and ends at handover from the Moscow warehouse.',
      },
      {
        q: 'Where is the Russian warehouse located?',
        a: 'The RENEXPRESS Moscow warehouse is at ul. Yuzhnoportovaya 7a, bldg 2, warehouse 8, gate 1. Open Mon-Fri 09:00-18:00. Cargo can be picked up directly.',
      },
      {
        q: 'What documents are required for shipping?',
        a: 'From the sender: a photo of the goods, description, weight, and recipient contacts. Customs clearance is handled by RENEXPRESS — no separate paperwork from you. For individuals receiving goods, a passport is required at handover.',
      },
      {
        q: 'What types of cargo are accepted?',
        a: 'Accepted: home and branded textiles, new and used clothing, Turkish-made footwear, branded and used shoes. Prohibited: weapons, medicines, perishables, hazardous goods (per IATA list).',
      },
      {
        q: 'Can I track my shipment?',
        a: 'Yes. In the RENEXPRESS mobile app (iOS) you can see real-time status: "Accepted at warehouse", "In transit", "At customs", "Arrived in Moscow", "Ready for pickup".',
      },
    ],
    tr: [
      {
        q: 'Türkiye\'den Rusya\'ya kargo ne kadar?',
        a: 'Maliyet gönderim yöntemine bağlıdır. Karayolu tarifesi AVTO EXPRESS — kg başına $4, 14-18 gün. Havayolu AVIA U3 — kg başına $8.5, 4-5 gün. Premium havayolu AVIA EX MARKA — kg başına $10, 3-4 gün. Minimum gönderi ağırlığı 10 kg.',
      },
      {
        q: 'Türkiye\'den Rusya\'ya teslimat ne kadar sürer?',
        a: 'Karayolu: 14-18 gün. Havayolu U3: 4-5 gün. Havayolu EX MARKA: 3-4 gün. Süre, kargonun İstanbul deposunda kabul edilmesinden Moskova deposundan teslimine kadar sayılır.',
      },
      {
        q: 'Rusya\'daki depo nerede?',
        a: 'RENEXPRESS Moskova deposu: ul. Yujnoportovaya 7a, bina 2, depo 8, kapı 1. Çalışma saatleri: Pzt-Cum 09:00-18:00. Kargolar depodan teslim alınabilir.',
      },
      {
        q: 'Gönderim için hangi belgeler gerekir?',
        a: 'Göndericiden: ürün fotoğrafı, açıklama, ağırlık ve alıcı bilgileri. Gümrük işlemleri RENEXPRESS tarafından yapılır — sizden ek belge istenmez. Alıcı bireyse teslim sırasında pasaport gerekir.',
      },
      {
        q: 'Hangi tür kargolar kabul ediliyor?',
        a: 'Kabul edilen: ev ve markalı tekstil, yeni ve ikinci el giysi, Türk üretimi ayakkabı, markalı ve ikinci el ayakkabı. Yasak: silah, ilaç, bozulabilir gıda, tehlikeli mal (IATA listesine göre).',
      },
      {
        q: 'Gönderimi takip edebilir miyim?',
        a: 'Evet. RENEXPRESS mobil uygulamasında (iOS) gerçek zamanlı durum görebilirsiniz: "Depoda kabul edildi", "Yolda", "Gümrükte", "Moskova\'ya vardı", "Teslime hazır".',
      },
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

  // Service schema — tells Google this is a logistics service with specific routes/prices
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cargo delivery from Turkey to Russia',
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: [
      { '@type': 'Country', name: 'Russia' },
      { '@type': 'Country', name: 'Turkey' },
    ],
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
      description: `${tariff.transitDaysMin}-${tariff.transitDaysMax} days`,
    })),
  };

  // Body copy by language. RU is canonical, EN/TR mirror its structure.
  const copy = {
    ru: {
      h1: 'Доставка из Турции в Россию',
      lead: 'RENEXPRESS — карго компания с офисами в Стамбуле и Москве. Доставляем грузы между Турцией и Россией с 2017 года: текстиль, одежду, обувь, потребительские товары. Пять тарифов на выбор — от $4 за кг.',
      h2Tariffs: 'Тарифы доставки Турция → Россия',
      tariffNote: 'Минимальный вес отправки — 10 кг. Цена включает таможенное оформление и доставку до московского склада.',
      h2How: 'Как работает доставка',
      steps: [
        { n: 1, title: 'Приём в Стамбуле', text: 'Поставщик или вы привозите товар в наш стамбульский офис. Мы проверяем, взвешиваем, упаковываем и присваиваем номер отправки.' },
        { n: 2, title: 'Консолидация', text: 'Партии разных клиентов объединяются для оптимизации стоимости. Вы видите вес и итоговую цену в приложении.' },
        { n: 3, title: 'Отправка', text: 'Авто-фура, авиарейс U3 или EX MARKA — по выбранному тарифу. Груз идёт из Стамбула в Москву.' },
        { n: 4, title: 'Таможня', text: 'Таможенное оформление и декларирование берём на себя. От вас не требуется дополнительных документов.' },
        { n: 5, title: 'Выдача в Москве', text: 'Уведомляем о прибытии. Самовывоз со склада на Южнопортовой или доставка курьером по Москве (по запросу).' },
      ],
      h2Why: 'Почему RENEXPRESS',
      whyItems: [
        { title: 'С 2017 года на маршруте', text: 'Работаем с 2017 года, более 3000 клиентов. Знаем особенности турецких поставщиков и российской таможни.' },
        { title: 'Свои офисы в Стамбуле и Москве', text: 'Не агрегатор — собственные склады, собственные сотрудники с обеих сторон. Контролируем весь маршрут.' },
        { title: 'Прозрачные тарифы', text: 'Цена за кг фиксированная. Никаких «скрытых сборов» за упаковку, документы или растаможку.' },
        { title: 'Отслеживание в приложении', text: 'iOS-приложение RENEXPRESS показывает статусы в реальном времени и историю отправок.' },
      ],
      h2Cargo: 'Какие товары принимаем',
      h2FAQ: 'Вопросы и ответы',
      ctaTitle: 'Готовы отправить груз из Турции?',
      ctaText: 'Рассчитайте стоимость в калькуляторе или свяжитесь с менеджером — поможем оформить отправку.',
      ctaPrimary: 'Калькулятор стоимости',
      ctaSecondary: 'Связаться с менеджером',
    },
    en: {
      h1: 'Cargo from Turkey to Russia',
      lead: 'RENEXPRESS is a cargo company with offices in Istanbul and Moscow. Shipping goods between Turkey and Russia since 2017: textiles, clothing, footwear, consumer goods. Five tariffs — starting from $4 per kg.',
      h2Tariffs: 'Turkey → Russia tariffs',
      tariffNote: 'Minimum shipment 10 kg. Price includes customs clearance and delivery to the Moscow warehouse.',
      h2How: 'How it works',
      steps: [
        { n: 1, title: 'Pickup in Istanbul', text: 'You or your supplier deliver goods to our Istanbul office. We inspect, weigh, pack, and assign a shipment number.' },
        { n: 2, title: 'Consolidation', text: 'Shipments from different clients are consolidated to optimize cost. You see weight and total price in the app.' },
        { n: 3, title: 'Departure', text: 'Truck, AVIA U3, or AVIA EX MARKA — based on your chosen tariff. Cargo travels from Istanbul to Moscow.' },
        { n: 4, title: 'Customs', text: 'We handle customs clearance and declaration. No additional documents required from you.' },
        { n: 5, title: 'Handover in Moscow', text: 'Arrival notification. Self-pickup from the Yuzhnoportovaya warehouse or courier delivery within Moscow (on request).' },
      ],
      h2Why: 'Why RENEXPRESS',
      whyItems: [
        { title: 'On this route since 2017', text: 'Operating since 2017, more than 3000 clients. We know Turkish suppliers and Russian customs inside out.' },
        { title: 'Own offices in Istanbul and Moscow', text: 'Not a broker — our own warehouses and our own staff on both sides. We control the whole route.' },
        { title: 'Transparent pricing', text: 'Fixed price per kg. No hidden fees for packaging, paperwork, or customs.' },
        { title: 'In-app tracking', text: 'RENEXPRESS iOS app shows real-time statuses and shipment history.' },
      ],
      h2Cargo: 'Accepted cargo types',
      h2FAQ: 'Frequently asked questions',
      ctaTitle: 'Ready to ship from Turkey?',
      ctaText: 'Use the calculator to estimate cost or contact a manager — we\'ll help you set up the shipment.',
      ctaPrimary: 'Cost calculator',
      ctaSecondary: 'Contact a manager',
    },
    tr: {
      h1: 'Türkiye\'den Rusya\'ya kargo',
      lead: 'RENEXPRESS, İstanbul ve Moskova ofisleri olan bir kargo şirketidir. 2017\'den bu yana Türkiye ile Rusya arasında tekstil, giysi, ayakkabı ve tüketim malları taşıyoruz. Beş tarife — kg başına $4\'ten başlayan fiyatlarla.',
      h2Tariffs: 'Türkiye → Rusya tarifeleri',
      tariffNote: 'Minimum gönderi 10 kg. Fiyat, gümrük işlemleri ve Moskova deposuna teslimi içerir.',
      h2How: 'Nasıl çalışır',
      steps: [
        { n: 1, title: 'İstanbul\'da teslim alma', text: 'Siz veya tedarikçiniz ürünleri İstanbul ofisimize getirir. Kontrol, tartma, paketleme ve sevkiyat numarası verme işlemlerini biz yaparız.' },
        { n: 2, title: 'Konsolidasyon', text: 'Farklı müşterilerin gönderileri maliyet optimizasyonu için birleştirilir. Ağırlık ve toplam fiyatı uygulamada görürsünüz.' },
        { n: 3, title: 'Sevkiyat', text: 'Karayolu, AVIA U3 veya AVIA EX MARKA — seçtiğiniz tarifeye göre. Kargo İstanbul\'dan Moskova\'ya gider.' },
        { n: 4, title: 'Gümrük', text: 'Gümrük işlemleri ve beyan bize aittir. Sizden ek belge istenmez.' },
        { n: 5, title: 'Moskova\'da teslim', text: 'Varış bildirimi. Yujnoportovaya deposundan teslim alma veya Moskova içi kurye (talep üzerine).' },
      ],
      h2Why: 'Neden RENEXPRESS',
      whyItems: [
        { title: '2017\'den beri bu rotada', text: '2017\'den bu yana, 3000\'den fazla müşteri. Türk tedarikçiler ve Rus gümrüğünü iyi tanırız.' },
        { title: 'Kendi ofislerimiz', text: 'Aracı değil — her iki tarafta kendi depolarımız ve personelimiz. Tüm rotayı kontrol ederiz.' },
        { title: 'Şeffaf fiyatlandırma', text: 'Kg başına sabit fiyat. Paketleme, evrak veya gümrük için gizli ücret yoktur.' },
        { title: 'Uygulamada takip', text: 'RENEXPRESS iOS uygulaması, gerçek zamanlı durum ve gönderi geçmişi gösterir.' },
      ],
      h2Cargo: 'Kabul edilen kargo türleri',
      h2FAQ: 'Sık sorulan sorular',
      ctaTitle: 'Türkiye\'den gönderim için hazır mısınız?',
      ctaText: 'Hesaplayıcıyla maliyeti tahmin edin veya bir yöneticiyle iletişime geçin — gönderiyi ayarlamanıza yardım ederiz.',
      ctaPrimary: 'Maliyet hesaplayıcı',
      ctaSecondary: 'Yönetici ile iletişim',
    },
  };
  const c = copy[language] || copy.ru;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: 'Inter, -apple-system, sans-serif', color: COLORS.text }}>
      <SEO
        titleKey="seo.deliveryTurkeyRussia.title"
        descriptionKey="seo.deliveryTurkeyRussia.description"
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: t('common.services'), path: '/services' },
          { name: c.h1, path: '/delivery-turkey-russia' },
        ]}
        jsonLd={[serviceJsonLd, faqJsonLd]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '24px 16px 48px' : '48px 32px 96px' }}>
        <header style={{ marginBottom: isMobile ? 24 : 48 }}>
          <h1 style={{ fontSize: isMobile ? 32 : 52, fontWeight: 800, lineHeight: 1.15, marginBottom: 16, color: COLORS.text }}>{c.h1}</h1>
          <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color: '#475569', maxWidth: 760 }}>{c.lead}</p>
        </header>

        {/* Tariffs */}
        <section aria-labelledby="tariffs-heading" style={{ marginBottom: isMobile ? 32 : 64 }}>
          <h2 id="tariffs-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 8 }}>{c.h2Tariffs}</h2>
          <p style={{ color: '#64748B', marginBottom: 24, fontSize: 14 }}>{c.tariffNote}</p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {SITE.tariffs.map((tariff) => (
              <article key={tariff.id} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: COLORS.primaryText, fontWeight: 700, marginBottom: 6 }}>
                  {tariff.mode === 'road' ? (language === 'ru' ? 'Авто' : language === 'tr' ? 'Karayolu' : 'Road') : (language === 'ru' ? 'Авиа' : language === 'tr' ? 'Havayolu' : 'Air')}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{tariff.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: COLORS.text }}>${tariff.pricePerKg}</span>
                  <span style={{ color: '#64748B' }}>/ {t('common.kg')}</span>
                </div>
                <div style={{ color: COLORS.text, fontWeight: 600 }}>
                  {tariff.transitDaysMin}-{tariff.transitDaysMax} {t('common.days')}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-heading" style={{ marginBottom: isMobile ? 32 : 64 }}>
          <h2 id="how-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 24 }}>{c.h2How}</h2>
          <ol style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
            {c.steps.map((step) => (
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

        {/* Why us */}
        <section aria-labelledby="why-heading" style={{ marginBottom: isMobile ? 32 : 64 }}>
          <h2 id="why-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 24 }}>{c.h2Why}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
            {c.whyItems.map((item, i) => (
              <article key={i} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 12, padding: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Cargo types — content from SITE.cargoCategories */}
        <section aria-labelledby="cargo-heading" style={{ marginBottom: isMobile ? 32 : 64 }}>
          <h2 id="cargo-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 16 }}>{c.h2Cargo}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SITE.cargoCategories.map((cat) => (
              <span key={cat} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', borderRadius: 999, padding: '8px 14px', fontSize: 14, color: '#334155' }}>{cat}</span>
            ))}
          </div>
        </section>

        {/* FAQ — same content as in JSON-LD above */}
        <section aria-labelledby="faq-heading" style={{ marginBottom: isMobile ? 32 : 64 }}>
          <h2 id="faq-heading" style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 24 }}>{c.h2FAQ}</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {faqList.map((f, i) => (
              <details key={i} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 12, padding: '16px 20px' }}>
                <summary style={{ fontSize: 16, fontWeight: 600, cursor: 'pointer', listStyle: 'none' }}>{f.q}</summary>
                <p style={{ color: '#475569', lineHeight: 1.6, marginTop: 12, marginBottom: 0 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="cta-heading" style={{ background: '#FFFFFF', color: COLORS.text, border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 16, padding: isMobile ? 24 : 40, textAlign: 'center' }}>
          <h2 id="cta-heading" style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, marginBottom: 8 }}>{c.ctaTitle}</h2>
          <p style={{ color: COLORS.textSecond, marginBottom: 24, fontSize: 16 }}>{c.ctaText}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => navigate(localizedPath('/calculator', language))}
              style={{ background: GRADIENT, color: '#FFFFFF', border: 'none', padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', textShadow: '0 1px 2px rgba(10,37,53,.35)', minHeight: 48 }}
            >
              {c.ctaPrimary}
            </button>
            <Link
              to={localizedPath('/contacts', language)}
              style={{ background: '#FFFFFF', color: COLORS.primaryText, border: '1.5px solid #2AABAB', padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: 'none', minHeight: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {c.ctaSecondary}
            </Link>
          </div>
        </section>

        {/* Internal links for SEO link graph */}
        <nav aria-label="Related pages" style={{ marginTop: isMobile ? 32 : 48, padding: '24px 0', borderTop: '1px solid #EEEEEE', display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14 }}>
          <Link to={localizedPath('/delivery-istanbul-moscow', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>
            {language === 'ru' ? 'Доставка Стамбул-Москва' : language === 'tr' ? 'İstanbul-Moskova kargo' : 'Istanbul-Moscow cargo'}
          </Link>
          <Link to={localizedPath('/customs-clearance', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>
            {language === 'ru' ? 'Таможенное оформление' : language === 'tr' ? 'Gümrük işlemleri' : 'Customs clearance'}
          </Link>
          <Link to={localizedPath('/services', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>
            {t('common.services')}
          </Link>
          <Link to={localizedPath('/calculator', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>
            {t('common.calculator')}
          </Link>
          <Link to={localizedPath('/faq', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>
            {t('common.faq')}
          </Link>
        </nav>
      </main>
    </div>
  );
}

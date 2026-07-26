import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SEO from '../../components/SEO';
import useIsMobile from '../../hooks/useIsMobile';
import { useTranslation, localizedPath } from '../../i18n/LanguageContext';
import { COLORS, GRADIENT, SHADOW } from '../../config/theme';

export default function CustomsClearance({ isAuthenticated, setIsAuthenticated }) {
  const { language, t } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const copy = {
    ru: {
      h1: 'Таможенное оформление грузов из Турции',
      lead: 'RENEXPRESS берёт таможенное оформление на себя — это включено в стоимость каждой отправки. Никаких отдельных платежей за брокера, декларирование или ТН ВЭД.',
      h2What: 'Что входит в таможенное сопровождение',
      whatItems: [
        'Подбор кода ТН ВЭД для каждого товара в партии.',
        'Подготовка таможенной декларации (ДТ).',
        'Взаимодействие с таможенным органом при ввозе.',
        'Уплата таможенных платежей в рамках согласованной стоимости.',
        'Прохождение всех проверок и выпуск товара в свободное обращение.',
      ],
      h2Why: 'Зачем нужен брокер',
      whyText: 'Самостоятельное оформление импорта требует знания товарной номенклатуры, регламентов ЕАЭС и правил декларирования. Одна ошибка в коде ТН ВЭД может задержать груз на неделю и привести к доначислению пошлин. Мы делаем 100+ декларирований в месяц — для нас это рутина, для разового импорта — риск.',
      h2Docs: 'Какие документы нужны',
      docsItems: [
        'Описание и фото товара (предоставляете при создании отправки).',
        'Вес и количество мест (фиксируем на складе в Стамбуле).',
        'Контакты получателя и его статус (физлицо или юрлицо).',
        'Документы поставщика (инвойс, упаковочный лист) — собираем сами при наличии.',
      ],
      h2Limits: 'Лимиты беспошлинного ввоза',
      limitsText: 'Для физлиц-получателей в России действуют лимиты беспошлинного ввоза: 200 евро / 31 кг на одну посылку (на 2026 год). Превышение облагается пошлиной 15% с суммы превышения, мин. 2 евро за кг. RENEXPRESS заранее предупредит, если ваш груз превысит лимиты, чтобы вы могли решить, как поступить.',
      h2Faq: 'Частые вопросы',
      ctaTitle: 'Готовы отправить груз?',
      ctaText: 'Расчёт стоимости в калькуляторе с учётом таможенных платежей.',
    },
    en: {
      h1: 'Customs clearance for imports from Turkey',
      lead: 'RENEXPRESS handles customs clearance — included in the price of every shipment. No separate fees for the broker, declaration, or HS code.',
      h2What: 'What customs support includes',
      whatItems: [
        'HS code selection for each item in the batch.',
        'Customs declaration preparation.',
        'Interaction with the customs authority on import.',
        'Payment of customs duties within the agreed cost.',
        'Passing all inspections and releasing goods for free circulation.',
      ],
      h2Why: 'Why a broker is needed',
      whyText: 'Self-clearing imports requires knowledge of the commodity nomenclature, EAEU regulations, and declaration rules. One error in the HS code can delay cargo by a week and trigger additional duties. We process 100+ declarations a month — it\'s routine for us, a risk for a one-off import.',
      h2Docs: 'Required documents',
      docsItems: [
        'Goods description and photo (provided when creating a shipment).',
        'Weight and number of packages (recorded at the Istanbul warehouse).',
        'Recipient contacts and status (individual or business).',
        'Supplier documents (invoice, packing list) — we collect them when available.',
      ],
      h2Limits: 'Duty-free import limits',
      limitsText: 'For individuals receiving in Russia, duty-free limits apply: €200 / 31 kg per parcel (as of 2026). Excess is taxed at 15% on the over-limit value, with a minimum of €2 per kg. RENEXPRESS warns you in advance if your shipment exceeds the limits so you can decide how to proceed.',
      h2Faq: 'FAQ',
      ctaTitle: 'Ready to ship?',
      ctaText: 'Calculate the cost in the calculator including customs duties.',
    },
    tr: {
      h1: 'Türkiye\'den ithalat için gümrük işlemleri',
      lead: 'RENEXPRESS gümrük işlemlerini üstlenir — bu, her sevkiyatın fiyatına dahildir. Komisyoncu, beyan veya GTİP için ayrı ücret yoktur.',
      h2What: 'Gümrük desteğine neler dahil',
      whatItems: [
        'Partideki her ürün için GTİP kodu seçimi.',
        'Gümrük beyannamesi hazırlama.',
        'İthalat sırasında gümrük makamıyla iletişim.',
        'Anlaşılan maliyet kapsamında gümrük ödemelerinin yapılması.',
        'Tüm kontrollerden geçirilip serbest dolaşıma çıkarma.',
      ],
      h2Why: 'Neden komisyoncu gerekir',
      whyText: 'İthalatı kendi başına yapmak için emtia nomenklatürü, EAEU mevzuatı ve beyan kuralları bilgisi gerekir. GTİP kodundaki bir hata kargoyu bir hafta geciktirip ek vergiye yol açabilir. Biz ayda 100+ beyan işliyoruz — bizim için rutin, tek seferlik ithalat için risk.',
      h2Docs: 'Gerekli belgeler',
      docsItems: [
        'Ürün açıklaması ve fotoğrafı (sevkiyat oluştururken sağlanır).',
        'Ağırlık ve paket sayısı (İstanbul deposunda kaydedilir).',
        'Alıcı bilgileri ve statüsü (birey veya kurum).',
        'Tedarikçi belgeleri (fatura, çeki listesi) — varsa biz toplarız.',
      ],
      h2Limits: 'Gümrüksüz ithalat limitleri',
      limitsText: 'Rusya\'da bireyler için gümrüksüz limitler: koli başına €200 / 31 kg (2026 itibariyle). Aşım %15 ek vergiye tabidir, kg başına minimum €2. RENEXPRESS limitleri aşacaksa önceden uyarır.',
      h2Faq: 'SSS',
      ctaTitle: 'Gönderim için hazır mısınız?',
      ctaText: 'Gümrük dahil maliyeti hesaplayıcıda görün.',
    },
  };
  const c = copy[language] || copy.ru;

  const faqs = {
    ru: [
      { q: 'Нужны ли мне свои таможенные документы?', a: 'Нет. RENEXPRESS готовит весь пакет документов и проходит таможню от вашего имени.' },
      { q: 'Сколько занимает прохождение таможни?', a: 'Обычно 1-3 рабочих дня, включено в общий срок доставки.' },
      { q: 'Что если груз превысит беспошлинный лимит?', a: 'Менеджер сообщит заранее. Возможна доплата таможенной пошлины или разделение партии.' },
      { q: 'Есть ли запрещённые к ввозу товары?', a: 'Да: оружие, лекарства (без рецепта), скоропортящиеся, опасные грузы по ИАТА. Спорные категории уточняйте у менеджера.' },
    ],
    en: [
      { q: 'Do I need my own customs paperwork?', a: 'No. RENEXPRESS prepares the full document package and clears customs on your behalf.' },
      { q: 'How long does customs take?', a: 'Usually 1-3 business days, included in the total delivery time.' },
      { q: 'What if cargo exceeds the duty-free limit?', a: 'The manager will notify you in advance. Options: pay the duty or split the shipment.' },
      { q: 'Are there prohibited goods?', a: 'Yes: weapons, prescription medicines, perishables, hazardous goods (IATA list). Check with a manager for borderline categories.' },
    ],
    tr: [
      { q: 'Kendi gümrük belgelerim gerekir mi?', a: 'Hayır. RENEXPRESS tüm belgeleri hazırlar ve sizin adınıza gümrüğü tamamlar.' },
      { q: 'Gümrük ne kadar sürer?', a: 'Genellikle 1-3 iş günü, toplam teslim süresine dahildir.' },
      { q: 'Kargo gümrüksüz limiti aşarsa?', a: 'Yönetici önceden bildirir. Seçenekler: vergiyi ödemek veya gönderiyi bölmek.' },
      { q: 'Yasak ürünler var mı?', a: 'Evet: silah, reçeteli ilaçlar, bozulabilir, tehlikeli mallar (IATA listesi). Sınır durumlar için yöneticiye danışın.' },
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
        titleKey="seo.customsClearance.title"
        descriptionKey="seo.customsClearance.description"
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: t('common.services'), path: '/services' },
          { name: c.h1, path: '/customs-clearance' },
        ]}
        jsonLd={[faqJsonLd]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '24px 16px 48px' : '48px 32px 96px' }}>
        <header style={{ marginBottom: isMobile ? 24 : 48 }}>
          <h1 style={{ fontSize: isMobile ? 32 : 52, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>{c.h1}</h1>
          <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color: '#475569', maxWidth: 760 }}>{c.lead}</p>
        </header>

        <section style={{ marginBottom: isMobile ? 32 : 48 }}>
          <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 16 }}>{c.h2What}</h2>
          <ul style={{ paddingLeft: 24, color: '#475569', lineHeight: 1.8, fontSize: 16 }}>
            {c.whatItems.map((item, i) => <li key={i} style={{ marginBottom: 6 }}>{item}</li>)}
          </ul>
        </section>

        <section style={{ marginBottom: isMobile ? 32 : 48, background: '#FFFFFF', border: '1px solid #E8E8E8', boxShadow: SHADOW.card, borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, marginBottom: 12 }}>{c.h2Why}</h2>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: 16, margin: 0 }}>{c.whyText}</p>
        </section>

        <section style={{ marginBottom: isMobile ? 32 : 48 }}>
          <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 16 }}>{c.h2Docs}</h2>
          <ul style={{ paddingLeft: 24, color: '#475569', lineHeight: 1.8, fontSize: 16 }}>
            {c.docsItems.map((item, i) => <li key={i} style={{ marginBottom: 6 }}>{item}</li>)}
          </ul>
        </section>

        <section style={{ marginBottom: isMobile ? 32 : 48, background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, marginBottom: 12, color: '#92400E' }}>{c.h2Limits}</h2>
          <p style={{ color: '#78350F', lineHeight: 1.7, fontSize: 15, margin: 0 }}>{c.limitsText}</p>
        </section>

        <section style={{ marginBottom: isMobile ? 32 : 48 }}>
          <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, marginBottom: 24 }}>{c.h2Faq}</h2>
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
          <button
            onClick={() => navigate(localizedPath('/calculator', language))}
            style={{ background: GRADIENT, color: '#FFFFFF', border: 'none', padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', textShadow: '0 1px 2px rgba(10,37,53,.35)', minHeight: 48 }}
          >
            {t('common.orderNow')}
          </button>
        </section>

        <nav aria-label="Related pages" style={{ marginTop: 48, padding: '24px 0', borderTop: '1px solid #EEEEEE', display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14 }}>
          <Link to={localizedPath('/delivery-turkey-russia', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>
            {language === 'ru' ? 'Доставка Турция-Россия' : language === 'tr' ? 'Türkiye-Rusya kargo' : 'Turkey-Russia cargo'}
          </Link>
          <Link to={localizedPath('/delivery-istanbul-moscow', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>
            {language === 'ru' ? 'Стамбул-Москва' : language === 'tr' ? 'İstanbul-Moskova' : 'Istanbul-Moscow'}
          </Link>
          <Link to={localizedPath('/services', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>{t('common.services')}</Link>
          <Link to={localizedPath('/faq', language)} style={{ color: COLORS.primaryText, textDecoration: 'none' }}>{t('common.faq')}</Link>
        </nav>
      </main>
    </div>
  );
}

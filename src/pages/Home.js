import React, { useState } from 'react';
import '../styles/responsive.css';
import '../styles/home-redesign.css';
import useIsMobile from '../hooks/useIsMobile';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { useTranslation } from '../i18n/LanguageContext';
import { SITE } from '../config/site';
import { track } from '../utils/analytics';

// Home — variant 1a "Ведомость" (Claude Design). Swiss editorial grid: white base,
// teal accent, dosed gradient, thin rules, tariffs as a price-list table.
// Layout + responsive live in styles/home-redesign.css. Data is read from SITE
// (single source of truth — never hardcode tariffs). The shared <Navbar> provides
// the top bar (desktop) / bottom nav (mobile); this page renders its own dark footer.

const WA = SITE.whatsapp.main.wa; // 905511898288
const WA_HREF = `https://wa.me/${WA}`;

// ── Icons ────────────────────────────────────────────────────────────────────
const IcCheck = ({ c = '#2AABAB', w = 2.4 }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} style={{ flexShrink: 0, marginTop: 3 }}><polyline points="20 6 9 17 4 12" /></svg>
);
const IcArrow = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
const IcTruck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2AABAB" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
);
const IcPlane = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2AABAB" strokeWidth="2"><path d="M22 2 11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
);
const IcShield = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#157070" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
);
const IcWa = ({ f = '#25D366', s = 17 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={f}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
);
const IcApple = ({ f = '#1A1A1A' }) => (
  <svg width="15" height="18" viewBox="0 0 384 512" fill={f}><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
);
const IcGP = ({ f = '#1A1A1A' }) => (
  <svg width="15" height="17" viewBox="0 0 512 512" fill={f}><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" /></svg>
);

// ── Data (facts from SITE; copy per the brief) ───────────────────────────────
const APP_STORE = SITE.social.appStore;
const GOOGLE_PLAY = SITE.social.googlePlay;

const HERO = {
  ru: {
    eyebrow: 'Карго Турция → Россия · с 2017',
    h1: 'Карго из Турции в Россию — от $4 за кг',
    lede: 'Доставка из Стамбула в Москву. Пять тарифов, авто и авиа, срок от 3 дней. Таможенное оформление берём на себя — от вас не нужно ни одного документа.',
  },
  en: {
    eyebrow: 'Cargo Turkey → Russia · since 2017',
    h1: 'Cargo from Turkey to Russia — from $4 per kilo',
    lede: 'Istanbul to Moscow. Five tariffs, road and air, from 3 days. We handle customs — you file nothing.',
  },
  tr: {
    eyebrow: 'Kargo Türkiye → Rusya · 2017’den beri',
    h1: 'Türkiye’den Rusya’ya kargo — kilosu $4’ten',
    lede: 'İstanbul’dan Moskova’ya. Beş tarife, kara ve hava, 3 günden itibaren. Gümrük işlemleri bizde — sizden belge istemiyoruz.',
  },
};

const STEPS = [
  { n: '01', t: 'Приём в Стамбуле', d: 'Привозите или отправляете товар на наш стамбульский склад. Байер может закупить за вас.' },
  { n: '02', t: 'Консолидация и вес', d: 'Собираем груз от разных поставщиков, взвешиваем и фиксируем стоимость по тарифу.' },
  { n: '03', t: 'Отправка авто / авиа', d: 'Отправляем выбранным тарифом. Таможенное оформление берём на себя — без документов от вас.' },
  { n: '04', t: 'Выдача в Москве', d: 'Забираете груз на складе Южнопортовая 7а или заказываете доставку. Отслеживание в приложении.' },
];

const FEATURES = [
  { t: 'Авто и авиа доставка', d: 'Пять тарифов: авто от $4/кг за 14–18 дней, авиа от $8/кг за 3–4 дня. Ежедневные отправки из Стамбула.' },
  { t: 'Честный знак и маркировка', d: 'Маркируем товары для легальной продажи в России. Доставляем напрямую на склады Wildberries и OZON.' },
  { t: 'Склады в Москве и Стамбуле', d: 'Московский склад: ул. Южнопортовая 7а. Стамбульский офис принимает товары от поставщиков ежедневно.' },
  { t: 'Приложение RENEXPRESS', d: 'Отслеживайте грузы в реальном времени, создавайте заказы и общайтесь с поддержкой — всё в одном месте.' },
  { t: 'Прозрачные сроки и цены', d: 'Фиксированная стоимость за килограмм без скрытых платежей. Минимальный вес отправки — 10 кг.' },
  { t: 'Байер в Стамбуле', d: 'Наш байер найдёт и закупит товары у турецких поставщиков. Фото и видео отчёты при приёмке на складе.' },
];

const HUB = [
  { href: '/delivery-turkey-russia', label: 'Доставка из Турции в Россию' },
  { href: '/delivery-istanbul-moscow', label: 'Карго из Стамбула в Москву' },
  { href: '/customs-clearance', label: 'Растаможка грузов из Турции' },
  { href: '/wildberries-ozon', label: 'Доставка на Wildberries и OZON' },
  { href: '/services', label: 'Тарифы и услуги карго' },
  { href: '/calculator', label: 'Калькулятор стоимости' },
  { href: '/blog', label: 'Статьи о доставке' },
  { href: '/faq', label: 'Частые вопросы' },
];

// Single source for the home FAQ — feeds BOTH the visible accordion and the
// FAQPage JSON-LD, so Google sees identical Q/A in HTML and schema.
const HOME_FAQ = [
  { q: 'Сколько стоит доставка из Турции в Россию?', a: 'AVTO EXPRESS — $4/кг (14-18 дней), AVIA U3 — $8.5/кг (4-5 дней), AVIA EX MARKA — $10/кг (3-4 дня). Минимальный вес отправки — 10 кг.' },
  { q: 'Какие сроки доставки из Стамбула в Москву?', a: 'Авто доставка занимает 14-18 дней. Авиа U3 — 4-5 дней, авиа EX MARKA — 3-4 дня.' },
  { q: 'Какие товары можно отправить через RENEXPRESS?', a: 'Домашний текстиль, турецкий текстиль, брендовый текстиль, б/у текстиль, обувь турецкого производства, брендовую и б/у обувь.' },
  { q: 'Где находится склад RENEXPRESS в Москве?', a: 'Московский склад: ул. Южнопортовая 7а, стр 2, склад 8, ворота 1. Режим работы: Пн-Пт 09:00-18:00.' },
  { q: 'Есть ли мобильное приложение для отслеживания?', a: 'Да, приложение RENEXPRESS доступно в App Store (iOS) и Google Play (Android). В приложении можно отслеживать доставки и общаться с поддержкой.' },
];

const scrollTo = (id) => (e) => {
  if (e) e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

function Home({ isAuthenticated, setIsAuthenticated }) {
  const { language } = useTranslation();
  const isMobile = useIsMobile();

  const hero = HERO[language] || HERO.ru;
  const tariffsRoad = SITE.tariffs.filter((t) => t.mode === 'road');
  const tariffsAir = SITE.tariffs.filter((t) => t.mode === 'air');
  const minPrice = Math.min(...SITE.tariffs.map((t) => t.pricePerKg));
  const minDays = Math.min(...SITE.tariffs.map((t) => t.transitDaysMin));

  // ── Inline calculator (live) — WhatsApp deep-link, preserves analytics event ──
  const [aTariff, setATariff] = useState(SITE.tariffs[0].id);
  const [aWeight, setAWeight] = useState('');
  const sel = SITE.tariffs.find((t) => t.id === aTariff) || SITE.tariffs[0];
  const w = parseFloat(aWeight);
  const validW = !isNaN(w) && w >= 10;
  const total = validW ? Math.round(w * sel.pricePerKg * 100) / 100 : null;
  const calcWa = () => {
    if (validW) track('calc_result', { tariff: sel.name, weight: w, total });
    const text =
      `Заявка RENEXPRESS%0A` +
      `Тариф: ${sel.name}%0A` +
      `Вес: ${validW ? w : '—'} кг%0A` +
      `Итого: ${total != null ? '$' + total : '—'}%0A` +
      `Имя: %0AТелефон: `;
    return `${WA_HREF}?text=${text}`;
  };

  // ── Inline lead form — same behaviour as components/LeadForm (WhatsApp + track) ──
  const [lName, setLName] = useState('');
  const [lPhone, setLPhone] = useState('');
  const [lCargo, setLCargo] = useState('');
  const [lCompany, setLCompany] = useState(''); // honeypot
  const [lAgree, setLAgree] = useState(true);
  const [lErr, setLErr] = useState('');
  const submitLead = (e) => {
    e.preventDefault();
    if (lCompany) return; // honeypot tripped
    if (lName.trim().length < 2) { setLErr('Укажите имя (минимум 2 символа)'); return; }
    if (lPhone.trim().length < 5) { setLErr('Укажите телефон или WhatsApp'); return; }
    if (!lAgree) { setLErr('Подтвердите согласие на обработку данных'); return; }
    setLErr('');
    track('lead_submit', { source: 'home' });
    const text =
      `Здравствуйте! Заявка с сайта RENEXPRESS%0A` +
      `Имя: ${lName.trim()}%0A` +
      `Телефон: ${lPhone.trim()}%0A` +
      `Груз: ${lCargo.trim() || '—'}%0A` +
      `Источник: home`;
    window.open(`${WA_HREF}?text=${text}`, '_blank', 'noopener');
  };

  const homeFaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="hx">
      <SEO
        titleKey="seo.home.title"
        descriptionKey="seo.home.description"
        breadcrumbs={[{ name: 'Главная', path: '/' }]}
        jsonLd={[homeFaqJsonLd]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* ===== HERO ===== */}
      <section className="hx-sec hx-hero-sec" style={{ paddingTop: isMobile ? 28 : 112 }}>
        <div className="hx-hero">
          <div>
            <div className="hx-hero-eyebrow"><i /><span>{hero.eyebrow}</span></div>
            <h1 className="hx-h1">{hero.h1}</h1>
            <p className="hx-hero-lede">{hero.lede}</p>
            <div className="hx-hero-actions">
              <a href="#calc" onClick={scrollTo('calc')} className="hx-cta">Рассчитать и оставить заявку <IcArrow /></a>
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="hx-ghost"><IcWa />Написать в WhatsApp</a>
            </div>
            <div className="hx-hero-stores">
              <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="hx-store"><IcApple /><span>App Store</span></a>
              <a href={GOOGLE_PLAY} target="_blank" rel="noopener noreferrer" className="hx-store"><IcGP /><span>Google Play</span></a>
              <small>Отслеживание груза в приложении</small>
            </div>
          </div>

          <aside className="hx-panel">
            <div className="hx-panel-top" />
            <div className="hx-panel-sec">
              <div className="hx-panel-kicker">Маршрут — только в одну сторону</div>
              <div className="hx-route">
                <div className="hx-route-line">
                  <span className="hx-route-dot" /><span className="hx-route-bar" /><span className="hx-route-dot2" />
                </div>
                <div style={{ paddingBottom: 26 }}>
                  <div className="hx-route-city">Стамбул</div>
                  <div className="hx-route-desc">Приём и консолидация груза, свой офис</div>
                </div>
                <div>
                  <div className="hx-route-city">Москва</div>
                  <div className="hx-route-desc">ул. Южнопортовая 7а, стр 2, склад 8, ворота 1<br />Пн–Пт, 09:00–18:00 · самовывоз бесплатно</div>
                </div>
              </div>
            </div>
            <div className="hx-panel-stats">
              <div className="hx-panel-stat">
                <div className="hx-panel-num">${minPrice}<small>/кг</small></div>
                <div className="hx-panel-cap">минимальный тариф, авто</div>
              </div>
              <div className="hx-panel-stat">
                <div className="hx-panel-num">{minDays}<small> дня</small></div>
                <div className="hx-panel-cap">быстрее всего, авиа EX MARKA</div>
              </div>
            </div>
            <div className="hx-panel-min"><IcShield /><span>Минимальный вес отправки — 10 кг</span></div>
          </aside>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="hx-sec--flush">
        <div className="hx-trust">
          <div><b>с {SITE.foundingYear}</b><span>на маршруте Турция–Россия</span></div>
          <div><b>3000+</b><span>клиентов</span></div>
          <div><b>{SITE.tariffs.length} тарифов</b><span>авто и авиа</span></div>
          <div><b>Свои офисы</b><span>в Стамбуле и Москве</span></div>
          <div><b className="teal">WB и OZON</b><span>поставка на склады маркетплейсов</span></div>
        </div>
      </section>

      {/* ===== TARIFFS ===== */}
      <section id="tariffs" className="hx-sec">
        <div className="hx-tf-head">
          <div>
            <div className="hx-eyebrow"><i />Тарифы</div>
            <h2 className="hx-h2">Пять тарифов. Цена за килограмм, без скрытых платежей.</h2>
          </div>
          <p>Стоимость фиксируется на складе в Стамбуле после взвешивания. Минимум — 10 кг на отправку.</p>
        </div>

        <div className="hx-tf-table">
          <div className="hx-tf-cols hx-tf-header">
            <span>Тариф</span><span>Режим</span><span>Срок</span><span>Категория груза</span><span>Цена за кг</span>
          </div>
          {[...tariffsRoad, ...tariffsAir].map((tf) => (
            <div className="hx-tf-cols hx-tf-row" key={tf.id}>
              <span className="hx-tf-name">{tf.name}<span className="sub">{tf.mode === 'air' ? 'Авиа' : 'Авто'} · {tf.deliveryDays} · {tf.category}</span></span>
              <span className="hx-tf-mode">{tf.mode === 'air' ? <IcPlane /> : <IcTruck />}{tf.mode === 'air' ? 'Авиа' : 'Авто'}</span>
              <span className="hx-tf-days">{tf.deliveryDays}</span>
              <span className="hx-tf-cat">{tf.category}</span>
              <span className="hx-tf-price">${tf.pricePerKg}<small>/кг</small></span>
            </div>
          ))}
          <div className="hx-tf-foot">
            <span>Цены указаны в долларах США. Оплата по факту взвешивания в Стамбуле.</span>
            <a href="#calc" onClick={scrollTo('calc')} className="hx-cta hx-cta--solid">Рассчитать стоимость <IcArrow /></a>
          </div>
        </div>
      </section>

      {/* ===== CUSTOMS (dark) ===== */}
      <section className="hx-sec hx-sec--dark">
        <div className="hx-customs">
          <div>
            <div className="kick">Таможня</div>
            <h2>Таможня — на нас.</h2>
            <p>Растаможку, коды ТН ВЭД и маркировку «Честный знак» оформляем сами. От вас не требуется ни одного документа — вы получаете груз, готовый к продаже в России и к поставке на Wildberries и OZON.</p>
          </div>
          <div className="hx-customs-list">
            <div><IcCheck c="#4DCBCB" /><span>Код ТН ВЭД и «Честный знак» под ваш товар</span></div>
            <div><IcCheck c="#4DCBCB" /><span>Фото- и видеоотчёт при приёмке на складе</span></div>
            <div><IcCheck c="#4DCBCB" /><span>Персональный код REN и отслеживание в приложении</span></div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="hx-sec">
        <div className="hx-eyebrow"><i />Как это работает</div>
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Четыре шага от склада в Стамбуле до выдачи в Москве</h2>
        <p className="hx-lede" style={{ maxWidth: '70ch', marginBottom: 44 }}>Мы принимаем товар в Стамбуле, объединяем в одну отправку, везём авто или авиа и растаможиваем. Вы платите за килограмм и следите за грузом в приложении.</p>
        <div className="hx-steps">
          {STEPS.map((s) => (
            <div key={s.n}>
              <div className="hx-step-n">{s.n}</div>
              <h3 className="hx-step-t">{s.t}</h3>
              <p className="hx-step-d">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TWO FORMATS + 3 DELIVERY ===== */}
      <section className="hx-sec hx-sec--gray">
        <h2 className="hx-h2" style={{ marginBottom: 32 }}>Два формата доставки</h2>
        <div className="hx-two">
          <div className="hx-fcard">
            <span className="hx-tag">RENCARGO</span>
            <h3>Обычное карго</h3>
            <p>Стандартная доставка из Стамбула в Москву авто или авиа. Подходит, когда маркировка и таможенные документы для маркетплейсов не нужны.</p>
          </div>
          <div className="hx-fcard hx-fcard--hl">
            <span className="hx-tag hx-tag--hl">RENEXPRESS</span>
            <h3>С ТН ВЭД и «Честным знаком»</h3>
            <p>Доставка с оформлением по коду ТН ВЭД и маркировкой «Честный знак» — для легальной продажи в России и поставки на склады Wildberries и OZON.</p>
          </div>
        </div>

        <h2 className="hx-h2" style={{ marginBottom: 32 }}>Три варианта получения в Москве</h2>
        <div className="hx-three">
          <div className="hx-ocard">
            <div className="hx-ocard-top"><h3>Забрать самому</h3><b>Бесплатно</b></div>
            <p>Склад: ул. Южнопортовая 7а, стр 2, склад 8, ворота 1. Пн–Пт, 09:00–18:00.</p>
          </div>
          <div className="hx-ocard">
            <div className="hx-ocard-top"><h3>Доставка по России</h3><b>Бесплатно до ТК</b></div>
            <p>Бесплатно довозим до транспортной компании в Москве — дальше ТК доставит в ваш город.</p>
          </div>
          <div className="hx-ocard">
            <div className="hx-ocard-top"><h3>Доставка по Москве</h3><b className="plain">Платно</b></div>
            <p>Курьером до двери. Стоимость рассчитывается отдельно, зависит от объёма и адреса.</p>
          </div>
        </div>
      </section>

      {/* ===== CALCULATOR ===== */}
      <section id="calc" className="hx-sec">
        <div className="hx-split">
          <div>
            <div className="hx-eyebrow"><i />Калькулятор</div>
            <h2 className="hx-h2" style={{ marginBottom: 16 }}>Посчитайте стоимость за десять секунд</h2>
            <p className="hx-lede" style={{ maxWidth: '48ch', marginBottom: 30 }}>Выберите тариф и укажите вес — увидите итоговую сумму. Менеджер подтвердит расчёт и сроки в WhatsApp в течение рабочего дня.</p>
            <div className="hx-checks">
              <div className="hx-check"><IcCheck /><span>Цена фиксируется после взвешивания на складе</span></div>
              <div className="hx-check"><IcCheck /><span>Консолидация грузов от разных поставщиков — бесплатно</span></div>
              <div className="hx-check"><IcCheck /><span>Байер в Стамбуле закупит товар за вас</span></div>
            </div>
          </div>

          <div className="hx-card">
            <div className="hx-card-top" />
            <div className="hx-card-body">
              <div className="hx-card-kicker">Расчёт стоимости</div>
              <label className="hx-label" htmlFor="calc-tariff">Тариф</label>
              <select id="calc-tariff" className="hx-select" style={{ marginBottom: 18, ...(isMobile ? { fontSize: 16 } : {}) }}
                value={aTariff} onChange={(e) => setATariff(e.target.value)}>
                {SITE.tariffs.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} — ${t.pricePerKg}/кг · {t.deliveryDays}</option>
                ))}
              </select>
              <label className="hx-label" htmlFor="calc-weight">Вес груза, кг</label>
              <input id="calc-weight" className="hx-input" type="number" min="10" inputMode="decimal"
                value={aWeight} onChange={(e) => setAWeight(e.target.value)} placeholder="Минимум 10 кг"
                style={isMobile ? { fontSize: 16 } : undefined} />
              <div className="hx-calc-out">
                <div className="hx-calc-line"><span className="k">Срок доставки</span><span className="v">{sel.deliveryDays}</span></div>
                <div className="hx-calc-line"><span className="k">Ставка</span><span className="v">${sel.pricePerKg}/кг</span></div>
                <div className="hx-calc-total"><span className="k">Итого</span><span className="v">{total != null ? `$${total}` : '—'}</span></div>
                {aWeight && !validW ? (
                  <p className="hx-warn">Минимальный вес для отправки — 10 кг</p>
                ) : (
                  <p className="hx-calc-note">Цена подтверждается менеджером после взвешивания в Стамбуле.</p>
                )}
                <a href={calcWa()} target="_blank" rel="noopener noreferrer" className="hx-cta" style={{ width: '100%' }}>Отправить расчёт в WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEAD FORM ===== */}
      <section id="lead" className="hx-sec hx-sec--gray">
        <div className="hx-split--lead" style={{ display: 'grid', gap: 56 }}>
          <div>
            <h2 className="hx-h2" style={{ marginBottom: 14 }}>Оставьте заявку — ответим в течение рабочего дня</h2>
            <p className="hx-lede" style={{ maxWidth: '44ch' }}>Три поля — дальше продолжим в WhatsApp: уточним товар, тариф и дату отправки.</p>
          </div>
          <form className="hx-leadform" onSubmit={submitLead} noValidate>
            <div>
              <label htmlFor="lead-name">Имя</label>
              <input id="lead-name" className="hx-input" type="text" autoComplete="name" value={lName}
                onChange={(e) => setLName(e.target.value)} placeholder="Как к вам обращаться"
                style={isMobile ? { fontSize: 16 } : undefined} />
            </div>
            <div>
              <label htmlFor="lead-phone">Телефон</label>
              <input id="lead-phone" className="hx-input" type="tel" inputMode="tel" autoComplete="tel" value={lPhone}
                onChange={(e) => setLPhone(e.target.value)} placeholder="+7 900 000 00 00"
                style={isMobile ? { fontSize: 16 } : undefined} />
            </div>
            <div className="full">
              <label htmlFor="lead-cargo">Что везём</label>
              <input id="lead-cargo" className="hx-input" type="text" value={lCargo}
                onChange={(e) => setLCargo(e.target.value)} placeholder="Например: домашний текстиль, ~120 кг"
                style={isMobile ? { fontSize: 16 } : undefined} />
            </div>
            {/* honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={lCompany} onChange={(e) => setLCompany(e.target.value)} style={{ display: 'none' }} />
            <label className="hx-consent">
              <input type="checkbox" checked={lAgree} onChange={(e) => setLAgree(e.target.checked)}
                style={{ marginTop: 2, accentColor: '#2AABAB', flexShrink: 0 }} />
              <span>Нажимая «Продолжить», вы соглашаетесь с <a href="/about">политикой обработки данных</a></span>
            </label>
            {lErr && <p className="hx-warn full" style={{ margin: 0 }}>{lErr}</p>}
            <button type="submit" className="hx-cta hx-cta--solid full" style={{ width: '100%' }}>Продолжить в WhatsApp</button>
          </form>
        </div>
      </section>

      {/* ===== APP BANNER ===== */}
      <section className="hx-sec--pad48">
        <div className="hx-app">
          <img src="/app-icon.png" alt="" width="56" height="56" style={{ display: 'block', objectFit: 'contain', flexShrink: 0, borderRadius: 12 }} />
          <div className="hx-app-txt">
            <b>Приложение RENEXPRESS</b>
            <span>Отслеживание грузов, заявки и поддержка — в одном месте</span>
          </div>
          <div className="hx-app-badges">
            <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="hx-app-badge"><IcApple f="#fff" />App Store</a>
            <a href={GOOGLE_PLAY} target="_blank" rel="noopener noreferrer" className="hx-app-badge"><IcGP f="#fff" />Google Play</a>
          </div>
        </div>
      </section>

      {/* ===== SEO CONTENT ===== */}
      <section className="hx-sec">
        <h2 className="hx-seo-h2">Доставка из Турции в Россию — быстро, надёжно, прозрачно</h2>
        <p className="hx-lede" style={{ maxWidth: '78ch' }}>RENEXPRESS — карго-компания на маршруте Турция → Россия с 2017 года. Основатель — Ренат Каралиев. Более 3000 клиентов доверяют нам доставку текстиля, обуви и товаров из Стамбула в Москву.</p>

        <div className="hx-features">
          {FEATURES.map((f, i) => (
            <div className="hx-feature" key={i}>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </div>
          ))}
        </div>

        <nav className="hx-hub" aria-label="Направления и услуги">
          {HUB.map((l) => (
            <a key={l.href} href={l.href}>{l.label} <span aria-hidden="true">→</span></a>
          ))}
        </nav>

        <div className="hx-seo-cols">
          <div>
            <h3>Карго из Стамбула в Москву — полный цикл</h3>
            <p>Мы специализируемся на карго-доставке текстиля, обуви и товаров турецкого производства из Стамбула в Москву. Наши клиенты — оптовые покупатели, индивидуальные предприниматели и продавцы Wildberries и OZON, которые закупают товар в Турции для продажи в России.</p>
            <p>Пять тарифов покрывают разные категории груза. Авто подходит для крупных партий текстиля и обуви — от $4 до $5 за килограмм, 14–18 дней. Авиа — для срочных отправок: от $8 до $10 за килограмм, от 3 до 8 дней. Минимальный вес отправки — 10 кг.</p>
          </div>
          <div>
            <h3>Сопутствующие услуги и склады</h3>
            <p>Помимо перевозки: маркировка «Честный знак», поставка на склады Wildberries и OZON, закупка товара через нашего байера в Стамбуле, консолидация грузов от разных поставщиков, профессиональная упаковка и фото-видеоотчёты при приёмке. Каждый клиент получает персональный код REN для отслеживания.</p>
            <p>Московский склад: ул. Южнопортовая 7а, стр 2, Пн–Пт 09:00–18:00. Офис в Стамбуле координирует приём товара и ежедневные отправки. Телефоны: {SITE.phones.turkeyMain.display} (Турция), {SITE.phones.russiaMain.display} (Россия).</p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="hx-sec hx-sec--gray">
        <div className="hx-faq">
          <div>
            <div className="hx-eyebrow"><i />FAQ</div>
            <h2 className="hx-h2">Частые вопросы</h2>
          </div>
          <div className="hx-faq-list">
            {HOME_FAQ.map((f, i) => (
              <details key={i}>
                <summary>{f.q}<i aria-hidden="true">+</i></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="hx-foot">
        <div className="hx-foot-grid">
          <div className="hx-foot-brand-col">
            <div className="hx-foot-brand">
              <img src="/logo-mark.png" alt="" width="34" height="34" style={{ display: 'block', objectFit: 'contain' }} />
              <span>RENEXPRESS</span>
            </div>
            <p className="hx-foot-desc">Доставка грузов из Турции в Россию с 2017 года. Текстиль, обувь, брендовые товары. Авто и авиа с отслеживанием в приложении.</p>
            <div className="hx-foot-subs">
              <span>RENCARGO TRANSPORTATION</span>
              <span>RENSHOPPING ISTANBUL</span>
              <span>RENFABRIK</span>
            </div>
          </div>
          <div className="hx-foot-col">
            <div className="h">Услуги</div>
            <a href="/services">Авто доставка</a>
            <a href="/services">Авиа доставка</a>
            <a href="/services">Маркировка «Честный знак»</a>
            <a href="/wildberries-ozon">Доставка на WB / OZON</a>
            <a href="/calculator">Калькулятор стоимости</a>
          </div>
          <div className="hx-foot-col">
            <div className="h">Компания</div>
            <a href="/about">О компании</a>
            <a href="/faq">Частые вопросы</a>
            <a href="/blog">Статьи о доставке</a>
            <a href="/contacts">Поддержка</a>
          </div>
          <div className="hx-foot-col">
            <div className="h">Контакты</div>
            <a className="strong" href={`tel:${SITE.phones.turkeyMain.tel}`}>{SITE.phones.turkeyMain.display} · Турция</a>
            <a className="strong" href={`tel:${SITE.phones.russiaMain.tel}`}>{SITE.phones.russiaMain.display} · Россия</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <address>Москва, ул. Южнопортовая 7а, стр 2,<br />склад 8, ворота 1 · Пн–Пт 09:00–18:00</address>
          </div>
        </div>
        <div className="hx-foot-bottom">
          <span>© 2026 RENEXPRESS. Все права защищены.</span>
          <div className="hx-foot-legal">
            <a href="/about">Политика конфиденциальности</a>
            <a href="/about">Условия использования</a>
          </div>
        </div>
      </footer>

      {/* ===== STICKY MOBILE CTA (phone only, above Navbar bottom nav) ===== */}
      <div className="hx-sticky">
        <a className="main" href="#lead" onClick={scrollTo('lead')}>Оставить заявку</a>
        <a className="wa" href={WA_HREF} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IcWa f="#fff" s={22} /></a>
      </div>
    </div>
  );
}

export default Home;

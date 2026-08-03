import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/responsive.css';
import '../styles/home-redesign.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTranslation } from '../i18n/LanguageContext';
import { SITE } from '../config/site';

// About — variant 1a "Ведомость" (Claude Design). Swiss editorial grid on the
// shared design system (styles/home-redesign.css). Facts come from SITE (single
// source of truth). Shared <Navbar> / <Footer> keep the page consistent site-wide.

const WA_HREF = `https://wa.me/${SITE.whatsapp.main.wa}`;

// Company advantages (title + description). Rendered as text-only .hx-feature cards.
const ADVANTAGES = [
  {
    title: 'Собственные склады',
    desc: 'Складские помещения в Стамбуле и Москве для надёжного хранения и обработки грузов',
  },
  {
    title: 'Мобильное приложение',
    desc: 'Отслеживайте доставку в реальном времени, создавайте заказы и общайтесь с поддержкой',
  },
  {
    title: 'Доставка до ВБ и OZON',
    desc: 'Доставляем грузы напрямую на склады Wildberries и OZON для продавцов маркетплейсов',
  },
  {
    title: 'Честный знак',
    desc: 'Помогаем с маркировкой товаров в соответствии с требованиями российского законодательства',
  },
  {
    title: 'Прозрачные тарифы',
    desc: 'Фиксированные цены за килограмм без скрытых платежей и дополнительных сборов',
  },
];

// Related pages hub — labels lifted verbatim from Home's HUB.
const HUB = [
  { href: '/delivery-turkey-russia', label: 'Доставка из Турции в Россию' },
  { href: '/delivery-istanbul-moscow', label: 'Карго из Стамбула в Москву' },
  { href: '/customs-clearance', label: 'Растаможка грузов из Турции' },
  { href: '/wildberries-ozon', label: 'Доставка на Wildberries и OZON' },
  { href: '/services', label: 'Тарифы и услуги карго' },
  { href: '/calculator', label: 'Калькулятор стоимости' },
  { href: '/faq', label: 'Частые вопросы' },
];

function About({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="hx">
      <SEO
        titleKey="seo.about.title"
        descriptionKey="seo.about.description"
        translatedLanguages={['ru']}
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: t('common.about'), path: '/about' },
        ]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* ===== HERO ===== */}
      <section className="hx-sec hx-hero-sec">
        <div className="hx-eyebrow"><i />О компании</div>
        <h1 className="hx-h1">О компании RENEXPRESS</h1>
        <p className="hx-hero-lede" style={{ maxWidth: '70ch' }}>
          Надёжная доставка грузов из Турции в Россию с 2017 года. Карго из Стамбула в Москву для бизнеса и частных клиентов.
        </p>
        <div className="hx-hero-actions">
          <button type="button" className="hx-cta" onClick={() => navigate('/contacts')}>Связаться</button>
          <button type="button" className="hx-ghost" onClick={() => navigate('/calculator')}>Калькулятор</button>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="hx-sec--flush">
        <div className="hx-trust">
          <div><b>3000+</b><span>клиентов</span></div>
          <div><b>с {SITE.foundingYear}</b><span>на рынке</span></div>
          <div><b>{SITE.tariffs.length}</b><span>типов доставки</span></div>
          <div><b>365</b><span>дней в году</span></div>
          <div><b className="teal">ВБ и OZON</b><span>доставка на склады маркетплейсов</span></div>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 24 }}>Наша история</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginBottom: 18 }}>
          Компания RENEXPRESS была основана в 2017 году как карго служба по доставке грузов из Стамбула в Москву.
          Начав с небольших отправок текстиля, мы постепенно расширили географию и ассортимент услуг, став одной
          из ведущих компаний в сфере грузоперевозок из Турции в Россию.
        </p>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginBottom: 18 }}>
          Сегодня RENEXPRESS обслуживает более 3000 клиентов из России и Турции.
          Мы предлагаем пять различных тарифов на доставку, включая авиа и авто перевозки, а также
          специализированные услуги по маркировке товаров системой «Честный знак» и доставке на склады
          маркетплейсов Wildberries и OZON.
        </p>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          Наша миссия — сделать доставку из Турции быстрой, надёжной и доступной для каждого клиента.
          Мы отправляем грузы ежедневно и обеспечиваем полное отслеживание через мобильное приложение RENEXPRESS,
          доступное в App Store. Каждый клиент получает персональный код REN для удобного управления заказами
          и отслеживания доставок.
        </p>
      </section>

      {/* ===== ADVANTAGES ===== */}
      <section className="hx-sec hx-sec--gray">
        <div className="hx-eyebrow"><i />Преимущества</div>
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Почему выбирают RENEXPRESS</h2>
        <p className="hx-lede" style={{ maxWidth: '72ch' }}>
          Мы предоставляем комплексные решения для доставки грузов из Турции в Россию,
          учитывая специфику каждого типа товара и потребности клиента.
        </p>
        <div className="hx-features">
          {ADVANTAGES.map((adv, i) => (
            <div className="hx-feature" key={i}>
              <h3>{adv.title}</h3>
              <p>{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WAREHOUSES ===== */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 32 }}>Наши склады</h2>
        <div className="hx-two" style={{ marginBottom: 0 }}>
          <div className="hx-fcard">
            <span className="hx-tag">Москва</span>
            <h3>Склад в Москве</h3>
            <p style={{ marginBottom: 8, color: 'var(--teal-text)', fontWeight: 600 }}>Пн-Пт: 09:00-18:00</p>
            <p style={{ marginBottom: 12, color: 'var(--ink)', fontWeight: 500 }}>{SITE.warehouses.moscow.address}</p>
            <p>
              Московский склад принимает, хранит и выдаёт грузы клиентам. Удобное расположение рядом
              с транспортными развязками для быстрого получения товара.
            </p>
          </div>
          <div className="hx-fcard">
            <span className="hx-tag">Стамбул</span>
            <h3>Офис в Стамбуле</h3>
            <p style={{ marginBottom: 8, color: 'var(--teal-text)', fontWeight: 600 }}>Пн-Пт: 09:00-18:00</p>
            <p style={{ marginBottom: 12, color: 'var(--ink)', fontWeight: 500 }}>WhatsApp: {SITE.whatsapp.main.display}</p>
            <p>
              Стамбульский офис координирует приём товаров от поставщиков, упаковку, консолидацию
              и ежедневную отправку грузов в Россию.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA (dark) ===== */}
      <section className="hx-sec hx-sec--dark">
        <div className="hx-customs">
          <div>
            <div className="kick">RENEXPRESS</div>
            <h2>Начните доставку с RENEXPRESS</h2>
            <p>Скачайте приложение или свяжитесь с нами для оформления заказа</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="hx-cta">Написать в WhatsApp</a>
            <a href={SITE.social.appStore} target="_blank" rel="noopener noreferrer" className="hx-cta">App Store</a>
            <a href={`tel:${SITE.phones.turkeyMain.tel}`} className="hx-cta">Позвонить</a>
          </div>
        </div>
      </section>

      {/* ===== SEO CONTENT ===== */}
      <section className="hx-sec">
        <h2 className="hx-seo-h2">Карго доставка из Турции в Россию - RENEXPRESS</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          RENEXPRESS — это ведущая компания в сфере грузоперевозок из Турции в Россию, специализирующаяся
          на карго доставке текстиля, обуви и других товаров турецкого производства. Наш опыт работы
          на рынке международных перевозок с 2017 года позволяет предлагать клиентам оптимальные решения
          по доставке грузов из Стамбула в Москву и другие города России. Мы работаем как с крупными
          оптовыми покупателями, так и с индивидуальными предпринимателями, которые закупают товары
          в Турции для продажи на российских маркетплейсах Wildberries и OZON. Карго служба RENEXPRESS
          обеспечивает бесперебойную логистическую цепочку от момента забора груза у турецкого поставщика
          до его выдачи на складе в Москве. Прозрачное ценообразование, различные тарифы для разных
          категорий товаров, профессиональная упаковка и маркировка, таможенное оформление, отслеживание
          груза в реальном времени через мобильное приложение — всё это делает RENEXPRESS надёжным
          партнёром для вашего бизнеса.
        </p>

        <nav className="hx-hub" aria-label="Направления и услуги" style={{ marginTop: 40 }}>
          {HUB.map((l) => (
            <a key={l.href} href={l.href}>{l.label} <span aria-hidden="true">→</span></a>
          ))}
        </nav>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}

export default About;

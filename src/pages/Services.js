import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTranslation } from '../i18n/LanguageContext';
import { SITE } from '../config/site';
import '../styles/home-redesign.css';

// Services — variant 1a "Ведомость" (Claude Design). Reuses the shared design
// system (styles/home-redesign.css → .hx-*). Data (tariffs / contacts) comes
// from SITE, the single source of truth — never hardcode. Shared <Navbar> and
// <Footer> keep the page consistent with the rest of the site.

const WA_HREF = `https://wa.me/${SITE.whatsapp.main.wa}`;

const IcArrow = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
const IcWa = ({ f = '#25D366', s = 17 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={f}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
);
const IcTruck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2AABAB" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
);
const IcPlane = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2AABAB" strokeWidth="2"><path d="M22 2 11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
);

const steps = [
  { num: '01', title: 'Оформление заказа', desc: 'Свяжитесь с нами или оформите заказ через приложение RENEXPRESS. Получите персональный код REN.' },
  { num: '02', title: 'Сбор груза в Стамбуле', desc: 'Наш менеджер в Стамбуле координирует приём товаров от поставщиков и доставку на наш склад.' },
  { num: '03', title: 'Упаковка и отправка', desc: 'Профессиональная упаковка, консолидация и ежедневная отправка грузов из Турции в Россию.' },
  { num: '04', title: 'Получение в Москве', desc: 'Получите груз на нашем складе в Москве или мы доставим его на склад WB/OZON.' },
];

const additionalServices = [
  { title: 'Маркировка Честный знак', desc: 'Маркировка товаров в соответствии с требованиями российского законодательства для легальной продажи.' },
  { title: 'Доставка на склады WB/OZON', desc: 'Доставляем грузы напрямую на склады Wildberries и OZON для продавцов маркетплейсов.' },
  { title: 'Закупка товаров в Турции', desc: 'Наш байер в Стамбуле поможет найти и закупить товары у турецких поставщиков.' },
  { title: 'Консолидация грузов', desc: 'Собираем товары от разных поставщиков на одном складе и отправляем единой партией.' },
  { title: 'Фото и видео отчёты', desc: 'Фиксируем состояние груза при приёмке на складе в Стамбуле и отправляем отчёт клиенту.' },
  { title: 'Страхование груза', desc: 'Защитите ваш груз от повреждений и потерь при транспортировке из Турции в Россию.' },
];

const HUB = [
  { href: '/delivery-turkey-russia', label: 'Доставка из Турции в Россию' },
  { href: '/delivery-istanbul-moscow', label: 'Карго из Стамбула в Москву' },
  { href: '/customs-clearance', label: 'Растаможка грузов из Турции' },
  { href: '/wildberries-ozon', label: 'Доставка на Wildberries и OZON' },
  { href: '/calculator', label: 'Калькулятор стоимости' },
  { href: '/faq', label: 'Частые вопросы' },
  { href: '/contacts', label: 'Контакты' },
];

function Services({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tariffsRoad = SITE.tariffs.filter((tf) => tf.mode === 'road');
  const tariffsAir = SITE.tariffs.filter((tf) => tf.mode === 'air');

  return (
    <div className="hx">
      <SEO
        titleKey="seo.services.title"
        descriptionKey="seo.services.description"
        translatedLanguages={['ru']}
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: t('common.services'), path: '/services' },
        ]}
      />

      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* ===== HERO ===== */}
      <section className="hx-sec hx-hero-sec">
        <div className="hx-eyebrow"><i />Услуги</div>
        <h1 className="hx-h1">Услуги доставки из Турции в Россию</h1>
        <p className="hx-hero-lede" style={{ maxWidth: '70ch' }}>
          {SITE.tariffs.length} тарифов на карго доставку из Стамбула в Москву. Авиа и авто перевозки текстиля, обуви и брендовых товаров.
        </p>
        <div className="hx-hero-actions">
          <button type="button" className="hx-cta" onClick={() => navigate('/calculator')}>
            Рассчитать стоимость <IcArrow />
          </button>
          <button type="button" className="hx-ghost" onClick={() => navigate('/contacts')}>
            Связаться
          </button>
        </div>
      </section>

      {/* ===== TARIFFS ===== */}
      <section className="hx-sec">
        <div className="hx-tf-head">
          <div>
            <div className="hx-eyebrow"><i />Тарифы</div>
            <h2 className="hx-h2">Тарифы на доставку</h2>
          </div>
          <p>Выберите оптимальный тариф в зависимости от типа товара и требуемых сроков доставки. Минимальный вес отправки — 10 кг.</p>
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
            <button type="button" className="hx-cta hx-cta--solid" onClick={() => navigate('/calculator')}>Рассчитать стоимость <IcArrow /></button>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="hx-sec hx-sec--gray">
        <div className="hx-eyebrow"><i />Как это работает</div>
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Как это работает</h2>
        <p className="hx-lede" style={{ maxWidth: '70ch', marginBottom: 44 }}>Простой и прозрачный процесс доставки грузов из Турции</p>
        <div className="hx-steps">
          {steps.map((step) => (
            <div key={step.num}>
              <div className="hx-step-n">{step.num}</div>
              <h3 className="hx-step-t">{step.title}</h3>
              <p className="hx-step-d">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ADDITIONAL SERVICES ===== */}
      <section className="hx-sec">
        <div className="hx-eyebrow"><i />Дополнительные услуги</div>
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Дополнительные услуги</h2>
        <p className="hx-lede" style={{ maxWidth: '72ch' }}>
          Помимо доставки грузов мы предлагаем полный спектр сопутствующих услуг для вашего бизнеса
        </p>
        <div className="hx-features">
          {additionalServices.map((svc, i) => (
            <div className="hx-feature" key={i}>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hx-sec hx-sec--gray">
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Готовы отправить груз?</h2>
        <p className="hx-lede" style={{ maxWidth: '52ch', marginBottom: 24 }}>
          Свяжитесь с нами или рассчитайте стоимость доставки онлайн
        </p>
        <div className="hx-hero-actions">
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="hx-cta"><IcWa f="#fff" />WhatsApp</a>
          <button type="button" className="hx-cta hx-cta--solid" onClick={() => navigate('/calculator')}>Калькулятор</button>
          <button type="button" className="hx-ghost" onClick={() => navigate('/contacts')}>Связаться</button>
        </div>
      </section>

      {/* ===== SEO TEXT ===== */}
      <section className="hx-sec">
        <h2 className="hx-seo-h2">Карго доставка из Турции в Россию — услуги RENEXPRESS</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginBottom: 16 }}>
          Компания RENEXPRESS предоставляет полный комплекс услуг по грузоперевозкам из Турции в Россию.
          Мы осуществляем карго доставку текстиля, обуви и других товаров турецкого производства из Стамбула
          в Москву автомобильным и авиационным транспортом. Наши тарифы рассчитаны на различные категории
          товаров: домашний текстиль, турецкий текстиль, брендовый текстиль, обувь турецкого и импортного
          производства. Стоимость доставки начинается от $4 за килограмм при автомобильной перевозке
          и от $8 при авиадоставке. Сроки доставки составляют от 3 до 18 дней в зависимости от выбранного тарифа.
        </p>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          Помимо транспортировки грузов, RENEXPRESS оказывает услуги по маркировке товаров системой «Честный знак»,
          что позволяет нашим клиентам легально продавать импортированные товары на территории России.
          Мы также осуществляем доставку грузов напрямую на склады маркетплейсов Wildberries и OZON,
          что особенно удобно для продавцов, работающих на этих платформах. Наш байер в Стамбуле поможет
          с поиском и закупкой товаров у турецких поставщиков. Для оформления заказа свяжитесь с нашим
          менеджером по WhatsApp или скачайте мобильное приложение RENEXPRESS в App Store.
        </p>

        <nav className="hx-hub" aria-label="Направления и услуги" style={{ marginTop: 44, marginBottom: 0 }}>
          {HUB.map((l) => (
            <a key={l.href} href={l.href}>{l.label} <span aria-hidden="true">→</span></a>
          ))}
        </nav>
      </section>

      <Footer />
    </div>
  );
}

export default Services;

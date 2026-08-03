import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTranslation } from '../i18n/LanguageContext';
import { SITE } from '../config/site';
import '../styles/home-redesign.css';

// Contacts — "Ведомость" (1a) style. RU-only page (translatedLanguages=['ru']).
// Contact methods, socials, both warehouses (Moscow with map embed), app CTA,
// SEO text. All values from SITE; shared <Navbar>/<Footer>.
const WA_HREF = 'https://wa.me/905511898288';

const CONTACTS = [
  { title: 'Телефон · Турция', value: SITE.phones.turkeyMain.display, link: `tel:${SITE.phones.turkeyMain.tel}` },
  { title: 'Телефон · Россия', value: SITE.phones.russiaMain.display, link: `tel:${SITE.phones.russiaMain.tel}` },
  { title: 'WhatsApp', value: SITE.whatsapp.main.display, link: WA_HREF },
  { title: 'Email', value: SITE.email, link: `mailto:${SITE.email}` },
];

const SOCIALS = [
  { name: 'Instagram', handle: '@rencargo', href: SITE.social.instagram },
  { name: 'Telegram', handle: 't.me/RENEXPRESS', href: SITE.social.telegram },
  { name: 'YouTube', handle: '@Renat_Karaliev', href: SITE.social.youtube },
  { name: 'RENCARGO', handle: 'www.rencargo.com', href: SITE.social.rencargo },
];

const IcArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
const IcApple = ({ f = '#fff' }) => (
  <svg width="15" height="18" viewBox="0 0 384 512" fill={f}><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
);
const IcGP = ({ f = '#fff' }) => (
  <svg width="15" height="17" viewBox="0 0 512 512" fill={f}><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" /></svg>
);
const IcWa = ({ f = '#fff' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={f}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
);

function Contacts({ isAuthenticated, setIsAuthenticated }) {
  const { t } = useTranslation();

  return (
    <div className="hx">
      <SEO
        titleKey="seo.contacts.title"
        descriptionKey="seo.contacts.description"
        translatedLanguages={['ru']}
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: t('common.contacts'), path: '/contacts' },
        ]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* hero */}
      <section className="hx-sec hx-hero-sec">
        <div className="hx-eyebrow"><i />Контакты</div>
        <h1 className="hx-h1" style={{ marginBottom: 18 }}>Контакты RENEXPRESS</h1>
        <p className="hx-hero-lede" style={{ maxWidth: '60ch' }}>
          Свяжитесь с нами любым удобным способом. Менеджеры в Стамбуле и Москве на связи для вас.
        </p>
      </section>

      {/* contact methods */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 28 }}>Наши контакты</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {CONTACTS.map((c) => (
            <a key={c.title} className="hx-ocard" href={c.link}
              target={c.link.startsWith('http') ? '_blank' : undefined}
              rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#999', marginBottom: 10 }}>{c.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#157070', fontVariantNumeric: 'tabular-nums' }}>{c.value}</span>
                <span style={{ color: '#2AABAB', flexShrink: 0 }}><IcArrow /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* socials + sub-brands */}
      <section className="hx-sec hx-sec--gray">
        <h2 className="hx-h2" style={{ marginBottom: 28 }}>Мы в соцсетях</h2>
        <div className="hx-features">
          {SOCIALS.map((s) => (
            <a key={s.name} className="hx-feature" href={s.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <h3>{s.name}</h3>
              <p style={{ color: '#157070', fontWeight: 600 }}>{s.handle}</p>
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
          {SITE.brandGroup.map((brand) => (
            <span key={brand} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#666', border: '1px solid #E0E0E0', padding: '7px 12px' }}>{brand}</span>
          ))}
        </div>
      </section>

      {/* warehouses */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Наши склады</h2>
        <p className="hx-lede" style={{ maxWidth: '60ch', marginBottom: 28 }}>Складские помещения для приёма и отправки грузов.</p>
        <div className="hx-two">
          {/* Moscow */}
          <div className="hx-fcard">
            <span className="hx-tag">Россия</span>
            <h3>Склад в Москве</h3>
            <p style={{ marginBottom: 8 }}>{SITE.warehouses.moscow.address}</p>
            <p style={{ marginBottom: 8 }}>Пн–Пт: 09:00–18:00</p>
            <p style={{ marginBottom: 16 }}>WhatsApp: <a href={WA_HREF} target="_blank" rel="noopener noreferrer" style={{ color: '#157070', textDecoration: 'none', fontWeight: 600 }}>{SITE.whatsapp.main.display}</a></p>
            <iframe
              title="Склад RENEXPRESS Москва"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2247.5!2d37.6573!3d55.7058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0YPQuy4g0K7QttC90L7Qv9C-0YDRgtC-0LLQsNGPIDdhLCDRgdGC0YAgMg!5e0!3m2!1sru!2sru!4v1700000000000"
              width="100%" height="220" style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {/* Istanbul */}
          <div className="hx-fcard">
            <span className="hx-tag">Турция</span>
            <h3>Офис в Стамбуле</h3>
            <p style={{ marginBottom: 8 }}>
              <a href="https://goo.gl/maps/n5zZ2eL27Uq98eQH6" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1A1A', textDecoration: 'none' }}>Kemalpaşa Mah., Atatürk Blv., Emlak Pasajı No:30/1, 34134 İstanbul</a>
            </p>
            <p style={{ marginBottom: 8 }}>Пн–Пт: 09:00–18:00</p>
            <p style={{ marginBottom: 16 }}>WhatsApp: <a href={WA_HREF} target="_blank" rel="noopener noreferrer" style={{ color: '#157070', textDecoration: 'none', fontWeight: 600 }}>{SITE.whatsapp.main.display}</a></p>
            <p>Стамбульский офис координирует приём товаров от поставщиков, упаковку, консолидацию и ежедневную отправку грузов в Россию. Наш байер поможет с поиском и закупкой товаров у турецких поставщиков.</p>
          </div>
        </div>
      </section>

      {/* app CTA */}
      <section className="hx-sec--pad48">
        <div className="hx-app">
          <img src="/app-icon.png" alt="" width="56" height="56" style={{ display: 'block', objectFit: 'contain', flexShrink: 0, borderRadius: 12 }} />
          <div className="hx-app-txt">
            <b>Скачайте приложение RENEXPRESS</b>
            <span>Отслеживайте доставки, создавайте заказы и общайтесь с поддержкой</span>
          </div>
          <div className="hx-app-badges">
            <a href={SITE.social.appStore} target="_blank" rel="noopener noreferrer" className="hx-app-badge"><IcApple />App Store</a>
            <a href={SITE.social.googlePlay} target="_blank" rel="noopener noreferrer" className="hx-app-badge"><IcGP />Google Play</a>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="hx-app-badge"><IcWa />WhatsApp</a>
          </div>
        </div>
      </section>

      {/* SEO text */}
      <section className="hx-sec">
        <h2 className="hx-seo-h2">Контакты карго компании RENEXPRESS — доставка из Турции в Россию</h2>
        <p className="hx-lede" style={{ maxWidth: '80ch' }}>
          RENEXPRESS — карго компания с офисами в Стамбуле и Москве, специализирующаяся на доставке грузов
          из Турции в Россию. Связаться с нами можно по телефону, через WhatsApp или в мобильном приложении.
          Наш турецкий номер и WhatsApp: {SITE.phones.turkeyMain.display}, российский: {SITE.phones.russiaMain.display}.
          Email: {SITE.email}. Мы доступны в WhatsApp для консультаций по тарифам,
          оформлению заказов и отслеживанию доставок.
          Склад в Москве расположен по адресу {SITE.warehouses.moscow.address} и работает с понедельника
          по пятницу с 09:00 до 18:00. Офис в Стамбуле работает с понедельника по пятницу с 09:00 до 18:00.
          Мы являемся частью группы компаний: RENEXPRESS, RENCARGO TRANSPORTATION, RENSHOPPING ISTANBUL, RENFABRIK.
          Скачайте приложение RENEXPRESS из App Store для удобного отслеживания доставок и связи с поддержкой.
        </p>
      </section>

      <Footer />
    </div>
  );
}

export default Contacts;

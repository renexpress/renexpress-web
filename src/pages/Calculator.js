import React, { useState } from 'react';
import '../styles/responsive.css';
import '../styles/home-redesign.css';
import useIsMobile from '../hooks/useIsMobile';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTranslation } from '../i18n/LanguageContext';
import { SITE } from '../config/site';
import { track } from '../utils/analytics';

// Calculator — variant 1a "Ведомость" design system. Restyled to match Home:
// white base, teal accent, thin rules. The calculator is the inline .hx-card
// (same behaviour as Home / CalcWidget): select tariff + weight → live "Итого",
// WhatsApp deep-link, track('calc_result'). Tariffs come ONLY from SITE.tariffs.

const WA = SITE.whatsapp.main.wa; // 905511898288
const WA_HREF = `https://wa.me/${WA}`;
const APP_STORE = SITE.social.appStore;
const GOOGLE_PLAY = SITE.social.googlePlay;

// ── Icons ────────────────────────────────────────────────────────────────────
const IcCheck = ({ c = '#2AABAB', w = 2.4 }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} style={{ flexShrink: 0, marginTop: 3 }}><polyline points="20 6 9 17 4 12" /></svg>
);
const IcArrow = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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

function Calculator({ isAuthenticated, setIsAuthenticated }) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  // Single source of truth — tariffs come from SITE.tariffs (synced with DB / mobile app).
  const tariffsRoad = SITE.tariffs.filter((tf) => tf.mode === 'road');
  const tariffsAir = SITE.tariffs.filter((tf) => tf.mode === 'air');

  // ── Inline calculator (live) — WhatsApp deep-link, preserves analytics event ──
  const [aTariff, setATariff] = useState(SITE.tariffs[0].id);
  const [aWeight, setAWeight] = useState('');
  const sel = SITE.tariffs.find((tf) => tf.id === aTariff) || SITE.tariffs[0];
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

  return (
    <div className="hx">
      <SEO
        titleKey="seo.calculator.title"
        descriptionKey="seo.calculator.description"
        translatedLanguages={['ru']}
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: t('common.calculator'), path: '/calculator' },
        ]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* ===== HERO ===== */}
      <section className="hx-sec hx-hero-sec">
        <div className="hx-eyebrow"><i />Онлайн-расчёт</div>
        <h1 className="hx-h1" style={{ marginBottom: 18 }}>Калькулятор стоимости доставки</h1>
        <p className="hx-hero-lede" style={{ maxWidth: '70ch' }}>
          Рассчитайте стоимость доставки груза из Турции в Россию онлайн.
          Выберите тип доставки и укажите вес — получите результат мгновенно.
        </p>
      </section>

      {/* ===== CALCULATOR ===== */}
      <section id="calc" className="hx-sec">
        <div className="hx-split">
          <div>
            <div className="hx-eyebrow"><i />Калькулятор</div>
            <h2 className="hx-h2" style={{ marginBottom: 16 }}>Посчитайте стоимость за десять секунд</h2>
            <p className="hx-lede" style={{ maxWidth: '48ch', marginBottom: 30 }}>Выберите тариф и укажите вес — увидите итоговую сумму. Менеджер подтвердит расчёт и сроки в WhatsApp в течение рабочего дня.</p>
            <div className="hx-checks">
              <div className="hx-check"><IcCheck /><span>Цена фиксируется после взвешивания на складе в Стамбуле</span></div>
              <div className="hx-check"><IcCheck /><span>Консолидация грузов от разных поставщиков — бесплатно</span></div>
              <div className="hx-check"><IcCheck /><span>Минимальный вес отправки — 10 кг</span></div>
            </div>
          </div>

          <div className="hx-card">
            <div className="hx-card-top" />
            <div className="hx-card-body">
              <div className="hx-card-kicker">Расчёт стоимости</div>
              <label className="hx-label" htmlFor="calc-tariff">Тариф</label>
              <select id="calc-tariff" className="hx-select" style={{ marginBottom: 18, ...(isMobile ? { fontSize: 16 } : {}) }}
                value={aTariff} onChange={(e) => setATariff(e.target.value)}>
                {SITE.tariffs.map((tf) => (
                  <option key={tf.id} value={tf.id}>{tf.name} — ${tf.pricePerKg}/кг · {tf.deliveryDays}</option>
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

      {/* ===== ALL TARIFFS ===== */}
      <section className="hx-sec hx-sec--gray">
        <div className="hx-tf-head">
          <div>
            <div className="hx-eyebrow"><i />Тарифы</div>
            <h2 className="hx-h2">Все тарифы</h2>
          </div>
          <p>{SITE.tariffs.length} тарифов доставки из Стамбула в Москву</p>
        </div>

        <div className="hx-tf-table">
          <div className="hx-tf-cols hx-tf-header">
            <span>Тариф</span><span>Режим</span><span>Срок</span><span>Категория груза</span><span>Цена за кг</span>
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
          <div className="hx-tf-foot">
            <span>Цены указаны в долларах США. Оплата по факту взвешивания в Стамбуле.</span>
            <a href="#calc" className="hx-cta hx-cta--solid">Рассчитать стоимость <IcArrow /></a>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Готовы отправить груз?</h2>
        <p className="hx-lede" style={{ maxWidth: '52ch', marginBottom: 24 }}>Свяжитесь с нами для оформления заказа или скачайте приложение</p>
        <div className="hx-hero-actions">
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="hx-cta"><IcWa f="#fff" />Написать в WhatsApp <IcArrow /></a>
          <a href="/contacts" className="hx-ghost">Контакты</a>
        </div>
        <div className="hx-hero-stores" style={{ marginTop: 28 }}>
          <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="hx-store"><IcApple /><span>App Store</span></a>
          <a href={GOOGLE_PLAY} target="_blank" rel="noopener noreferrer" className="hx-store"><IcGP /><span>Google Play</span></a>
        </div>
      </section>

      {/* ===== SEO CONTENT ===== */}
      <section className="hx-sec hx-sec--gray">
        <h2 className="hx-seo-h2">Калькулятор доставки из Турции в Россию — RENEXPRESS</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          Онлайн-калькулятор RENEXPRESS позволяет быстро рассчитать стоимость доставки груза из Стамбула
          в Москву. Выберите тип доставки в зависимости от категории вашего товара и укажите вес —
          система автоматически рассчитает итоговую стоимость перевозки. Мы предлагаем пять тарифов:
          два вида автомобильной доставки (AVTO EXPRESS $4/кг, AVTO ОБУВЬ $5/кг)
          и три вида авиадоставки (AVIA U2 MARKA $8/кг, AVIA U3 $8.5/кг, AVIA EX MARKA $10/кг).
          Минимальный вес отправки составляет 10 килограмм для всех тарифов.
        </p>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginTop: 16 }}>
          Сроки доставки варьируются от 3 до 18 дней. Самая быстрая доставка — AVIA EX MARKA (3-4 дня),
          самая экономичная — AVTO EXPRESS (14-18 дней, $4/кг). Для брендовых товаров и товаров с маркировкой
          рекомендуем тарифы с пометкой MARKA. Для обуви предусмотрены специальные тарифы AVTO ОБУВЬ и AVIA U3.
          Рассчитайте стоимость доставки прямо сейчас и оформите заказ через приложение RENEXPRESS или свяжитесь
          с нашим менеджером по WhatsApp.
        </p>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}

export default Calculator;

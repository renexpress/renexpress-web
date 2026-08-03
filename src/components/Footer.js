import React from 'react';
import '../styles/home-redesign.css';
import { SITE } from '../config/site';

// Shared site footer — dark "Ведомость" (1a) style. One source for every public
// page, so contacts / links / sub-brands stay consistent. Styling lives in the
// shared design-system stylesheet (styles/home-redesign.css → .hx-foot*).
export default function Footer() {
  return (
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
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTranslation, localizedPath } from '../i18n/LanguageContext';
import { SITE } from '../config/site';
import '../styles/home-redesign.css';

// Terms of use. Russian-only body → other languages get noindex via
// translatedLanguages. Fixes the former dead "/about" links. Informational site
// terms, not a public offer — real conditions are agreed with a manager per order.
export default function Terms({ isAuthenticated, setIsAuthenticated }) {
  const { language, t } = useTranslation();

  return (
    <div className="hx">
      <SEO
        title="Условия использования — RENEXPRESS"
        description="Условия использования сайта и мобильного приложения RENEXPRESS: характер информации, тарифы и сроки, интеллектуальная собственность, ответственность и контакты."
        translatedLanguages={['ru']}
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: 'Условия использования', path: '/terms' },
        ]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* hero */}
      <section className="hx-sec hx-hero-sec">
        <div className="hx-eyebrow"><i />Правовая информация</div>
        <h1 className="hx-h1" style={{ marginBottom: 18 }}>Условия использования</h1>
        <p className="hx-hero-lede" style={{ maxWidth: '70ch' }}>
          Настоящие Условия регулируют использование сайта renexpress.online и мобильного
          приложения RENEXPRESS. Пользуясь сайтом или приложением, вы соглашаетесь с этими Условиями.
        </p>
        <p className="hx-lede" style={{ maxWidth: '70ch', marginTop: 8, opacity: 0.7 }}>Обновлено: 5 августа 2026 года</p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>1. О сервисе</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          RENEXPRESS — сервис доставки грузов из Турции в Россию. Сайт и приложение позволяют
          рассчитать стоимость, оставить заявку, оформить и отслеживать отправление, а также
          связаться с поддержкой.
        </p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>2. Характер информации, тарифы и сроки</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          Информация на сайте, включая тарифы, сроки доставки и категории грузов, носит справочный
          характер и не является публичной офертой. Окончательная стоимость фиксируется после
          взвешивания груза, а точные условия по конкретной отправке согласуются с менеджером.
          Сроки доставки зависят от выбранного тарифа, таможенных процедур и иных факторов и могут
          отличаться от ориентировочных.
        </p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>3. Обязанности пользователя</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginBottom: 14 }}>
          Пользуясь сервисом, вы обязуетесь:
        </p>
        <ul className="hx-lede" style={{ maxWidth: '82ch', paddingLeft: 22, lineHeight: 1.7 }}>
          <li>предоставлять достоверные данные о себе и о грузе;</li>
          <li>не отправлять товары, запрещённые к перевозке или ввозу законодательством;</li>
          <li>не использовать сайт и приложение в противоправных целях и не нарушать их работу.</li>
        </ul>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>4. Интеллектуальная собственность</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          Название, логотип, тексты, изображения и оформление сайта и приложения принадлежат
          RENEXPRESS. Использование этих материалов без письменного разрешения не допускается.
        </p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>5. Ограничение ответственности</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          Мы стремимся поддерживать актуальность и доступность сайта и приложения, но не гарантируем
          их бесперебойную работу. Ответственность за перевозку регулируется условиями конкретной
          отправки, согласованными с менеджером. Обработка персональных данных описана в{' '}
          <Link to={localizedPath('/privacy', language)}>Политике конфиденциальности</Link>.
        </p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>6. Контакты</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          По вопросам, связанным с использованием сервиса, пишите на{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> или свяжитесь с нами удобным способом
          на странице контактов.
        </p>
      </section>

      {/* hub */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Полезные ссылки</h2>
        <nav aria-label="Related pages" className="hx-hub" style={{ marginTop: 8 }}>
          <Link to={localizedPath('/privacy', language)}>Политика конфиденциальности <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/contacts', language)}>{t('common.contacts')} <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/faq', language)}>{language === 'ru' ? 'Частые вопросы' : 'FAQ'} <span aria-hidden="true">→</span></Link>
        </nav>
      </section>

      <Footer />
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTranslation, localizedPath } from '../i18n/LanguageContext';
import { SITE } from '../config/site';
import '../styles/home-redesign.css';

// Privacy policy (152-ФЗ). Russian-only body → other languages get noindex via
// translatedLanguages. Fixes the former dead "/about" legal links in the footer,
// the lead form and registration. Styling reuses the shared 1a "Ведомость" system.
export default function Privacy({ isAuthenticated, setIsAuthenticated }) {
  const { language, t } = useTranslation();

  return (
    <div className="hx">
      <SEO
        title="Политика конфиденциальности — RENEXPRESS"
        description="Как RENEXPRESS собирает, использует и защищает персональные данные пользователей сайта и мобильного приложения. Обработка данных по 152-ФЗ, ваши права, отзыв согласия."
        translatedLanguages={['ru']}
        breadcrumbs={[
          { name: t('common.home'), path: '/' },
          { name: 'Политика конфиденциальности', path: '/privacy' },
        ]}
      />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* hero */}
      <section className="hx-sec hx-hero-sec">
        <div className="hx-eyebrow"><i />Правовая информация</div>
        <h1 className="hx-h1" style={{ marginBottom: 18 }}>Политика конфиденциальности</h1>
        <p className="hx-hero-lede" style={{ maxWidth: '70ch' }}>
          Настоящая Политика описывает, какие персональные данные собирает RENEXPRESS,
          с какими целями и на каких основаниях, как мы их защищаем и какие права есть у вас
          как субъекта персональных данных. Обработка ведётся в соответствии с Федеральным
          законом № 152-ФЗ «О персональных данных».
        </p>
        <p className="hx-lede" style={{ maxWidth: '70ch', marginTop: 8, opacity: 0.7 }}>Обновлено: 5 августа 2026 года</p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>1. Оператор данных</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          Оператором обработки персональных данных является сервис доставки RENEXPRESS
          (бренд-группа RENCARGO TRANSPORTATION). По любым вопросам, связанным с обработкой
          персональных данных, вы можете обратиться по электронной почте{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> или по телефону{' '}
          <a href={`tel:${SITE.phones.russiaMain.tel}`}>{SITE.phones.russiaMain.display}</a>.
        </p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>2. Какие данные мы собираем</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginBottom: 14 }}>
          Мы собираем только те данные, которые необходимы для оказания услуг доставки и связи с вами:
        </p>
        <ul className="hx-lede" style={{ maxWidth: '82ch', paddingLeft: 22, lineHeight: 1.7 }}>
          <li>контактные данные, которые вы указываете сами: имя, номер телефона, аккаунт WhatsApp, адрес электронной почты;</li>
          <li>данные о грузе и заказе: описание товара, вес, категория, маршрут, адрес выдачи;</li>
          <li>данные для входа в мобильное приложение и личный кабинет;</li>
          <li>технические данные, собираемые автоматически: IP-адрес, тип устройства и браузера, страницы сайта, источник перехода, файлы cookie.</li>
        </ul>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginTop: 14 }}>
          Мы не запрашиваем и не храним данные банковских карт: оплата, если она проводится онлайн,
          выполняется на стороне платёжного провайдера.
        </p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>3. Цели и основания обработки</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginBottom: 14 }}>
          Персональные данные обрабатываются для следующих целей:
        </p>
        <ul className="hx-lede" style={{ maxWidth: '82ch', paddingLeft: 22, lineHeight: 1.7 }}>
          <li>расчёт стоимости, приём, оформление и выполнение доставки грузов из Турции в Россию;</li>
          <li>связь с вами по заявке, заказу и обращениям в поддержку;</li>
          <li>информирование о статусе отправления, в том числе push-уведомления в приложении;</li>
          <li>улучшение работы сайта и приложения, анализ посещаемости;</li>
          <li>исполнение требований законодательства.</li>
        </ul>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginTop: 14 }}>
          Основанием обработки является ваше согласие, а также необходимость исполнения договора
          оказания услуг доставки, стороной которого вы являетесь.
        </p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>4. Передача данных третьим лицам</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginBottom: 14 }}>
          Мы не продаём и не передаём ваши персональные данные третьим лицам для их собственных
          целей. Ограниченная передача возможна только в объёме, необходимом для оказания услуги:
        </p>
        <ul className="hx-lede" style={{ maxWidth: '82ch', paddingLeft: 22, lineHeight: 1.7 }}>
          <li>транспортным и курьерским компаниям — для доставки груза до вашего города или адреса;</li>
          <li>сервисам веб-аналитики (Яндекс.Метрика, Google Analytics) — в обезличенном виде;</li>
          <li>провайдерам инфраструктуры (хостинг, отправка push-уведомлений и сообщений);</li>
          <li>государственным органам — в случаях, прямо предусмотренных законом.</li>
        </ul>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>5. Файлы cookie и аналитика</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          Сайт использует файлы cookie и системы веб-аналитики (Яндекс.Метрика, Google Analytics),
          чтобы понимать, как посетители пользуются сайтом, и улучшать его. Эти сервисы собирают
          обезличенные технические данные. Вы можете отключить cookie в настройках вашего браузера —
          при этом часть функций сайта может работать некорректно.
        </p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>6. Хранение и защита данных</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          Мы храним персональные данные не дольше, чем это необходимо для целей обработки или
          требуется законодательством. Для защиты данных применяются организационные и технические
          меры: ограничение доступа, передача данных по защищённому соединению (HTTPS), защита
          серверной инфраструктуры.
        </p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>7. Ваши права</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginBottom: 14 }}>
          В отношении своих персональных данных вы имеете право:
        </p>
        <ul className="hx-lede" style={{ maxWidth: '82ch', paddingLeft: 22, lineHeight: 1.7 }}>
          <li>получить информацию об обработке ваших данных;</li>
          <li>требовать уточнения, блокирования или удаления данных, если они неполны, устарели или обрабатываются с нарушением закона;</li>
          <li>отозвать согласие на обработку персональных данных;</li>
          <li>удалить свой аккаунт в мобильном приложении.</li>
        </ul>
        <p className="hx-lede" style={{ maxWidth: '82ch', marginTop: 14 }}>
          Чтобы воспользоваться этими правами, напишите нам на{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Мы рассмотрим обращение в срок,
          установленный законодательством.
        </p>
      </section>

      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 16 }}>8. Изменения политики</h2>
        <p className="hx-lede" style={{ maxWidth: '82ch' }}>
          Мы можем обновлять эту Политику. Актуальная версия всегда доступна на этой странице,
          с указанием даты последнего обновления вверху. Существенные изменения мы стараемся
          доводить до пользователей заранее.
        </p>
      </section>

      {/* cta / hub */}
      <section className="hx-sec">
        <h2 className="hx-h2" style={{ marginBottom: 12 }}>Остались вопросы?</h2>
        <p className="hx-lede" style={{ maxWidth: '52ch', marginBottom: 24 }}>
          Напишите нам — ответим по любому вопросу об обработке ваших данных и о доставке.
        </p>
        <nav aria-label="Related pages" className="hx-hub" style={{ marginTop: 8 }}>
          <Link to={localizedPath('/contacts', language)}>{t('common.contacts')} <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/terms', language)}>Условия использования <span aria-hidden="true">→</span></Link>
          <Link to={localizedPath('/faq', language)}>{language === 'ru' ? 'Частые вопросы' : 'FAQ'} <span aria-hidden="true">→</span></Link>
        </nav>
      </section>

      <Footer />
    </div>
  );
}

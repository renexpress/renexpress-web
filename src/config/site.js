// Single source of truth for company info — used everywhere (UI, meta, JSON-LD, sitemap).
// Editing here updates the whole site consistently. Do not duplicate these values elsewhere.

export const SITE = {
  url: 'https://renexpress.online',
  name: 'RENEXPRESS',
  legalName: 'RENEXPRESS',
  alternateNames: ['RENCARGO', 'Рен Экспресс', 'Рен Карго'],
  defaultLanguage: 'ru',
  supportedLanguages: ['ru', 'en', 'tr'],
  foundingYear: 2017,
  founder: 'Renat Karaliev',
  brandGroup: ['RENEXPRESS', 'RENCARGO TRANSPORTATION', 'RENSHOPPING ISTANBUL', 'RENFABRIK'],

  email: 'Inforencargo@gmail.com',

  phones: {
    turkeyMain: { display: '+90 551 189 82 88', tel: '+905511898288', country: 'TR' },
    russiaMain: { display: '+7 928 970 70 10', tel: '+79289707010', country: 'RU' },
  },

  whatsapp: {
    main: { display: '+90 551 189 82 88', wa: '905511898288' },
  },

  warehouses: {
    moscow: {
      address: 'ул. Южнопортовая 7а, стр 2, склад 8, ворота 1',
      city: 'Москва',
      country: 'RU',
      hours: { mondayToFriday: '09:00-18:00' },
      geo: { lat: 55.7058, lng: 37.6573 },
    },
    istanbul: {
      city: 'Стамбул',
      country: 'TR',
      hours: { mondayToFriday: '09:00-18:00' },
    },
  },

  social: {
    appStore: 'https://apps.apple.com/app/renexpress/id6757761284',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.renexpress.app',
    instagram: 'https://instagram.com/rencargo',
    telegram: 'https://t.me/RENEXPRESS',
    youtube: 'https://youtube.com/@Renat_Karaliev',
    rencargo: 'https://www.rencargo.com',
  },

  // REAL tariffs — synced from DB table `delivery_type` (GET /api/delivery-types/),
  // the same source the mobile app shows. 5 active types (2026-07-26).
  // Single source of truth: render tariffs everywhere from SITE.tariffs, never hardcode.
  tariffs: [
    {
      id: 'avto_express',
      name: 'AVTO EXPRESS',
      mode: 'road',
      pricePerKg: 4,
      currency: 'USD',
      transitDaysMin: 14,
      transitDaysMax: 18,
      deliveryDays: '14–18 дней',
      category: 'Домашний и турецкий текстиль',
    },
    {
      id: 'avto_obuv',
      name: 'AVTO ОБУВЬ',
      mode: 'road',
      pricePerKg: 5,
      currency: 'USD',
      transitDaysMin: 14,
      transitDaysMax: 18,
      deliveryDays: '14–18 дней',
      category: 'Турецкая обувь (не бренд/марка)',
    },
    {
      id: 'avia_u2_marka',
      name: 'AVIA U2 MARKA',
      mode: 'air',
      pricePerKg: 8,
      currency: 'USD',
      transitDaysMin: 7,
      transitDaysMax: 8,
      deliveryDays: '7–8 дней',
      category: 'Турецкий и брендовый текстиль',
    },
    {
      id: 'avia_u3',
      name: 'AVIA U3',
      mode: 'air',
      pricePerKg: 8.5,
      currency: 'USD',
      transitDaysMin: 4,
      transitDaysMax: 5,
      deliveryDays: '4–5 дней',
      category: 'Обувь (бренд, турецкое производство)',
    },
    {
      id: 'avia_ex_marka',
      name: 'AVIA EX MARKA',
      mode: 'air',
      pricePerKg: 10,
      currency: 'USD',
      transitDaysMin: 3,
      transitDaysMax: 4,
      deliveryDays: '3–4 дня',
      category: 'Турецкое производство, брендовый текстиль',
    },
  ],

  // Routes served (used for service pages + structured data)
  routes: [
    { from: 'Turkey', to: 'Russia', primaryCity: 'Moscow', fromRu: 'Турция', toRu: 'Россия', primaryCityRu: 'Москва' },
  ],

  cargoCategories: [
    'Домашний текстиль',
    'Турецкий текстиль',
    'Брендовый текстиль',
    'Текстиль б/у',
    'Обувь турецкого производства',
    'Брендовая обувь',
    'Обувь б/у',
  ],
};

export default SITE;

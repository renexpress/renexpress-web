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

  email: 'info@renexpress.online',

  phones: {
    turkeyMain: { display: '+90 507 010 70 70', tel: '+905070107070', country: 'TR' },
    russiaMain: { display: '+7 928 970 70 10', tel: '+79289707010', country: 'RU' },
    istanbulOffice: { display: '0212 522 55 50', tel: '02125225550', country: 'TR' },
  },

  whatsapp: {
    istanbulManager: { display: '+90 551 189 82 88', wa: '905511898288' },
    moscowManager: { display: '+90 551 189 82 99', wa: '905511898299' },
    buyer: { display: '+90 551 189 82 89', wa: '905511898289' },
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
      hours: { mondayToSaturday: '09:00-19:00' },
    },
  },

  social: {
    appStore: 'https://apps.apple.com/app/renexpress/id6757761284',
    instagram: 'https://instagram.com/renat_karaliev',
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
    { from: 'Turkey', to: 'Kazakhstan', primaryCity: 'Almaty', fromRu: 'Турция', toRu: 'Казахстан', primaryCityRu: 'Алматы' },
    { from: 'Turkey', to: 'Uzbekistan', primaryCity: 'Tashkent', fromRu: 'Турция', toRu: 'Узбекистан', primaryCityRu: 'Ташкент' },
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

// Build-time sitemap generator.
// Writes public/sitemap.xml that covers all routes × all languages with hreflang.
//
// Run automatically before `npm run build` (see package.json "prebuild").
// Edit ROUTES below when you add a new page.

/* eslint-disable */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://renexpress.online';
const LANGUAGES = ['ru', 'en', 'tr'];

// Each route: logical path + change frequency + priority + languages it's translated to.
// Auth-only pages (/login, /register, /my-products, /add-product, /analytics)
// are intentionally absent — they're noindex.
//
// `langs` is the list of languages this page has REAL body content for. For others
// the SEO component forces noindex, so they shouldn't be in the sitemap either.
const ROUTES = [
  { path: '/',                          changefreq: 'weekly',  priority: 1.0,  langs: ['ru', 'en', 'tr'] },
  { path: '/services',                  changefreq: 'monthly', priority: 0.9,  langs: ['ru'] },
  { path: '/calculator',                changefreq: 'monthly', priority: 0.9,  langs: ['ru'] },
  { path: '/about',                     changefreq: 'monthly', priority: 0.8,  langs: ['ru'] },
  { path: '/faq',                       changefreq: 'monthly', priority: 0.8,  langs: ['ru'] },
  { path: '/contacts',                  changefreq: 'monthly', priority: 0.8,  langs: ['ru'] },
  { path: '/shop',                      changefreq: 'daily',   priority: 0.7,  langs: ['ru'] },
  { path: '/delivery-turkey-russia',    changefreq: 'monthly', priority: 0.95, langs: ['ru', 'en', 'tr'] },
  { path: '/delivery-istanbul-moscow',  changefreq: 'monthly', priority: 0.9,  langs: ['ru', 'en', 'tr'] },
  { path: '/customs-clearance',         changefreq: 'monthly', priority: 0.85, langs: ['ru', 'en', 'tr'] },
  { path: '/wildberries-ozon',          changefreq: 'monthly', priority: 0.9,  langs: ['ru'] },
  { path: '/blog',                                 changefreq: 'weekly',  priority: 0.7,  langs: ['ru'] },
  { path: '/blog/kak-zakazat-dostavku-iz-turcii',  changefreq: 'monthly', priority: 0.7,  langs: ['ru'] },
  { path: '/blog/skolko-stoit-dostavka-iz-turcii', changefreq: 'monthly', priority: 0.7,  langs: ['ru'] },
  { path: '/blog/avia-ili-avto-iz-stambula',       changefreq: 'monthly', priority: 0.7,  langs: ['ru'] },
];

function localizedUrl(logicalPath, lang) {
  if (lang === 'ru') return SITE_URL + logicalPath;
  if (logicalPath === '/') return SITE_URL + '/' + lang;
  return SITE_URL + '/' + lang + logicalPath;
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];

  for (const route of ROUTES) {
    for (const lang of route.langs) {
      const loc = localizedUrl(route.path, lang);
      // hreflang alternates only for languages this page is actually translated to
      const alternates = route.langs
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(localizedUrl(route.path, l))}"/>`)
        .join('\n');
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(localizedUrl(route.path, 'ru'))}"/>`;
      urls.push(
        `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n${alternates}\n${xDefault}\n  </url>`,
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

const out = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(out, buildSitemap(), 'utf8');
const totalUrls = ROUTES.reduce((sum, r) => sum + r.langs.length, 0);
console.log('[sitemap] wrote', out, '—', totalUrls, 'URLs (', ROUTES.length, 'routes,', LANGUAGES.length, 'languages)');

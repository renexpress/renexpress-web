// One-off generator for the branded social-share image (og-default.jpg) and the
// site icon (app-icon.png) — both built from the RENEXPRESS mobile app logomark.
// Run: node scripts/gen-og.js   (uses the chromium bundled with react-snap's puppeteer)
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ICON_SRC = 'D:/logistics/client_app/mobile/assets/icon.png';
const PUBLIC = path.join(__dirname, '..', 'public');

(async () => {
  const iconB64 = fs.readFileSync(ICON_SRC).toString('base64');
  const iconUri = `data:image/png;base64,${iconB64}`;

  // Site icon everywhere = the app logomark.
  fs.copyFileSync(ICON_SRC, path.join(PUBLIC, 'app-icon.png'));

  const html = `<!doctype html><html><head><meta charset="utf-8">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html,body { width:1200px; height:630px; }
    .wrap { width:1200px; height:630px; background:#FFFFFF; position:relative;
            display:flex; align-items:center; gap:56px; padding:0 90px;
            font-family:'Segoe UI', Arial, sans-serif; overflow:hidden; }
    .accent { position:absolute; top:0; left:0; right:0; height:12px;
              background:linear-gradient(135deg,#2AABAB 0%,#178080 45%,#0a2535 100%); }
    .mark { width:330px; height:330px; flex:0 0 330px; object-fit:contain; }
    .col { display:flex; flex-direction:column; }
    .brand { font-size:58px; font-weight:800; letter-spacing:2px; color:#0a2535; line-height:1; }
    .bar { width:96px; height:6px; border-radius:4px; margin:22px 0 26px;
           background:linear-gradient(135deg,#2AABAB 0%,#178080 60%,#0a2535 100%); }
    .h1 { font-size:52px; font-weight:800; color:#157070; line-height:1.1; }
    .sub { font-size:29px; font-weight:500; color:#444444; margin-top:18px; }
    .domain { position:absolute; right:90px; bottom:44px; font-size:26px;
              font-weight:600; color:#157070; }
  </style></head>
  <body>
    <div class="wrap">
      <div class="accent"></div>
      <img class="mark" src="${iconUri}" />
      <div class="col">
        <div class="brand">RENEXPRESS</div>
        <div class="bar"></div>
        <div class="h1">Карго из Турции<br/>в Россию</div>
        <div class="sub">Стамбул → Москва · быстро и надёжно</div>
      </div>
      <div class="domain">renexpress.online</div>
    </div>
  </body></html>`;

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(PUBLIC, 'og-default.jpg'), type: 'jpeg', quality: 90 });
  await browser.close();
  console.log('OK: public/og-default.jpg + public/app-icon.png');
})().catch((e) => { console.error(e); process.exit(1); });

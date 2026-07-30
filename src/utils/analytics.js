// Unified analytics for Yandex.Metrika (id 111171857) + Google Analytics 4 (G-NZVQHXGY24).
// Every conversion goal is sent to BOTH systems with the same name, so goals stay in
// sync across dashboards. All calls are guarded: if a tag is blocked, absent, or we're
// running inside the react-snap prerender, nothing throws.

const YM_ID = 111171857;

// Fire a conversion goal / custom event to both Metrika and GA4.
export function track(goal, params = {}) {
  try { if (typeof window !== 'undefined' && window.ym) window.ym(YM_ID, 'reachGoal', goal, params); } catch (e) { /* noop */ }
  try { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', goal, params); } catch (e) { /* noop */ }
}

// SPA route-change pageview. GA4 config + Metrika init already send the FIRST view on
// load, so this is called only for subsequent client-side navigations.
export function trackPageview(url, title) {
  try { if (typeof window !== 'undefined' && window.ym) window.ym(YM_ID, 'hit', url, { title }); } catch (e) { /* noop */ }
  try { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'page_view', { page_location: url, page_title: title }); } catch (e) { /* noop */ }
}

// Map a clicked anchor href to a conversion goal name (or null to ignore).
function goalForHref(href) {
  if (!href) return null;
  const h = href.toLowerCase();
  if (h.includes('wa.me') || h.includes('api.whatsapp') || h.includes('whatsapp.com')) return 'whatsapp_click';
  if (h.startsWith('tel:')) return 'phone_click';
  if (h.startsWith('mailto:')) return 'email_click';
  if (h.includes('apps.apple.com')) return 'appstore_click';
  if (h.includes('play.google.com')) return 'googleplay_click';
  if (h.includes('t.me') || h.includes('telegram.me')) return 'telegram_click';
  if (h.includes('instagram.com')) return 'instagram_click';
  if (h.includes('youtube.com')) return 'youtube_click';
  if (h.includes('tiktok.com')) return 'tiktok_click';
  return null;
}

// One delegated, capture-phase click listener catches every outbound contact link
// (WhatsApp, phone, email, app stores, socials) across ALL pages/footers at once —
// no need to wire each component.
let _autoInit = false;
export function initAutoTracking() {
  if (_autoInit || typeof document === 'undefined') return;
  _autoInit = true;
  document.addEventListener('click', (e) => {
    const a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    const goal = goalForHref(a.getAttribute('href'));
    if (goal) track(goal);
  }, true);
}

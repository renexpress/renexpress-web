// Single source of truth for the LIGHT design system (app palette).
// Import COLORS / GRADIENT everywhere instead of hardcoding hex values, so the
// teal never "drifts" across files. See growth/design/LIGHT-REDESIGN.md §1.
//
// CONTRAST RULE (critical): #2AABAB fails as small text on white (2.80:1).
//   - primary (#2AABAB): fills, borders, icon strokes, big display numbers (>=24px bold) ONLY.
//   - primaryText (#157070): teal-colored TEXT / links / prices at body size on white (AA 5.86).
//   - ctaFloor (#178080): solid CTA fill under white text (4.73).

export const COLORS = {
  primary: '#2AABAB',       // fills, icons, borders, big numbers
  primaryText: '#157070',   // teal text / links / prices on white (AA)
  primaryLight: '#4DCBCB',  // decor / gradient stop only — never text
  primaryDark: '#1A8B8B',   // hover fills / accent border
  ctaFloor: '#178080',      // solid CTA fill under white text
  brandDark: '#0a2535',     // dark end of the brand gradient

  bg: '#FFFFFF',
  bgSecond: '#F5F5F5',
  bgTert: '#FAFAFA',
  cardBg: '#FFFFFF',
  cardBorder: '#E8E8E8',
  divider: '#EEEEEE',

  inputBg: '#F5F5F5',
  inputBorder: '#E0E0E0',
  inputFocus: '#2AABAB',

  text: '#1A1A1A',          // primary text (17.4:1)
  textSecond: '#666666',    // secondary text (AA 5.74)
  textMuted: '#999999',     // large / decorative only — NOT body
  onDark: '#FFFFFF',        // text over gradient / dark anchors

  whatsapp: '#25D366',
  success: '#2AABAB',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

// Brand CTA gradient — dosed use only (primary buttons, hero accent, tariff
// active bar). NEVER fill whole section backgrounds with it. The stops are
// shifted so the fill stays >= #178080 under white text.
export const GRADIENT = 'linear-gradient(135deg, #2AABAB 0%, #178080 45%, #0a2535 100%)';

// Soft light shadows (not heavy dark stacks).
export const SHADOW = {
  card: '0 1px 3px rgba(16,24,40,.06), 0 1px 2px rgba(16,24,40,.04)',
  cardHover: '0 8px 24px rgba(16,24,40,.08)',
  cta: '0 6px 20px rgba(42,171,171,.28)',
};

// Reusable focus-visible ring (accessibility). Inject once per page via a <style> tag.
export const FOCUS_CSS = `
  a:focus-visible, button:focus-visible, input:focus-visible,
  select:focus-visible, textarea:focus-visible, summary:focus-visible {
    outline: 2px solid ${COLORS.primary};
    outline-offset: 2px;
  }
`;

export default COLORS;

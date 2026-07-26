import React, { useState } from 'react';
import { SITE } from '../config/site';
import { COLORS, GRADIENT, SHADOW } from '../config/theme';

const WA = SITE.whatsapp.istanbulManager.wa; // 905511898288

// Lead form — Phase 1: no backend. On submit it opens a WhatsApp deep-link to the
// Istanbul manager prefilled with the enquiry. Includes a honeypot ("company"):
// if a bot fills it, we silently drop the submission. Consent links to /about
// (the existing legal placeholder page) — /privacy is intentionally not created.
//
// Phase 2 (documented, backend not built yet):
//   POST /api/leads/ { name, phone, cargo, source:"home" } → 201 { id }
//   public endpoint, honeypot dropped server-side, must be whitelisted in AuthGateMiddleware.
export default function LeadForm({ isMobile = false, source = 'home' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cargo, setCargo] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (company) return; // honeypot tripped — silently ignore
    if (name.trim().length < 2) { setError('Укажите имя (минимум 2 символа)'); return; }
    if (phone.trim().length < 5) { setError('Укажите телефон или WhatsApp'); return; }
    if (!agree) { setError('Подтвердите согласие на обработку данных'); return; }
    setError('');

    const text =
      `Здравствуйте! Заявка с сайта RENEXPRESS%0A` +
      `Имя: ${name.trim()}%0A` +
      `Телефон: ${phone.trim()}%0A` +
      `Груз: ${cargo.trim() || '—'}%0A` +
      `Источник: ${source}`;
    window.open(`https://wa.me/${WA}?text=${text}`, '_blank', 'noopener');
  };

  return (
    <form onSubmit={submit} style={styles.form} noValidate>
      <div style={styles.row}>
        <label style={styles.label} htmlFor="lead-name">Имя</label>
        <input
          id="lead-name" type="text" name="name" autoComplete="name" required
          value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          style={{ ...styles.input, ...(isMobile ? { fontSize: 16 } : {}) }}
        />
      </div>

      <div style={styles.row}>
        <label style={styles.label} htmlFor="lead-phone">Телефон / WhatsApp</label>
        <input
          id="lead-phone" type="tel" name="phone" autoComplete="tel" inputMode="tel" required
          value={phone} onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 …"
          style={{ ...styles.input, ...(isMobile ? { fontSize: 16 } : {}) }}
        />
      </div>

      <div style={styles.row}>
        <label style={styles.label} htmlFor="lead-cargo">Что везём (необязательно)</label>
        <input
          id="lead-cargo" type="text" name="cargo"
          value={cargo} onChange={(e) => setCargo(e.target.value)}
          placeholder="напр. текстиль, ~50 кг"
          style={{ ...styles.input, ...(isMobile ? { fontSize: 16 } : {}) }}
        />
      </div>

      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text" name="company" tabIndex={-1} autoComplete="off"
        value={company} onChange={(e) => setCompany(e.target.value)}
        style={{ display: 'none' }} aria-hidden="true"
      />

      <label style={styles.consent}>
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={styles.checkbox} />
        <span>
          Нажимая «Отправить», вы соглашаетесь с{' '}
          <a href="/about" style={{ color: COLORS.primaryText, textDecoration: 'none', fontWeight: 600 }}>политикой обработки данных</a>
        </span>
      </label>

      {error && <p style={styles.error}>{error}</p>}

      <button type="submit" style={styles.submit} className="lead-submit-btn">
        Отправить заявку
      </button>
      <p style={styles.hint}>Заявка откроется в WhatsApp — менеджер ответит в течение рабочего дня</p>
    </form>
  );
}

const styles = {
  form: { width: '100%', maxWidth: 480, margin: '0 auto', textAlign: 'left' },
  row: { marginBottom: 16 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 8, letterSpacing: 0.3 },
  input: {
    width: '100%', padding: '14px 16px', fontSize: 15, color: COLORS.text,
    backgroundColor: COLORS.inputBg, border: `1px solid ${COLORS.inputBorder}`,
    borderRadius: 12, outline: 'none', boxSizing: 'border-box', minHeight: 48,
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  consent: { display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: COLORS.textSecond, lineHeight: 1.5, marginBottom: 16, cursor: 'pointer' },
  checkbox: { marginTop: 3, width: 16, height: 16, accentColor: COLORS.primary, flexShrink: 0 },
  error: { color: COLORS.error, fontSize: 13, marginBottom: 12, marginTop: 0 },
  submit: {
    width: '100%', padding: '16px', background: GRADIENT, color: '#fff', border: 'none',
    borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', minHeight: 48, textShadow: '0 1px 2px rgba(10,37,53,.35)',
    transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: SHADOW.cta,
  },
  hint: { fontSize: 12, color: COLORS.textSecond, textAlign: 'center', marginTop: 10, marginBottom: 0 },
};

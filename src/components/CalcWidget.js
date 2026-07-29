import React, { useState } from 'react';
import { SITE } from '../config/site';
import { COLORS, GRADIENT, SHADOW } from '../config/theme';

const WA = SITE.whatsapp.main.wa; // 905511898289

// Reusable cargo calculator (light). Tariffs come ONLY from SITE.tariffs
// (single source of truth, synced with DB / mobile app). Under the "Итого $X"
// result it offers a WhatsApp deep-link prefilled with the calculation, so the
// result is never a dead end.
export default function CalcWidget({ isMobile = false }) {
  const [selectedType, setSelectedType] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const deliveryTypes = SITE.tariffs.map((tf) => ({
    code: tf.id,
    name: tf.name,
    price: tf.pricePerKg,
    days: `${tf.transitDaysMin}-${tf.transitDaysMax}`,
    desc: tf.category,
    mode: tf.mode,
  }));

  const calculate = () => {
    const type = deliveryTypes.find((t) => t.code === selectedType);
    const w = parseFloat(weight);
    if (!type || !w || w < 10) {
      setResult(null);
      return;
    }
    const total = Math.round(w * type.price * 100) / 100;
    setResult({ type: type.name, weight: w, pricePerKg: type.price, days: type.days, total });
  };

  const waHref = () => {
    if (!result) return `https://wa.me/${WA}`;
    const text =
      `Заявка RENEXPRESS%0A` +
      `Тариф: ${result.type}%0A` +
      `Вес: ${result.weight} кг%0A` +
      `Итого: $${result.total}%0A` +
      `Имя: %0AТелефон: `;
    return `https://wa.me/${WA}?text=${text}`;
  };

  return (
    <div className="calc-card" style={{ ...styles.calcCard, padding: isMobile ? '24px 16px' : '40px 36px' }}>
      {/* thin brand accent bar at the top of the card */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: GRADIENT,
        }}
      />

      <h3 style={{ ...styles.calcTitle, fontSize: isMobile ? 22 : 26 }}>Рассчитать стоимость</h3>
      <p style={styles.calcSubtitle}>Укажите параметры груза для расчёта</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Тип доставки</label>
        <select
          value={selectedType}
          onChange={(e) => { setSelectedType(e.target.value); setResult(null); }}
          style={{ ...styles.select, ...(isMobile ? { fontSize: 16 } : {}) }}
          className="calc-select"
        >
          <option value="">Выберите тип доставки</option>
          {deliveryTypes.map((dt) => (
            <option key={dt.code} value={dt.code}>{dt.name} — ${dt.price}/кг ({dt.days} дней)</option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Вес груза (кг)</label>
        <input
          type="number"
          min="10"
          inputMode="decimal"
          value={weight}
          onChange={(e) => { setWeight(e.target.value); setResult(null); }}
          placeholder="Минимум 10 кг"
          style={{ ...styles.input, ...(isMobile ? { fontSize: 16 } : {}) }}
          className="calc-input"
        />
      </div>

      <button onClick={calculate} style={styles.calcBtn} className="calc-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginRight: 8 }}>
          <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="12" y2="14" />
        </svg>
        Рассчитать
      </button>

      {weight && parseFloat(weight) < 10 && parseFloat(weight) > 0 && (
        <p style={styles.warning}>Минимальный вес для отправки — 10 кг</p>
      )}

      {result && (
        <div style={styles.resultCard}>
          <div style={styles.resultHeader}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3 style={styles.resultTitle}>Результат расчёта</h3>
          </div>
          <div style={styles.resultRow}>
            <span style={styles.resultLabel}>Тип доставки</span>
            <span style={styles.resultValue}>{result.type}</span>
          </div>
          <div style={styles.resultRow}>
            <span style={styles.resultLabel}>Вес груза</span>
            <span style={styles.resultValue}>{result.weight} кг</span>
          </div>
          <div style={styles.resultRow}>
            <span style={styles.resultLabel}>Тариф</span>
            <span style={styles.resultValue}>${result.pricePerKg}/кг</span>
          </div>
          <div style={styles.resultRow}>
            <span style={styles.resultLabel}>Срок доставки</span>
            <span style={styles.resultValue}>{result.days} дней</span>
          </div>
          <div style={styles.resultDivider} />
          <div style={styles.resultRow}>
            <span style={{ ...styles.resultLabel, fontWeight: 700, fontSize: isMobile ? 16 : 18, color: COLORS.text }}>Итого:</span>
            <span style={{ ...styles.resultTotal, fontSize: isMobile ? 26 : 32 }}>${result.total}</span>
          </div>

          <a
            href={waHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="calc-wa-btn"
            style={styles.waBtn}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Отправить заявку в WhatsApp
          </a>
          <p style={styles.waHint}>Менеджер подтвердит расчёт и сроки в течение рабочего дня</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  calcCard: {
    position: 'relative',
    backgroundColor: COLORS.cardBg,
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: 24,
    boxShadow: SHADOW.card,
    overflow: 'hidden',
  },
  calcTitle: { fontSize: 26, fontWeight: 700, color: COLORS.text, textAlign: 'center', marginBottom: 6 },
  calcSubtitle: { fontSize: 14, color: COLORS.textSecond, textAlign: 'center', marginBottom: 32 },
  formGroup: { marginBottom: 20 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 8, letterSpacing: 0.3 },
  select: {
    width: '100%', padding: '14px 16px', fontSize: 15, color: COLORS.text,
    backgroundColor: COLORS.inputBg, border: `1px solid ${COLORS.inputBorder}`,
    borderRadius: 12, outline: 'none', cursor: 'pointer', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', backgroundSize: 16, paddingRight: 40, minHeight: 48,
  },
  input: {
    width: '100%', padding: '14px 16px', fontSize: 15, color: COLORS.text,
    backgroundColor: COLORS.inputBg, border: `1px solid ${COLORS.inputBorder}`,
    borderRadius: 12, outline: 'none', boxSizing: 'border-box', minHeight: 48,
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  calcBtn: {
    width: '100%', padding: '16px', background: GRADIENT, color: '#fff', border: 'none',
    borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 12, minHeight: 48,
    display: 'flex', alignItems: 'center', justifyContent: 'center', textShadow: '0 1px 2px rgba(10,37,53,.35)',
    transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: SHADOW.cta,
  },
  warning: {
    color: COLORS.error, fontSize: 13, marginTop: 12, textAlign: 'center', padding: '8px 12px',
    backgroundColor: 'rgba(239,68,68,0.06)', borderRadius: 8, border: '1px solid rgba(239,68,68,0.2)',
  },
  resultCard: {
    marginTop: 28, padding: 28, backgroundColor: 'rgba(42,171,171,0.06)', borderRadius: 16,
    border: `1px solid rgba(42,171,171,0.25)`,
  },
  resultHeader: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 },
  resultTitle: { fontSize: 18, fontWeight: 700, color: COLORS.text, margin: 0 },
  resultRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  resultLabel: { fontSize: 14, color: COLORS.textSecond },
  resultValue: { fontSize: 14, fontWeight: 600, color: COLORS.text },
  resultDivider: { height: 1, backgroundColor: COLORS.divider, margin: '16px 0' },
  resultTotal: { fontSize: 32, fontWeight: 700, color: COLORS.primary },
  waBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%',
    marginTop: 20, padding: '14px 20px', backgroundColor: COLORS.whatsapp, color: '#fff',
    fontSize: 15, fontWeight: 700, borderRadius: 12, textDecoration: 'none', minHeight: 48, boxSizing: 'border-box',
    transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
  },
  waHint: { fontSize: 12, color: COLORS.textSecond, textAlign: 'center', marginTop: 10, marginBottom: 0 },
};

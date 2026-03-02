import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config/api';
import '../styles/responsive.css';

const PRIMARY = '#3D8B8B';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Пожалуйста, введите логин и пароль');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/client/login/`, {
        username: username.trim().toUpperCase(),
        password: password.trim(),
      });

      if (response.data.success) {
        localStorage.setItem('client', JSON.stringify(response.data.client));
        setIsAuthenticated(true);
      } else {
        setError(response.data.message || 'Ошибка входа');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={styles.container}>
      <style>{`
        .auth-input::placeholder { color: rgba(255,255,255,0.3); }
        .auth-input:focus { border-color: ${PRIMARY} !important; box-shadow: 0 0 0 3px rgba(61,139,139,0.15); }
        .auth-blob { position: absolute; border-radius: 50%; filter: blur(80px); animation: authBlobFloat 8s ease-in-out infinite; }
        .auth-blob-1 { width: 400px; height: 400px; background: ${PRIMARY}; top: -120px; left: -100px; opacity: 0.15; }
        .auth-blob-2 { width: 300px; height: 300px; background: #818CF8; bottom: -80px; right: -60px; opacity: 0.1; animation-delay: -3s; }
        .auth-blob-3 { width: 250px; height: 250px; background: #5EEAD4; top: 50%; left: 60%; opacity: 0.08; animation-delay: -5s; }
        @keyframes authBlobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -15px) scale(1.08); }
          66% { transform: translate(-15px, 10px) scale(0.95); }
        }
        .auth-submit:hover:not(:disabled) { box-shadow: 0 8px 24px rgba(61,139,139,0.35); transform: translateY(-1px); }
        .auth-submit:active:not(:disabled) { transform: translateY(0); }
        .auth-stat-card:hover { border-color: rgba(255,255,255,0.15) !important; transform: translateY(-2px); }
        @media (max-width: 768px) {
          .auth-left-panel { display: none !important; }
          .auth-right-panel { flex: 1 !important; padding: 24px !important; }
        }
      `}</style>

      {/* Left Side - Dark Hero */}
      <div className="auth-left auth-left-panel" style={styles.leftSide}>
        {/* Blobs */}
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />
        <div className="auth-blob auth-blob-3" />

        {/* Logo */}
        <a href="/" style={styles.logoTop}>
          <div style={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={styles.logoText}>RENEXPRESS</span>
        </a>

        {/* Hero Content */}
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeDot} />
            Карго из Турции с 2017
          </div>
          <h1 style={styles.heroTitle}>
            Доставляем<br />ваш бизнес<br />в <span style={{ color: PRIMARY }}>Россию</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Отслеживайте грузы, создавайте заказы и управляйте доставкой в личном кабинете
          </p>

          {/* Stats */}
          <div style={styles.statsRow}>
            {[
              { num: '3000+', label: 'клиентов' },
              { num: '6', label: 'тарифов' },
              { num: '7 лет', label: 'опыта' },
            ].map((s, i) => (
              <div key={i} className="auth-stat-card" style={styles.statCard}>
                <span style={styles.statNum}>{s.num}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom brands */}
        <div style={styles.leftBottom}>
          {['RENCARGO', 'RENSHOPPING', 'RENFABRIK'].map(b => (
            <span key={b} style={styles.brandChip}>{b}</span>
          ))}
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right auth-right-panel" style={styles.rightSide}>
        <div style={styles.formWrapper}>
          {/* Top Link */}
          <div style={styles.topLink}>
            <span style={styles.topLinkText}>Нет аккаунта?</span>
            <a href="/register" style={styles.signUpLink}>Регистрация</a>
          </div>

          {/* Form Card */}
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>С возвращением</h2>
              <p style={styles.formSubtitle}>Введите данные для входа в аккаунт</p>
            </div>

            {error && (
              <div style={styles.errorBox}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Username */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Логин (код REN)</label>
                <div style={styles.inputWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={styles.inputIconLeft}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Например, RE123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Password */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Пароль</label>
                <div style={styles.inputWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={styles.inputIconLeft}>
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ ...styles.input, paddingRight: 44 }}
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div style={styles.optionsRow}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={styles.checkbox} />
                  <span>Запомнить меня</span>
                </label>
              </div>

              {/* Submit */}
              <button type="submit" className="auth-submit" disabled={loading} style={{ ...styles.submitButton, opacity: loading ? 0.7 : 1 }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                    Вход...
                  </span>
                ) : 'Войти'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.copyright}>© 2026 RENEXPRESS. Все права защищены.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Inter, -apple-system, sans-serif',
  },

  // Left Side
  leftSide: {
    flex: 1,
    backgroundColor: '#0B1120',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '48px',
    position: 'relative',
    overflow: 'hidden',
  },
  logoTop: {
    position: 'absolute',
    top: 32,
    left: 48,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    zIndex: 2,
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    backgroundColor: PRIMARY,
    borderRadius: '50%',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 440,
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 16px',
    backgroundColor: 'rgba(61,139,139,0.15)',
    border: '1px solid rgba(61,139,139,0.3)',
    borderRadius: 50,
    fontSize: 13,
    fontWeight: 500,
    color: PRIMARY,
    marginBottom: 24,
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#25D366',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.1,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.7,
    marginBottom: 36,
    maxWidth: 380,
  },
  statsRow: {
    display: 'flex',
    gap: 12,
  },
  statCard: {
    padding: '16px 20px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14,
    transition: 'all 0.3s',
    cursor: 'default',
  },
  statNum: {
    display: 'block',
    fontSize: 22,
    fontWeight: 700,
    color: PRIMARY,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    fontWeight: 500,
  },
  leftBottom: {
    position: 'absolute',
    bottom: 32,
    left: 48,
    display: 'flex',
    gap: 8,
    zIndex: 2,
  },
  brandChip: {
    fontSize: 11,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.25)',
    padding: '4px 12px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 50,
    letterSpacing: 0.5,
  },

  // Right Side
  rightSide: {
    flex: 1,
    backgroundColor: '#111827',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    position: 'relative',
    overflow: 'hidden',
  },
  formWrapper: {
    width: '100%',
    maxWidth: 420,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  topLink: {
    textAlign: 'right',
  },
  topLinkText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    marginRight: 6,
  },
  signUpLink: {
    color: PRIMARY,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: '36px 32px',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  },
  formHeader: {
    marginBottom: 28,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.45)',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    color: '#EF4444',
    padding: '10px 14px',
    borderRadius: 10,
    fontSize: 13,
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.6)',
  },
  inputWrapper: {
    position: 'relative',
  },
  inputIconLeft: {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '12px 16px 12px 42px',
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
  },
  optionsRow: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
  },
  checkbox: {
    width: 16,
    height: 16,
    cursor: 'pointer',
    accentColor: PRIMARY,
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: PRIMARY,
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: 4,
  },
  footer: {
    textAlign: 'center',
  },
  copyright: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 13,
  },
};

export default Login;

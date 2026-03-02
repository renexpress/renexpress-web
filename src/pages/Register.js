import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import '../styles/responsive.css';

const PRIMARY = '#3D8B8B';

function Register({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (!agreeTerms) {
      setError('Пожалуйста, примите Условия использования и Политику конфиденциальности');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/client/register/`, {
        full_name: fullName.trim(),
        phone: phone.trim(),
      });

      if (response.data.success) {
        localStorage.setItem('client', JSON.stringify(response.data.client));
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setError(response.data.message || 'Ошибка регистрации');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    ), title: 'Авто и авиа доставка', desc: 'От 3 дней авиа, от 12 дней авто' },
    { icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ), title: 'Отслеживание груза', desc: 'В реальном времени через приложение' },
    { icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    ), title: 'Честный знак и WB/OZON', desc: 'Маркировка и доставка на склады' },
  ];

  return (
    <div style={styles.page}>
      <style>{`
        .reg-input::placeholder { color: rgba(255,255,255,0.3); }
        .reg-input:focus { border-color: ${PRIMARY} !important; box-shadow: 0 0 0 3px rgba(61,139,139,0.15); }
        .reg-blob { position: absolute; border-radius: 50%; filter: blur(80px); animation: regBlobFloat 8s ease-in-out infinite; }
        .reg-blob-1 { width: 350px; height: 350px; background: #5EEAD4; top: -100px; right: -80px; opacity: 0.12; }
        .reg-blob-2 { width: 300px; height: 300px; background: ${PRIMARY}; bottom: -100px; left: -80px; opacity: 0.15; animation-delay: -3s; }
        .reg-blob-3 { width: 200px; height: 200px; background: #818CF8; top: 40%; left: 30%; opacity: 0.08; animation-delay: -5s; }
        @keyframes regBlobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -15px) scale(1.08); }
          66% { transform: translate(-15px, 10px) scale(0.95); }
        }
        .reg-submit:hover:not(:disabled) { box-shadow: 0 8px 24px rgba(61,139,139,0.35); transform: translateY(-1px); }
        .reg-feature:hover { border-color: rgba(255,255,255,0.15) !important; background: rgba(255,255,255,0.06) !important; }
        @media (max-width: 768px) {
          .reg-left { display: none !important; }
          .reg-right { flex: 1 !important; padding: 24px !important; }
          .reg-header { padding: 16px 20px !important; }
        }
      `}</style>

      {/* Header */}
      <header style={styles.header} className="reg-header">
        <a href="/" style={styles.logo}>
          <div style={styles.logoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={styles.logoText}>RENEXPRESS</span>
        </a>
        <div style={styles.headerRight}>
          <span style={styles.headerText}>Уже есть аккаунт?</span>
          <a href="/login" style={styles.headerLink}>Войти</a>
        </div>
      </header>

      {/* Main */}
      <div className="auth-container" style={styles.container}>
        {/* Left Side */}
        <div className="auth-left reg-left" style={styles.leftSide}>
          {/* Blobs */}
          <div className="reg-blob reg-blob-1" />
          <div className="reg-blob reg-blob-2" />
          <div className="reg-blob reg-blob-3" />

          <div style={styles.leftContent}>
            <h2 style={styles.leftTitle}>
              Начните доставлять<br />из <span style={{ color: PRIMARY }}>Турции</span> сегодня
            </h2>
            <p style={styles.leftSubtitle}>
              Зарегистрируйтесь и получите персональный код REN для управления заказами и отслеживания грузов.
            </p>

            {/* Feature Cards */}
            <div style={styles.features}>
              {features.map((f, i) => (
                <div key={i} className="reg-feature" style={styles.featureCard}>
                  <div style={styles.featureIcon}>{f.icon}</div>
                  <div>
                    <div style={styles.featureTitle}>{f.title}</div>
                    <div style={styles.featureDesc}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div style={styles.trustRow}>
              <div style={styles.trustStar}>{'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#FBBF24' }}>{s}</span>)}</div>
              <span style={styles.trustText}>3000+ клиентов доверяют нам</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-right reg-right" style={styles.rightSide}>
          <div style={styles.formWrapper}>
            {/* Form Card */}
            <div style={styles.formCard}>
              <div style={styles.formHeader}>
                <h1 style={styles.formTitle}>Создать аккаунт</h1>
                <p style={styles.formSubtitle}>Заполните данные для регистрации</p>
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
                {/* Full Name */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>ФИО</label>
                  <div style={styles.inputWrapper}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={styles.inputIconLeft}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                      type="text"
                      className="reg-input"
                      placeholder="Иван Иванов"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Номер телефона</label>
                  <div style={styles.inputWrapper}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={styles.inputIconLeft}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <input
                      type="tel"
                      className="reg-input"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  <span style={styles.hint}>Это будет ваш пароль для входа</span>
                </div>

                {/* Terms */}
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} style={styles.checkbox} />
                  <span>Я согласен с <a href="/about" style={styles.link}>Условиями использования</a> и <a href="/about" style={styles.link}>Политикой конфиденциальности</a></span>
                </label>

                {/* Submit */}
                <button type="submit" className="reg-submit" disabled={loading} style={{ ...styles.submitButton, opacity: loading ? 0.7 : 1 }}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                      Создание...
                    </span>
                  ) : 'Создать аккаунт'}
                </button>
              </form>

              {/* Login Link */}
              <div style={styles.loginLink}>
                <span>Уже есть аккаунт? </span>
                <a href="/login" style={styles.link}>Войти</a>
              </div>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
              <p style={styles.copyright}>© 2026 RENEXPRESS. Все права защищены.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, -apple-system, sans-serif',
    backgroundColor: '#0B1120',
  },

  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 48px',
    backgroundColor: 'rgba(11,17,32,0.8)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'relative',
    zIndex: 10,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    backgroundColor: PRIMARY,
    borderRadius: '50%',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 700,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  headerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
  },
  headerLink: {
    fontSize: 14,
    fontWeight: 600,
    color: PRIMARY,
    textDecoration: 'none',
  },

  // Container
  container: {
    flex: 1,
    display: 'flex',
  },

  // Left Side
  leftSide: {
    flex: 1,
    backgroundColor: '#0B1120',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    position: 'relative',
    overflow: 'hidden',
  },
  leftContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 420,
  },
  leftTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.15,
    marginBottom: 16,
  },
  leftSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.7,
    marginBottom: 32,
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 18px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14,
    transition: 'all 0.3s',
    cursor: 'default',
  },
  featureIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(61,139,139,0.15)',
    borderRadius: 10,
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
  },
  trustRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  trustStar: {
    fontSize: 14,
  },
  trustText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 500,
  },

  // Right Side
  rightSide: {
    flex: 1,
    backgroundColor: '#111827',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
  },
  formWrapper: {
    width: '100%',
    maxWidth: 420,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
    marginBottom: 24,
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
    gap: 18,
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
  hint: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    marginTop: 2,
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    lineHeight: 1.5,
  },
  checkbox: {
    width: 16,
    height: 16,
    marginTop: 2,
    cursor: 'pointer',
    accentColor: PRIMARY,
  },
  link: {
    color: PRIMARY,
    fontWeight: 500,
    textDecoration: 'none',
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
  loginLink: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },
  footer: {
    textAlign: 'center',
  },
  copyright: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 13,
  },
};

export default Register;

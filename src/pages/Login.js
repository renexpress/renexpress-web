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
      <style>
        {`
          input::placeholder {
            color: #9CA3AF;
            opacity: 1;
          }
          input:focus::placeholder {
            opacity: 0;
          }
        `}
      </style>
      {/* Left Side - Hero */}
      <div className="auth-left" style={styles.leftSide}>
        {/* Logo at top */}
        <div style={styles.logoTop}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill={PRIMARY} />
            <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
          </svg>
          <span style={styles.logoTextTop}>RENEXPRESS</span>
        </div>

        {/* Info Card */}
        <div style={styles.infoCard}>
          <h1 style={styles.heroTitle}>Развивайте свой бизнес с RENEXPRESS</h1>
          <p style={styles.heroSubtitle}>
            Связывайтесь с миллионами покупателей и продавцов по всему миру. Безопасно, быстро и надежно.
          </p>

          {/* Trust Badge */}
          <div style={styles.trustBadge}>
            <div style={styles.avatars}>
              <img src="/image1.png" alt="" style={{ ...styles.avatar, zIndex: 3 }} />
              <img src="/image2.png" alt="" style={{ ...styles.avatar, zIndex: 2, marginLeft: -10 }} />
              <img src="/image3.png" alt="" style={{ ...styles.avatar, zIndex: 1, marginLeft: -10 }} />
            </div>
            <div style={styles.trustInfo}>
              <div style={styles.stars}>
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i} style={{ color: '#FFD700' }}>{star}</span>
                ))}
              </div>
              <span style={styles.trustText}>Нам доверяют 10 000+ продавцов</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right" style={styles.rightSide}>
        {/* Top Link */}
        <div style={styles.topLink}>
          <span style={styles.topLinkText}>Нет аккаунта?</span>
          <a href="/register" style={styles.signUpLink}>Регистрация</a>
        </div>

        {/* Form Container */}
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>С возвращением</h2>
          <p style={styles.formSubtitle}>Введите данные для входа.</p>

          {error && (
            <div style={styles.errorBox}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Username Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Логин</label>
              <input
                type="text"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                autoComplete="off"
              />
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Пароль</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...styles.input, paddingRight: 44 }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={styles.optionsRow}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.checkbox}
                />
                <span>Запомнить меня</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.copyright}>© 2024 RENEXPRESS. Все права защищены.</p>
          <div style={styles.footerLinks}>
            <a href="/privacy" style={styles.footerLink}>Политика конфиденциальности</a>
            <a href="/terms" style={styles.footerLink}>Условия использования</a>
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
  },
  leftSide: {
    flex: 1,
    backgroundImage: 'url("/meeting.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    position: 'relative',
    minHeight: '100vh',
  },
  logoTop: {
    position: 'absolute',
    top: 24,
    left: 24,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logoTextTop: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: 600,
  },
  infoCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 16,
    padding: '32px',
    maxWidth: 420,
    backdropFilter: 'blur(4px)',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 12,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 15,
    lineHeight: 1.6,
    marginBottom: 24,
  },
  trustBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  avatars: {
    display: 'flex',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid rgba(255,255,255,0.5)',
  },
  trustInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  stars: {
    fontSize: 14,
  },
  trustText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
  },
  rightSide: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 60px',
  },
  topLink: {
    textAlign: 'right',
    marginBottom: 40,
  },
  topLinkText: {
    color: '#6B7280',
    fontSize: 14,
    marginRight: 6,
  },
  signUpLink: {
    color: PRIMARY,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 400,
    width: '100%',
    margin: '0 auto',
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 32,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
    padding: '12px 16px',
    borderRadius: 8,
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: 500,
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: 15,
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  passwordWrapper: {
    position: 'relative',
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
    fontSize: 14,
    color: '#374151',
    cursor: 'pointer',
  },
  checkbox: {
    width: 16,
    height: 16,
    cursor: 'pointer',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: PRIMARY,
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    marginTop: 8,
  },
  footer: {
    textAlign: 'center',
    paddingTop: 40,
  },
  copyright: {
    color: '#9CA3AF',
    fontSize: 13,
    marginBottom: 8,
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
  },
  footerLink: {
    color: '#6B7280',
    fontSize: 13,
    textDecoration: 'none',
  },
};

export default Login;

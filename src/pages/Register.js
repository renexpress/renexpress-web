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

  return (
    <div style={styles.page}>
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
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill={PRIMARY} />
            <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
          </svg>
          <span style={styles.logoText}>RENEXPRESS</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="auth-container" style={styles.container}>
        {/* Left Side */}
        <div className="auth-left" style={styles.leftSide}>
          <div style={styles.leftContent}>
            {/* Image */}
            <div style={styles.imageContainer}>
              <img src="/laptop.png" alt="Laptop" style={styles.laptopImage} />
            </div>

            {/* Text Content */}
            <h2 style={styles.leftTitle}>Начните свой путь сегодня</h2>
            <p style={styles.leftSubtitle}>
              Присоединяйтесь к миллионам компаний, которые покупают и продают на самой надежной торговой площадке. Безопасные сделки, проверенные партнеры и глобальный охват.
            </p>

            {/* Badges */}
            <div style={styles.badges}>
              <div style={styles.badge}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={PRIMARY}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span style={styles.badgeText}>Проверенная личность</span>
              </div>
              <div style={styles.badge}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={PRIMARY}>
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <span style={styles.badgeText}>Безопасные платежи</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-right" style={styles.rightSide}>
          {/* Form Card */}
          <div style={styles.formCard}>
            <h1 style={styles.formTitle}>Создать аккаунт</h1>
            <p style={styles.formSubtitle}>Введите данные для начала работы.</p>

            {error && (
              <div style={styles.errorBox}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Full Name */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>ФИО</label>
                <div style={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder="например, Иван Иванов"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={styles.input}
                  />
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" style={styles.inputIcon}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>

              {/* Phone Number */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Номер телефона</label>
                <div style={styles.inputWrapper}>
                  <input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={styles.input}
                  />
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" style={styles.inputIcon}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span style={styles.hint}>Это будет ваш пароль для входа</span>
              </div>

              {/* Terms Checkbox */}
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={styles.checkbox}
                />
                <span>
                  Я согласен с <a href="/terms" style={styles.link}>Условиями использования</a> и <a href="/privacy" style={styles.link}>Политикой конфиденциальности</a>.
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.submitButton,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Создание аккаунта...' : 'Создать аккаунт'}
              </button>
            </form>

            {/* Login Link */}
            <div style={styles.loginLink}>
              <span>Уже есть аккаунт? </span>
              <a href="/login" style={styles.link}>Войти</a>
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
  },
  header: {
    padding: '16px 32px',
    borderBottom: '1px solid #E5E7EB',
    backgroundColor: '#fff',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logoText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: 600,
  },
  container: {
    flex: 1,
    display: 'flex',
  },
  leftSide: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  leftContent: {
    maxWidth: 400,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  laptopImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 12,
  },
  leftTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 10,
  },
  leftSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 1.6,
    marginBottom: 20,
  },
  badges: {
    display: 'flex',
    gap: 20,
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    fontSize: 13,
    color: '#6B7280',
  },
  rightSide: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: '32px',
    width: '100%',
    maxWidth: 400,
    border: '1px solid #E5E7EB',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 16,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: '#374151',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '10px 40px 10px 14px',
    fontSize: 14,
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    outline: 'none',
  },
  inputIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  hint: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    fontSize: 13,
    color: '#374151',
    cursor: 'pointer',
    lineHeight: 1.5,
  },
  checkbox: {
    width: 16,
    height: 16,
    marginTop: 2,
    cursor: 'pointer',
  },
  link: {
    color: PRIMARY,
    fontWeight: 500,
    textDecoration: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: PRIMARY,
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginTop: 4,
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
    color: '#6B7280',
  },
};

export default Register;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import { useTranslation, localizedPath } from '../i18n/LanguageContext';

const PRIMARY = '#3D8B8B';

const NAV_LINK_KEYS = [
  { key: 'common.home', path: '/' },
  { key: 'common.services', path: '/services' },
  { key: 'common.calculator', path: '/calculator' },
  { key: 'common.faq', path: '/faq' },
  { key: 'common.about', path: '/about' },
  { key: 'common.contacts', path: '/contacts' },
];

const BOTTOM_TAB_KEYS = [
  { key: 'common.home', path: '/', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { key: 'common.services', path: '/services', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { key: 'common.calculator', path: '/calculator', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg> },
  { key: 'common.about', path: '/about', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
  { key: '__more__', path: '#more', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg> },
];

const LANGUAGE_LABELS = { ru: 'RU', en: 'EN', tr: 'TR' };

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { language, t, changeLanguage, supportedLanguages } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(location.pathname);

  // Build language-aware nav links
  const navLinks = NAV_LINK_KEYS.map((item) => ({
    name: t(item.key),
    url: localizedPath(item.path, language),
  }));
  const bottomTabs = BOTTOM_TAB_KEYS.map((item) => ({
    name: item.key === '__more__' ? (language === 'ru' ? 'Ещё' : language === 'tr' ? 'Daha' : 'More') : t(item.key),
    url: item.path === '#more' ? '#more' : localizedPath(item.path, language),
    icon: item.icon,
  }));

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate(localizedPath('/login', language));
  };

  return (
    <>
      {/* ===== Desktop Tubelight Navbar ===== */}
      {!isMobile && (
        <nav className="tubelight-nav" style={styles.tubelightWrapper} aria-label={t('nav.ariaPrimary')}>
          <div className="tubelight-bar" style={styles.tubelightBar}>
            <a href={localizedPath('/', language)} style={styles.tubelightLogo} aria-label="RENEXPRESS — home">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill={PRIMARY} />
                <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
              </svg>
            </a>
            {navLinks.map((item) => (
              <a
                key={item.url}
                href={item.url}
                className={`tubelight-link ${activeNav === item.url ? 'tubelight-active' : ''}`}
                onMouseEnter={() => setActiveNav(item.url)}
                onMouseLeave={() => setActiveNav(location.pathname)}
                style={{
                  ...styles.tubelightLink,
                  ...(activeNav === item.url ? styles.tubelightLinkActive : {}),
                }}
              >
                {activeNav === item.url && <span className="tubelight-glow" style={styles.tubelightGlow} />}
                <span style={{ position: 'relative', zIndex: 1 }}>{item.name}</span>
              </a>
            ))}

            {/* Language switcher */}
            <div style={{ position: 'relative', marginLeft: 4 }}>
              <button
                onClick={() => setLangMenuOpen((v) => !v)}
                style={{
                  ...styles.tubelightLink,
                  padding: '8px 12px',
                  color: '#fff',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.08)',
                }}
                aria-expanded={langMenuOpen}
                aria-haspopup="listbox"
                aria-label="Change language"
              >
                {LANGUAGE_LABELS[language]}
              </button>
              {langMenuOpen && (
                <ul
                  role="listbox"
                  onMouseLeave={() => setLangMenuOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    background: 'rgba(17,24,39,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    padding: 4,
                    minWidth: 80,
                    listStyle: 'none',
                    margin: 0,
                  }}
                >
                  {supportedLanguages.map((lng) => (
                    <li key={lng}>
                      <button
                        role="option"
                        aria-selected={lng === language}
                        onClick={() => { changeLanguage(lng); setLangMenuOpen(false); }}
                        style={{
                          width: '100%',
                          background: lng === language ? 'rgba(61,139,139,0.3)' : 'transparent',
                          border: 'none',
                          color: '#fff',
                          padding: '8px 12px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontWeight: 600,
                        }}
                      >
                        {LANGUAGE_LABELS[lng]}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {isAuthenticated ? (
              <button onClick={handleLogout} style={styles.tubelightAuthBtn}>{language === 'ru' ? 'Выйти' : language === 'tr' ? 'Çıkış' : 'Sign out'}</button>
            ) : (
              <button onClick={() => navigate(localizedPath('/login', language))} style={styles.tubelightAuthBtn}>{t('common.login')}</button>
            )}
          </div>
        </nav>
      )}

      {/* ===== Mobile Bottom Nav ===== */}
      {isMobile && (
        <nav className="mobile-bottom-nav" style={styles.mobileBottomNav} aria-label={t('nav.ariaPrimary')}>
          {bottomTabs.map((item) => {
            const isActive = item.url === location.pathname;
            const isMore = item.url === '#more';
            return (
              <a
                key={item.url}
                href={isMore ? undefined : item.url}
                onClick={isMore ? (e) => { e.preventDefault(); setMobileMenuOpen(true); } : undefined}
                className={`mobile-bottom-link ${isActive ? 'mobile-bottom-active' : ''}`}
                style={{
                  ...styles.mobileBottomLink,
                  color: isActive ? PRIMARY : '#6B7280',
                }}
              >
                {item.icon}
                <span style={styles.mobileBottomLabel}>{item.name}</span>
              </a>
            );
          })}
        </nav>
      )}

      {/* ===== Mobile Menu Overlay ===== */}
      {isMobile && (
        <div
          className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill={PRIMARY} />
                  <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
                </svg>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>RENEXPRESS</span>
              </div>
              <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <nav className="mobile-menu-nav">
              {navLinks.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  className={location.pathname === item.url ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="mobile-menu-footer" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Language switcher (mobile) */}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                {supportedLanguages.map((lng) => (
                  <button
                    key={lng}
                    onClick={() => { changeLanguage(lng); setMobileMenuOpen(false); }}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: lng === language ? `2px solid ${PRIMARY}` : '1px solid #E5E7EB',
                      background: lng === language ? 'rgba(61,139,139,0.08)' : '#FFFFFF',
                      color: '#111827',
                      borderRadius: 10,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    aria-pressed={lng === language}
                  >
                    {LANGUAGE_LABELS[lng]}
                  </button>
                ))}
              </div>
              {isAuthenticated ? (
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>{language === 'ru' ? 'Выйти' : language === 'tr' ? 'Çıkış' : 'Sign out'}</button>
              ) : (
                <button onClick={() => { navigate(localizedPath('/login', language)); setMobileMenuOpen(false); }}>{t('common.login')}</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  tubelightWrapper: {
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
    paddingTop: 16,
  },
  tubelightBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(17,24,39,0.85)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    padding: '4px 6px',
    borderRadius: 50,
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  tubelightLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 10px',
    textDecoration: 'none',
    flexShrink: 0,
  },
  tubelightLink: {
    position: 'relative',
    padding: '8px 18px',
    fontSize: 14,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    borderRadius: 50,
    transition: 'color 0.3s',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  tubelightLinkActive: {
    color: '#fff',
    backgroundColor: 'rgba(61,139,139,0.15)',
  },
  tubelightGlow: {
    position: 'absolute',
    top: -2,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 32,
    height: 4,
    backgroundColor: PRIMARY,
    borderRadius: '4px 4px 0 0',
    boxShadow: '0 0 12px 4px rgba(61,139,139,0.4), 0 0 24px 8px rgba(61,139,139,0.2)',
  },
  tubelightAuthBtn: {
    padding: '8px 18px',
    fontSize: 13,
    fontWeight: 600,
    color: '#fff',
    backgroundColor: PRIMARY,
    border: 'none',
    borderRadius: 50,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    marginLeft: 4,
  },
  mobileBottomNav: {
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: '1px solid #E5E7EB',
    padding: '6px 0 env(safe-area-inset-bottom, 8px)',
    justifyContent: 'space-around',
  },
  mobileBottomLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    textDecoration: 'none',
    padding: '4px 0',
    fontSize: 10,
    fontWeight: 500,
    minWidth: 56,
  },
  mobileBottomLabel: {
    fontSize: 10,
    fontWeight: 500,
  },
};

export default Navbar;

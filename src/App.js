import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { initAutoTracking, trackPageview } from './utils/analytics';

// Code-splitting: each page is loaded only when visited.
// Previously, all 13 pages were bundled into one giant chunk (~11k LOC).
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Product = lazy(() => import('./pages/Product'));
const MyProducts = lazy(() => import('./pages/MyProducts'));
const AddProduct = lazy(() => import('./pages/AddProduct'));
const Analytics = lazy(() => import('./pages/Analytics'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

// SEO landing pages (Phase 2)
const DeliveryTurkeyRussia = lazy(() => import('./pages/landing/DeliveryTurkeyRussia'));
const DeliveryIstanbulMoscow = lazy(() => import('./pages/landing/DeliveryIstanbulMoscow'));
const CustomsClearance = lazy(() => import('./pages/landing/CustomsClearance'));
const MarketplaceDelivery = lazy(() => import('./pages/landing/MarketplaceDelivery'));
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'));
const Article = lazy(() => import('./pages/blog/Article'));

function PageFallback() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '3px solid #E8E8E8', borderTopColor: '#2AABAB', borderRadius: '50%', animation: 'seo-spin 0.8s linear infinite' }} />
      <style>{`@keyframes seo-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// Scrolls to top on every route change — better UX, avoids the "you land mid-page" feel.
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Analytics bridge: attaches the outbound-link click tracker once, and sends a
// pageview to Metrika + GA4 on each SPA route change. The very first view is skipped
// here because the tags already report it on initial load (avoids double counting).
function AnalyticsTracker() {
  const { pathname } = useLocation();
  const firstRef = React.useRef(true);
  React.useEffect(() => { initAutoTracking(); }, []);
  React.useEffect(() => {
    if (firstRef.current) { firstRef.current = false; return; }
    if (typeof window !== 'undefined') trackPageview(window.location.href, document.title);
  }, [pathname]);
  return null;
}

// One block of routes — reused for each language prefix.
function AllRoutes({ isAuthenticated, setIsAuthenticated }) {
  const authProps = { isAuthenticated, setIsAuthenticated };
  return (
    <Routes>
      <Route
        path="login"
        element={
          isAuthenticated ? <Navigate to="../" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
        }
      />
      <Route
        path="register"
        element={
          isAuthenticated ? <Navigate to="../" replace /> : <Register setIsAuthenticated={setIsAuthenticated} />
        }
      />
      <Route index element={<Home {...authProps} />} />
      <Route path="shop" element={<Shop {...authProps} />} />
      <Route path="product/:id" element={<Product {...authProps} />} />
      <Route path="my-products" element={<MyProducts {...authProps} />} />
      <Route path="add-product" element={<AddProduct {...authProps} />} />
      <Route path="add-product/:id" element={<AddProduct {...authProps} />} />
      <Route path="analytics" element={<Analytics {...authProps} />} />
      <Route path="about" element={<About {...authProps} />} />
      <Route path="services" element={<Services {...authProps} />} />
      <Route path="faq" element={<FAQ {...authProps} />} />
      <Route path="calculator" element={<Calculator {...authProps} />} />
      <Route path="contacts" element={<Contacts {...authProps} />} />
      <Route path="privacy" element={<Privacy {...authProps} />} />
      <Route path="terms" element={<Terms {...authProps} />} />

      {/* SEO landing pages */}
      <Route path="delivery-turkey-russia" element={<DeliveryTurkeyRussia {...authProps} />} />
      <Route path="delivery-istanbul-moscow" element={<DeliveryIstanbulMoscow {...authProps} />} />
      <Route path="customs-clearance" element={<CustomsClearance {...authProps} />} />
      <Route path="wildberries-ozon" element={<MarketplaceDelivery {...authProps} />} />

      {/* Blog */}
      <Route path="blog" element={<BlogIndex {...authProps} />} />
      <Route path="blog/:slug" element={<Article {...authProps} />} />

      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('client') !== null;
  });

  return (
    <Router>
      <LanguageProvider>
        <ScrollToTop />
        <AnalyticsTracker />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* English routes under /en */}
            <Route path="/en/*" element={<AllRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
            {/* Turkish routes under /tr */}
            <Route path="/tr/*" element={<AllRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
            {/* Russian (default) at root */}
            <Route path="/*" element={<AllRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </Suspense>
      </LanguageProvider>
    </Router>
  );
}

export default App;

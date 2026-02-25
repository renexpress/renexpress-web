import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';

const PRIMARY = '#3D8B8B';
const PRIMARY_LIGHT = '#E8F5F5';

function MyProducts({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stats, setStats] = useState({ all: 0, pending: 0, approved: 0, active: 0, rejected: 0, deleted: 0 });

  // Avatar dropdown & logout confirmation
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const avatarRef = useRef(null);

  const client = JSON.parse(localStorage.getItem('client') || '{}');

  useEffect(() => {
    fetchMyProducts();
    fetchCategories();

    // Close avatar menu on outside click
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setShowAvatarMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, activeTab, searchQuery, selectedCategory]);

  const fetchMyProducts = async () => {
    if (!client.id) { setLoading(false); return; }
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products/my_products/`, { params: { client_id: client.id } });
      const data = response.data.products || response.data.results || [];
      setProducts(data);
      setStats({
        all: data.filter(p => p.product_status !== 'deleted' && p.product_status !== 'rejected').length,
        pending: data.filter(p => p.product_status === 'pending_approval').length,
        approved: data.filter(p => p.product_status === 'approved').length,
        active: data.filter(p => p.product_status === 'active').length,
        rejected: data.filter(p => p.product_status === 'rejected').length,
        deleted: data.filter(p => p.product_status === 'deleted').length
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories/`);
      setCategories(response.data.results || response.data || []);
    } catch (err) { console.error('Error fetching categories:', err); }
  };

  const filterProducts = () => {
    let filtered = [...products];
    if (activeTab === 'all') filtered = filtered.filter(p => p.product_status !== 'deleted' && p.product_status !== 'rejected');
    else if (activeTab === 'pending') filtered = filtered.filter(p => p.product_status === 'pending_approval');
    else if (activeTab === 'approved') filtered = filtered.filter(p => p.product_status === 'approved');
    else if (activeTab === 'active') filtered = filtered.filter(p => p.product_status === 'active');
    else if (activeTab === 'rejected') filtered = filtered.filter(p => p.product_status === 'rejected');
    else if (activeTab === 'deleted') filtered = filtered.filter(p => p.product_status === 'deleted');
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => (p.name && p.name.toLowerCase().includes(query)) || (p.sku && p.sku.toLowerCase().includes(query)) || (p.article && p.article.toLowerCase().includes(query)));
    }
    if (selectedCategory) filtered = filtered.filter(p => p.category_id === parseInt(selectedCategory) || p.category === parseInt(selectedCategory));
    setFilteredProducts(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const tabs = [
    { id: 'all', label: 'Все', count: stats.all },
    { id: 'pending', label: 'На проверке', count: stats.pending },
    { id: 'approved', label: 'Ожидает сдачи', count: stats.approved },
    { id: 'active', label: 'Активные', count: stats.active },
    { id: 'rejected', label: 'Отклонённые', count: stats.rejected },
    { id: 'deleted', label: 'Удалённые', count: stats.deleted },
  ];

  const getStatusBadge = (product) => {
    const status = product.product_status || 'draft';
    const config = {
      active: { label: 'Активен', bg: '#E8F5E9', color: '#2E7D32', dot: '#4CAF50' },
      pending_approval: { label: 'На проверке', bg: '#FFF8E1', color: '#F57C00', dot: '#FF9800' },
      approved: { label: 'Ожидает сдачи', bg: '#E3F2FD', color: '#1565C0', dot: '#2196F3' },
      rejected: { label: 'Отклонён', bg: '#FFEBEE', color: '#C62828', dot: '#F44336' },
      deleted: { label: 'Удалён', bg: '#FAFAFA', color: '#9E9E9E', dot: '#BDBDBD' },
      draft: { label: 'Черновик', bg: '#F5F5F5', color: '#757575', dot: '#9E9E9E' },
    };
    return config[status] || config.draft;
  };

  const formatPrice = (price) => price ? Number(price).toLocaleString('ru-RU') : '0';

  const getProductImage = (product) => {
    if (product.primary_image) return product.primary_image;
    if (product.images?.length > 0) return product.images[0].image_url || product.images[0].image || product.images[0];
    return product.image_url || product.image || null;
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill={PRIMARY}/>
            <text x="16" y="21" fontSize="16" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
          </svg>
          <div>
            <div style={styles.logoTitle}>RENEXPRESS</div>
            <div style={styles.logoSubtitle}>SELLER CENTER</div>
          </div>
        </div>

        <div style={styles.menuSection}>
          <div style={styles.menuLabel}>MAIN MENU</div>
          <nav style={styles.sidebarNav}>
            <a href="/my-products" style={{...styles.menuItem, ...styles.menuItemActive}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              Товары
            </a>
            <a href="#" style={styles.menuItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
              Заказы
            </a>
            <a href="/analytics" style={styles.menuItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/></svg>
              Аналитика
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div style={styles.mainWrapper}>
        {/* Top Bar */}
        <div style={styles.topBar}>
          <div style={styles.breadcrumb}>
            <span style={styles.breadcrumbLink} onClick={() => navigate('/')}>Главная</span>
            <span style={styles.breadcrumbSep}>/</span>
            <span style={styles.breadcrumbCurrent}>Товары</span>
          </div>
          <div style={styles.avatarWrapper} ref={avatarRef}>
            <div style={styles.avatar} onClick={() => setShowAvatarMenu(!showAvatarMenu)}>
              {client.full_name ? client.full_name[0].toUpperCase() : 'U'}
            </div>
            {showAvatarMenu && (
              <div style={styles.avatarMenu}>
                <div style={styles.avatarMenuHeader}>
                  <div style={styles.avatarMenuName}>{client.full_name || 'Пользователь'}</div>
                  <div style={styles.avatarMenuId}>ID: {client.id}</div>
                </div>
                <div style={styles.avatarMenuDivider}></div>
                <div style={styles.avatarMenuItem} onClick={() => { setShowAvatarMenu(false); setShowLogoutConfirm(true); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Выйти
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Centered Content Container */}
        <div style={styles.contentContainer}>
          <div style={styles.contentCard}>
            {/* Header */}
            <div style={styles.cardHeader}>
              <h1 style={styles.pageTitle}>Мои товары</h1>
              <button style={styles.addButton} onClick={() => navigate('/add-product')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Добавить товар
              </button>
            </div>

            {/* Stats Row */}
            <div style={styles.statsRow}>
              <div style={styles.statItem}><span style={styles.statNum}>{stats.all}</span><span style={styles.statLabel}>Всего</span></div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}><span style={{...styles.statNum, color: '#FF9800'}}>{stats.pending}</span><span style={styles.statLabel}>На проверке</span></div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}><span style={{...styles.statNum, color: '#2196F3'}}>{stats.approved}</span><span style={styles.statLabel}>Ожидает сдачи</span></div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}><span style={{...styles.statNum, color: '#4CAF50'}}>{stats.active}</span><span style={styles.statLabel}>Активные</span></div>
            </div>

            {/* Search & Filters */}
            <div style={styles.filtersRow}>
              <div style={styles.searchBox}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input type="text" placeholder="Поиск..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchInput} />
              </div>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={styles.filterSelect}>
                <option value="">Все категории</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>

            {/* Tabs */}
            <div style={styles.tabsRow}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{...styles.tab, ...(activeTab === tab.id ? styles.tabActive : {})}}>
                  {tab.label} <span style={styles.tabCount}>({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Table */}
            <div style={styles.tableWrapper}>
              {loading ? (
                <div style={styles.emptyState}>Загрузка...</div>
              ) : filteredProducts.length === 0 ? (
                <div style={styles.emptyState}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                  <div style={{marginTop: 8, color: '#64748B', fontSize: 13}}>Нет товаров</div>
                </div>
              ) : (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ТОВАР</th>
                      <th style={styles.th}>АРТИКУЛ</th>
                      <th style={styles.th}>ЦЕНА</th>
                      <th style={styles.th}>СТАТУС</th>
                      <th style={styles.th}>КАТЕГОРИЯ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => {
                      const statusInfo = getStatusBadge(product);
                      const imageUrl = getProductImage(product);
                      return (
                        <tr key={product.id} style={{...styles.tr, cursor: 'pointer'}} onClick={() => navigate(`/add-product/${product.id}`)}>
                          <td style={styles.td}>
                            <div style={styles.productCell}>
                              <div style={styles.productImg}>
                                {imageUrl ? <img src={imageUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>}
                              </div>
                              <span style={styles.productName}>{product.name}</span>
                            </div>
                          </td>
                          <td style={styles.td}><span style={styles.skuText}>{product.sku || product.article || '-'}</span></td>
                          <td style={styles.td}><span style={styles.price}>{formatPrice(product.retail_price || product.price)} ₽</span></td>
                          <td style={styles.td}><span style={{...styles.statusBadge, backgroundColor: statusInfo.bg, color: statusInfo.color}}><span style={{...styles.statusDot, backgroundColor: statusInfo.dot}}/>{statusInfo.label}</span></td>
                          <td style={styles.td}><span style={styles.categoryTag}>{product.category_name || '-'}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div style={styles.pagination}>Показано {filteredProducts.length} из {products.length} товаров</div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalTitle}>Выйти из аккаунта?</div>
            <div style={styles.modalText}>Вы уверены, что хотите выйти?</div>
            <div style={styles.modalButtons}>
              <button style={styles.modalCancelBtn} onClick={() => setShowLogoutConfirm(false)}>Отмена</button>
              <button style={styles.modalConfirmBtn} onClick={handleLogout}>Выйти</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#F1F5F9', display: 'flex' },
  sidebar: { width: 200, backgroundColor: '#fff', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, padding: '14px 10px' },
  sidebarHeader: { display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px 14px', borderBottom: '1px solid #F1F5F9', marginBottom: 14 },
  logoTitle: { fontSize: 12, fontWeight: 600, color: '#1E293B' },
  logoSubtitle: { fontSize: 8, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.5px' },
  menuSection: { flex: 1 },
  menuLabel: { fontSize: 9, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px', padding: '0 6px', marginBottom: 6 },
  sidebarNav: { display: 'flex', flexDirection: 'column', gap: 2 },
  menuItem: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500, color: '#64748B', textDecoration: 'none' },
  menuItemActive: { backgroundColor: PRIMARY_LIGHT, color: PRIMARY },
  mainWrapper: { flex: 1, marginLeft: 200, display: 'flex', flexDirection: 'column' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fff', borderBottom: '1px solid #E2E8F0' },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 },
  breadcrumbLink: { color: PRIMARY, cursor: 'pointer' },
  breadcrumbSep: { color: '#CBD5E1' },
  breadcrumbCurrent: { color: '#64748B' },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 32, height: 32, borderRadius: '50%', backgroundColor: PRIMARY_LIGHT, color: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  avatarMenu: { position: 'absolute', top: '100%', right: 0, marginTop: 6, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', minWidth: 180, zIndex: 200, overflow: 'hidden' },
  avatarMenuHeader: { padding: '12px 14px' },
  avatarMenuName: { fontSize: 13, fontWeight: 600, color: '#1E293B' },
  avatarMenuId: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  avatarMenuDivider: { height: 1, backgroundColor: '#F1F5F9' },
  avatarMenuItem: { display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', fontSize: 13, color: '#DC2626', cursor: 'pointer' },
  contentContainer: { flex: 1, padding: '20px', display: 'flex', justifyContent: 'center' },
  contentCard: { width: '100%', maxWidth: 900, backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '20px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  pageTitle: { fontSize: 18, fontWeight: 700, color: '#1E293B', margin: 0 },
  addButton: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', backgroundColor: PRIMARY, color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  statsRow: { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', backgroundColor: '#F8FAFC', borderRadius: 8, marginBottom: 16 },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: 700, color: '#1E293B' },
  statLabel: { fontSize: 10, color: '#64748B', marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: '#E2E8F0' },
  filtersRow: { display: 'flex', gap: 10, marginBottom: 12 },
  searchBox: { display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 6, flex: 1 },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: 12, color: '#1E293B', backgroundColor: 'transparent' },
  filterSelect: { padding: '7px 12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 12, color: '#1E293B', cursor: 'pointer' },
  tabsRow: { display: 'flex', gap: 4, marginBottom: 12, borderBottom: '1px solid #F1F5F9', paddingBottom: 12 },
  tab: { padding: '6px 12px', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 500, color: '#64748B', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 },
  tabActive: { backgroundColor: PRIMARY, color: '#fff' },
  tabCount: { opacity: 0.8 },
  tableWrapper: { borderRadius: 8, border: '1px solid #E2E8F0', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '10px 12px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: '#64748B', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' },
  tr: { borderBottom: '1px solid #F1F5F9' },
  td: { padding: '10px 12px', fontSize: 12, color: '#1E293B' },
  productCell: { display: 'flex', alignItems: 'center', gap: 10 },
  productImg: { width: 34, height: 34, borderRadius: 6, backgroundColor: '#F1F5F9', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  productName: { fontSize: 12, fontWeight: 500, color: '#1E293B' },
  skuText: { fontSize: 11, color: '#64748B' },
  price: { fontSize: 12, fontWeight: 600, color: '#1E293B' },
  statusBadge: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 500 },
  statusDot: { width: 5, height: 5, borderRadius: '50%' },
  categoryTag: { display: 'inline-block', padding: '3px 8px', backgroundColor: '#F1F5F9', borderRadius: 4, fontSize: 10, fontWeight: 500, color: '#475569' },
  emptyState: { padding: 40, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  pagination: { textAlign: 'center', padding: '12px', fontSize: 11, color: '#64748B' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', borderRadius: 12, padding: '24px', width: 320, textAlign: 'center' },
  modalTitle: { fontSize: 16, fontWeight: 600, color: '#1E293B', marginBottom: 8 },
  modalText: { fontSize: 13, color: '#64748B', marginBottom: 20 },
  modalButtons: { display: 'flex', gap: 10, justifyContent: 'center' },
  modalCancelBtn: { padding: '8px 20px', backgroundColor: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' },
  modalConfirmBtn: { padding: '8px 20px', backgroundColor: '#DC2626', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' },
};

export default MyProducts;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';

const PRIMARY = '#3D8B8B';
const PRIMARY_LIGHT = '#E8F5F5';

function Analytics({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalProfit: 0,
    averageRating: 0,
    totalViews: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    topProducts: [],
    salesByMonth: [],
    recentOrders: []
  });

  const client = JSON.parse(localStorage.getItem('client') || '{}');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    if (!client.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products/my_stats/`, {
        params: { client_id: client.id }
      });

      if (response.data && response.data.statistics) {
        const stats = response.data.statistics;
        setStatistics({
          totalSales: stats.total_sales || 0,
          totalRevenue: stats.total_revenue || 0,
          totalProfit: stats.total_profit || 0,
          averageRating: stats.average_rating || 0,
          totalViews: stats.total_views || 0,
          totalOrders: stats.total_orders || 0,
          pendingOrders: stats.pending_orders || 0,
          completedOrders: stats.completed_orders || 0,
          topProducts: (stats.top_products || []).map(p => ({
            id: p.id,
            name: p.name,
            sales: p.sales_count || p.sales || 0,
            revenue: p.revenue || 0,
            image: p.primary_image || (p.images && p.images[0]) || null
          })),
          salesByMonth: stats.sales_by_month || [],
          recentOrders: (stats.recent_orders || []).map(order => ({
            id: order.id,
            productName: order.product_name || 'Товар',
            date: order.created_at ? new Date(order.created_at).toLocaleDateString('ru-RU') : '',
            amount: order.total || order.amount || 0,
            status: order.status || 'pending'
          }))
        });
      }
    } catch (err) {
      console.error('Error fetching statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const formatPrice = (price) => {
    if (!price) return '0';
    return Number(price).toLocaleString('ru-RU');
  };

  const getStatusText = (status) => {
    const statusMap = {
      completed: 'Выполнен',
      delivered: 'Выполнен',
      pending: 'Ожидает',
      processing: 'В процессе',
      awaiting_payment: 'Ожидает оплаты'
    };
    return statusMap[status] || status;
  };

  const getStatusStyle = (status) => {
    const styleMap = {
      completed: { bg: '#E8F5E9', color: '#2E7D32' },
      delivered: { bg: '#E8F5E9', color: '#2E7D32' },
      pending: { bg: '#FFF3E0', color: '#E65100' },
      processing: { bg: '#E3F2FD', color: '#1565C0' },
      awaiting_payment: { bg: '#FFF8E1', color: '#F57C00' }
    };
    return styleMap[status] || { bg: '#F5F5F5', color: '#757575' };
  };

  // Calculate max sales for chart
  const maxSales = statistics.salesByMonth.length > 0
    ? Math.max(...statistics.salesByMonth.map(s => s.sales || 0))
    : 0;

  const ordersCompletionPercent = statistics.totalOrders > 0
    ? Math.round((statistics.completedOrders / statistics.totalOrders) * 100)
    : 0;

  return (
    <div style={styles.page}>
      {/* Left Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill={PRIMARY}/>
              <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
            </svg>
          </div>
          <div>
            <div style={styles.logoTitle}>RENEXPRESS</div>
            <div style={styles.logoSubtitle}>SELLER CENTER</div>
          </div>
        </div>

        <div style={styles.menuSection}>
          <div style={styles.menuLabel}>MAIN MENU</div>
          <nav style={styles.sidebarNav}>
            <a href="/my-products" style={styles.menuItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              Товары
            </a>
            <a href="#" style={styles.menuItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
              </svg>
              Заказы
            </a>
            <a href="/analytics" style={{...styles.menuItem, ...styles.menuItemActive}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2">
                <path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/>
              </svg>
              Аналитика
            </a>
          </nav>
        </div>

        <div style={styles.sidebarFooter}>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Выйти
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={styles.mainWrapper}>
        {/* Top Header */}
        <header style={styles.header}>
          <div style={styles.breadcrumb}>
            <span style={styles.breadcrumbLink} onClick={() => navigate('/')}>Главная</span>
            <span style={styles.breadcrumbSep}>&gt;</span>
            <span style={styles.breadcrumbCurrent}>Аналитика</span>
          </div>
          <h1 style={styles.pageTitle}>Статистика</h1>
        </header>

        {loading ? (
          <div style={styles.loadingState}>Загрузка статистики...</div>
        ) : (
          <>
            {/* Stats Cards Grid */}
            <div style={styles.statsGrid}>
              {/* Total Sales */}
              <div style={{...styles.statCard, backgroundColor: '#E8F5E9'}}>
                <div style={{...styles.statIconBox, backgroundColor: '#C8E6C9'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                  </svg>
                </div>
                <div style={styles.statValue}>{formatPrice(statistics.totalSales)}</div>
                <div style={styles.statLabel}>Продаж</div>
              </div>

              {/* Total Revenue */}
              <div style={{...styles.statCard, backgroundColor: '#E3F2FD'}}>
                <div style={{...styles.statIconBox, backgroundColor: '#BBDEFB'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                  </svg>
                </div>
                <div style={styles.statValue}>{formatPrice(statistics.totalRevenue)} ₽</div>
                <div style={styles.statLabel}>Выручка</div>
              </div>

              {/* Total Profit */}
              <div style={{...styles.statCard, backgroundColor: '#FFF3E0'}}>
                <div style={{...styles.statIconBox, backgroundColor: '#FFE0B2'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E65100" strokeWidth="2">
                    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
                    <polyline points="17,6 23,6 23,12"/>
                  </svg>
                </div>
                <div style={styles.statValue}>{formatPrice(statistics.totalProfit)} ₽</div>
                <div style={styles.statLabel}>Прибыль</div>
              </div>

              {/* Average Rating */}
              <div style={{...styles.statCard, backgroundColor: '#FCE4EC'}}>
                <div style={{...styles.statIconBox, backgroundColor: '#F8BBD9'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C2185B" strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
                  </svg>
                </div>
                <div style={styles.statValue}>{statistics.averageRating.toFixed(1)}</div>
                <div style={styles.statLabel}>Рейтинг</div>
              </div>

              {/* Total Views */}
              <div style={{...styles.statCard, backgroundColor: '#EDE7F6'}}>
                <div style={{...styles.statIconBox, backgroundColor: '#D1C4E9'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#512DA8" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <div style={styles.statValue}>{formatPrice(statistics.totalViews)}</div>
                <div style={styles.statLabel}>Просмотров</div>
              </div>

              {/* Total Orders */}
              <div style={{...styles.statCard, backgroundColor: '#E0F7FA'}}>
                <div style={{...styles.statIconBox, backgroundColor: '#B2EBF2'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00838F" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div style={styles.statValue}>{statistics.totalOrders}</div>
                <div style={styles.statLabel}>Заказов</div>
              </div>
            </div>

            {/* Charts Row */}
            <div style={styles.chartsRow}>
              {/* Sales Chart */}
              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>Продажи по месяцам</h3>
                {statistics.salesByMonth.length > 0 ? (
                  <div style={styles.chartContainer}>
                    {statistics.salesByMonth.map((item, index) => {
                      const height = maxSales > 0 ? (item.sales / maxSales) * 150 : 10;
                      return (
                        <div key={index} style={styles.chartBarWrapper}>
                          <div style={styles.chartBarValue}>{item.sales}</div>
                          <div style={{...styles.chartBar, height: height || 10}} />
                          <div style={styles.chartBarLabel}>{item.month}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={styles.noData}>Нет данных о продажах</div>
                )}
              </div>

              {/* Orders Summary */}
              <div style={styles.ordersCard}>
                <h3 style={styles.chartTitle}>Заказы</h3>
                <div style={styles.ordersStats}>
                  <div style={styles.orderStat}>
                    <div style={{...styles.orderDot, backgroundColor: '#4CAF50'}} />
                    <span>Выполнено: {statistics.completedOrders}</span>
                  </div>
                  <div style={styles.orderStat}>
                    <div style={{...styles.orderDot, backgroundColor: '#FF9800'}} />
                    <span>В процессе: {statistics.pendingOrders}</span>
                  </div>
                </div>
                <div style={styles.progressBg}>
                  <div style={{...styles.progressFill, width: `${ordersCompletionPercent}%`}} />
                </div>
                <div style={styles.progressLabel}>{ordersCompletionPercent}% выполнено</div>
              </div>
            </div>

            {/* Bottom Row */}
            <div style={styles.bottomRow}>
              {/* Top Products */}
              <div style={styles.topProductsCard}>
                <h3 style={styles.chartTitle}>Топ товаров</h3>
                {statistics.topProducts.length > 0 ? (
                  <div style={styles.topProductsList}>
                    {statistics.topProducts.slice(0, 5).map((product, index) => (
                      <div key={product.id || index} style={styles.topProductItem}>
                        <div style={styles.topProductRank}>{index + 1}</div>
                        <div style={styles.topProductImage}>
                          {product.image ? (
                            <img src={product.image} alt="" style={styles.topProductImg} />
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21,15 16,10 5,21"/>
                            </svg>
                          )}
                        </div>
                        <div style={styles.topProductInfo}>
                          <div style={styles.topProductName}>{product.name}</div>
                          <div style={styles.topProductSales}>{product.sales} продаж</div>
                        </div>
                        <div style={styles.topProductRevenue}>{formatPrice(product.revenue)} ₽</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={styles.noData}>Нет данных о топ товарах</div>
                )}
              </div>

              {/* Recent Orders */}
              <div style={styles.recentOrdersCard}>
                <h3 style={styles.chartTitle}>Последние заказы</h3>
                {statistics.recentOrders.length > 0 ? (
                  <div style={styles.recentOrdersList}>
                    {statistics.recentOrders.slice(0, 5).map((order, index) => {
                      const statusStyle = getStatusStyle(order.status);
                      return (
                        <div key={order.id || index} style={styles.recentOrderItem}>
                          <div style={styles.recentOrderLeft}>
                            <div style={styles.recentOrderProduct}>{order.productName}</div>
                            <div style={styles.recentOrderDate}>{order.date}</div>
                          </div>
                          <div style={styles.recentOrderRight}>
                            <div style={styles.recentOrderAmount}>{formatPrice(order.amount)} ₽</div>
                            <div style={{
                              ...styles.recentOrderStatus,
                              backgroundColor: statusStyle.bg,
                              color: statusStyle.color
                            }}>
                              {getStatusText(order.status)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={styles.noData}>Нет последних заказов</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#F8FAFC',
    display: 'flex',
  },
  // Sidebar
  sidebar: {
    width: 240,
    backgroundColor: '#fff',
    borderRight: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
  },
  sidebarHeader: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    borderBottom: '1px solid #F1F5F9',
  },
  logoIcon: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1E293B',
  },
  logoSubtitle: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: 500,
    letterSpacing: '0.5px',
  },
  menuSection: {
    padding: '16px 12px',
    flex: 1,
  },
  menuLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#94A3B8',
    letterSpacing: '0.5px',
    padding: '0 8px',
    marginBottom: 8,
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: '#64748B',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  menuItemActive: {
    backgroundColor: PRIMARY_LIGHT,
    color: PRIMARY,
  },
  sidebarFooter: {
    padding: '16px 12px',
    borderTop: '1px solid #F1F5F9',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: '#64748B',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
  },
  // Main Content
  mainWrapper: {
    flex: 1,
    marginLeft: 240,
    padding: '24px 32px',
  },
  header: {
    marginBottom: 24,
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    marginBottom: 4,
  },
  breadcrumbLink: {
    color: PRIMARY,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  breadcrumbSep: {
    color: '#CBD5E1',
  },
  breadcrumbCurrent: {
    color: '#1E293B',
    fontWeight: 500,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1E293B',
    margin: 0,
  },
  loadingState: {
    padding: 60,
    textAlign: 'center',
    color: '#64748B',
    fontSize: 14,
  },
  // Stats Grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    borderRadius: 16,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  statIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: 500,
  },
  // Charts Row
  chartsRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 16,
    marginBottom: 24,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    border: '1px solid #E2E8F0',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1E293B',
    marginBottom: 20,
    margin: 0,
    marginBottom: 20,
  },
  chartContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 200,
    paddingTop: 30,
  },
  chartBarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  chartBarValue: {
    fontSize: 12,
    fontWeight: 600,
    color: '#1E293B',
  },
  chartBar: {
    width: 32,
    backgroundColor: PRIMARY,
    borderRadius: 4,
    minHeight: 10,
  },
  chartBarLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  ordersCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    border: '1px solid #E2E8F0',
  },
  ordersStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  orderStat: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 14,
    color: '#4B5563',
  },
  orderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  progressBg: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  // Bottom Row
  bottomRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  topProductsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    border: '1px solid #E2E8F0',
  },
  topProductsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  topProductItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 0',
    borderBottom: '1px solid #F1F5F9',
  },
  topProductRank: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: PRIMARY_LIGHT,
    color: PRIMARY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 600,
  },
  topProductImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topProductImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  topProductInfo: {
    flex: 1,
    minWidth: 0,
  },
  topProductName: {
    fontSize: 14,
    fontWeight: 500,
    color: '#1E293B',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  topProductSales: {
    fontSize: 12,
    color: '#64748B',
  },
  topProductRevenue: {
    fontSize: 14,
    fontWeight: 600,
    color: PRIMARY,
  },
  recentOrdersCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    border: '1px solid #E2E8F0',
  },
  recentOrdersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  recentOrderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #F1F5F9',
  },
  recentOrderLeft: {
    flex: 1,
    minWidth: 0,
  },
  recentOrderProduct: {
    fontSize: 14,
    fontWeight: 500,
    color: '#1E293B',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 2,
  },
  recentOrderDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
  recentOrderRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 4,
  },
  recentOrderAmount: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1E293B',
  },
  recentOrderStatus: {
    padding: '4px 10px',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 500,
  },
  noData: {
    padding: 40,
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 14,
  },
};

export default Analytics;

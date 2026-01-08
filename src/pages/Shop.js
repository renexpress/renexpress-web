import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import '../styles/responsive.css';

const PRIMARY = '#3D8B8B';

function Shop({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Category navigation - stores the path of category IDs
  const [categoryPath, setCategoryPath] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Mobile states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filterCategoryPath, setFilterCategoryPath] = useState([]);

  // Flatten nested categories into a single array with parent references
  const flattenCategories = (cats, parentId = null) => {
    let result = [];
    cats.forEach(cat => {
      result.push({ ...cat, parent: parentId });
      if (cat.children && cat.children.length > 0) {
        result = [...result, ...flattenCategories(cat.children, cat.id)];
      }
    });
    return result;
  };

  const CACHE_KEY = 'shop_cache';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    // Try to load from cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { products: cachedProducts, categories: cachedCategories, colors: cachedColors, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setProducts(cachedProducts);
          setAllCategories(cachedCategories);
          setColors(cachedColors);
          setLoading(false);
          // Refresh in background
          fetchData(true);
          return;
        }
      } catch (e) {}
    }
    fetchData(false);
  }, []);

  const fetchData = async (background = false) => {
    if (!background) setLoading(true);
    try {
      const [productsRes, categoriesRes, colorsRes] = await Promise.all([
        axios.get(`${API_URL}/products/`),
        axios.get(`${API_URL}/categories/`),
        axios.get(`${API_URL}/colors/`).catch(() => ({ data: [] }))
      ]);
      const productsData = productsRes.data.results || productsRes.data || [];
      const categoriesData = categoriesRes.data.results || categoriesRes.data || [];
      const colorsData = colorsRes.data.results || colorsRes.data || [];

      // Flatten the nested categories
      const flatCategories = flattenCategories(categoriesData);

      setProducts(productsData);
      setAllCategories(flatCategories);
      setColors(colorsData);

      // Save to cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        products: productsData,
        categories: flatCategories,
        colors: colorsData,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Get current category (last in path)
  const currentCategoryId = categoryPath.length > 0 ? categoryPath[categoryPath.length - 1] : null;
  const currentCategory = currentCategoryId ? allCategories.find(c => c.id === currentCategoryId) : null;

  // Get categories to display in sidebar (children of current category, or root if none selected)
  const getDisplayCategories = () => {
    if (currentCategoryId) {
      return allCategories.filter(c => c.parent === currentCategoryId);
    }
    return allCategories.filter(c => !c.parent);
  };

  const displayCategories = getDisplayCategories();

  // Check if category has children
  const hasChildren = (catId) => {
    return allCategories.some(c => c.parent === catId);
  };

  // Get all descendant category IDs
  const getAllDescendantIds = (catId) => {
    const children = allCategories.filter(c => c.parent === catId);
    let ids = [catId];
    children.forEach(child => {
      ids = [...ids, ...getAllDescendantIds(child.id)];
    });
    return ids;
  };

  // Get category count (products in this category and all descendants)
  const getCategoryCount = (catId) => {
    const allIds = getAllDescendantIds(catId);
    return products.filter(p => allIds.includes(p.category)).length;
  };

  // Navigate into a category
  const navigateToCategory = (cat) => {
    setCategoryPath([...categoryPath, cat.id]);
    setCurrentPage(1);
  };

  // Navigate back to a specific level in the path
  const navigateToLevel = (index) => {
    if (index < 0) {
      setCategoryPath([]);
    } else {
      setCategoryPath(categoryPath.slice(0, index + 1));
    }
    setCurrentPage(1);
  };

  // Get breadcrumb items
  const getBreadcrumb = () => {
    const items = [{ id: null, name: 'Главная' }];
    categoryPath.forEach(catId => {
      const cat = allCategories.find(c => c.id === catId);
      if (cat) {
        items.push({ id: cat.id, name: cat.name });
      }
    });
    return items;
  };

  // Get colors available in current category
  const getAvailableColors = () => {
    let categoryProducts = products;
    if (currentCategoryId) {
      const allowedCats = getAllDescendantIds(currentCategoryId);
      categoryProducts = products.filter(p => allowedCats.includes(p.category));
    }

    const colorIds = new Set();
    categoryProducts.forEach(p => {
      if (p.color_ids) {
        p.color_ids.forEach(id => colorIds.add(id));
      }
    });

    return colors.filter(c => colorIds.has(c.id));
  };

  const availableColors = getAvailableColors();

  // Mobile filter drawer category navigation helpers
  const getFilterCurrentCategoryId = () => filterCategoryPath.length > 0 ? filterCategoryPath[filterCategoryPath.length - 1] : null;
  const filterCurrentCategoryId = getFilterCurrentCategoryId();
  const filterCurrentCategory = filterCurrentCategoryId ? allCategories.find(c => c.id === filterCurrentCategoryId) : null;

  const getFilterDisplayCategories = () => {
    if (filterCurrentCategoryId) {
      return allCategories.filter(c => c.parent === filterCurrentCategoryId);
    }
    return allCategories.filter(c => !c.parent);
  };

  const filterDisplayCategories = getFilterDisplayCategories();

  const navigateFilterCategory = (catId) => {
    setFilterCategoryPath([...filterCategoryPath, catId]);
  };

  const goBackFilterCategory = () => {
    setFilterCategoryPath(filterCategoryPath.slice(0, -1));
  };

  const selectFilterCategory = (catId) => {
    setCategoryPath([...filterCategoryPath, catId]);
    setFilterCategoryPath([]);
    setCurrentPage(1);
    setFilterDrawerOpen(false);
  };

  const resetFilterCategory = () => {
    setFilterCategoryPath([]);
  };

  // Toggle color selection
  const toggleColor = (colorId) => {
    if (selectedColors.includes(colorId)) {
      setSelectedColors(selectedColors.filter(id => id !== colorId));
    } else {
      setSelectedColors([...selectedColors, colorId]);
    }
    setCurrentPage(1);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(p => {
      // Category filter
      if (currentCategoryId) {
        const allowedCats = getAllDescendantIds(currentCategoryId);
        if (!allowedCats.includes(p.category)) return false;
      }
      // Price filter
      const price = p.discount_price || p.retail_price || p.price || 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      // Search filter
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      // Color filter
      if (selectedColors.length > 0) {
        const productColorIds = p.color_ids || [];
        if (!selectedColors.some(c => productColorIds.includes(c))) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const priceA = a.discount_price || a.retail_price || a.price || 0;
      const priceB = b.discount_price || b.retail_price || b.price || 0;
      switch (sortBy) {
        case 'price_asc': return priceA - priceB;
        case 'price_desc': return priceB - priceA;
        case 'newest': return new Date(b.created_at) - new Date(a.created_at);
        default: return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const breadcrumb = getBreadcrumb();

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div className="header-content" style={styles.headerContent}>
          <div style={styles.logo} onClick={() => navigate('/')}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill={PRIMARY} />
              <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
            </svg>
            <span style={styles.logoText}>RENEXPRESS</span>
          </div>

          <div className="header-search" style={styles.searchContainer}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" style={styles.searchIcon}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <nav className="header-nav" style={styles.nav}>
            <a href="/" style={styles.navLink}>Главная</a>
            <a href="/shop" style={{...styles.navLink, color: PRIMARY}}>Каталог</a>
            <a href="#" style={styles.navLink}>О нас</a>
          </nav>

          <div className="header-icons" style={styles.headerIcons}>
            {isAuthenticated ? (
              <button onClick={handleLogout} style={styles.iconButton} title="Выйти">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            ) : (
              <button onClick={() => navigate('/login')} style={styles.signInButton}>
                Войти
              </button>
            )}
            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              style={styles.mobileMenuBtn}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <div style={styles.logo}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill={PRIMARY} />
                <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
              </svg>
              <span style={styles.logoText}>RENEXPRESS</span>
            </div>
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <a href="/">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              Главная
            </a>
            <a href="/shop" className="active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              Каталог
            </a>
            <a href="#">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
              </svg>
              О нас
            </a>
          </nav>
          <div className="mobile-menu-footer">
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>Выйти</button>
            ) : (
              <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>Войти</button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={`mobile-filter-drawer ${filterDrawerOpen ? 'open' : ''}`}
        onClick={() => setFilterDrawerOpen(false)}
      >
        <div className="filter-drawer-content" onClick={(e) => e.stopPropagation()}>
          <div className="filter-drawer-header">
            <h3>Фильтры</h3>
            <button onClick={() => { setCategoryPath([]); setSelectedColors([]); setPriceRange([0, 100000]); setFilterCategoryPath([]); }}>
              Сбросить
            </button>
          </div>
          <div className="filter-drawer-body">
            {/* Categories with Subcategory Navigation */}
            <div style={{marginBottom: 20}}>
              <h4 style={{fontSize: 14, fontWeight: 600, marginBottom: 12}}>Категория</h4>

              {/* Back button and current category when in subcategory */}
              {filterCurrentCategory && (
                <div style={{marginBottom: 12}}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 12px',
                      background: '#F3F4F6',
                      borderRadius: 8,
                      cursor: 'pointer',
                      marginBottom: 8
                    }}
                    onClick={goBackFilterCategory}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                    <span style={{fontSize: 13, color: '#6B7280'}}>Назад</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: categoryPath.includes(filterCurrentCategoryId) ? '#F0FDFA' : '#fff',
                      border: categoryPath.includes(filterCurrentCategoryId) ? `2px solid ${PRIMARY}` : `1px solid ${PRIMARY}`,
                      borderRadius: 10,
                      cursor: 'pointer'
                    }}
                    onClick={() => selectFilterCategory(filterCurrentCategoryId)}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                      <span style={{fontSize: 14, fontWeight: 600, color: PRIMARY}}>{filterCurrentCategory.name}</span>
                      <span style={{fontSize: 12, color: '#9CA3AF'}}>({getCategoryCount(filterCurrentCategoryId)})</span>
                    </div>
                    <span style={{fontSize: 12, color: PRIMARY}}>Выбрать</span>
                  </div>
                </div>
              )}

              <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                {filterDisplayCategories.map(cat => {
                  const catHasChildren = hasChildren(cat.id);
                  const isSelected = categoryPath.includes(cat.id);
                  return (
                    <div
                      key={cat.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        border: isSelected ? `2px solid ${PRIMARY}` : '1px solid #E5E7EB',
                        borderRadius: 10,
                        background: isSelected ? '#F0FDFA' : '#fff',
                        cursor: 'pointer'
                      }}
                      onClick={() => catHasChildren ? navigateFilterCategory(cat.id) : selectFilterCategory(cat.id)}
                    >
                      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                        <span style={{fontSize: 14, color: isSelected ? PRIMARY : '#374151', fontWeight: isSelected ? 600 : 400}}>
                          {cat.name}
                        </span>
                        <span style={{fontSize: 12, color: '#9CA3AF'}}>({getCategoryCount(cat.id)})</span>
                      </div>
                      {catHasChildren && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      )}
                    </div>
                  );
                })}
                {filterDisplayCategories.length === 0 && filterCurrentCategoryId && (
                  <p style={{fontSize: 13, color: '#6B7280', textAlign: 'center', padding: 12}}>
                    Нет подкатегорий
                  </p>
                )}
              </div>

            </div>
            {/* Price Range */}
            <div style={{marginBottom: 20}}>
              <h4 style={{fontSize: 14, fontWeight: 600, marginBottom: 12}}>Цена</h4>
              <div style={{display: 'flex', gap: 8}}>
                <input
                  type="number"
                  placeholder="От"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  style={{flex: 1, padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14}}
                />
                <input
                  type="number"
                  placeholder="До"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  style={{flex: 1, padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14}}
                />
              </div>
            </div>
            {/* Colors */}
            {colors.length > 0 && (
              <div>
                <h4 style={{fontSize: 14, fontWeight: 600, marginBottom: 12}}>Цвет</h4>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                  {colors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => toggleColor(color.id)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: color.hex_code || color.code || '#ccc',
                        border: selectedColors.includes(color.id) ? '3px solid #111' : '2px solid #E5E7EB',
                        cursor: 'pointer'
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="filter-drawer-footer">
            <button onClick={() => setFilterDrawerOpen(false)}>Отмена</button>
            <button onClick={() => setFilterDrawerOpen(false)}>
              Показать {filteredProducts.length} товаров
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="shop-container" style={styles.main}>
        {/* Mobile Filter Bar */}
        <div className="mobile-filter-bar">
          <button onClick={() => { setFilterCategoryPath(categoryPath); setFilterDrawerOpen(true); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Фильтры
          </button>
          <button>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
              <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
            </svg>
            Сортировка
          </button>
        </div>

        {/* Breadcrumb */}
        <div style={styles.breadcrumb}>
          {breadcrumb.map((item, index) => (
            <span key={index}>
              {index > 0 && <span style={styles.breadcrumbSep}>/</span>}
              <span
                style={{
                  ...styles.breadcrumbItem,
                  ...(index === breadcrumb.length - 1 ? styles.breadcrumbCurrent : styles.breadcrumbLink)
                }}
                onClick={() => index < breadcrumb.length - 1 && navigateToLevel(index - 1)}
              >
                {item.name.toUpperCase()}
              </span>
            </span>
          ))}
        </div>

        {/* Page Title */}
        <div className="shop-header" style={styles.pageHeader}>
          <div>
            <h1 className="shop-title" style={styles.pageTitle}>{currentCategory ? currentCategory.name : 'Все товары'}</h1>
            <p style={styles.pageSubtitle}>
              {currentCategory
                ? `Откройте для себя нашу коллекцию в категории ${currentCategory.name.toLowerCase()}`
                : 'Откройте для себя нашу коллекцию качественных товаров'
              }
            </p>
          </div>
          <div style={styles.sortContainer}>
            <span style={styles.sortLabel}>Сортировка</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.sortSelect}
            >
              <option value="featured">Рекомендуемые</option>
              <option value="newest">Новинки</option>
              <option value="price_asc">Цена: по возрастанию</option>
              <option value="price_desc">Цена: по убыванию</option>
            </select>
          </div>
        </div>

        <div style={styles.content}>
          {/* Sidebar Filters */}
          <aside style={styles.sidebar}>
            {/* Category Section */}
            <div style={styles.filterSection}>
              <h3 style={styles.filterTitle}>КАТЕГОРИЯ</h3>
              {/* Show current category name as header when in subcategories */}
              {currentCategory && (
                <div style={styles.categoryHeader}>
                  <span
                    style={styles.categoryBackArrow}
                    onClick={() => navigateToLevel(categoryPath.length - 2)}
                  >
                    ‹
                  </span>
                  <span style={styles.categoryHeaderName}>{currentCategory.name}</span>
                </div>
              )}
              <div style={styles.categoryList}>
                {displayCategories.map(cat => (
                  <div
                    key={cat.id}
                    style={styles.categoryItem}
                    onClick={() => navigateToCategory(cat)}
                  >
                    <span style={styles.categoryName}>{cat.name}</span>
                    <div style={styles.categoryRight}>
                      <span style={styles.categoryCount}>{getCategoryCount(cat.id)}</span>
                      {hasChildren(cat.id) && (
                        <span style={styles.categoryArrow}>›</span>
                      )}
                    </div>
                  </div>
                ))}
                {displayCategories.length === 0 && currentCategoryId && (
                  <p style={styles.noSubcategories}>Нет подкатегорий</p>
                )}
              </div>
            </div>

            {/* Price Section */}
            <div style={styles.filterSection}>
              <h3 style={styles.filterTitle}>ЦЕНА</h3>
              <div style={styles.priceInputs}>
                <div style={styles.priceInputWrapper}>
                  <span style={styles.currencyPrefix}>₽</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    style={styles.priceInput}
                  />
                </div>
                <div style={styles.priceInputWrapper}>
                  <span style={styles.currencyPrefix}>₽</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    style={styles.priceInput}
                  />
                </div>
              </div>
            </div>

            {/* Color Section */}
            {availableColors.length > 0 && (
              <div style={styles.filterSection}>
                <h3 style={styles.filterTitle}>ЦВЕТ</h3>
                <div style={styles.colorList}>
                  {availableColors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => toggleColor(color.id)}
                      style={{
                        ...styles.colorCircle,
                        backgroundColor: color.hex_code || color.code || '#ccc',
                        boxShadow: selectedColors.includes(color.id)
                          ? '0 0 0 2px #fff, 0 0 0 4px #111'
                          : 'none',
                        border: `1px solid ${color.hex_code === '#FFFFFF' || color.code === '#FFFFFF' ? '#E5E7EB' : 'transparent'}`
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Products Grid */}
          <div style={styles.productsSection}>
            {loading ? (
              <p style={styles.loadingText}>Загрузка...</p>
            ) : paginatedProducts.length === 0 ? (
              <p style={styles.noProducts}>Товары не найдены</p>
            ) : (
              <>
                <div className="products-grid" style={styles.productsGrid}>
                  {paginatedProducts.map(product => (
                    <div key={product.id} style={styles.productCard} onClick={() => navigate(`/product/${product.id}`)}>
                      <div style={styles.productImageContainer}>
                        {product.primary_image ? (
                          <img src={product.primary_image} alt={product.name} style={styles.productImage} />
                        ) : (
                          <div style={styles.noImage}>Нет фото</div>
                        )}
                        {product.is_new && (
                          <span style={styles.newBadge}>НОВИНКА</span>
                        )}
                        {product.discount_price && product.retail_price && (
                          <span style={styles.discountBadge}>
                            -{Math.round((1 - product.discount_price / product.retail_price) * 100)}%
                          </span>
                        )}
                      </div>
                      <div style={styles.productInfo}>
                        <div style={styles.productRow}>
                          <h3 style={styles.productName}>{product.name}</h3>
                          <div style={styles.productPrices}>
                            {product.discount_price && product.retail_price ? (
                              <>
                                <span style={styles.productPrice}>{product.discount_price} ₽</span>
                                <span style={styles.oldPrice}>{product.retail_price} ₽</span>
                              </>
                            ) : (
                              <span style={styles.productPrice}>{product.retail_price || product.price || 0} ₽</span>
                            )}
                          </div>
                        </div>
                        <p style={styles.productSubtitle}>{product.category_name || ''}</p>
                        <div style={styles.productRating}>
                          <span style={styles.stars}>{'★'.repeat(Math.round(product.avg_rating || 0))}{'☆'.repeat(5 - Math.round(product.avg_rating || 0))}</span>
                          <span style={styles.reviewCount}>{product.reviews_count || 0} отзывов</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div style={styles.pagination}>
                  <span style={styles.paginationInfo}>
                    Показано {paginatedProducts.length} из {filteredProducts.length} товаров
                  </span>
                  <div style={styles.paginationButtons}>
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{...styles.pageButton, opacity: currentPage === 1 ? 0.5 : 1}}
                    >
                      Назад
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          style={{
                            ...styles.pageButton,
                            ...(currentPage === pageNum ? styles.pageButtonActive : {})
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span style={styles.pageEllipsis}>...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          style={styles.pageButton}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      style={{...styles.pageButton, opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1}}
                    >
                      Вперёд
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    fontFamily: 'Inter, -apple-system, sans-serif',
  },
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #E5E7EB',
    padding: '12px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 32,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
  },
  searchContainer: {
    width: 400,
    position: 'relative',
    margin: '0 auto',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  searchInput: {
    width: '100%',
    padding: '10px 16px 10px 44px',
    fontSize: 14,
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    outline: 'none',
  },
  nav: {
    display: 'flex',
    gap: 24,
  },
  navLink: {
    fontSize: 14,
    color: '#374151',
    textDecoration: 'none',
    fontWeight: 500,
  },
  headerIcons: {
    display: 'flex',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  mobileMenuBtn: {
    display: 'none',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  signInButton: {
    padding: '10px 20px',
    backgroundColor: PRIMARY,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  main: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '24px',
  },
  breadcrumb: {
    marginBottom: 8,
    fontSize: 11,
    letterSpacing: '0.5px',
  },
  breadcrumbItem: {
    cursor: 'pointer',
  },
  breadcrumbLink: {
    color: '#9CA3AF',
  },
  breadcrumbCurrent: {
    color: '#111827',
    fontWeight: 500,
  },
  breadcrumbSep: {
    color: '#D1D5DB',
    margin: '0 8px',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: '1px solid #E5E7EB',
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  sortLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  sortSelect: {
    padding: '10px 36px 10px 14px',
    fontSize: 14,
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    backgroundColor: '#fff',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
  },
  content: {
    display: 'flex',
    gap: 48,
  },
  sidebar: {
    width: 200,
    flexShrink: 0,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: '#111827',
    letterSpacing: '0.5px',
    marginBottom: 10,
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    paddingBottom: 8,
    borderBottom: '1px solid #E5E7EB',
  },
  categoryBackArrow: {
    fontSize: 14,
    color: '#111827',
    cursor: 'pointer',
    fontWeight: 400,
  },
  categoryHeaderName: {
    fontSize: 12,
    fontWeight: 600,
    color: '#111827',
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
  },
  categoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 0',
    cursor: 'pointer',
  },
  categoryName: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: 400,
  },
  categoryRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  categoryCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  categoryArrow: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: 400,
  },
  noSubcategories: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  priceInputs: {
    display: 'flex',
    gap: 8,
  },
  priceInputWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  currencyPrefix: {
    padding: '6px 2px 6px 8px',
    fontSize: 12,
    color: '#9CA3AF',
  },
  priceInput: {
    flex: 1,
    padding: '6px 8px 6px 2px',
    fontSize: 12,
    border: 'none',
    outline: 'none',
    width: '100%',
  },
  colorList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  colorCircle: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    cursor: 'pointer',
    padding: 0,
  },
  productsSection: {
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    padding: 40,
  },
  noProducts: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    padding: 40,
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
  },
  productCard: {
    cursor: 'pointer',
  },
  productImageContainer: {
    position: 'relative',
    aspectRatio: '1',
    backgroundColor: '#F5EBE6',
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  noImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9CA3AF',
    fontSize: 14,
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: PRIMARY,
    color: '#fff',
    fontSize: 10,
    fontWeight: 600,
    padding: '5px 8px',
    borderRadius: 3,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#DC2626',
    color: '#fff',
    fontSize: 10,
    fontWeight: 600,
    padding: '5px 8px',
    borderRadius: 3,
  },
  productInfo: {},
  productRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  productName: {
    fontSize: 15,
    fontWeight: 600,
    color: '#111827',
    flex: 1,
    marginRight: 16,
  },
  productPrices: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 600,
    color: '#111827',
  },
  oldPrice: {
    fontSize: 13,
    color: '#9CA3AF',
    textDecoration: 'line-through',
  },
  productSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  productRating: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  stars: {
    color: '#111827',
    fontSize: 12,
    letterSpacing: 1,
  },
  reviewCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  pagination: {
    marginTop: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 16,
  },
  paginationInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  paginationButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  pageButton: {
    padding: '8px 14px',
    fontSize: 14,
    border: 'none',
    borderRadius: 8,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#374151',
  },
  pageButtonActive: {
    backgroundColor: '#111827',
    color: '#fff',
  },
  pageEllipsis: {
    padding: '8px 4px',
    color: '#6B7280',
  },
};

export default Shop;

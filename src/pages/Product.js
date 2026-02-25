import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import '../styles/responsive.css';

const PRIMARY = '#3D8B8B';

function Product({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const similarScrollRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollSimilar = (direction) => {
    if (similarScrollRef.current) {
      const scrollAmount = 200;
      similarScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Variants
  const [isSimple, setIsSimple] = useState(true);
  const [combos, setCombos] = useState([]);
  const [attrs, setAttrs] = useState({});
  const [selected, setSelected] = useState({});
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const [prodRes, reviewsRes] = await Promise.all([
        axios.get(`${API_URL}/products/${id}/`),
        axios.get(`${API_URL}/products/${id}/reviews/`).catch(() => ({ data: [] }))
      ]);
      const prodData = prodRes.data;
      setProduct(prodData);
      // Get reviews from API response (reviews field) or from product data
      const reviewsData = reviewsRes.data.reviews || reviewsRes.data.results || prodData.reviews || [];
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      fetchVariants(id, prodData);
      // Use main/root category for similar products
      if (prodData.category_id || prodData.category) {
        fetchSimilar(prodData.category_id || prodData.category, prodData.category_full_path);
      } else {
        // Fallback: fetch any products
        fetchSimilar(null, null);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVariants = async (pid, productData) => {
    try {
      const res = await axios.get(`${API_URL}/products/${pid}/combinations/`);
      if (res.data.success && !res.data.is_simple && res.data.combinations?.length) {
        setIsSimple(false);
        setCombos(res.data.combinations || []);
        const a = {};
        res.data.combinations.forEach(c => {
          Object.entries(c.attributes || {}).forEach(([code, data]) => {
            if (!a[code]) a[code] = { code, values: [] };
            if (!a[code].values.find(v => v.value_id === data.value_id)) {
              a[code].values.push(data);
            }
          });
        });
        setAttrs(a);
        const first = res.data.combinations[0];
        if (first) {
          const sel = {};
          Object.entries(first.attributes || {}).forEach(([code, data]) => {
            sel[code] = data.value_id;
          });
          setSelected(sel);
          setVariant(first);
        }
      } else {
        // Use product colors/sizes directly if no combinations
        buildAttrsFromProduct(productData);
      }
    } catch (e) {
      // Fallback to product colors/sizes
      buildAttrsFromProduct(productData);
    }
  };

  const buildAttrsFromProduct = (prod) => {
    if (!prod) return;
    const a = {};
    // Colors from product
    if (prod.colors && prod.colors.length > 0) {
      a.color = {
        code: 'color',
        values: prod.colors.map(c => ({
          value_id: c.id,
          value: c.name,
          display_value: c.name,
          hex_code: c.hex_code || c.color_code || '#888'
        }))
      };
    }
    // Sizes from product
    if (prod.sizes && prod.sizes.length > 0) {
      a.size = {
        code: 'size',
        values: prod.sizes.map(s => ({
          value_id: s.id,
          value: s.name,
          display_value: s.name
        }))
      };
    }
    if (Object.keys(a).length > 0) {
      setIsSimple(false);
      setAttrs(a);
      // Select first of each
      const sel = {};
      if (a.color?.values[0]) sel.color = a.color.values[0].value_id;
      if (a.size?.values[0]) sel.size = a.size.values[0].value_id;
      setSelected(sel);
    }
  };

  const fetchSimilar = async (categoryId, categoryFullPath) => {
    try {
      // Get root category from full path (e.g., "Одежда > Футболки" -> find "Одежда" ID)
      let rootCategoryId = categoryId;

      if (categoryFullPath) {
        const rootName = categoryFullPath.split(' > ')[0].trim();
        // Fetch categories to find root category ID
        try {
          const catRes = await axios.get(`${API_URL}/categories/`);
          const categories = catRes.data.results || catRes.data || [];
          const rootCat = categories.find(c => c.name === rootName);
          if (rootCat) {
            rootCategoryId = rootCat.id;
          }
        } catch (e) {}
      }

      const url = rootCategoryId
        ? `${API_URL}/products/?category=${rootCategoryId}&limit=12`
        : `${API_URL}/products/?limit=12`;
      const res = await axios.get(url);
      const data = res.data.results || res.data || [];
      setSimilarProducts(data.filter(p => p.id !== parseInt(id)).slice(0, 10));
    } catch (e) {
      console.error('Similar products error:', e);
    }
  };

  const selectAttr = (code, valueId) => {
    const newSel = { ...selected, [code]: valueId };
    setSelected(newSel);
    // Find matching combination if using combinations API
    if (combos.length > 0) {
      const match = combos.find(c =>
        Object.entries(newSel).every(([k, v]) => c.attributes[k]?.value_id === v)
      );
      setVariant(match || null);
    }
  };

  const isAvailable = (code, valueId) => {
    // If no combinations, all variants are available
    if (combos.length === 0) return true;
    const other = { ...selected };
    delete other[code];
    return combos.some(c => {
      const matchOther = Object.entries(other).every(([k, v]) => c.attributes[k]?.value_id === v);
      const matchThis = c.attributes[code]?.value_id === valueId;
      return matchOther && matchThis;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsAuthenticated(false);
    navigate('/');
  };

  const getImages = () => {
    if (!product) return [];
    const imgs = [];
    if (product.primary_image) imgs.push(product.primary_image);
    if (product.images?.length) {
      product.images.forEach(i => {
        const url = i.image_url || i.image || i.url;
        if (url && url !== product.primary_image) imgs.push(url);
      });
    }
    return imgs.length > 0 ? imgs : [null];
  };

  const images = getImages();
  const formatPrice = (p) => p ? Number(p).toLocaleString('ru-RU') : '0';

  if (loading) {
    return <div style={styles.page}><div style={styles.loading}>Загрузка...</div></div>;
  }

  if (!product) {
    return <div style={styles.page}><div style={styles.loading}>Товар не найден</div></div>;
  }

  // Use variant prices if variant is selected, otherwise use product prices
  const activePrice = variant ? variant.price : (product.discount_price || product.retail_price || product.price || 0);
  const retailPrice = variant ? variant.price : (product.discount_price || product.retail_price || product.price || 0);
  const originalPrice = variant ? (variant.original_price || variant.price) : (product.retail_price || product.price || 0);
  const wholesalePrice = variant ? (variant.wholesale_price || product.wholesale_price || 0) : (product.wholesale_price || 0);
  const hasDiscount = !variant && product.discount_price && product.retail_price && product.discount_price < product.retail_price;
  const discountPercent = hasDiscount ? Math.round((1 - product.discount_price / product.retail_price) * 100) : 0;
  const avgRating = parseFloat(product.avg_rating || 0).toFixed(1);
  const reviewCount = product.reviews_count || reviews.length || 0;
  const inStock = variant ? variant.in_stock : (product.quantity === null || product.quantity === undefined || product.quantity > 0);
  const stockQty = variant ? variant.quantity : product.quantity;

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div className="header-content" style={styles.headerContent}>
          <div className="header-logo" style={styles.logo} onClick={() => navigate('/')}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill={PRIMARY} />
              <text x="16" y="22" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">R</text>
            </svg>
            <span style={styles.logoText}>RENEXPRESS</span>
          </div>
          <div className="header-search" style={styles.searchContainer}>
            <input type="text" placeholder="Поиск..." style={styles.searchInput} />
          </div>
          <nav className="header-nav" style={styles.nav}>
            <a href="/" style={styles.navLink}>Главная</a>
            <a href="/shop" style={styles.navLink}>Каталог</a>
          </nav>
          <div className="header-icons" style={styles.headerRight}>
            {isAuthenticated ? (
              <button onClick={handleLogout} style={styles.iconBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            ) : (
              <button onClick={() => navigate('/login')} style={styles.signInBtn}>Войти</button>
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
            <a href="/shop">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
              </svg>
              Каталог
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

      <main className="product-detail-container" style={styles.main}>
        {/* Breadcrumb */}
        <div style={styles.breadcrumb}>
          <span style={styles.crumbLink} onClick={() => navigate('/')}>Главная</span>
          <span style={styles.crumbSep}>/</span>
          <span style={styles.crumbLink} onClick={() => navigate('/shop')}>Каталог</span>
          {product.category_name && (
            <>
              <span style={styles.crumbSep}>/</span>
              <span style={styles.crumbLink}>{product.category_name}</span>
            </>
          )}
        </div>

        {/* Product Grid */}
        <div className="product-detail-grid" style={styles.productGrid}>
          {/* Left - Images */}
          <div style={styles.imagesCol}>
            <div className="product-gallery" style={styles.mainImage}>
              {images[selectedImage] ? (
                <img src={images[selectedImage]} alt="" style={styles.mainImg} />
              ) : (
                <div style={styles.noImg}>Нет фото</div>
              )}
            </div>
            <div style={styles.thumbs}>
              {images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.thumb,
                    border: selectedImage === i ? `2px solid ${PRIMARY}` : '2px solid transparent',
                    borderRadius: 6
                  }}
                  onClick={() => setSelectedImage(i)}
                >
                  {img ? (
                    <img src={img} alt="" style={styles.thumbImg} />
                  ) : (
                    <div style={styles.thumbNo}>Нет</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Info */}
          <div style={styles.infoCol}>
            <h1 className="product-detail-title" style={styles.name}>{product.name}</h1>

            {/* Rating */}
            <div style={styles.ratingRow}>
              <span style={styles.stars}>{'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}</span>
              <span style={styles.ratingNum}>{avgRating}</span>
              <span style={styles.reviewCount}>{reviewCount} отзывов</span>
            </div>

            {/* White Block with all info */}
            <div style={styles.whiteBlock}>
              {/* Price and Stock Row */}
              <div style={styles.priceStockRow}>
                <div style={styles.pricesCol}>
                  {/* Retail Price */}
                  <div style={styles.priceGroup}>
                    <span style={styles.priceLabel}>Розница:</span>
                    <div style={styles.priceRow}>
                      <span style={styles.priceMain}>{formatPrice(retailPrice)} ₽</span>
                      {hasDiscount && (
                        <>
                          <span style={styles.priceOld}>{formatPrice(originalPrice)} ₽</span>
                          <span style={styles.discountBadge}>-{discountPercent}%</span>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Wholesale Price */}
                  {wholesalePrice > 0 && (
                    <div style={styles.priceGroup}>
                      <span style={styles.priceLabel}>Оптом:</span>
                      <span style={styles.priceMain}>{formatPrice(wholesalePrice)} ₽</span>
                    </div>
                  )}
                </div>
                {/* Stock Status */}
                <div style={{
                  ...styles.stockBadge,
                  backgroundColor: inStock ? '#DCFCE7' : '#FEE2E2',
                  color: inStock ? '#16A34A' : '#DC2626'
                }}>
                  {inStock ? (stockQty ? `В наличии: ${stockQty} шт` : 'В наличии') : 'Нет в наличии'}
                </div>
              </div>

              {/* Variants - Colors */}
              {!isSimple && attrs.color && (
                <div style={styles.variantSection}>
                  <span style={styles.variantLabel}>Цвет: <strong>{attrs.color.values.find(v => v.value_id === selected.color)?.display_value || attrs.color.values.find(v => v.value_id === selected.color)?.value || ''}</strong></span>
                  <div style={styles.colorRow}>
                    {attrs.color.values.map(v => {
                      const sel = selected.color === v.value_id;
                      const avail = isAvailable('color', v.value_id);
                      return (
                        <div
                          key={v.value_id}
                          style={{
                            ...styles.colorCircle,
                            backgroundColor: v.hex_code || '#888',
                            border: sel ? `3px solid ${PRIMARY}` : '2px solid #E5E7EB',
                            opacity: avail ? 1 : 0.5,
                            cursor: 'pointer',
                            boxShadow: sel ? '0 0 0 2px #fff, 0 0 0 4px ' + PRIMARY : 'none',
                            transform: sel ? 'scale(1.1)' : 'scale(1)',
                            transition: 'all 0.15s ease'
                          }}
                          onClick={() => selectAttr('color', v.value_id)}
                          title={v.display_value || v.value}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Variants - Sizes */}
              {!isSimple && Object.entries(attrs).filter(([code]) => code !== 'color').map(([code, attr]) => (
                <div key={code} style={styles.variantSection}>
                  <span style={styles.variantLabel}>{code === 'size' ? 'Размер' : code}: <strong>{attr.values.find(v => v.value_id === selected[code])?.display_value || attr.values.find(v => v.value_id === selected[code])?.value || ''}</strong></span>
                  <div style={styles.sizeRow}>
                    {attr.values.map(v => {
                      const sel = selected[code] === v.value_id;
                      const avail = isAvailable(code, v.value_id);
                      return (
                        <div
                          key={v.value_id}
                          style={{
                            ...styles.sizeChip,
                            backgroundColor: sel ? PRIMARY : '#fff',
                            color: sel ? '#fff' : '#111',
                            borderColor: sel ? PRIMARY : '#E5E7EB',
                            opacity: avail ? 1 : 0.5,
                            cursor: 'pointer',
                            fontWeight: sel ? 600 : 500,
                            transition: 'all 0.15s ease'
                          }}
                          onClick={() => selectAttr(code, v.value_id)}
                        >
                          {v.display_value || v.value}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity + Retail Button in one row */}
              <div style={styles.qtyBtnRow}>
                <div style={styles.qtyControls}>
                  <button style={styles.qtyBtn} onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                  <span style={styles.qtyValue}>{quantity}</span>
                  <button style={styles.qtyBtn} onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
                <button
                  style={styles.buyRetailBtn}
                  onClick={() => !isAuthenticated && navigate('/login')}
                >
                  Купить в розницу — {formatPrice(retailPrice * quantity)} ₽
                </button>
              </div>

              {/* Wholesale Button - full width */}
              {wholesalePrice > 0 && (
                <button
                  style={styles.buyWholesaleBtn}
                  onClick={() => !isAuthenticated && navigate('/login')}
                >
                  Купить оптом — {formatPrice(wholesalePrice * quantity)} ₽
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description & Characteristics */}
        <div className="product-details-row" style={styles.detailsRow}>
          {/* Left Column - Description + Similar Products */}
          <div style={styles.descCol}>
            {/* Description Block */}
            <div className="product-desc-block" style={styles.descBlock}>
              <h3 style={styles.sectionTitle}>Описание</h3>
              <p style={styles.descText}>{product.description || 'Описание отсутствует.'}</p>
            </div>

            {/* Similar Products - Under Description */}
            <div className="similar-section" style={styles.similarSection}>
              <div style={styles.similarHeader}>
                <h3 style={{...styles.sectionTitle, marginBottom: 0}}>Похожие товары</h3>
                <div style={styles.scrollBtns}>
                  <button style={styles.scrollBtn} onClick={() => scrollSimilar('left')}>‹</button>
                  <button style={styles.scrollBtn} onClick={() => scrollSimilar('right')}>›</button>
                </div>
              </div>
              <div className="similar-products-grid" style={styles.similarScroll} ref={similarScrollRef}>
                {similarProducts.length > 0 ? (
                  similarProducts.map(p => (
                    <div key={p.id} style={styles.simCard} onClick={() => navigate(`/product/${p.id}`)}>
                      <div style={styles.simImg}>
                        {p.primary_image ? <img src={p.primary_image} alt="" style={styles.simImage} /> : <div style={styles.simNo}>Нет фото</div>}
                      </div>
                      <div style={styles.simName}>{p.name}</div>
                      <div style={styles.simPrice}>{formatPrice(p.retail_price || p.price)} ₽</div>
                    </div>
                  ))
                ) : (
                  <div style={{color: '#9CA3AF', fontSize: 11}}>Нет похожих товаров</div>
                )}
              </div>
            </div>
          </div>

          {/* Characteristics Block */}
          <div className="product-char-block" style={styles.charBlock}>
            <h3 style={styles.sectionTitle}>Характеристики</h3>
            {product.characteristics_list && product.characteristics_list.length > 0 ? (
              product.characteristics_list.map((char, i) => (
                <div key={i} style={styles.charRow}>
                  <span style={styles.charLabel}>{char.name}</span>
                  <span style={styles.charDots}></span>
                  <span style={styles.charValue}>{char.value}</span>
                </div>
              ))
            ) : (
              <>
                {product.brand_name && <div style={styles.charRow}><span style={styles.charLabel}>Бренд</span><span style={styles.charDots}></span><span style={styles.charValue}>{product.brand_name}</span></div>}
                {product.category_name && <div style={styles.charRow}><span style={styles.charLabel}>Категория</span><span style={styles.charDots}></span><span style={styles.charValue}>{product.category_name}</span></div>}
                {product.weight && <div style={styles.charRow}><span style={styles.charLabel}>Вес</span><span style={styles.charDots}></span><span style={styles.charValue}>{product.weight} {product.weight_unit || 'кг'}</span></div>}
                {product.sku && <div style={styles.charRow}><span style={styles.charLabel}>Артикул</span><span style={styles.charDots}></span><span style={styles.charValue}>{product.sku}</span></div>}
              </>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="reviews-section" style={styles.reviewsSection}>
          <h2 style={styles.reviewsTitle}>Отзывы покупателей</h2>

          {/* Rating Summary Row - Rating on left, Bars on right */}
          <div style={styles.ratingSummaryRow}>
            <div style={styles.ratingLeft}>
              <div style={styles.bigRating}>{avgRating}</div>
              <div style={styles.bigStars}>{'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}</div>
              <div style={styles.basedOn}>на основе {reviewCount} отзывов</div>
            </div>
            <div style={styles.ratingBars}>
              {[5, 4, 3, 2, 1].map(star => {
                const count = reviews.filter(r => Math.round(parseFloat(r.rating) || 0) === star).length;
                const totalReviews = reviews.length;
                const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                return (
                  <div key={star} style={styles.ratingBarRow}>
                    <span style={styles.barLabel}>{star}</span>
                    <div style={styles.barTrack}>
                      <div style={{...styles.barFill, width: `${percent}%`}}></div>
                    </div>
                    <span style={styles.barPercent}>{percent}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews Grid - Below */}
          {reviews.length > 0 ? (
            <div style={styles.reviewsGrid}>
              {(showAllReviews ? reviews : reviews.slice(0, 4)).map((r, i) => (
                <div key={i} style={styles.reviewCard}>
                  <div style={styles.reviewHeader}>
                    <div style={styles.avatar}>{(r.client_name || 'К')[0]}</div>
                    <div style={styles.reviewInfo}>
                      <div style={styles.reviewerName}>{r.client_name || 'Клиент'}</div>
                      <div style={styles.reviewStars}>{'★'.repeat(Math.round(parseFloat(r.rating) || 0))}{'☆'.repeat(5 - Math.round(parseFloat(r.rating) || 0))}</div>
                    </div>
                    <div style={styles.reviewDate}>{new Date(r.created_at).toLocaleDateString('ru-RU')}</div>
                  </div>
                  <p style={styles.reviewText}>{r.comment || r.text || 'Отличный товар!'}</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.noReviews}>Отзывов пока нет</div>
          )}
          {reviews.length > 4 && !showAllReviews && (
            <button style={styles.loadMoreBtn} onClick={() => setShowAllReviews(true)}>
              Загрузить ещё отзывы
            </button>
          )}
        </div>

      </main>

      {/* Mobile Sticky Cart Bar */}
      <div className="sticky-cart-bar">
        <div className="price">
          {formatPrice(retailPrice)} ₽
        </div>
        <button>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 8}}>
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          В корзину
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#F5F5F5', fontFamily: 'Inter, sans-serif' },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#6B7280', fontSize: 13 },
  header: { backgroundColor: '#fff', borderBottom: '1px solid #E5E7EB', padding: '8px 0', position: 'sticky', top: 0, zIndex: 100 },
  headerContent: { padding: '0 16px', display: 'flex', alignItems: 'center', gap: 16 },
  logo: { display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' },
  logoText: { fontSize: 13, fontWeight: 700, color: '#111' },
  searchContainer: { width: 240, margin: '0 auto' },
  searchInput: { width: '100%', padding: '5px 10px', fontSize: 11, border: '1px solid #E5E7EB', borderRadius: 4, outline: 'none' },
  nav: { display: 'flex', gap: 12 },
  navLink: { fontSize: 11, color: '#374151', textDecoration: 'none' },
  headerRight: { display: 'flex', alignItems: 'center', gap: 8 },
  iconBtn: { width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' },
  mobileMenuBtn: { display: 'none', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', borderRadius: 8, cursor: 'pointer' },
  signInBtn: { padding: '5px 12px', backgroundColor: PRIMARY, color: '#fff', border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: 'pointer' },
  main: { maxWidth: 900, margin: '0 auto', padding: '12px' },
  breadcrumb: { fontSize: 9, marginBottom: 10, color: '#9CA3AF' },
  crumbLink: { cursor: 'pointer' },
  crumbSep: { margin: '0 4px', color: '#D1D5DB' },
  productGrid: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, marginBottom: 20 },
  imagesCol: {},
  mainImage: { width: '100%', aspectRatio: '1', backgroundColor: '#fff', borderRadius: 6, overflow: 'hidden', marginBottom: 6 },
  mainImg: { width: '100%', height: '100%', objectFit: 'cover' },
  noImg: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: 12 },
  thumbs: { display: 'flex', gap: 4 },
  thumb: { width: 44, height: 44, overflow: 'hidden', cursor: 'pointer', backgroundColor: '#fff' },
  thumbImg: { width: '100%', height: '100%', objectFit: 'cover' },
  thumbNo: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 8 },
  infoCol: {},
  name: { fontSize: 16, fontWeight: 600, color: '#111', marginBottom: 6, lineHeight: 1.3 },
  ratingRow: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 },
  stars: { color: '#F59E0B', fontSize: 11 },
  ratingNum: { fontSize: 11, fontWeight: 600, color: '#111' },
  reviewCount: { fontSize: 10, color: '#6B7280' },
  whiteBlock: { backgroundColor: '#fff', borderRadius: 8, padding: 12 },
  priceStockRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #F0F0F0' },
  pricesCol: {},
  priceGroup: { marginBottom: 6 },
  priceLabel: { fontSize: 10, color: '#6B7280', marginRight: 6 },
  priceRow: { display: 'inline-flex', alignItems: 'center', gap: 6 },
  priceMain: { fontSize: 18, fontWeight: 700, color: '#111' },
  priceOld: { fontSize: 12, color: '#9CA3AF', textDecoration: 'line-through' },
  discountBadge: { backgroundColor: '#FEE2E2', color: '#DC2626', fontSize: 9, fontWeight: 600, padding: '2px 5px', borderRadius: 3 },
  stockBadge: { fontSize: 10, fontWeight: 500, padding: '4px 8px', borderRadius: 4 },
  variantSection: { marginBottom: 12 },
  variantLabel: { fontSize: 11, color: '#6B7280', display: 'block', marginBottom: 6 },
  colorRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  colorCircle: { width: 28, height: 28, borderRadius: 14 },
  sizeRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  sizeChip: { padding: '6px 14px', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 11, fontWeight: 500 },
  qtyBtnRow: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 },
  qtyControls: { display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: 4, backgroundColor: '#fff' },
  qtyBtn: { width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', fontSize: 13, cursor: 'pointer' },
  qtyValue: { width: 28, textAlign: 'center', fontSize: 11, fontWeight: 600 },
  buyRetailBtn: { flex: 1, padding: '8px 12px', backgroundColor: PRIMARY, color: '#fff', border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: 'pointer' },
  buyWholesaleBtn: { width: '100%', padding: '8px 12px', backgroundColor: '#6B7280', color: '#fff', border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: 'pointer' },
  detailsRow: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12, marginBottom: 20, alignItems: 'start' },
  descCol: { display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden', minWidth: 0 },
  descBlock: { backgroundColor: '#fff', borderRadius: 6, padding: 12 },
  charBlock: { backgroundColor: '#F9FAFB', borderRadius: 6, padding: 12 },
  sectionTitle: { fontSize: 12, fontWeight: 600, color: '#111', marginBottom: 8 },
  descText: { fontSize: 11, color: '#4B5563', lineHeight: 1.5 },
  charRow: { display: 'flex', alignItems: 'baseline', padding: '8px 0', borderBottom: '1px solid #F3F4F6' },
  charLabel: { fontSize: 11, color: '#6B7280', flexShrink: 0, minWidth: 80 },
  charDots: { flex: 1, borderBottom: '1px dotted #D1D5DB', margin: '0 8px', height: 1, alignSelf: 'center' },
  charValue: { fontSize: 11, color: '#111', fontWeight: 600, textAlign: 'right', flexShrink: 0, maxWidth: '50%' },
  reviewsSection: { marginBottom: 20 },
  reviewsTitle: { fontSize: 18, fontWeight: 600, color: '#111', marginBottom: 20 },
  ratingSummaryRow: { display: 'flex', gap: 24, marginBottom: 20 },
  ratingLeft: {},
  bigRating: { fontSize: 42, fontWeight: 700, color: '#111', lineHeight: 1 },
  bigStars: { color: '#F59E0B', fontSize: 14, marginBottom: 4 },
  basedOn: { fontSize: 11, color: '#6B7280', textDecoration: 'underline', cursor: 'pointer' },
  ratingBars: { display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' },
  ratingBarRow: { display: 'flex', alignItems: 'center', gap: 8 },
  barLabel: { fontSize: 12, color: '#6B7280', width: 12 },
  barTrack: { width: 120, height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#3B82F6', borderRadius: 4 },
  barPercent: { fontSize: 12, color: '#6B7280', width: 36, textAlign: 'right' },
  reviewsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 },
  reviewCard: { backgroundColor: '#F9FAFB', borderRadius: 8, padding: 14 },
  reviewHeader: { display: 'flex', alignItems: 'flex-start', marginBottom: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E5E7EB', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, marginRight: 10 },
  reviewInfo: { flex: 1 },
  reviewerName: { fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 },
  reviewStars: { color: '#F59E0B', fontSize: 11 },
  reviewDate: { fontSize: 11, color: '#9CA3AF' },
  reviewText: { fontSize: 12, color: '#4B5563', lineHeight: 1.5, margin: 0 },
  noReviews: { fontSize: 12, color: '#9CA3AF', textAlign: 'center', padding: 30, backgroundColor: '#F9FAFB', borderRadius: 8 },
  loadMoreBtn: { marginTop: 12, padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 12, color: '#374151', cursor: 'pointer', fontWeight: 500 },
  similarSection: { backgroundColor: '#fff', borderRadius: 6, padding: 12, border: '1px solid #E5E7EB', overflow: 'hidden' },
  similarHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  scrollBtns: { display: 'flex', gap: 4 },
  scrollBtn: { width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', border: 'none', borderRadius: 4, fontSize: 16, color: '#374151', cursor: 'pointer' },
  similarScroll: { display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: 4 },
  simCard: { cursor: 'pointer', flexShrink: 0, width: 120 },
  simImg: { width: 120, height: 120, backgroundColor: '#F9FAFB', borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  simImage: { width: '100%', height: '100%', objectFit: 'cover' },
  simNo: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: 9 },
  simName: { fontSize: 10, color: '#111', marginBottom: 2, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' },
  simPrice: { fontSize: 11, fontWeight: 600, color: PRIMARY },
};

export default Product;

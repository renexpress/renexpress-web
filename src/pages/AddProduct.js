import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';

const PRIMARY = '#3D8B8B';
const PRIMARY_LIGHT = '#E8F5F5';

function AddProduct({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const isEditMode = !!productId;
  const client = JSON.parse(localStorage.getItem('client') || '{}');

  // Product data for edit mode
  const [productData, setProductData] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(isEditMode);

  // Check if editing is allowed (only for active, rejected, or deleted products)
  const canEdit = !isEditMode || !productData || productData.product_status === 'active' || productData.product_status === 'rejected' || productData.product_status === 'deleted';

  // Avatar & logout
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const avatarRef = useRef(null);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [characteristicsList, setCharacteristicsList] = useState([{ name: '', value: '' }]);
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Price & Stock
  const [retailPrice, setRetailPrice] = useState('');
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [discountPrice, setDiscountPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  // Variants - CRM style
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [variantOptions, setVariantOptions] = useState([{ name: '', values: [''] }]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [savedVariants, setSavedVariants] = useState([]);

  const availableColors = [
    { name: 'Красный', hex: '#e53935' }, { name: 'Розовый', hex: '#ec407a' }, { name: 'Фиолетовый', hex: '#ab47bc' },
    { name: 'Синий', hex: '#1e88e5' }, { name: 'Голубой', hex: '#29b6f6' }, { name: 'Бирюзовый', hex: '#26a69a' },
    { name: 'Зелёный', hex: '#66bb6a' }, { name: 'Жёлтый', hex: '#ffee58' }, { name: 'Оранжевый', hex: '#ffa726' },
    { name: 'Коричневый', hex: '#8d6e63' }, { name: 'Серый', hex: '#bdbdbd' }, { name: 'Чёрный', hex: '#212121' }, { name: 'Белый', hex: '#fafafa' },
  ];

  // Category state
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryPath, setCategoryPath] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState('');

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }
    fetchCategories();
    if (isEditMode && productId) fetchProduct();
    const handleClickOutside = (e) => { if (avatarRef.current && !avatarRef.current.contains(e.target)) setShowAvatarMenu(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAuthenticated, productId]);

  const fetchProduct = async () => {
    setLoadingProduct(true);
    try {
      const url = `${API_URL}/products/${productId}/`;
      const res = await fetch(url);

      if (!res.ok) {
        const text = await res.text();
        setError(`Ошибка ${res.status}: ${text}`);
        setLoadingProduct(false);
        return;
      }

      const product = await res.json();
      setProductData(product);

      // Fill form with product data
      setName(product.name || '');
      setDescription(product.description || '');
      setRetailPrice(product.retail_price || product.price || '');
      setDiscountPrice(product.discount_price || '');
      setDiscountEnabled(!!product.discount_price);
      setStockQuantity(product.stock_quantity || product.quantity || '');

      // Characteristics
      if (Array.isArray(product.characteristics_list) && product.characteristics_list.length > 0) {
        setCharacteristicsList(product.characteristics_list.map(c => ({ name: c.name || '', value: c.value || '' })));
      } else if (Array.isArray(product.characteristics) && product.characteristics.length > 0) {
        setCharacteristicsList(product.characteristics.map(c => ({ name: c.name || '', value: c.value || '' })));
      } else if (Array.isArray(product.characteristics_data) && product.characteristics_data.length > 0) {
        setCharacteristicsList(product.characteristics_data.map(c => ({ name: c.name || '', value: c.value || '' })));
      }

      // Images
      const loadedImages = [];
      if (Array.isArray(product.images) && product.images.length > 0) {
        product.images.forEach(img => {
          const imgUrl = typeof img === 'string' ? img : (img.image_url || img.image || img.url);
          if (imgUrl) loadedImages.push({ url: imgUrl, preview: imgUrl });
        });
      }
      if (product.primary_image && !loadedImages.find(i => i.url === product.primary_image)) {
        loadedImages.unshift({ url: product.primary_image, preview: product.primary_image });
      }
      if (product.image_url && !loadedImages.find(i => i.url === product.image_url)) {
        loadedImages.push({ url: product.image_url, preview: product.image_url });
      }
      if (loadedImages.length > 0) {
        setImages(loadedImages);
      }

      // Variants
      if (product.variant_options && product.variant_options.length > 0) {
        setSavedVariants(product.variant_options);
      }

      // Category - will be set after categories are loaded
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Ошибка загрузки товара: ' + err.message);
    } finally {
      setLoadingProduct(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories/`);
      const cats = Array.isArray(response.data) ? response.data : response.data.results || [];
      setCategories(cats);
      setAllCategories(buildFlatCategories(cats));
      setCurrentCategories(cats.filter(c => !c.parent_id && !c.parent));
    } catch (error) { console.error('Error fetching categories:', error); }
  };

  // Set category when editing and categories are loaded
  useEffect(() => {
    if (productData && allCategories.length > 0) {
      const catId = productData.category_id || productData.category;
      if (catId) {
        const cat = allCategories.find(c => c.id === catId);
        if (cat) setSelectedCategory(cat);
      }
    }
  }, [productData, allCategories]);

  // Delete product
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.post(`${API_URL}/products/${productId}/delete_product/`);
      setShowDeleteConfirm(false);
      navigate('/my-products');
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Ошибка удаления товара');
    } finally {
      setDeleting(false);
    }
  };

  // Refresh/Resubmit deleted product
  const handleRefresh = async () => {
    if (!name.trim()) { setError('Введите название товара'); return; }
    if (!retailPrice) { setError('Укажите цену товара'); return; }
    setSaving(true); setError(null);
    try {
      const imageUrls = await uploadImages();
      const chars = characteristicsList.filter(c => c.name.trim() && c.value.trim()).map(c => ({ name: c.name.trim(), value: c.value.trim() }));
      const updateData = {
        product_id: parseInt(productId),
        client_id: client.id,
        name: name.trim(), description: description.trim() || '',
        characteristics_data: chars,
        category: selectedCategory?.id || null,
        retail_price: parseFloat(retailPrice),
        discount_price: discountEnabled && discountPrice ? parseFloat(discountPrice) : null,
        stock_quantity: stockQuantity ? parseInt(stockQuantity) : 0,
        image_urls: imageUrls, variant_options: savedVariants
      };
      const res = await fetch(`${API_URL}/products/update_submit/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      if (!res.ok) {
        const text = await res.text();
        setError(`Ошибка: ${text}`);
        return;
      }
      navigate('/my-products');
    } catch (e) { setError('Ошибка: ' + (e.response?.data?.message || e.message)); } finally { setSaving(false); }
  };

  const buildFlatCategories = (cats) => {
    const result = [];
    const process = (cat, path) => {
      const fullPath = path ? `${path} > ${cat.name}` : cat.name;
      result.push({ id: cat.id, name: cat.name, fullPath, searchText: fullPath.toLowerCase(), parent_id: cat.parent_id, children: cat.children });
      cat.children?.forEach(child => process(child, fullPath));
    };
    cats.forEach(cat => { if (!cat.parent_id && !cat.parent) process(cat, ''); });
    return result;
  };

  const getFilteredCategories = () => categorySearch.trim() ? allCategories.filter(c => c.searchText.includes(categorySearch.toLowerCase())).slice(0, 50) : null;
  const getChildCategories = (parentId) => categories.filter(c => c.parent_id === parentId || c.parent === parentId).length > 0 ? categories.filter(c => c.parent_id === parentId || c.parent === parentId) : categories.find(c => c.id === parentId)?.children || [];
  const hasSubcategories = (cat) => cat.children?.length > 0 || categories.some(c => c.parent_id === cat.id || c.parent === cat.id);

  const handleCategoryClick = (cat) => {
    if (hasSubcategories(cat)) {
      setCategoryPath(prev => [...prev, cat]);
      setCurrentCategories(getChildCategories(cat.id));
    } else {
      setSelectedCategory(cat);
      setCategoryOpen(false);
      setCategoryPath([]);
    }
  };

  const handleCategoryBack = () => {
    const newPath = categoryPath.slice(0, -1);
    setCategoryPath(newPath);
    setCurrentCategories(newPath.length === 0 ? categories.filter(c => !c.parent_id && !c.parent) : getChildCategories(newPath[newPath.length - 1].id));
  };

  // Characteristics
  const addCharacteristic = () => setCharacteristicsList([...characteristicsList, { name: '', value: '' }]);
  const removeCharacteristic = (i) => setCharacteristicsList(characteristicsList.filter((_, idx) => idx !== i).length ? characteristicsList.filter((_, idx) => idx !== i) : [{ name: '', value: '' }]);
  const updateCharName = (i, v) => { const n = [...characteristicsList]; n[i].name = v; setCharacteristicsList(n); };
  const updateCharValue = (i, v) => { const n = [...characteristicsList]; n[i].value = v; setCharacteristicsList(n); };

  // Images
  const handleImageUpload = (e) => setImages(prev => [...prev, ...Array.from(e.target.files).map(file => ({ file, preview: URL.createObjectURL(file) }))]);
  const removeImage = (i) => setImages(prev => prev.filter((_, idx) => idx !== i));

  // Variant functions - CRM style
  const updateOptionName = (i, v) => { const n = [...variantOptions]; n[i].name = v; setVariantOptions(n); };
  const updateOptionValue = (optIdx, valIdx, v) => { const n = [...variantOptions]; n[optIdx].values[valIdx] = v; setVariantOptions(n); };
  const addOptionValue = (i) => { const n = [...variantOptions]; n[i].values.push(''); setVariantOptions(n); };
  const removeOptionValue = (optIdx, valIdx) => { const n = [...variantOptions]; n[optIdx].values = n[optIdx].values.filter((_, i) => i !== valIdx); if (n[optIdx].values.length === 0) n[optIdx].values = ['']; setVariantOptions(n); };
  const addVariantOption = () => setVariantOptions([...variantOptions, { name: '', values: [''] }]);
  const removeVariantOption = (i) => setVariantOptions(variantOptions.filter((_, idx) => idx !== i).length ? variantOptions.filter((_, idx) => idx !== i) : [{ name: '', values: [''] }]);
  const toggleColor = (color) => setSelectedColors(prev => prev.find(c => c.hex === color.hex) ? prev.filter(c => c.hex !== color.hex) : [...prev, color]);

  const saveVariants = () => {
    const variants = [];
    variantOptions.forEach(opt => { if (opt.name.trim() && opt.values.some(v => v.trim())) variants.push({ name: opt.name.trim(), values: opt.values.filter(v => v.trim()) }); });
    if (selectedColors.length > 0) variants.push({ name: 'Цвет', values: selectedColors.map(c => c.name), colors: selectedColors });
    setSavedVariants(variants);
    setShowVariantForm(false);
  };

  const editVariants = () => {
    setVariantOptions(savedVariants.filter(v => !v.colors).length > 0 ? savedVariants.filter(v => !v.colors).map(v => ({ name: v.name, values: v.values })) : [{ name: '', values: [''] }]);
    setSelectedColors(savedVariants.find(v => v.colors)?.colors || []);
    setShowVariantForm(true);
  };

  // Upload & Submit
  const uploadImages = async () => {
    const urls = [];
    for (const img of images) {
      if (img.url) urls.push(img.url);
      else if (img.file) {
        const fd = new FormData(); fd.append('image', img.file);
        try { const r = await axios.post(`${API_URL}/upload/`, fd); if (r.data.url) urls.push(r.data.url); } catch (e) { console.error(e); }
      }
    }
    return urls;
  };

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Введите название товара'); return; }
    if (!retailPrice) { setError('Укажите цену товара'); return; }
    setSaving(true); setError(null);
    try {
      const imageUrls = await uploadImages();
      const chars = characteristicsList.filter(c => c.name.trim() && c.value.trim()).map(c => ({ name: c.name.trim(), value: c.value.trim() }));
      const submitData = {
        name: name.trim(), description: description.trim() || '',
        characteristics_data: chars,
        category: selectedCategory?.id || null,
        retail_price: parseFloat(retailPrice),
        discount_price: discountEnabled && discountPrice ? parseFloat(discountPrice) : null,
        stock_quantity: stockQuantity ? parseInt(stockQuantity) : 0,
        image_urls: imageUrls, variant_options: savedVariants, client_id: client.id,
      };

      if (isEditMode) {
        // Update existing product using update_submit endpoint
        submitData.product_id = parseInt(productId);
        submitData.client_id = client.id;

        const res = await fetch(`${API_URL}/products/update_submit/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData)
        });

        if (!res.ok) {
          const text = await res.text();
          setError(`Ошибка ${res.status}: ${text}`);
          return;
        }
        navigate('/my-products');
      } else {
        // Create new product
        const r = await axios.post(`${API_URL}/products/submit/`, submitData);
        if (r.data.success || r.status === 201) navigate('/my-products');
        else setError(r.data.message || 'Ошибка');
      }
    } catch (e) {
      console.error('Submit error:', e);
      setError('Ошибка: ' + (e.response?.data?.message || e.response?.data?.error || JSON.stringify(e.response?.data) || e.message));
    } finally { setSaving(false); }
  };

  const handleLogout = () => { localStorage.removeItem('client'); setIsAuthenticated(false); navigate('/login'); };
  const filteredCats = getFilteredCategories();

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill={PRIMARY}/><text x="16" y="21" fontSize="16" fontWeight="700" fill="#fff" textAnchor="middle">R</text></svg>
          <div><div style={styles.logoTitle}>RENEXPRESS</div><div style={styles.logoSubtitle}>SELLER CENTER</div></div>
        </div>
        <div style={styles.menuSection}>
          <div style={styles.menuLabel}>MAIN MENU</div>
          <nav style={styles.sidebarNav}>
            <a href="/my-products" style={{...styles.menuItem, ...styles.menuItemActive}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>Товары</a>
            <a href="#" style={styles.menuItem}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>Заказы</a>
            <a href="/analytics" style={styles.menuItem}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/></svg>Аналитика</a>
          </nav>
        </div>
      </aside>

      <div style={styles.mainWrapper}>
        {/* Top Bar */}
        <div style={styles.topBar}>
          <div style={styles.breadcrumb}>
            <span style={styles.breadcrumbLink} onClick={() => navigate('/')}>Главная</span>
            <span style={styles.breadcrumbSep}>/</span>
            <span style={styles.breadcrumbLink} onClick={() => navigate('/my-products')}>Товары</span>
            <span style={styles.breadcrumbSep}>/</span>
            <span style={styles.breadcrumbCurrent}>{isEditMode ? 'Редактирование' : 'Новый товар'}</span>
          </div>
          <div style={styles.avatarWrapper} ref={avatarRef}>
            <div style={styles.avatar} onClick={() => setShowAvatarMenu(!showAvatarMenu)}>{client.full_name?.[0]?.toUpperCase() || 'U'}</div>
            {showAvatarMenu && (
              <div style={styles.avatarMenu}>
                <div style={styles.avatarMenuHeader}><div style={styles.avatarMenuName}>{client.full_name || 'Пользователь'}</div><div style={styles.avatarMenuId}>ID: {client.id}</div></div>
                <div style={styles.avatarMenuDivider}></div>
                <div style={styles.avatarMenuItem} onClick={() => { setShowAvatarMenu(false); setShowLogoutConfirm(true); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Выйти
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={styles.contentContainer}>
          <div style={styles.contentCard}>
            {loadingProduct ? (
              <div style={styles.loadingState}>Загрузка...</div>
            ) : (
              <>
            <div style={styles.cardHeader}>
              <h1 style={styles.pageTitle}>{isEditMode ? 'Редактировать товар' : 'Добавить товар'}</h1>
              {isEditMode && productData?.product_status !== 'deleted' && (
                <button style={styles.deleteBtn2} onClick={() => setShowDeleteConfirm(true)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  Удалить
                </button>
              )}
            </div>
            {productData?.product_status === 'deleted' && (
              <div style={styles.deletedBanner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>Этот товар удалён. Вы можете отредактировать информацию и отправить его на повторную проверку.</span>
              </div>
            )}
            {productData?.product_status === 'pending_approval' && (
              <div style={styles.pendingBanner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Этот товар находится на проверке у администратора.</span>
              </div>
            )}
            {productData?.product_status === 'approved' && (
              <div style={styles.approvedBanner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                <span>Товар ожидает сдачи на склад. Редактирование недоступно до активации.</span>
              </div>
            )}
            {productData?.product_status === 'active' && (
              <div style={styles.activeBanner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>Товар активен. При изменении он будет отправлен на повторную проверку.</span>
              </div>
            )}
            {error && <div style={styles.errorBox}>{error}</div>}

            <div style={styles.formGrid}>
              {/* Left Column */}
              <div style={styles.col}>
                {/* Basic Info */}
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>Основная информация</div>
                  <div style={styles.field}><label style={styles.label}>Название *</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Название товара" style={{...styles.input, ...(canEdit ? {} : styles.inputDisabled)}} disabled={!canEdit} /></div>
                  <div style={styles.field}><label style={styles.label}>Описание</label><textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Описание..." rows={3} style={{...styles.textarea, ...(canEdit ? {} : styles.inputDisabled)}} disabled={!canEdit} /></div>
                  <div style={styles.field}>
                    <label style={styles.label}>Характеристики</label>
                    {characteristicsList.map((c, i) => (
                      <div key={i} style={styles.charRow}>
                        <input type="text" value={c.name} onChange={e => updateCharName(i, e.target.value)} placeholder="Название" style={{...styles.input, flex: 1, ...(canEdit ? {} : styles.inputDisabled)}} disabled={!canEdit} />
                        <input type="text" value={c.value} onChange={e => updateCharValue(i, e.target.value)} placeholder="Значение" style={{...styles.input, flex: 1, ...(canEdit ? {} : styles.inputDisabled)}} disabled={!canEdit} />
                        {canEdit && <button onClick={() => removeCharacteristic(i)} style={styles.removeBtn}>×</button>}
                      </div>
                    ))}
                    {canEdit && <button onClick={addCharacteristic} style={styles.addBtn}>+ Добавить</button>}
                  </div>
                </div>

                {/* Images */}
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>Изображения</div>
                  {canEdit ? (
                    <div style={styles.uploadArea} onClick={() => document.getElementById('imgInput').click()}>
                      <input id="imgInput" type="file" accept="image/*" multiple onChange={handleImageUpload} style={{display:'none'}} />
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <span style={{fontSize: 12, color: '#64748B', marginLeft: 8}}>Нажмите для загрузки</span>
                    </div>
                  ) : null}
                  {images.length > 0 && <div style={styles.imageGrid}>{images.map((img, i) => (<div key={i} style={styles.imgThumb}><img src={img.preview} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />{canEdit && <button onClick={() => removeImage(i)} style={styles.imgRemove}>×</button>}</div>))}</div>}
                </div>

                {/* Variants - CRM Style */}
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>Варианты</div>
                  {!showVariantForm && savedVariants.length === 0 ? (
                    <div style={styles.variantAddBtn} onClick={() => setShowVariantForm(true)}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="#5c5f62"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/></svg>
                      <span>Добавить опции, например размер или цвет</span>
                    </div>
                  ) : !showVariantForm && savedVariants.length > 0 ? (
                    <div>
                      {savedVariants.map((v, i) => (
                        <div key={i} style={styles.savedVariant}>
                          <span style={styles.savedVariantName}>{v.name}:</span>
                          <div style={styles.savedVariantTags}>
                            {v.colors ? v.colors.map((c, j) => <span key={j} style={{...styles.colorTag, backgroundColor: c.hex, color: c.hex === '#fafafa' || c.hex === '#ffee58' ? '#202223' : '#fff'}}>{c.name}</span>)
                              : v.values.map((val, j) => <span key={j} style={styles.variantTag}>{val}</span>)}
                          </div>
                        </div>
                      ))}
                      <div style={styles.variantAddBtn} onClick={editVariants}>
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="#5c5f62"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/></svg>
                        <span>Редактировать варианты</span>
                      </div>
                    </div>
                  ) : (
                    <div style={styles.variantForm}>
                      {variantOptions.map((opt, oi) => (
                        <div key={oi} style={styles.optionBlock}>
                          <div style={styles.optionRow}>
                            <div style={styles.optionFields}>
                              <label style={styles.smallLabel}>Название опции</label>
                              <input type="text" value={opt.name} onChange={e => updateOptionName(oi, e.target.value)} placeholder="Размер" style={styles.input} />
                              <label style={{...styles.smallLabel, marginTop: 10}}>Значения опции</label>
                              {opt.values.map((v, vi) => (
                                <div key={vi} style={styles.valueRow}>
                                  <input type="text" value={v} onChange={e => updateOptionValue(oi, vi, e.target.value)} placeholder={vi === 0 ? "S, M, L..." : ""} onKeyDown={e => { if (e.key === 'Enter' && v) { e.preventDefault(); addOptionValue(oi); }}} style={styles.input} />
                                  {opt.values.length > 1 && <button onClick={() => removeOptionValue(oi, vi)} style={styles.removeBtn}>×</button>}
                                </div>
                              ))}
                              <button onClick={() => addOptionValue(oi)} style={styles.addValueBtn}>+ Добавить значение</button>
                              <div style={styles.optionActions}>
                                <button onClick={() => removeVariantOption(oi)} style={styles.deleteBtn}>Удалить</button>
                                <button onClick={saveVariants} style={styles.doneBtn}>Готово</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Colors */}
                      <div style={styles.colorSection}>
                        <div style={styles.addColorBtn} onClick={() => setShowColorPicker(!showColorPicker)}>
                          <div style={styles.colorCircles}><span style={{...styles.colorDot, backgroundColor: '#e53935'}}></span><span style={{...styles.colorDot, backgroundColor: '#1e88e5', marginLeft: -4}}></span><span style={{...styles.colorDot, backgroundColor: '#66bb6a', marginLeft: -4}}></span></div>
                          <span>Добавить цвета</span>
                          {selectedColors.length > 0 && <span style={styles.colorCount}>({selectedColors.length})</span>}
                        </div>
                        {showColorPicker && (
                          <div style={styles.colorPicker}>{availableColors.map(c => (<div key={c.hex} onClick={() => toggleColor(c)} style={{...styles.colorOption, backgroundColor: c.hex, border: selectedColors.find(x => x.hex === c.hex) ? '2px solid #303030' : '1px solid #c9cccf'}} title={c.name} />))}</div>
                        )}
                        {selectedColors.length > 0 && <div style={styles.selectedColorsRow}>{selectedColors.map(c => (<span key={c.hex} style={{...styles.selectedColorTag, backgroundColor: c.hex, color: c.hex === '#fafafa' || c.hex === '#ffee58' ? '#202223' : '#fff'}}>{c.name}<button onClick={() => toggleColor(c)} style={styles.removeColorBtn}>×</button></span>))}</div>}
                      </div>

                      <div style={styles.variantAddBtn} onClick={addVariantOption}>
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="#5c5f62"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/></svg>
                        <span>Добавить другую опцию</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div style={styles.col}>
                {/* Category */}
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>Категория</div>
                  <div style={{position: 'relative'}}>
                    <div style={styles.selectBtn} onClick={() => { setCategoryOpen(!categoryOpen); setCategoryPath([]); setCategorySearch(''); setCurrentCategories(categories.filter(c => !c.parent_id && !c.parent)); }}>
                      <span style={selectedCategory ? {} : {color: '#94a3b8'}}>{selectedCategory ? selectedCategory.fullPath || selectedCategory.name : 'Выберите категорию'}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    {categoryOpen && (
                      <div style={styles.dropdown}>
                        <div style={styles.dropdownSearch}><input type="text" value={categorySearch} onChange={e => setCategorySearch(e.target.value)} placeholder="Поиск..." style={styles.dropdownInput} autoFocus /></div>
                        {categoryPath.length > 0 && !filteredCats && <div style={styles.dropdownBack} onClick={handleCategoryBack}>← Назад</div>}
                        <div style={styles.dropdownList}>
                          {filteredCats ? (filteredCats.length > 0 ? filteredCats.map(c => <div key={c.id} style={styles.dropdownItem} onClick={() => { setSelectedCategory(c); setCategoryOpen(false); }}>{c.fullPath}</div>) : <div style={styles.dropdownEmpty}>Не найдено</div>)
                            : currentCategories.map(c => <div key={c.id} style={styles.dropdownItem} onClick={() => handleCategoryClick(c)}><span>{c.name}</span>{hasSubcategories(c) && <span style={{color: '#94a3b8'}}>→</span>}</div>)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>Цена</div>
                  <div style={styles.field}><label style={styles.label}>Розничная цена *</label><div style={styles.priceBox}><span style={styles.currency}>₽</span><input type="number" value={retailPrice} onChange={e => setRetailPrice(e.target.value)} placeholder="0" style={{...styles.priceInput, ...(canEdit ? {} : styles.inputDisabled)}} disabled={!canEdit} /></div></div>
                  {canEdit && <label style={styles.checkLabel}><input type="checkbox" checked={discountEnabled} onChange={e => setDiscountEnabled(e.target.checked)} style={styles.checkbox} />Добавить скидку</label>}
                  {discountEnabled && <div style={{...styles.priceBox, marginTop: 8}}><span style={styles.currency}>₽</span><input type="number" value={discountPrice} onChange={e => setDiscountPrice(e.target.value)} placeholder="Цена со скидкой" style={{...styles.priceInput, ...(canEdit ? {} : styles.inputDisabled)}} disabled={!canEdit} /></div>}
                </div>

                {/* Stock */}
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>Склад</div>
                  <div style={styles.field}><label style={styles.label}>Количество</label><input type="number" value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} placeholder="0" style={{...styles.input, ...(canEdit ? {} : styles.inputDisabled)}} disabled={!canEdit} /></div>
                </div>

                {productData?.product_status === 'deleted' ? (
                  <button style={styles.refreshBtn} onClick={handleRefresh} disabled={saving}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
                    {saving ? 'Отправка...' : 'Отправить повторно'}
                  </button>
                ) : canEdit ? (
                  <>
                    <button style={styles.submitBtn} onClick={handleSubmit} disabled={saving}>
                      {saving ? 'Отправка...' : (isEditMode ? 'Отправить на проверку' : 'Отправить на проверку')}
                    </button>
                    {isEditMode && (
                      <div style={styles.submitHint}>Изменения будут проверены администратором</div>
                    )}
                  </>
                ) : null}
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalTitle}>Удалить товар?</div>
            <div style={styles.modalText}>Вы уверены, что хотите удалить этот товар? Товар будет перемещён в раздел "Удалённые".</div>
            <div style={styles.modalButtons}>
              <button style={styles.modalCancelBtn} onClick={() => setShowDeleteConfirm(false)} disabled={deleting}>Отмена</button>
              <button style={styles.modalConfirmBtn} onClick={handleDelete} disabled={deleting}>{deleting ? 'Удаление...' : 'Удалить'}</button>
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
  deleteBtn2: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer' },
  deletedBanner: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, color: '#991B1B', fontSize: 12, marginBottom: 16 },
  pendingBanner: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 8, color: '#92400E', fontSize: 12, marginBottom: 16 },
  approvedBanner: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 8, color: '#1D4ED8', fontSize: 12, marginBottom: 16 },
  activeBanner: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', backgroundColor: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: 8, color: '#166534', fontSize: 12, marginBottom: 16 },
  loadingState: { padding: 40, textAlign: 'center', color: '#64748B', fontSize: 13 },
  errorBox: { padding: '10px 12px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, color: '#DC2626', fontSize: 12, marginBottom: 16 },
  refreshBtn: { width: '100%', padding: '10px', backgroundColor: '#F59E0B', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 },
  col: { display: 'flex', flexDirection: 'column', gap: 16 },
  section: { padding: '14px', backgroundColor: '#FAFBFC', borderRadius: 8, border: '1px solid #E2E8F0' },
  sectionTitle: { fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 12 },
  field: { marginBottom: 10 },
  label: { display: 'block', fontSize: 11, fontWeight: 500, color: '#374151', marginBottom: 4 },
  smallLabel: { display: 'block', fontSize: 10, fontWeight: 500, color: '#64748B', marginBottom: 4 },
  input: { width: '100%', padding: '7px 10px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 12, color: '#1E293B', outline: 'none', boxSizing: 'border-box' },
  inputDisabled: { backgroundColor: '#F3F4F6', color: '#6B7280', cursor: 'not-allowed' },
  textarea: { width: '100%', padding: '7px 10px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 12, color: '#1E293B', outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' },
  charRow: { display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 },
  removeBtn: { width: 24, height: 24, borderRadius: 4, border: 'none', backgroundColor: '#FEF2F2', color: '#DC2626', fontSize: 14, cursor: 'pointer' },
  addBtn: { padding: '5px 10px', background: 'none', border: '1px dashed #CBD5E1', borderRadius: 4, cursor: 'pointer', color: PRIMARY, fontSize: 11, fontWeight: 500 },
  uploadArea: { border: '1px dashed #E2E8F0', borderRadius: 6, padding: '16px', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  imageGrid: { display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' },
  imgThumb: { position: 'relative', width: 50, height: 50, borderRadius: 6, overflow: 'hidden' },
  imgRemove: { position: 'absolute', top: 2, right: 2, width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', fontSize: 10, cursor: 'pointer' },
  // Variants - CRM style
  variantAddBtn: { display: 'flex', alignItems: 'center', gap: 8, padding: '10px', backgroundColor: '#fff', border: '1px dashed #E2E8F0', borderRadius: 6, cursor: 'pointer', fontSize: 12, color: '#5c5f62' },
  variantForm: { display: 'flex', flexDirection: 'column', gap: 12 },
  optionBlock: { padding: '12px', backgroundColor: '#fff', borderRadius: 6, border: '1px solid #E2E8F0' },
  optionRow: { display: 'flex', gap: 10 },
  optionFields: { flex: 1 },
  valueRow: { display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 },
  addValueBtn: { background: 'none', border: 'none', color: PRIMARY, fontSize: 11, cursor: 'pointer', padding: '4px 0' },
  optionActions: { display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid #E2E8F0' },
  deleteBtn: { padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 11, cursor: 'pointer', color: '#64748B' },
  doneBtn: { padding: '6px 12px', backgroundColor: '#303030', border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer', color: '#fff' },
  savedVariant: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
  savedVariantName: { fontSize: 12, fontWeight: 500, color: '#374151' },
  savedVariantTags: { display: 'flex', flexWrap: 'wrap', gap: 4 },
  variantTag: { padding: '3px 8px', backgroundColor: '#F1F5F9', borderRadius: 4, fontSize: 11, color: '#374151' },
  colorTag: { padding: '3px 8px', borderRadius: 4, fontSize: 11 },
  colorSection: { padding: '12px', backgroundColor: '#fff', borderRadius: 6, border: '1px solid #E2E8F0' },
  addColorBtn: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#5c5f62', cursor: 'pointer' },
  colorCircles: { display: 'flex' },
  colorDot: { width: 14, height: 14, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)' },
  colorCount: { color: '#94A3B8', fontSize: 11 },
  colorPicker: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  colorOption: { width: 26, height: 26, borderRadius: '50%', cursor: 'pointer' },
  selectedColorsRow: { display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 },
  selectedColorTag: { display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 4, fontSize: 11 },
  removeColorBtn: { background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: 0.7, fontSize: 14 },
  // Select/Dropdown
  selectBtn: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', border: '1px solid #E2E8F0', borderRadius: 6, cursor: 'pointer', fontSize: 12, backgroundColor: '#fff' },
  dropdown: { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, marginTop: 4, maxHeight: 200, overflow: 'hidden' },
  dropdownSearch: { padding: '8px', borderBottom: '1px solid #E2E8F0' },
  dropdownInput: { width: '100%', padding: '6px 8px', border: '1px solid #E2E8F0', borderRadius: 4, fontSize: 11, outline: 'none', boxSizing: 'border-box' },
  dropdownBack: { padding: '8px 10px', fontSize: 11, color: PRIMARY, cursor: 'pointer', borderBottom: '1px solid #F1F5F9' },
  dropdownList: { maxHeight: 140, overflowY: 'auto' },
  dropdownItem: { display: 'flex', justifyContent: 'space-between', padding: '8px 10px', cursor: 'pointer', fontSize: 12 },
  dropdownEmpty: { padding: '16px', textAlign: 'center', color: '#94A3B8', fontSize: 11 },
  // Price
  priceBox: { display: 'flex', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: 6, overflow: 'hidden' },
  currency: { padding: '7px 10px', backgroundColor: '#F8FAFC', color: '#64748B', fontSize: 12, borderRight: '1px solid #E2E8F0' },
  priceInput: { flex: 1, padding: '7px 10px', border: 'none', fontSize: 12, color: '#1E293B', outline: 'none' },
  checkLabel: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#374151', cursor: 'pointer' },
  checkbox: { width: 14, height: 14, cursor: 'pointer', accentColor: PRIMARY },
  submitBtn: { width: '100%', padding: '10px', backgroundColor: PRIMARY, color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  submitHint: { marginTop: 8, fontSize: 11, color: '#64748B', textAlign: 'center' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', borderRadius: 12, padding: '24px', width: 320, textAlign: 'center' },
  modalTitle: { fontSize: 16, fontWeight: 600, color: '#1E293B', marginBottom: 8 },
  modalText: { fontSize: 13, color: '#64748B', marginBottom: 20 },
  modalButtons: { display: 'flex', gap: 10, justifyContent: 'center' },
  modalCancelBtn: { padding: '8px 20px', backgroundColor: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' },
  modalConfirmBtn: { padding: '8px 20px', backgroundColor: '#DC2626', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' },
};

export default AddProduct;

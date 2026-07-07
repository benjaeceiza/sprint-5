import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageWithLoader from '../../../components/ImageWithLoader/ImageWithLoader';
import { FiLoader } from 'react-icons/fi';
import { getProductById, updateProduct } from '../../../services/productService';
// 🔥 IMPORTAMOS EL SERVICIO DE TIENDAS
import { getStores } from '../../../services/storeService';
import './ProductView.css';

const ProductView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [originalProduct, setOriginalProduct] = useState(null); 
    const [product, setProduct] = useState(null); 
    const [stores, setStores] = useState([]); // 🔥 Estado para almacenar las tiendas de SQLite
    const [isLoading, setIsLoading] = useState(true);
    const [productNotFound, setProductNotFound] = useState(false);
    const [errorMsg, setErrorMsg] = useState(''); 

    // 🔥 TRAEMOS EL PRODUCTO Y LAS TIENDAS EN PARALELO
    useEffect(() => {
        Promise.all([
            getProductById(id),
            getStores()
        ])
        .then(([productData, storesData]) => {
            setProduct(productData);
            setOriginalProduct(productData);
            setStores(storesData);
            setIsLoading(false);
        })
        .catch(err => {
            console.error("Error:", err);
            setProduct(null);
            setProductNotFound(true);
            setIsLoading(false);
        });
    }, [id]);

    const handleChange = (field, value) => {
        setErrorMsg(''); 
        setProduct({ ...product, [field]: value });
    };

    const handleStockClick = (amount) => {
        const currentStock = parseInt(product.stock, 10) || 0;
        const newStock = Math.max(0, currentStock + amount);
        handleChange('stock', newStock);
    };

    const handleSave = async () => {
        if (!product.name || product.name.trim() === '') {
            setErrorMsg('El nombre del producto es requerido.');
            return;
        }

        const sanitizedPrice = parseInt(product.price, 10) || 0;
        const sanitizedStock = parseInt(product.stock, 10) || 0;
        const sanitizedDescription = product.description || ''; 

        const updatedProduct = {
            ...product,
            name: product.name.trim(),
            price: sanitizedPrice,
            stock: sanitizedStock,
            description: sanitizedDescription,
            store_id: parseInt(product.store_id, 10) // Aseguramos que sea número entero
        };

        try {
            await updateProduct(id, updatedProduct);
            alert("¡Producto guardado exitosamente!");
            setProduct(updatedProduct);
            setOriginalProduct(updatedProduct); 
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Hubo un error en el servidor al intentar guardar.");
        }
    };

    const handleCancel = () => {
        setProduct({ ...originalProduct });
        setErrorMsg(''); 
    };

    const hasChanges = originalProduct && product && (
        product.name !== originalProduct.name ||
        product.price !== originalProduct.price ||
        product.stock !== originalProduct.stock ||
        (product.description || '') !== (originalProduct.description || '') ||
        (product.imageUrl || '') !== (originalProduct.imageUrl || '') ||
        String(product.store_id) !== String(originalProduct.store_id)
    );

    const isNameValid = product && product.name && product.name.trim() !== '';

    if (isLoading) {
        return (
            <div className="product-view-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <FiLoader className="loading-spinner" style={{ fontSize: '2rem', color: '#E0E3E6', animation: 'spin 1s linear infinite' }} />
            </div>
        );
    }

    if (productNotFound || !product) {
        // Acordate de importar y renderizar tu <NotFound /> acá si lo estás usando
        return (
            <div className="product-view-container">
                <h2 style={{ color: '#E0E3E6' }}>Producto no encontrado</h2>
            </div>
        );
    }

    // Buscamos el nombre de la tienda actual para mostrarlo bonito en el badge superior
    const currentStoreObj = stores.find(s => String(s.id) === String(product.store_id));
    const currentStoreName = currentStoreObj ? currentStoreObj.name : "Tienda Asignada";

    return (
        <div className="product-view-container">
            <div className="product-summary">
                <ImageWithLoader 
                    src={product.imageUrl} 
                    alt={`Imagen de ${product.name}`} 
                    className="summary-image" 
                />
                
                <div className="summary-details">
                    <h3 className="summary-title">{product.name}</h3>
                    <div className="summary-stats">
                        <span className="stat-item">
                            <strong className="stat-number">${Number(product.price || 0).toLocaleString('es-AR')}</strong> 
                            <span className="stat-label">PRECIO</span>
                        </span>
                        <span className="stat-item">
                            <strong className="stat-number">{product.stock || 0}</strong> 
                            <span className="stat-label">STOCK DISPONIBLE</span>
                        </span>
                        
                        {/* 🔥 BADGE DINÁMICO QUE MUESTRA LA TIENDA REAL */}
                        <div className="store-badge" onClick={() => navigate(`/tienda/${product.store_id}`)} style={{ cursor: 'pointer' }}>
                            <img src="https://i.pravatar.cc/150?img=11" alt="Tienda Avatar" className="store-avatar" />
                            <span className="store-name">{currentStoreName}</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="form-section">
                <h4 className="section-title">Información</h4>
                {errorMsg && <div style={{ color: '#EC1C24', marginBottom: '15px', fontWeight: '500', fontSize: '0.95rem' }}>⚠️ {errorMsg}</div>}

                <div className="input-group">
                    <label>Nombre *</label>
                    <input type="text" value={product.name} onChange={(e) => handleChange('name', e.target.value)} style={{ border: errorMsg ? '1px solid #EC1C24' : '' }} />
                </div>

                <div className="input-group">
                    <label>Valor (Entero)</label>
                    <input type="number" className="input-number" value={product.price} onChange={(e) => handleChange('price', e.target.value)} />
                </div>

                <div className="input-group stock-group">
                    <label>Stock</label>
                    <div className="stock-counter">
                        <button type="button" className="counter-btn" onClick={() => handleStockClick(-1)}>-</button>
                        <input type="number" value={product.stock} onChange={(e) => handleChange('stock', e.target.value)} className="counter-input" />
                        <button type="button" className="counter-btn" onClick={() => handleStockClick(1)}>+</button>
                    </div>
                </div>

                <div className="input-group">
                    <label>Descripción</label>
                    <textarea rows="5" value={product.description || ''} onChange={(e) => handleChange('description', e.target.value)} placeholder="Descripción opcional (puede quedar vacía)"></textarea>
                </div>

                {/* 🔥 SELECT DE TIENDAS CON LAS OPCIONES REALES DE LA BASE DE DATOS */}
                <div className="input-group">
                    <label>Tienda Propietaria</label>
                    <select value={product.store_id || ""} onChange={(e) => handleChange('store_id', e.target.value)}>
                        <option style={{backgroundColor:"black", color:"white"}} value="" disabled>Selecciona una tienda</option>
                        {stores.map(store => (
                            <option style={{backgroundColor:"black", color:"white"}} key={store.id} value={store.id}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            <section className="form-section">
                <h4 className="section-title">Galería de Imágenes</h4>
                <div className="input-group">
                    <label>URL de la Imagen Principal</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" placeholder="https://..." value={product.imageUrl || ''} onChange={(e) => handleChange('imageUrl', e.target.value)} style={{ flex: 1 }} />
                        <button type="button" onClick={() => handleChange('imageUrl', '')} style={{ padding: '0 15px', backgroundColor: '#383d44', color: '#E0E3E6', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Borrar URL</button>
                    </div>
                </div>
            </section>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
                <button type="button" onClick={handleCancel} disabled={!hasChanges} style={{ padding: '12px 24px', backgroundColor: 'transparent', color: hasChanges ? '#E0E3E6' : '#4a4d52', border: `1px solid ${hasChanges ? '#2C3036' : '#1A1D21'}`, borderRadius: '50px', cursor: hasChanges ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}>Cancelar</button>
                <button type="button" onClick={handleSave} disabled={!hasChanges || !isNameValid} style={{ padding: '12px 32px', backgroundColor: (hasChanges && isNameValid) ? '#EC1C24' : '#2C3036', color: (hasChanges && isNameValid) ? '#FFF' : '#8E9197', border: 'none', borderRadius: '50px', cursor: (hasChanges && isNameValid) ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', transition: 'all 0.3s ease' }}>Guardar Cambios</button>
            </div>
        </div>
    );
};

export default ProductView;
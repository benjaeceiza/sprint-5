import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageWithLoader from '../../../components/ImageWithLoader/ImageWithLoader';
import { FiLoader } from 'react-icons/fi';
import './ProductView.css';

const ProductView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estados para los datos de la API
    const [originalProduct, setOriginalProduct] = useState(null); // Copia fiel de la DB
    const [product, setProduct] = useState(null); // Estado editable
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(''); // Para mostrar errores visuales de validación

    // Traemos el producto desde el backend
    useEffect(() => {
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Producto no encontrado");
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setOriginalProduct(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setProduct(null);
                setIsLoading(false);
            });
    }, [id]);

    // Manejador de cambios en los inputs
    const handleChange = (field, value) => {
        setErrorMsg(''); // Limpiamos errores al escribir
        setProduct({ ...product, [field]: value });
    };

    // Modificar stock con los botones + y - (Fuerza enteros)
    const handleStockClick = (amount) => {
        const currentStock = parseInt(product.stock, 10) || 0;
        const newStock = Math.max(0, currentStock + amount);
        handleChange('stock', newStock);
    };

    // VALIDACIÓN Y ENVÍO (PUT)
    const handleSave = async () => {
        // 1. Control de Nombre Requerido
        if (!product.name || product.name.trim() === '') {
            setErrorMsg('El nombre del producto es requerido.');
            return;
        }

        // 2. Control de Enteros (Por defecto 0 si están vacíos o inválidos)
        const sanitizedPrice = parseInt(product.price, 10) || 0;
        const sanitizedStock = parseInt(product.stock, 10) || 0;
        const sanitizedDescription = product.description || ''; // Permite texto vacío

        // Armamos el body limpio con las validaciones aplicadas
        const updatedProduct = {
            ...product,
            name: product.name.trim(),
            price: sanitizedPrice,
            stock: sanitizedStock,
            description: sanitizedDescription
        };

        try {
            const response = await fetch(`http://localhost:3000/api/products/${id}/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });

            if (response.ok) {
                alert("¡Producto guardado exitosamente en la API Rest!");
                // Actualizamos la pantalla con los datos sanitizados y reseteamos los botones
                setProduct(updatedProduct);
                setOriginalProduct(updatedProduct); 
            } else {
                alert("Hubo un error en el servidor al intentar guardar.");
            }
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    // Cancelar modificaciones: devuelve el estado al backup de la DB
    const handleCancel = () => {
        setProduct({ ...originalProduct });
        setErrorMsg(''); // Limpiamos cualquier alerta de error
    };

    // Comparamos si hubo cambios reales entre el clon y el editable
    const hasChanges = originalProduct && product && (
        product.name !== originalProduct.name ||
        product.price !== originalProduct.price ||
        product.stock !== originalProduct.stock ||
        (product.description || '') !== (originalProduct.description || '') ||
        (product.imageUrl || '') !== (originalProduct.imageUrl || '') ||
        String(product.store_id) !== String(originalProduct.store_id)
    );

    // El nombre no debe estar vacío para poder habilitar el botón guardar
    const isNameValid = product && product.name && product.name.trim() !== '';

    if (isLoading) {
        return (
            <div className="product-view-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <FiLoader className="loading-spinner" style={{ fontSize: '2rem', color: '#E0E3E6', animation: 'spin 1s linear infinite' }} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-view-container">
                <h2 style={{ color: '#E0E3E6' }}>Producto no encontrado</h2>
            </div>
        );
    }

    return (
        <div className="product-view-container">
            
            {/* --- COMPONENTE RESUMEN (De un vistazo) --- */}
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
                        
                        <div className="store-badge" onClick={() => navigate('/stores/1')} style={{ cursor: 'pointer' }}>
                            <img 
                                src="https://i.pravatar.cc/150?img=11" 
                                alt="Tienda Avatar" 
                                className="store-avatar" 
                            />
                            <span className="store-name">Tienda Principal</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FORMULARIO DE EDICIÓN --- */}
            <section className="form-section">
                <h4 className="section-title">Información</h4>

                {/* Si hay un error de validación, lo mostramos acá arriba */}
                {errorMsg && <div style={{ color: '#EC1C24', marginBottom: '15px', fontWeight: '500', fontSize: '0.95rem' }}>⚠️ {errorMsg}</div>}

                <div className="input-group">
                    <label>Nombre *</label>
                    <input 
                        type="text" 
                        value={product.name} 
                        onChange={(e) => handleChange('name', e.target.value)} 
                        style={{ border: errorMsg ? '1px solid #EC1C24' : '' }}
                    />
                </div>

                <div className="input-group">
                    <label>Valor (Entero)</label>
                    <input 
                        type="number" 
                        className="input-number" 
                        value={product.price} 
                        onChange={(e) => handleChange('price', e.target.value)} // Guardamos temporalmente el texto tipeado
                    />
                </div>

                <div className="input-group stock-group">
                    <label>Stock</label>
                    <div className="stock-counter">
                        <button type="button" className="counter-btn" onClick={() => handleStockClick(-1)}>-</button>
                        <input 
                            type="number" 
                            value={product.stock} 
                            onChange={(e) => handleChange('stock', e.target.value)} 
                            className="counter-input" 
                        />
                        <button type="button" className="counter-btn" onClick={() => handleStockClick(1)}>+</button>
                    </div>
                </div>

                <div className="input-group">
                    <label>Descripción</label>
                    <textarea 
                        rows="5"
                        value={product.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Descripción opcional (puede quedar vacía)"
                    ></textarea>
                </div>

                <div className="input-group">
                    <label>Tienda</label>
                    <select value={product.store_id || "1"} onChange={(e) => handleChange('store_id', e.target.value)}>
                        <option value="1">Tienda Principal</option>
                        <option value="2">Otra Tienda</option>
                    </select>
                </div>
            </section>

            {/* --- SECCIÓN GALERÍA --- */}
            <section className="form-section">
                <h4 className="section-title">Galería de Imágenes</h4>
                <div className="input-group">
                    <label>URL de la Imagen Principal</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            type="text" 
                            placeholder="https://..." 
                            value={product.imageUrl || ''} 
                            onChange={(e) => handleChange('imageUrl', e.target.value)} 
                            style={{ flex: 1 }}
                        />
                        <button 
                            type="button" 
                            onClick={() => handleChange('imageUrl', '')}
                            style={{ padding: '0 15px', backgroundColor: '#383d44', color: '#E0E3E6', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                        >
                            Borrar URL
                        </button>
                    </div>
                </div>
            </section>

            {/* --- BOTONES AL FINAL DEL FORMULARIO --- */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
                {/* Cancelar se activa si hay cambios */}
                <button 
                    type="button"
                    onClick={handleCancel}
                    disabled={!hasChanges}
                    style={{ 
                        padding: '12px 24px', 
                        backgroundColor: 'transparent', 
                        color: hasChanges ? '#E0E3E6' : '#4a4d52', 
                        border: `1px solid ${hasChanges ? '#2C3036' : '#1A1D21'}`, 
                        borderRadius: '50px', 
                        cursor: hasChanges ? 'pointer' : 'not-allowed', 
                        fontWeight: 'bold' 
                    }}
                >
                    Cancelar
                </button>
                
                {/* Guardar se activa si hay cambios Y si el nombre no está vacío */}
                <button 
                    type="button"
                    onClick={handleSave}
                    disabled={!hasChanges || !isNameValid}
                    style={{ 
                        padding: '12px 32px', 
                        backgroundColor: (hasChanges && isNameValid) ? '#EC1C24' : '#2C3036', 
                        color: (hasChanges && isNameValid) ? '#FFF' : '#8E9197', 
                        border: 'none', 
                        borderRadius: '50px', 
                        cursor: (hasChanges && isNameValid) ? 'pointer' : 'not-allowed', 
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Guardar Cambios
                </button>
            </div>

        </div>
    );
};

export default ProductView;
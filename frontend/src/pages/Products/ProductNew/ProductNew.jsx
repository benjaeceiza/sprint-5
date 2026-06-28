import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageWithLoader from '../../../components/ImageWithLoader/ImageWithLoader';
import { FiLoader } from 'react-icons/fi';
// Importamos la función de crear desde tu nuevo servicio
import { createProduct } from '../../../services/productService'; 
import '../ProductView/ProductView.css'; 
import './ProductNew.css';

const ProductNew = () => {
    const navigate = useNavigate();

    // 1. Estado para las categorías que vienen del backend
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    // 2. Estado inicial del formulario con valores limpios por defecto
    const defaultState = {
        name: '',
        code: '',
        price: 0,
        stock: 0,
        description: '',
        imageUrl: '',
        category_id: '',
        store_id: 1      // Por defecto asignado a la Tienda Principal
    };

    const [product, setProduct] = useState(defaultState);

    // 3. Traemos las categorías de la base de datos al montar el componente
    useEffect(() => {
        // Mantenemos la simulación/fallback de las categorías como lo tenías
        setTimeout(() => {
            const cats = [
                { id: 1, name: "Comida" },
                { id: 2, name: "Bebidas" },
                { id: 3, name: "Tecnología" },
                { id: 4, name: "Ropa" },
                { id: 5, name: "Belleza" }
            ];
            setCategories(cats);
            setIsLoadingCategories(false);
        }, 500); // Pequeño delay simulando la carga
    }, []);

    // Manejador de cambios en los inputs
    const handleChange = (field, value) => {
        setErrorMsg(''); // Limpiamos alertas de error al escribir
        setProduct({ ...product, [field]: value });
    };

    // Control del contador de Stock (+ / -) con validación de no negativos
    const handleStockClick = (amount) => {
        const currentStock = parseInt(product.stock, 10) || 0;
        const newStock = Math.max(0, currentStock + amount);
        handleChange('stock', newStock);
    };

    // RESETEAR EL FORMULARIO (Botón Cancelar)
    const handleCancel = () => {
        if (window.confirm("¿Estás seguro de que querés cancelar? Se perderán los datos ingresados.")) {
            setProduct(defaultState);
            setErrorMsg('');
            navigate('/products'); // Volvemos al listado principal
        }
    };

    // VALIDACIONES EXTREMAS Y GUARDADO (POST usando el Service)
    const handleSave = async (e) => {
        e.preventDefault();

        // VALIDACIÓN 1: Nombre obligatorio y sin espacios vacíos
        if (!product.name || product.name.trim() === '') {
            setErrorMsg('El nombre del producto es obligatorio y no puede estar vacío.');
            return;
        }

        // VALIDACIÓN 2: Código interno obligatorio
        if (!product.code || product.code.trim() === '') {
            setErrorMsg('El código del producto (Ej: #1005) es obligatorio.');
            return;
        }

        // VALIDACIÓN 3: Selección de Categoría obligatoria
        if (!product.category_id || product.category_id === '') {
            setErrorMsg('Debes seleccionar una categoría válida para el producto.');
            return;
        }

        // VALIDACIÓN 4: Precio número entero y no negativo
        const sanitizedPrice = parseInt(product.price, 10);
        if (isNaN(sanitizedPrice) || sanitizedPrice < 0) {
            setErrorMsg('El precio debe ser un número entero mayor o igual a 0.');
            return;
        }

        // VALIDACIÓN 5: Stock número entero y no negativo
        const sanitizedStock = parseInt(product.stock, 10);
        if (isNaN(sanitizedStock) || sanitizedStock < 0) {
            setErrorMsg('El stock inicial debe ser un número entero mayor o igual a 0.');
            return;
        }

        // Si pasa todas las validaciones, preparamos el objeto final sanitizado
        const newProductData = {
            name: product.name.trim(),
            code: product.code.trim(),
            price: sanitizedPrice,
            stock: sanitizedStock,
            description: product.description ? product.description.trim() : '',
            imageUrl: product.imageUrl ? product.imageUrl.trim() : 'https://picsum.photos/seed/default/300', 
            category_id: parseInt(product.category_id, 10),
            store_id: parseInt(product.store_id, 10)
        };

        try {
            // Usamos la función createProduct del Service
            await createProduct(newProductData);
            
            alert("¡Producto creado y guardado con éxito en la base de datos!");
            navigate('/products'); // Redirección inmediata al listado general
        } catch (error) {
            console.error("Error al enviar el POST:", error);
            setErrorMsg('No se pudo establecer conexión con el servidor.');
        }
    };

    // Validación en tiempo real para habilitar visualmente el botón
    const isFormValid = 
        product.name.trim() !== '' && 
        product.code.trim() !== '' && 
        product.category_id !== '' &&
        product.price >= 0 &&
        product.stock >= 0;

    if (isLoadingCategories) {
        return (
            <div className="product-view-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <FiLoader className="loading-spinner" style={{ fontSize: '2rem', color: '#E0E3E6', animation: 'spin 1s linear infinite' }} />
            </div>
        );
    }

    return (
        <div className="product-view-container">
            
            {/* --- COMPONENTE RESUMEN (Vista previa en tiempo real) --- */}
            <div className="product-summary">
                <ImageWithLoader 
                    src={product.imageUrl || 'https://picsum.photos/seed/default/300'} 
                    alt="Vista previa" 
                    className="summary-image" 
                />
                
                <div className="summary-details">
                    <h3 className="summary-title">{product.name || 'Nombre del nuevo producto'}</h3>
                    
                    <div className="summary-stats">
                        <span className="stat-item">
                            <strong className="stat-number">${Number(product.price || 0).toLocaleString('es-AR')}</strong> 
                            <span className="stat-label">PRECIO</span>
                        </span>
                        
                        <span className="stat-item">
                            <strong className="stat-number">{product.stock || 0}</strong> 
                            <span className="stat-label">STOCK INICIAL</span>
                        </span>
                        
                        <div className="store-badge">
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

            {/* --- FORMULARIO DE ALTA --- */}
            <form className="form-section" onSubmit={handleSave}>
                <h4 className="section-title">Crear Nuevo Producto</h4>

                {errorMsg && <div style={{ color: '#EC1C24', marginBottom: '15px', fontWeight: '500', fontSize: '0.95rem' }}>⚠️ {errorMsg}</div>}

                <div className="input-group">
                    <label>Nombre del Producto *</label>
                    <input 
                        type="text" 
                        placeholder="Ej: Alfajor Havanna"
                        value={product.name} 
                        onChange={(e) => handleChange('name', e.target.value)} 
                    />
                </div>

                <div className="input-group">
                    <label>Código de Barra / Identificador *</label>
                    <input 
                        type="text" 
                        placeholder="Ej: #1005"
                        value={product.code} 
                        onChange={(e) => handleChange('code', e.target.value)} 
                    />
                </div>

                {/* REQUERIMIENTO: Selector de categorías dinámico */}
                <div className="input-group">
                    <label>Categoría *</label>
                    <select 
                        value={product.category_id} 
                        onChange={(e) => handleChange('category_id', e.target.value)}
                    >
                        <option className="select-option" value="" disabled>Selecciona una categoría</option>
                        {categories.map(cat => (
                            <option className="select-option" key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label>Precio de Venta ($)</label>
                    <input 
                        type="number" 
                        min="0"
                        className="input-number" 
                        value={product.price} 
                        onChange={(e) => handleChange('price', Math.max(0, parseInt(e.target.value, 10) || 0))} 
                    />
                </div>

                <div className="input-group stock-group">
                    <label>Stock Inicial</label>
                    <div className="stock-counter">
                        <button type="button" className="counter-btn" onClick={() => handleStockClick(-1)}>-</button>
                        <input 
                            type="number" 
                            min="0"
                            value={product.stock} 
                            onChange={(e) => handleChange('stock', Math.max(0, parseInt(e.target.value, 10) || 0))} 
                            className="counter-input" 
                        />
                        <button type="button" className="counter-btn" onClick={() => handleStockClick(1)}>+</button>
                    </div>
                </div>

                <div className="input-group">
                    <label>Descripción</label>
                    <textarea 
                        rows="4"
                        value={product.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Agregá especificaciones o detalles del artículo..."
                    ></textarea>
                </div>

                <div className="input-group">
                    <label>Tienda Propietaria</label>
                    <select value={product.store_id} onChange={(e) => handleChange('store_id', e.target.value)}>
                        <option className="select-option" value="1">Tienda Principal</option>
                        <option className="select-option" value="2">Otra Tienda</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>URL de la Imagen Principal</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            type="text" 
                            placeholder="https://example.com/imagen.jpg" 
                            value={product.imageUrl} 
                            onChange={(e) => handleChange('imageUrl', e.target.value)} 
                            style={{ flex: 1 }}
                        />
                        <button 
                            type="button" 
                            onClick={() => handleChange('imageUrl', '')}
                            style={{ padding: '0 15px', backgroundColor: '#383d44', color: '#E0E3E6', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                        >
                            Limpiar
                        </button>
                    </div>
                </div>

                {/* --- BOTONES DE ACCIÓN --- */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
                    <button 
                        type="button"
                        onClick={handleCancel}
                        style={{ 
                            padding: '12px 24px', 
                            backgroundColor: 'transparent', 
                            color: '#E0E3E6', 
                            border: '1px solid #2C3036', 
                            borderRadius: '50px', 
                            cursor: 'pointer', 
                            fontWeight: 'bold' 
                        }}
                    >
                        Cancelar
                    </button>
                    
                    <button 
                        type="submit"
                        disabled={!isFormValid}
                        style={{ 
                            padding: '12px 32px', 
                            backgroundColor: isFormValid ? '#EC1C24' : '#2C3036', 
                            color: isFormValid ? '#FFF' : '#8E9197', 
                            border: 'none', 
                            borderRadius: '50px', 
                            cursor: isFormValid ? 'pointer' : 'not-allowed', 
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Crear Producto
                    </button>
                </div>
            </form>

        </div>
    );
};

export default ProductNew;
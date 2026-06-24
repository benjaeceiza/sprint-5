
import { useParams } from 'react-router-dom';
import productsData from '../../../data/products.json'; 
import ImageWithLoader from '../../../components/ImageWithLoader/ImageWithLoader';
import './ProductView.css';

const ProductView = () => {
    // 1. Capturamos el ID de la URL
    const { id } = useParams();

    // 2. Buscamos el producto en el JSON. 

    const product = productsData.find((p) => p.id === parseInt(id, 10));

    // 3. Validación: ¿Qué pasa si el usuario ingresa un ID que no existe? (Ej: /products/999)
    if (!product) {
        return (
            <div className="product-view-container">
                <h2 style={{ color: '#E0E3E6' }}>Producto no encontrado</h2>
            </div>
        );
    }

    return (
        <div className="product-view-container">
            
            {/* --- CABECERA DEL PRODUCTO --- */}
            <div className="product-summary">
              <ImageWithLoader 
                    src={product.imageUrl} 
                    alt={`Imagen de ${product.name}`} 
                    className="summary-image" 
                />
                
                <div className="summary-details">
                    {/* Renderizamos el nombre dinámicamente */}
                    <h3 className="summary-title">{product.name}</h3>
                    
                    <div className="summary-stats">
                        <span className="stat-item">
                            {/* Le damos formato de moneda local con toLocaleString */}
                            <strong className="stat-number">${product.price.toLocaleString('es-AR')}</strong> 
                            <span className="stat-label">PRECIO</span>
                        </span>
                        
                        <span className="stat-item">
                            <strong className="stat-number">{product.stock}</strong> 
                            <span className="stat-label">STOCK DISPONIBLE</span>
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

            {/* --- FORMULARIO DE INFORMACIÓN --- */}
            <section className="form-section">
                <h4 className="section-title">Información</h4>

                <div className="input-group">
                    <label>Nombre</label>
                    {/* Usamos defaultValue para que cargue el dato pero permita ser editado después */}
                    <input type="text" defaultValue={product.name} />
                </div>

                <div className="input-group">
                    <label>Valor</label>
                    <input type="number" className="input-number" defaultValue={product.price} />
                </div>

                <div className="input-group stock-group">
                    <label>Stock</label>
                    <div className="stock-counter">
                        <button type="button" className="counter-btn">-</button>
                        <input type="number" defaultValue={product.stock} readOnly className="counter-input" />
                        <button type="button" className="counter-btn">+</button>
                    </div>
                </div>

                <div className="input-group">
                    <label>Descripción</label>
                    <textarea 
                        rows="5"
                        defaultValue={`Especificaciones de ${product.name}. Código interno: ${product.code}.`}
                    ></textarea>
                </div>

                <div className="input-group">
                    <label>Tienda</label>
                    <select defaultValue="principal">
                        <option value="" disabled>Select</option>
                        <option value="principal">Tienda Principal</option>
                        <option value="otra">Otra Tienda</option>
                    </select>
                </div>
            </section>

            {/* --- SECCIÓN GALERÍA --- */}
            <section className="form-section">
                <h4 className="section-title">Galería de Imágenes</h4>
                
                <div className="input-group">
                    <label>Nueva Imagen URL</label>
                    <input type="text" placeholder="https://..." defaultValue={product.imageUrl} />
                </div>
            </section>

        </div>
    );
};

export default ProductView;
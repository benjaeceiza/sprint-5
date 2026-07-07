import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiLoader, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';
import { MdCategory } from 'react-icons/md';
import { getCategoryById, updateCategory, deleteCategory } from '../../../services/categoryService';
import { getProducts } from '../../../services/productService';
import NotFound from '../../NotFound/NotFound'; 
import './CategoryView.css';

const CategoryView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [originalCategory, setOriginalCategory] = useState(null);
    const [category, setCategory] = useState(null);
    const [linkedProductsCount, setLinkedProductsCount] = useState(0);
    
    const [isLoading, setIsLoading] = useState(true);
    const [categoryNotFound, setCategoryNotFound] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Traemos la categoría
                const catData = await getCategoryById(id);
                setCategory(catData);
                setOriginalCategory(catData);

                // 2. Traemos todos los productos y contamos cuántos usan esta categoría
                const allProducts = await getProducts();
                const count = allProducts.filter(p => String(p.category_id) === String(id)).length;
                setLinkedProductsCount(count);

            } catch (error) {
                console.error("Error al cargar datos:", error);
                setCategoryNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleChange = (field, value) => {
        setErrorMsg('');
        setCategory({ ...category, [field]: value });
    };

    const handleSave = async () => {
        if (!category.name.trim() || !category.slug.trim()) {
            setErrorMsg('El nombre y el slug (ruta) son obligatorios.');
            return;
        }

        try {
            await updateCategory(id, category);
            alert("¡Categoría actualizada exitosamente!");
            setOriginalCategory(category);
        } catch (error) {
            console.error("Error al guardar:", error);
            setErrorMsg("Hubo un error al intentar guardar los cambios.");
        }
    };

    const handleCancel = () => {
        setCategory({ ...originalCategory });
        setErrorMsg('');
    };

    const handleDelete = async () => {
        // Doble validación de seguridad
        if (linkedProductsCount > 0) return; 

        if (window.confirm(`¿Estás seguro de que querés eliminar la categoría "${category.name}"? Esta acción no se puede deshacer.`)) {
            try {
                await deleteCategory(id);
                alert("Categoría eliminada.");
                navigate('/categoriesList');
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar la categoría.");
            }
        }
    };

    const hasChanges = originalCategory && category && (
        originalCategory.name !== category.name ||
        originalCategory.slug !== category.slug
    );

    if (isLoading) {
        return (
            <div className="category-view-container center-content">
                <FiLoader className="loading-spinner" />
            </div>
        );
    }

    if (categoryNotFound || !category) {
        return <NotFound />;
    }

    return (
        <div className="category-view-container">
            
            {/* --- CABECERA / RESUMEN --- */}
            <div className="product-summary">
                <div className="avatar-wrapper">
                    <div className="category-icon-large">
                        <MdCategory className="placeholder-icon" />
                    </div>
                </div>
                
                <div className="summary-details">
                    <h3 className="summary-title">{originalCategory.name}</h3>
                    
                    <div className="summary-stats">
                        <span className="stat-item">
                            <strong className="stat-number">#{category.id}</strong>
                            <span className="stat-label">ID INTERNO</span>
                        </span>
                        
                        <span className="stat-item">
                            {/* Color dinámico: Si tiene productos es verde/gris, si está vacía, rojo */}
                            <strong className="stat-number" style={{ color: linkedProductsCount > 0 ? '#E0E3E6' : '#EC1C24' }}>
                                {linkedProductsCount}
                            </strong>
                            <span className="stat-label">PRODUCTOS VINCULADOS</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* --- FORMULARIO DE EDICIÓN --- */}
            <section className="form-section">
                <h4 className="section-title">Información de la Categoría</h4>

                {errorMsg && <div className="error-alert">⚠️ {errorMsg}</div>}

                <div className="input-group">
                    <label>Nombre Público</label>
                    <input 
                        type="text" 
                        value={category.name} 
                        onChange={(e) => handleChange('name', e.target.value)} 
                    />
                </div>

                <div className="input-group">
                    <label>Slug (Ruta en la URL)</label>
                    <input 
                        type="text" 
                        value={category.slug} 
                        onChange={(e) => handleChange('slug', e.target.value)} 
                    />
                </div>

                <div className="action-buttons-end">
                    <button 
                        type="button"
                        onClick={handleCancel}
                        disabled={!hasChanges}
                        className={`btn-cancel ${hasChanges ? 'active' : ''}`}
                    >
                        Cancelar
                    </button>
                    
                    <button 
                        type="button"
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className={`btn-save ${hasChanges ? 'active' : ''}`}
                    >
                        Guardar Cambios
                    </button>
                </div>
            </section>

            {/* --- ZONA PELIGROSA --- */}
            <section className="form-section danger-zone">
                <div className="danger-header">
                    <FiAlertTriangle className="danger-icon" />
                    <h4 className="section-title danger-title">Zona Peligrosa</h4>
                </div>
                
                <p className="danger-text">
                    Borrar una categoría es irreversible. Para proteger la integridad de tu tienda, 
                    <strong> el sistema solo te permite eliminar categorías que estén completamente vacías.</strong>
                </p>

                {linkedProductsCount > 0 ? (
                    <div className="blocked-delete-msg">
                        Actualmente hay <strong>{linkedProductsCount} producto(s)</strong> usando esta categoría. 
                        Debés reasignarlos o eliminarlos antes de poder borrarla.
                    </div>
                ) : (
                    <button type="button" onClick={handleDelete} className="btn-delete-full">
                        <FiTrash2 style={{ marginRight: '8px' }} />
                        Eliminar Categoría Definitivamente
                    </button>
                )}
            </section>

        </div>
    );
};

export default CategoryView;
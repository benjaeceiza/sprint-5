import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiLoader, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';
import { MdStore } from 'react-icons/md';
import { getStoreById, updateStore, deleteStore } from '../../../services/storeService';
import { getProducts } from '../../../services/productService';
import NotFound from '../../NotFound/NotFound';
import './StoreView.css';

const StoreView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [originalStore, setOriginalStore] = useState(null);
    const [store, setStore] = useState(null);
    const [linkedProductsCount, setLinkedProductsCount] = useState(0);
    
    const [isLoading, setIsLoading] = useState(true);
    const [storeNotFound, setStoreNotFound] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const loadStoreData = async () => {
            try {
                const storeData = await getStoreById(id);
                setStore(storeData);
                setOriginalStore(storeData);

                // Contamos productos vinculados a esta tienda
                const allProducts = await getProducts();
                const count = allProducts.filter(p => String(p.store_id) === String(id)).length;
                setLinkedProductsCount(count);
            } catch (error) {
                console.error(error);
                setStoreNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };
        loadStoreData();
    }, [id]);

    const handleChange = (field, value) => {
        setErrorMsg('');
        setStore({ ...store, [field]: value });
    };

    const handleSave = async () => {
        if (!store.name.trim() || !store.slug.trim()) {
            setErrorMsg('El nombre y el slug son obligatorios.');
            return;
        }
        try {
            await updateStore(id, store);
            alert("¡Tienda actualizada correctamente!");
            setOriginalStore(store);
        } catch (error) {
            setErrorMsg("Hubo un error al guardar.");
        }
    };

    const handleDelete = async () => {
        if (linkedProductsCount > 0) return;
        if (window.confirm(`¿Seguro que querés eliminar la tienda "${store.name}"?`)) {
            try {
                await deleteStore(id);
                alert("Tienda eliminada.");
                navigate('/tienda');
            } catch (error) {
                alert("Error al eliminar.");
            }
        }
    };

    const hasChanges = originalStore && store && (
        originalStore.name !== store.name || originalStore.slug !== store.slug
    );

    if (isLoading) return <div className="category-view-container center-content"><FiLoader className="loading-spinner" /></div>;
    if (storeNotFound || !store) return <NotFound />;

    return (
        <div className="category-view-container">
            <div className="product-summary">
                <div className="avatar-wrapper">
                    <div className="category-icon-large">
                        <MdStore className="placeholder-icon" />
                    </div>
                </div>
                <div className="summary-details">
                    <h3 className="summary-title">{originalStore.name}</h3>
                    <div className="summary-stats">
                        <span className="stat-item">
                            <strong className="stat-number">#{store.id}</strong>
                            <span className="stat-label">ID TIENDA</span>
                        </span>
                        <span className="stat-item">
                            <strong className="stat-number" style={{ color: linkedProductsCount > 0 ? '#E0E3E6' : '#EC1C24' }}>
                                {linkedProductsCount}
                            </strong>
                            <span className="stat-label">PRODUCTOS EN TIENDA</span>
                        </span>
                    </div>
                </div>
            </div>

            <section className="form-section">
                <h4 className="section-title">Información de la Tienda</h4>
                {errorMsg && <div className="error-alert">⚠️ {errorMsg}</div>}

                <div className="input-group">
                    <label>Nombre de la Sucursal</label>
                    <input type="text" value={store.name} onChange={(e) => handleChange('name', e.target.value)} />
                </div>

                <div className="input-group">
                    <label>Slug (Identificador en URL)</label>
                    <input type="text" value={store.slug} onChange={(e) => handleChange('slug', e.target.value)} />
                </div>

                <div className="action-buttons-end">
                    <button type="button" onClick={() => setStore({...originalStore})} disabled={!hasChanges} className={`btn-cancel ${hasChanges ? 'active' : ''}`}>Cancelar</button>
                    <button type="button" onClick={handleSave} disabled={!hasChanges} className={`btn-save ${hasChanges ? 'active' : ''}`}>Guardar Cambios</button>
                </div>
            </section>

            <section className="form-section danger-zone">
                <div className="danger-header">
                    <FiAlertTriangle className="danger-icon" />
                    <h4 className="section-title danger-title">Zona Peligrosa</h4>
                </div>
                <p className="danger-text">Para proteger el inventario, el sistema impide borrar tiendas que tengan mercadería asignada.</p>
                {linkedProductsCount > 0 ? (
                    <div className="blocked-delete-msg">
                        Hay <strong>{linkedProductsCount} producto(s)</strong> vinculados. Reasigna su stock antes de eliminar.
                    </div>
                ) : (
                    <button type="button" onClick={handleDelete} className="btn-delete-full"><FiTrash2 style={{ marginRight: '8px' }} /> Eliminar Tienda Definitivamente</button>
                )}
            </section>
        </div>
    );
};

export default StoreView;
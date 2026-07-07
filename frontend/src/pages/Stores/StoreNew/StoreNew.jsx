import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdStore } from 'react-icons/md';
import { createStore } from '../../../services/storeService';
import '../../Categories/CategoryView/CategoryView.css';

const StoreNew = () => {
    const navigate = useNavigate();
    const [store, setStore] = useState({ name: '', slug: '' });
    const [errorMsg, setErrorMsg] = useState('');
    const [isSlugEdited, setIsSlugEdited] = useState(false);

    const generateSlug = (text) => {
        return text.toString().toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    };

    const handleNameChange = (e) => {
        const val = e.target.value;
        setErrorMsg('');
        if (!isSlugEdited) {
            setStore({ name: val, slug: generateSlug(val) });
        } else {
            setStore({ ...store, name: val });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!store.name.trim() || !store.slug.trim()) {
            setErrorMsg('Todos los campos son obligatorios.');
            return;
        }
        try {
            await createStore(store);
            alert("¡Tienda creada con éxito!");
            navigate('/tienda');
        } catch (error) {
            setErrorMsg("Error al guardar en el servidor.");
        }
    };

    return (
        <div className="category-view-container">
            <div className="product-summary">
                <div className="avatar-wrapper"><div className="category-icon-large"><MdStore className="placeholder-icon" /></div></div>
                <div className="summary-details">
                    <h3 className="summary-title">{store.name || 'Nueva Tienda'}</h3>
                    <div className="summary-stats">
                        <span className="stat-item"><strong className="stat-number" style={{ fontSize: '1rem', color: '#8E9197' }}>/{store.slug || 'slug-tienda'}</strong><span className="stat-label">URL DE LA TIENDA</span></span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSave} className="form-section">
                <h4 className="section-title">Registrar Nueva Tienda</h4>
                {errorMsg && <div className="error-alert">⚠️ {errorMsg}</div>}

                <div className="input-group">
                    <label>Nombre de la Tienda *</label>
                    <input type="text" placeholder="Ej: Sucursal San Luis" value={store.name} onChange={handleNameChange} autoFocus />
                </div>

                <div className="input-group">
                    <label>Slug *</label>
                    <input type="text" placeholder="ej: sucursal-san-luis" value={store.slug} onChange={(e) => { setIsSlugEdited(true); setStore({ ...store, slug: generateSlug(e.target.value) }); }} />
                </div>

                <div className="action-buttons-end">
                    <button type="button" onClick={() => navigate('/tienda')} className="btn-cancel active">Cancelar</button>
                    <button type="submit" disabled={!store.name.trim()} className={`btn-save ${store.name.trim() ? 'active' : ''}`}>Crear Tienda</button>
                </div>
            </form>
        </div>
    );
};

export default StoreNew;
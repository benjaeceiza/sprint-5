import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLoader, FiChevronRight } from 'react-icons/fi';
import { MdStore } from 'react-icons/md';
import { getStores } from '../../../services/storeService';
import './StoresList.css';

const StoresList = () => {
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const data = await getStores();
                setStores(data);
            } catch (error) {
                console.error("Error al cargar tiendas:", error);
                setErrorMsg("No se pudieron cargar las tiendas.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchStores();
    }, []);

    if (isLoading) {
        return (
            <div className="stores-list-container center-spinner">
                <FiLoader className="loading-spinner" />
            </div>
        );
    }

    return (
        <div className="stores-list-container">
            {errorMsg && <div className="error-message">⚠️ {errorMsg}</div>}

            <div className="stores-cards-wrapper">
                {stores.length === 0 && !errorMsg ? (
                    <div className="empty-state">No hay tiendas registradas todavía.</div>
                ) : (
                    stores.map((store) => (
                        <div 
                            key={store.id} 
                            className="store-individual-card"
                            onClick={() => navigate(`/tienda/${store.id}`)}
                        >
                            <div className="store-item-left">
                                <div className="store-icon-wrapper">
                                    <MdStore className="store-icon" />
                                </div>
                                <div className="store-info">
                                    <span className="store-title-text">{store.name}</span>
                                    <span className="store-slug-text">#{store.id} - /{store.slug}</span>
                                </div>
                            </div>
                            <div className="store-item-right">
                                <FiChevronRight className="arrow-icon" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StoresList;
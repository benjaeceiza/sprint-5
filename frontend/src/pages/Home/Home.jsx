import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCube, FaStore } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';


import { getProducts } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import { getStores } from '../../services/storeService';

import './Home.css';

const Home = () => {
    // Estados para almacenar los totales reales
    const [counts, setCounts] = useState({
        products: 0,
        stores: 0,
        categories: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Ejecutamos las tres consultas HTTP en paralelo gracias a los servicios
                const [productsData, storesData, categoriesData] = await Promise.all([
                    getProducts(),
                    getStores(),
                    getCategories()
                ]);

                // Guardamos los totales basados en el tamaño de los arreglos que devuelve el backend
                setCounts({
                    products: productsData.length || 0,
                    stores: storesData.length || 0,
                    categories: categoriesData.length || 0
                });
            } catch (error) {
                console.error("Error al sincronizar el dashboard con los servicios:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="home-container">
            <div className="dashboard-cards">
                
                {/* --- CARD: PRODUCTOS --- */}
                <div className="dashboard-card">
                    <div className="card-info">
                        <FaCube className="card-icon" />
                        <span className="card-title">
                            <strong>{isLoading ? '...' : counts.products}</strong> Productos
                        </span>
                    </div>
                    <div className="card-actions">
                        <Link to="/products" className="btn-secondary">Ver Listado</Link>
                        <Link to="/products/new" className="btn-primary">Agregar Producto</Link>
                    </div>
                </div>

                {/* --- CARD: TIENDAS --- */}
                <div className="dashboard-card">
                    <div className="card-info">
                        <FaStore className="card-icon" />
                        <span className="card-title">
                            <strong>{isLoading ? '...' : counts.stores}</strong> Tiendas
                        </span>
                    </div>
                    <div className="card-actions">
                        <Link to="/tienda" className="btn-secondary">Ver Listado</Link>
                        <Link to="/tienda/new" className="btn-primary">Agregar Tienda</Link>
                    </div>
                </div>

                {/* --- CARD: CATEGORÍAS --- */}
                <div className="dashboard-card">
                    <div className="card-info">
                        <MdCategory className="card-icon" />
                        <span className="card-title">
                            <strong>{isLoading ? '...' : counts.categories}</strong> Categorías
                        </span>
                    </div>
                    <div className="card-actions">
                        <Link to="/categories" className="btn-secondary">Ver Listado</Link>
                        <Link to="/categories/new" className="btn-primary">Agregar Categoría</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
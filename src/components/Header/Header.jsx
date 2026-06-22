import React from 'react';
import { useLocation } from "react-router-dom";
import { FiSearch, FiPlus } from 'react-icons/fi'; // Sumamos FiPlus acá
import './Header.css';

const Header = () => {
    const location = useLocation();

    const getHeaderTitle = () => {
        if (location.pathname === "/") return "¡Hola usuario!";
        if (location.pathname.startsWith("/products")) return "Productos";
        if (location.pathname.startsWith("/stores")) return "Tiendas";
        if (location.pathname.startsWith("/profile")) return "Perfil";
        
        return "Dashboard";
    };

    const isProductsRoute = location.pathname.startsWith("/products");

    return (
        <header className="global-header">
            <h2>{getHeaderTitle()}</h2>

            {/* Renderizado condicional: Buscador + Botón */}
            {isProductsRoute && (
                <div className="header-actions">
                    <div className="search-container">
                        <FiSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Buscar productos..." 
                            className="search-input"
                        />
                    </div>
                    
                    <button className="btn-add-header">
                        <FiPlus className="add-icon" />
                        Agregar Producto
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
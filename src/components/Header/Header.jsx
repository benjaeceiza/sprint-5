import React, { useState } from 'react';
import { useLocation, useMatch } from "react-router-dom";
import { FiSearch, FiPlus, FiMenu, FiX } from 'react-icons/fi'; 
import productsData from '../../data/products.json';
import './Header.css';

const Header = ({ toggleSidebar }) => {
    const location = useLocation();
    
    // Estado para controlar si el buscador está abierto en celular
    const [isSearchActive, setIsSearchActive] = useState(false);

    const isProductList = location.pathname === "/products";
    const productMatch = useMatch("/products/:id");
    const isProductView = productMatch !== null;

    const getHeaderTitle = () => {
        if (location.pathname === "/") return "¡Hola Usuario!";
        
        if (isProductList) return "Productos";
        
        if (isProductView) {
            const id = productMatch.params.id;
            const product = productsData.find(p => p.id === parseInt(id, 10));
            const code = product ? product.code : `#${id}`;
            
            return (
                <span className="breadcrumb">
                    Productos <span className="breadcrumb-arrow">&gt;</span> <span className="breadcrumb-code">{code}</span>
                </span>
            );
        }

        if (location.pathname.startsWith("/stores")) return "Tiendas";
        if (location.pathname.startsWith("/profile")) return "Perfil";
        
        return "Dashboard";
    };

    return (
        <header className="global-header">
            
            {/* Agrupamos menú y título. Se ocultan en mobile si el buscador está activo */}
            <div className={`header-left ${isSearchActive ? 'hide-on-mobile-search' : ''}`}>
                <button className="mobile-menu-btn" onClick={toggleSidebar}>
                    <FiMenu />
                </button>
                <h2>{getHeaderTitle()}</h2>
            </div>

            {/* --- VISTA: LISTADO DE PRODUCTOS --- */}
            {isProductList && (
                <div className={`header-actions ${isSearchActive ? 'search-active' : ''}`}>
                    
                    {/* Botón X: Solo se renderiza en mobile cuando el buscador está activo */}
                    {isSearchActive && (
                        <button className="close-search-btn" onClick={() => setIsSearchActive(false)}>
                            <FiX />
                        </button>
                    )}

                    <div 
                        className="search-container"
                        onClick={() => setIsSearchActive(true)}
                    >
                        {/* Lupa a la izquierda (Desktop / Mobile inactivo) */}
                        <FiSearch className="search-icon left-icon" />
                        
                        <input 
                            type="text" 
                            placeholder="Buscar productos" 
                            className="search-input"
                        />

                        {/* Lupa a la derecha (Solo para Mobile activo) */}
                        <FiSearch className="search-icon right-icon" />
                    </div>
                    
                    <button className="btn-add-header">
                        <FiPlus className="add-icon" />
                        <span className="btn-text">Agregar Producto</span>
                    </button>
                </div>
            )}

            {/* --- VISTA: PRODUCTO INDIVIDUAL --- */}
            {isProductView && (
                <div className="header-actions">
                    <button className="btn-delete-header">
                        Eliminar
                    </button>
                </div>
            )}

        </header>
    );
};

export default Header;
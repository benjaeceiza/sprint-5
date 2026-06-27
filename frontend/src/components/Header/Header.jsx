import { useState, useEffect } from 'react';
import { useLocation, useMatch, Link, useNavigate } from "react-router-dom";
import { FiSearch, FiPlus, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

const Header = ({ toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Estado para guardar el código real que viene del backend
    const [productCode, setProductCode] = useState('');

    const isProductList = location.pathname === "/products";
    const productMatch = useMatch("/products/:id");
    const isProductView = productMatch !== null;
    const productId = productMatch?.params?.id;

    //  Consumimos la API en el Header para obtener el código dinámico
    useEffect(() => {
        if (isProductView && productId && productId !== 'new') {
            fetch(`http://localhost:3000/api/products/${productId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.code) setProductCode(data.code);
                })
                .catch(err => console.error("Error al buscar código del producto:", err));
        } else if (productId === 'new') {
            setProductCode(''); // Limpiamos el código si es un producto nuevo
        }
    }, [isProductView, productId]);

    const getHeaderTitle = () => {
        if (location.pathname === "/") return "¡Hola Benja!";
        if (isProductList) return "Productos";

        if (isProductView) {

            const displayCode = productCode ? productCode : `#${productId}`;
            return (
                <span className="breadcrumb">
                    Productos <span className="breadcrumb-arrow">&gt;</span> <span className="breadcrumb-code">{displayCode}</span>
                </span>
            );
        }

        if (location.pathname.startsWith("/stores")) return "Tiendas";
        if (location.pathname.startsWith("/profile")) return "Perfil";

        return "Dashboard";
    };

    // FUNCIÓN PARA LA BÚSQUEDA EN TIEMPO REAL
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Actualizamos el input visualmente

        // Y automáticamente se cambia la URL en cada pulsación
        if (!value.trim()) {
            navigate('/products', { replace: true });
        } else {
            navigate(`/products?search=${encodeURIComponent(value)}`, { replace: true });
        }
    };

    const closeSearch = () => {
        setIsSearchActive(false);
        setSearchTerm('');
        navigate('/products');
    };

    // ELIMINAR DESDE EL HEADER
    const handleDeleteProduct = async () => {
        if (window.confirm("¿Estás seguro de que querés eliminar este producto? Esta acción no se puede deshacer.")) {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}/delete`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert("¡Producto eliminado correctamente de la base de datos!");
                    navigate('/products'); // Lo mandamos al listado de nuevo
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    return (
        <header className="global-header">

            <div className={`header-left ${isSearchActive ? 'hide-on-mobile-search' : ''}`}>
                <button className="mobile-menu-btn" onClick={toggleSidebar}>
                    <FiMenu />
                </button>
                <h2>{getHeaderTitle()}</h2>
            </div>

            {isProductList && (
                <div className={`header-actions ${isSearchActive ? 'search-active' : ''}`}>

                    {isSearchActive && (
                        <button className="close-search-btn" onClick={closeSearch}>
                            <FiX />
                        </button>
                    )}

                    {/* Prevenimos el submit por defecto */}
                    <form className="search-container" onClick={() => setIsSearchActive(true)} onSubmit={(e) => e.preventDefault()}>
                        <FiSearch className="search-icon left-icon" />
                        <input
                            type="text"
                            placeholder="Buscar productos"
                            className="search-input"
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <button type="submit" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                            <FiSearch className="search-icon right-icon" />
                        </button>
                    </form>

                    <Link className="btn-add-header" to="/products/new">
                        <FiPlus className="add-icon" />
                        <span className="btn-text">Agregar Producto</span>
                    </Link>
                </div>
            )}

            {isProductView && (
                <div className="header-actions">
                    <button className="btn-delete-header" onClick={handleDeleteProduct}>
                        Eliminar
                    </button>
                </div>
            )}

        </header>
    );
};

export default Header;
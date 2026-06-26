import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { FiLoader, FiSearch } from 'react-icons/fi';
import './ProductsList.css';

const ProductsList = () => {
    const location = useLocation();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('search') || '';


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();

                // Guardamos los datos reales de la base de datos en el estado
                setProducts(data);
            } catch (error) {
                console.error("❌ Error al cargar los productos de la API:", error);
            } finally {
                // Apagamos la ruedita de carga, haya funcionado o haya fallado
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);


    // Filtrado por categoria y nombre del producto, usando el searchParam que viene de la URL
    const filteredProducts = products.filter((product) => {
        if (!searchParam.trim()) return true;

        const term = searchParam.toLowerCase();

     
        const categoryName = product.category_name || product.category || "";

        return (
            (product.name && product.name.toLowerCase().includes(term)) ||
            (product.code && product.code.toLowerCase().includes(term)) ||
            categoryName.toLowerCase().includes(term)
        );
    });

    if (isLoading) {
        return (
            <div className="loading-container">
                <FiLoader className="loading-spinner" />
                <p>Conectando con la base de datos...</p>
            </div>
        );
    }

    return (
        <div className="products-container">
            {filteredProducts.length === 0 ? (
                <div className="empty-search-state">
                    <FiSearch className="empty-icon" />
                    <h3>No encontramos coincidencias</h3>
                    <p>No hay productos que coincidan con la búsqueda "{searchParam}".</p>
                </div>
            ) : (
                <div className="products-list">
                    {filteredProducts.map((product) => (
                        <Link to={`/products/${product.id}`} key={product.id} className="product-item">
                            <div className="product-left">
                                <img src={product.imageUrl} alt={product.name} className="product-image" />
                                <div className="product-details">
                                    <span className="product-name">{product.name}</span>
                                    <span className="product-code">{product.code}</span>
                                </div>
                            </div>
                            <FaChevronRight className="product-chevron" />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsList;
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './ProductsList.css';
import productsData from "../../../data/products.json"; 
import { Link } from 'react-router-dom';

const ProductsList = () => {
    return (
        <div className="products-container">
            <div className="products-list">
                {productsData.map((product) => (
                    <Link to={`/products/${product.id}`} key={product.id} className="product-item">
                        <div className="product-left">
                            <img 
                                src={product.imageUrl} 
                                alt={`Imagen de ${product.name}`} 
                                className="product-image"
                            />
                            
                            <div className="product-details">
                                <span className="product-name">{product.name}</span>
                                <span className="product-code">{product.code}</span>
                            </div>
                        </div>
                        
                        <FaChevronRight className="product-chevron" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;
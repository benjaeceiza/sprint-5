import React from 'react';
import { FaCube, FaStore } from 'react-icons/fa';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Ya no hay header acá, va directo a las tarjetas */}
      <div className="dashboard-cards">
        
        <div className="dashboard-card">
          <div className="card-info">
            <FaCube className="card-icon" />
            <span className="card-title"><strong>123</strong> Productos</span>
          </div>
          <div className="card-actions">
            <Link to="/products" className="btn-secondary">Ver Listado</Link>
            <Link to="/products/new" className="btn-primary">Agregar Producto</Link>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-info">
            <FaStore className="card-icon" />
            <span className="card-title"><strong>10</strong> Categorías</span>
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
import React from 'react';
import { FaCube, FaStore } from 'react-icons/fa';
import './Home.css';

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
            <button className="btn-secondary">Ver Listado</button>
            <button className="btn-primary">Agregar Producto</button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-info">
            <FaStore className="card-icon" />
            <span className="card-title"><strong>10</strong> Tiendas</span>
          </div>
          <div className="card-actions">
            <button className="btn-secondary">Ver Listado</button>
            <button className="btn-primary">Agregar Tienda</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
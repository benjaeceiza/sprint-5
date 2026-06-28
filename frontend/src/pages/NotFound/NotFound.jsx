
import { Link, useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiArrowLeft, FiHome } from 'react-icons/fi';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                
                {/* Ícono de alerta animado o estático con el color de la marca */}
                <div className="not-found-icon-wrapper">
                    <FiAlertTriangle className="not-found-icon" />
                </div>

                {/* Número de error gigante pero sofisticado */}
                <h1 className="not-found-code">404</h1>
                
                <h2 className="not-found-title">Página no encontrada</h2>
                
                <p className="not-found-text">
                    La ruta a la que estás intentando acceder no existe, fue movida o no tenés los permisos necesarios para verla.
                </p>

                {/* Botonera de acciones rápidas */}
                <div className="not-found-actions">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="btn-not-found-secondary"
                    >
                        <FiArrowLeft style={{ marginRight: '8px' }} />
                        Volver atrás
                    </button>

                    <Link to="/products" className="btn-not-found-primary">
                        <FiHome style={{ marginRight: '8px' }} />
                        Ir a Productos
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;
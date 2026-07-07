import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLoader, FiChevronRight } from 'react-icons/fi';
import { MdCategory } from 'react-icons/md';
import { getCategories } from '../../../services/categoryService'; 
import './CategoriesList.css';

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error al cargar categorías:", error);
                setErrorMsg("No se pudieron cargar las categorías.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (isLoading) {
        return (
            <div className="categories-list-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <FiLoader className="loading-spinner" style={{ fontSize: '2rem', color: '#E0E3E6', animation: 'spin 1s linear infinite' }} />
            </div>
        );
    }

    return (
        <div className="categories-list-container">
            {errorMsg && <div className="error-message">⚠️ {errorMsg}</div>}

            {/* --- LISTADO DE TARJETAS SEPARADAS --- */}
            <div className="categories-cards-wrapper">
                {categories.length === 0 && !errorMsg ? (
                    <div className="empty-state">No hay categorías registradas todavía.</div>
                ) : (
                    categories.map((category) => (
                        <div 
                            key={category.id} 
                            className="category-individual-card"
                            onClick={() => navigate(`/categories/${category.id}`)}
                        >
                            <div className="category-item-left">
                                <div className="category-icon-wrapper">
                                    <MdCategory className="category-icon" />
                                </div>
                                <div className="category-info">
                                    <span className="category-name">{category.name}</span>
                                    <span className="category-slug">#{category.id} - /{category.slug}</span>
                                </div>
                            </div>
                            <div className="category-item-right">
                                <FiChevronRight className="arrow-icon" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoriesList;
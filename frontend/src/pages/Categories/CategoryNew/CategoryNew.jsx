import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCategory } from 'react-icons/md';
import { createCategory } from '../../../services/categoryService';
import '../CategoryView/CategoryView.css';

const CategoryNew = () => {
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        name: '',
        slug: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    // Función para convertir texto en slug (Ej: "Ropa de Verano" -> "ropa-de-verano")
    const generateSlug = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .normalize('NFD') // Quita acentos (á -> a)
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9 -]/g, '') // Borra caracteres especiales
            .replace(/\s+/g, '-') // Reemplaza espacios por guiones
            .replace(/-+/g, '-'); // Evita guiones repetidos
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setErrorMsg('');

        // Si el usuario no tocó el slug a mano, lo auto-generamos
        if (!isSlugManuallyEdited) {
            setCategory({
                name: newName,
                slug: generateSlug(newName)
            });
        } else {
            setCategory({ ...category, name: newName });
        }
    };

    const handleSlugChange = (e) => {
        setErrorMsg('');
        setIsSlugManuallyEdited(true); // Le avisamos al sistema que el usuario lo quiere personalizado
        setCategory({ ...category, slug: generateSlug(e.target.value) });
    };

    const handleCancel = () => {
        if (window.confirm("¿Querés cancelar? Se perderán los datos ingresados.")) {
            navigate('/categoriesList');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!category.name.trim()) {
            setErrorMsg('El nombre de la categoría es obligatorio.');
            return;
        }

        if (!category.slug.trim()) {
            setErrorMsg('El slug es obligatorio para la URL de la tienda.');
            return;
        }

        try {
            await createCategory(category);
            alert("¡Categoría creada con éxito!");
            navigate('/categoriesList'); // Volvemos al listado
        } catch (error) {
            console.error("Error al crear:", error);
            setErrorMsg("Hubo un problema al intentar guardar la categoría en el servidor.");
        }
    };

    const isFormValid = category.name.trim() !== '' && category.slug.trim() !== '';

    return (
        <div className="category-view-container">

            {/* --- RESUMEN / VISTA PREVIA --- */}
            <div className="product-summary">
                <div className="avatar-wrapper">
                    <div className="category-icon-large">
                        <MdCategory className="placeholder-icon" />
                    </div>
                </div>

                <div className="summary-details">
                    <h3 className="summary-title">
                        {category.name || 'Nueva Categoría'}
                    </h3>

                    <div className="summary-stats">
                        <span className="stat-item">
                            <strong className="stat-number" style={{ fontSize: '1rem', color: '#8E9197' }}>
                                /{category.slug || 'ruta-de-ejemplo'}
                            </strong>
                            <span className="stat-label">VISTA PREVIA DEL SLUG</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* --- FORMULARIO DE ALTA --- */}
            <form onSubmit={handleSave} className="form-section">
                <h4 className="section-title">Crear Nueva Categoría</h4>

                {errorMsg && <div className="error-alert">⚠️ {errorMsg}</div>}

                <div className="input-group">
                    <label>Nombre de la Categoría *</label>
                    <input
                        type="text"
                        placeholder="Ej: Calzado Deportivo"
                        value={category.name}
                        onChange={handleNameChange}
                        autoFocus
                    />
                </div>

                <div className="input-group">
                    <label>Slug (URL amigable) *</label>
                    <input
                        type="text"
                        placeholder="ej: calzado-deportivo"
                        value={category.slug}
                        onChange={handleSlugChange}
                    />
                    <small style={{ color: '#8E9197', marginTop: '6px', display: 'block' }}>
                        💡 Se genera automáticamente a partir del nombre, pero podés modificarlo si querés.
                    </small>
                </div>

                {/* --- BOTONES DE ACCIÓN --- */}
                <div className="action-buttons-end">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn-cancel active"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`btn-save ${isFormValid ? 'active' : ''}`}
                    >
                        Crear Categoría
                    </button>
                </div>
            </form>

        </div>
    );
};

export default CategoryNew;
const API_URL = 'http://localhost:3000/api/categories';

export const getCategories = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al cargar categorías');
    return await response.json();
};

export const getCategoryById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Error al cargar la categoría');
    return await response.json();
};

export const createCategory = async (categoryData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
    });
    if (!response.ok) throw new Error('Error al crear la categoría');
    return await response.json();
};

export const updateCategory = async (id, categoryData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
    });
    if (!response.ok) throw new Error('Error al actualizar la categoría');
    return await response.json();
};

export const deleteCategory = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar la categoría');
    return await response.json();
};
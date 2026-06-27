

const API_URL = 'http://localhost:3000/api/products';

// Traer todos los productos
export const getProducts = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al cargar productos');
    return await response.json();
};

// Traer un producto por ID
export const getProductById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Error al cargar el producto');
    return await response.json();
};

// Crear un producto nuevo
export const createProduct = async (productData) => {
    const response = await fetch(`${API_URL}/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Error al crear el producto');
    return await response.json();
};

// Editar un producto existente
export const updateProduct = async (id, productData) => {
    const response = await fetch(`${API_URL}/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Error al actualizar el producto');
    return await response.json();
};

// Eliminar un producto
export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/${id}/delete`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar el producto');
    return await response.json();
};
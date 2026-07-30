
const API_URL = `${import.meta.env.VITE_API_URL}/api/stores`;

export const getStores = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al cargar las tiendas');
    return await response.json();
};

export const getStoreById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Error al cargar la tienda');
    return await response.json();
};

export const createStore = async (storeData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeData)
    });
    if (!response.ok) throw new Error('Error al crear la tienda');
    return await response.json();
};

export const updateStore = async (id, storeData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeData)
    });
    if (!response.ok) throw new Error('Error al actualizar la tienda');
    return await response.json();
};

export const deleteStore = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar la tienda');
    return await response.json();
};
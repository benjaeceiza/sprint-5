const connectDB = require('../config/db');

const getAllStores = async () => {
    const db = await connectDB();
    return await db.all("SELECT * FROM stores");
};

const getStoreById = async (id) => {
    const db = await connectDB();
    return await db.get("SELECT * FROM stores WHERE id = ?", [id]);
};

const createStore = async (storeData) => {
    const { name, slug, user_id } = storeData;
    const db = await connectDB();
    
    // Si no mandan user_id, le asignamos el 1 por defecto
    const sql = `INSERT INTO stores (name, slug, user_id) VALUES (?, ?, ?)`;
    const result = await db.run(sql, [name, slug, user_id || 1]);
    return result.lastID;
};

const updateStore = async (id, storeData) => {
    const { name, slug } = storeData;
    const db = await connectDB();
    
    const sql = `UPDATE stores SET name = ?, slug = ? WHERE id = ?`;
    const result = await db.run(sql, [name, slug, id]);
    return result.changes;
};

const deleteStore = async (id) => {
    const db = await connectDB();
    const result = await db.run("DELETE FROM stores WHERE id = ?", [id]);
    return result.changes;
};

module.exports = {
    getAllStores, getStoreById, createStore, updateStore, deleteStore
};
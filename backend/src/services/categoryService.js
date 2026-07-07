const connectDB = require('../config/db');

const getAllCategories = async () => {
    const db = await connectDB();
    return await db.all("SELECT * FROM categories");
};

const getCategoryById = async (id) => {
    const db = await connectDB();
    return await db.get("SELECT * FROM categories WHERE id = ?", [id]);
};

const createCategory = async (categoryData) => {
    const { name, slug } = categoryData;
    const db = await connectDB();
    
    const sql = `INSERT INTO categories (name, slug) VALUES (?, ?)`;
    const result = await db.run(sql, [name, slug]);
    return result.lastID;
};

const updateCategory = async (id, categoryData) => {
    const { name, slug } = categoryData;
    const db = await connectDB();
    
    const sql = `UPDATE categories SET name = ?, slug = ? WHERE id = ?`;
    const result = await db.run(sql, [name, slug, id]);
    return result.changes;
};

const deleteCategory = async (id) => {
    const db = await connectDB();
    const result = await db.run("DELETE FROM categories WHERE id = ?", [id]);
    return result.changes;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
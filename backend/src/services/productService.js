
const connectDB = require('../config/db'); 

// 1. Traer todos los productos (con el nombre de su categoría)
const getAllProducts = async () => {
    const db = await connectDB();
    return await db.all(`
        SELECT products.*, categories.name AS category_name 
        FROM products 
        LEFT JOIN categories ON products.category_id = categories.id
    `);
};

// 2. Traer un producto por su ID
const getProductById = async (id) => {
    const db = await connectDB();
    return await db.get("SELECT * FROM products WHERE id = ?", [id]);
};

// 3. Insertar un producto nuevo 
const createProduct = async (productData) => {
    const { name, code, price, stock, description, imageUrl, category_id, store_id } = productData;
    const db = await connectDB();
    
    const sql = `INSERT INTO products 
                 (name, code, price, stock, description, imageUrl, category_id, store_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                 
    const result = await db.run(sql, [name, code, price, stock, description, imageUrl, category_id, store_id]);
    return result.lastID; // Devuelve el ID autoincremental que le asignó SQLite
};


// 4. Actualizar un producto existente 
const updateProduct = async (id, productData) => {
    const { name, code, price, stock, description, imageUrl, category_id, store_id } = productData;
    const db = await connectDB();
    
    const sql = `UPDATE products 
                 SET name = ?, code = ?, price = ?, stock = ?, description = ?, imageUrl = ?, category_id = ?, store_id = ? 
                 WHERE id = ?`;
                 
    const result = await db.run(sql, [name, code, price, stock, description, imageUrl, category_id, store_id, id]);
    return result.changes; // Devuelve cuántas filas cambiaron
};

// 5. Eliminar un producto
const deleteProduct = async (id) => {
    const db = await connectDB();
    const result = await db.run("DELETE FROM products WHERE id = ?", [id]);
    return result.changes;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
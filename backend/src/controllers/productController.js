const connectDB = require('../config/db');

// GET: Traer todos los productos cruzados con su categoría
const getAllProducts = async (req, res) => {
    try {
        const db = await connectDB();
        
        // Hacemos un JOIN para pegar el 'name' de la categoría a cada producto
        const products = await db.all(`
            SELECT products.*, categories.name AS category_name 
            FROM products 
            LEFT JOIN categories ON products.category_id = categories.id
        `);
        
        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error en getAllProducts:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// GET: Traer un solo producto por ID 
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectDB();
        const product = await db.get("SELECT * FROM products WHERE id = ?", [id]);
        
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT: Modificar un producto entero 
const updateProduct = async (req, res) => {
    const { id } = req.params;
    
    // 1. Extraemos los campos correctos que vienen del body (incluyendo los _id)
    const { name, code, price, stock, description, imageUrl, category_id, store_id } = req.body;

    // 2. Usamos los nombres de las columnas que creamos en tu base de datos SQLite
    const sql = `UPDATE products 
                 SET name = ?, code = ?, price = ?, stock = ?, description = ?, imageUrl = ?, category_id = ?, store_id = ? 
                 WHERE id = ?`;
    
    try {
        const db = await connectDB();
        
        // 3. Ejecutamos la consulta pasando las variables en el mismo orden que los signos de interrogación
        const result = await db.run(sql, [
            name, 
            code, 
            price, 
            stock, 
            description, 
            imageUrl, 
            category_id, // Usamos la llave foránea de categoría
            store_id,    // Usamos la llave foránea de tienda
            id
        ]);
        
        if (result.changes === 0) {
            return res.status(404).json({ message: "Producto no encontrado para editar" });
        }
        
        res.status(200).json({ message: "¡Producto actualizado con éxito!" });
    } catch (error) {
        // Le agregamos un console.error acá para que, si vuelve a fallar, te avise exactamente por qué
        console.error("❌ Error SQL al actualizar:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// DELETE: Eliminar un producto 
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM products WHERE id = ?`;

    try {
        const db = await connectDB();
        const result = await db.run(sql, [id]);
        
        if (result.changes === 0) {
            return res.status(404).json({ message: "Producto no encontrado para eliminar" });
        }

        res.status(200).json({ message: "Producto eliminado por completo" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
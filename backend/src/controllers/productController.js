// backend/src/controllers/productController.js
const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const newProductId = await productService.createProduct(req.body);
        res.status(201).json({ message: "¡Producto creado con éxito!", productId: newProductId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const changes = await productService.updateProduct(req.params.id, req.body);
        if (changes === 0) return res.status(404).json({ message: "Producto no encontrado para editar" });
        res.status(200).json({ message: "¡Producto actualizado con éxito!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const changes = await productService.deleteProduct(req.params.id);
        if (changes === 0) return res.status(404).json({ message: "Producto no encontrado para eliminar" });
        res.status(200).json({ message: "Producto eliminado por completo" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
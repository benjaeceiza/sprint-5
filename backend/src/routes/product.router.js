const express = require('express');
const router = express.Router();

// Importamos el controlador que creamos en el paso anterior
const productController = require('../controllers/productController');

// 
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas para editar y eliminar productos
router.put('/:id/edit', productController.updateProduct);
router.delete('/:id/delete', productController.deleteProduct);

// Endpoint para crear un nuevo producto
router.post('/new', productController.createProduct);

module.exports = router;
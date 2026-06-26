const express = require('express');
const router = express.Router();

// Importamos el controlador que creamos en el paso anterior
const productController = require('../controllers/productController');

// Definimos los "endpoints" y los conectamos con su función correspondiente
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas exactas que pide tu Sprint 5:
router.put('/:id/edit', productController.updateProduct);
router.delete('/:id/delete', productController.deleteProduct);

module.exports = router;
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


// Rutas para obtener todas las categorías y una categoría específica por ID
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Rutas para crear, actualizar y eliminar categorías
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');


// Rutas para obtener todas las tiendas y una tienda específica por ID
router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStoreById);

// Rutas para crear, actualizar y eliminar tiendas
router.post('/', storeController.createStore);
router.put('/:id', storeController.updateStore);
router.delete('/:id', storeController.deleteStore);

module.exports = router;
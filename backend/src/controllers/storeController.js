const storeService = require('../services/storeService');

const getAllStores = async (req, res) => {
    try {
        const stores = await storeService.getAllStores();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStoreById = async (req, res) => {
    try {
        const store = await storeService.getStoreById(req.params.id);
        if (!store) return res.status(404).json({ message: "Tienda no encontrada" });
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createStore = async (req, res) => {
    try {
        const newId = await storeService.createStore(req.body);
        res.status(201).json({ message: "¡Tienda creada!", id: newId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStore = async (req, res) => {
    try {
        const changes = await storeService.updateStore(req.params.id, req.body);
        if (changes === 0) return res.status(404).json({ message: "Tienda no encontrada" });
        res.status(200).json({ message: "Tienda actualizada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteStore = async (req, res) => {
    try {
        const changes = await storeService.deleteStore(req.params.id);
        if (changes === 0) return res.status(404).json({ message: "Tienda no encontrada" });
        res.status(200).json({ message: "Tienda eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllStores, getStoreById, createStore, updateStore, deleteStore
};
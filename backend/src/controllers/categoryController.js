const categoryService = require('../services/categoryService');

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const newId = await categoryService.createCategory(req.body);
        res.status(201).json({ message: "¡Categoría creada!", id: newId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const changes = await categoryService.updateCategory(req.params.id, req.body);
        if (changes === 0) return res.status(404).json({ message: "Categoría no encontrada" });
        res.status(200).json({ message: "Categoría actualizada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const changes = await categoryService.deleteCategory(req.params.id);
        if (changes === 0) return res.status(404).json({ message: "Categoría no encontrada" });
        res.status(200).json({ message: "Categoría eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory
};
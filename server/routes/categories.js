const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

const Category = mongoose.model('Category', CategorySchema);

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create category
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

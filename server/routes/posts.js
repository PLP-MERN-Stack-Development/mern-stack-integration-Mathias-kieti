const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); 

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author category');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author category');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

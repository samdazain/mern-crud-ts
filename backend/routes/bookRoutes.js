const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
});

// Add a new book
router.post('/', async (req, res) => {
    const { title, author, publishedDate, available } = req.body;
    try {
        const newBook = new Book({ title, author, publishedDate, available });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Error adding book' });
    }
});

// Update a book
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, publishedDate, available } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, publishedDate, available }, { new: true });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book' });
    }
});

module.exports = router;

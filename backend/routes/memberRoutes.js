const express = require('express');
const Member = require('../models/Member');

const router = express.Router();

// Get all members
router.get('/', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching members' });
    }
});

// Add a new member
router.post('/', async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        const newMember = new Member({ name, email, password, isAdmin });
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ error: 'Error adding member' });
    }
});

// Update a member
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, isAdmin } = req.body;
    try {
        const updatedMember = await Member.findByIdAndUpdate(id, { name, email, password, isAdmin }, { new: true });
        res.json(updatedMember);
    } catch (error) {
        res.status(500).json({ error: 'Error updating member' });
    }
});

// Delete a member
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Member.findByIdAndDelete(id);
        res.json({ message: 'Member deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting member' });
    }
});

module.exports = router;

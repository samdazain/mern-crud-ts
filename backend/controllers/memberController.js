const Member = require('../models/Member');

exports.getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addMember = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        const newMember = new Member({ name, email, password, isAdmin });
        await newMember.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateMember = async (req, res) => {
    try {
        const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMember);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteMember = async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Member deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

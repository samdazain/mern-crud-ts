const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const member = await Member.findOne({ email });
        if (!member || !(await member.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: member._id, isAdmin: member.isAdmin }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.register = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        const newMember = new Member({ name, email, password, isAdmin });
        await newMember.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const jwt = require('jsonwebtoken');
const config = require('../config');

exports.isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        req.isAdmin = decoded.isAdmin;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Require Admin Role' });
    next();
};

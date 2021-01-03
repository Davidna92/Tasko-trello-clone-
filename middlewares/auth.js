const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Missing auth token. Access denied")

    try {
        const decoded = jwt.verify(token, process.env.jwtKey);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid auth token');
    }
};
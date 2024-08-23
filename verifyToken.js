const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token tidak ditemukan' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token tidak valid' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;

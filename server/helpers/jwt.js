const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

function signToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET);
    return token
}

function verifyToken(payload) {
    const decoded = jwt.verify(payload, JWT_SECRET);
    return decoded
}

module.exports = { signToken, verifyToken }
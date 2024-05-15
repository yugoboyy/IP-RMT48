const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication(req, res, next) {
    try {
        let { authorization } = req.headers
        if (!authorization) {
            throw ({ name: 'HttpError', status: 401, message: 'Invalid Token' })
        }
        const token = authorization.split(" ")[1]
        const decodedToken = verifyToken(token)
        const user = await User.findByPk(decodedToken.id)
        if (!user) {
            throw ({ name: 'HttpError', status: 401, message: 'Invalid Token' })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = authentication
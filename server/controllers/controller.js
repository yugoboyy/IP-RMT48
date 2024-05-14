const hashPassword = require("../helpers/bcryptjs")
const { User, MyCharacter } = require("../models")

class Controller {
    static async home(req, res) {
        try {
            res.status(200).json({ message: "Hello World!" })
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async postUser(req, res, next) {
        try {
            const { name, email, password, gender, imgUrl, uid } = req.body
            let data = await User.create({ name, email, password: hashPassword(password), gender, imgUrl, uid })
            res.status(200).json({
                id: data.id,
                email: data.email
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = Controller
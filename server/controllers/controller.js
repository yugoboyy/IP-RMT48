const { signToken } = require("../helpers/jwt");
const { User, MyCharacter } = require("../models")
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const { OAuth2Client } = require('google-auth-library');
const { Op } = require("sequelize");
const client = new OAuth2Client();


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
            console.log(password)
            let data = await User.create({ name, email, password, gender, imgUrl, uid })
            res.status(201).json({
                id: data.id,
                email: data.email
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async postLogin(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw ({ name: "HttpError", status: 400, message: "Email is required" })
            }
            if (!password) {
                throw ({ name: "HttpError", status: 400, message: "Password is required" })
            }
            let data = await User.findOne({
                where: {
                    email
                }
            })
            if (!data) {
                throw ({ name: "HttpError", status: 401, message: "Invalid email/password" })
            }
            let isPasswordValid = bcrypt.compareSync(password, data.password)
            if (!isPasswordValid) {
                throw ({ name: "HttpError", status: 401, message: "Invalid email/password" })
            }
            const access_token = signToken({ id: data.id })
            res.status(200).json({ access_token })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async postLoginGoogle(req, res, next) {
        try {
            const { googleToken } = req.body
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: "730683743033-cc49meaplb4v06n2cu6aiqv5f9dv214o.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();
            // const userid = payload['sub'];
            let user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                user = await User.create(
                    {
                        name: payload.name,
                        email: payload.email,
                        password: payload.name
                    },
                    {
                        hooks: false
                    }
                )
            }

            const access_token = signToken({ id: user.id })

            res.status(200).json({ access_token })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getMyCharacters(req, res, next) {
        try {
            let { id } = req.user
            let { search, filter, page } = req.query
            let option = {
                where: {
                    UserId: id
                },
                limit: 8,
                order: [["name", "ASC"]]
            }
            if (search) {
                option.where.name = {
                    [Op.iLike]: `%${search}%`
                }
            }
            if (filter) {
                option.where.constalation = filter
            }
            if (page) {
                option.offset = (page - 1) * 8
            }
            let { count, rows } = await MyCharacter.findAndCountAll(option)
            res.status(200).json({
                page: +page || 1,
                totalData: count,
                totalPages: Math.ceil(count / 8),
                dataPerPage: 8,
                data: rows
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async postMyCharacter(req, res, next) {
        try {
            let { id } = req.user
            let { name } = req.body
            let data = await MyCharacter.findOne({
                where: {
                    name,
                    UserId: id
                }
            })
            if (data) {
                throw ({ name: "HttpError", status: 400, message: "You already have this character" })
            }

            await MyCharacter.create({ name, UserId: req.user.id })
            res.status(201).json({ message: `success add ${name}` })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getMyCharacter(req, res, next) {
        try {
            let { name } = req.params
            let { id } = req.user
            let data = await MyCharacter.findOne({
                where: {
                    UserId: id,
                    name
                }
            })
            if (!data) {
                throw ({ name: "HttpError", status: 404, message: "Character not found" })
            }
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async putMyCharacter(req, res, next) {
        try {
            let { id } = req.user
            let { name } = req.params
            let { level, constalation, normalAttack, elementalSkill, elementalBurst } = req.body
            let data = await MyCharacter.findOne({
                where: {
                    name,
                    UserId: id
                }
            })
            if (!data) {
                throw ({ name: "HttpError", status: 404, message: "Character not found" })
            }
            await data.update({ level, constalation, normalAttack, elementalSkill, elementalBurst })
            res.status(201).json(data)
        } catch (error) {
            // console.log(error)
            next(error)
        }
    }

    static async deleteMyCharacter(req, res, next) {
        try {
            let { id } = req.user
            let { name } = req.params
            let data = await MyCharacter.findOne({
                where: {
                    name,
                    UserId: id
                }
            })
            if (!data) {
                throw ({ name: "HttpError", status: 404, message: "You character not found" })
            }
            await data.destroy()
            res.status(201).json({ message: "Success delete" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getUserDetail(req, res, next) {
        try {
            let { id } = req.user
            let data = await User.findByPk(id, {
                include: [MyCharacter],
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt"]
                }
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async putUserDetail(req, res, next) {
        try {
            let { id } = req.user
            let { name, gender, uid } = req.body
            let data = await User.findByPk(id, {
                attributes: {
                    exclude: ["password", "updatedAt", "createdAt"]
                }
            })
            await data.update({ name, gender, uid })
            res.status(201).json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async patchUserDetail(req, res, next) {
        try {
            let { id } = req.user
            let data = await User.findByPk(id)
            if (!req.file) {
                throw ({ name: "HttpError", status: 400, message: "Please provide an image file" })
            }
            const buffer = req.file.buffer.toString("base64")
            const base64 = `data:${req.file.mimetype};base64,${buffer}`
            let result = await cloudinary.uploader.upload(base64)
            await data.update({ imgUrl: result.url })
            res.status(201).json({ message: "Success update your profile picture" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = Controller
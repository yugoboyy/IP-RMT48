const Controller = require('../controllers/controller');
const errorHandlers = require('../middlewares/errorhandler');

const router = require('express').Router();

router.get("/", Controller.home)
router.post("/user", Controller.postUser)

router.use(errorHandlers)

module.exports = router
const Controller = require('../controllers/controller');
const authentication = require('../middlewares/authentication');
const errorHandlers = require('../middlewares/errorhandler');
const cors = require('cors')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = require('express').Router();

router.use(cors())

router.get("/", Controller.home)
router.post("/user", Controller.postUser)
router.post("/login", Controller.postLogin)

router.use(authentication)

router.get("/myCharacters", Controller.getMyCharacters)
router.post("/myCharacter", Controller.postMyCharacter)
router.get("/myCharacter/:name", Controller.getMyCharacter)
router.put("/myCharacter/:name", Controller.putMyCharacter)
router.delete("/myCharacter/:name", Controller.deleteMyCharacter)
router.get("/userDetail", Controller.getUserDetail)
router.put("/userDetail", Controller.putUserDetail)
router.patch("/userDetail", upload.single("imgUrl"), Controller.patchUserDetail)

router.use(errorHandlers)

module.exports = router
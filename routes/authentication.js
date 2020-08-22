const router = require('express').Router()
const bodyParser = require('body-parser')
const controller = require('../controllers/authentication')

router.use(bodyParser.json())

router.post('/authRegister',controller.register)
router.post('/authLogin',controller.login)

module.exports = router

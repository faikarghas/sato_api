const router = require('express').Router()
const bodyParser = require('body-parser')
const controller = require('../controllers/search')

router.use(bodyParser.json())

router.post('/search/:search',controller.search)


module.exports = router;


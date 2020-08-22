const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/leads');

router.use(bodyParser.json())

router.get('/getp', controller.getp)


module.exports = router;

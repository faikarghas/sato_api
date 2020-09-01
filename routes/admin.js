const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/admin');

router.use(bodyParser.json())



module.exports = router;

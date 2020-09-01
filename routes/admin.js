const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/admin');

router.use(bodyParser.json())

router.get('/editProject/:id', controller.editProject)


module.exports = router;

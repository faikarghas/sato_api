const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/intouch');

router.use(bodyParser.json())


router.post('/insertIntouch', controller.insertIntouch)
router.post('/insertContact', controller.insertContact)


module.exports = router;

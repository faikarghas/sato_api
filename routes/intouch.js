const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/intouch');

router.use(bodyParser.json())


router.post('/insertIntouch', controller.insertIntouch)
router.post('/insertContactPromo', controller.insertContactPromo)
router.get('/getContactPromo', controller.getContactPromo)


module.exports = router;

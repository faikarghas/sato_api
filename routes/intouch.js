const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/intouch');

router.use(bodyParser.json())


router.post('/insertIntouch', controller.insertIntouch)
router.post('/insertContactPromo', controller.insertContactPromo)
router.get('/getContactPromo', controller.getContactPromo)

router.post('/insertIntouchSlider', controller.insertIntouchSlider)
router.post('/editIntouchSlider', controller.editIntouchSlider)
router.post('/deleteIntouchSlider', controller.deleteIntouchSlider)

module.exports = router;

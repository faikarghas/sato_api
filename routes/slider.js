const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/slider');

router.use(bodyParser.json())

router.post('/insertHomeSlider', controller.insertHomeSlider)
router.post('/editHomeSlider', controller.editHomeSlider)
router.post('/deleteHomeSlider', controller.deleteHomeSlider)



module.exports = router;

const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/career');

router.use(bodyParser.json())

router.post('/editCareer', controller.editCareer)
router.post('/insertCareer', controller.insertCareer)
router.post('/deleteCareer', controller.deleteCareer)


module.exports = router;

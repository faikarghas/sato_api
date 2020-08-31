const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/studies');

router.use(bodyParser.json())

router.post('/editStudies', controller.editStudies)
router.post('/insertStudies', controller.insertStudies)
router.post('/deleteStudies', controller.deleteStudies)


module.exports = router;

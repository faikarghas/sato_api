const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/faq');

router.use(bodyParser.json())

router.post('/editFaq', controller.editFaq)
router.post('/insertFaq', controller.insertFaq)
router.post('/deleteFaq', controller.deleteFaq)


module.exports = router;

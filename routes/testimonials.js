const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/testimonials');

router.use(bodyParser.json())

router.post('/editTestimonials', controller.editTestimonials)
router.post('/insertTestimonials', controller.insertTestimonials)
router.post('/deleteTestimonials', controller.deleteTestimonials)
router.post('/deleteImageTestimonials', controller.deleteImageTestimonials)



router.post('/insertImageTestimonials', controller.insertImageTestimonials)
router.get('/getImageTestimonials/:id', controller.getImageTestimonials)

module.exports = router;

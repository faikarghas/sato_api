const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/web');

router.use(bodyParser.json())

router.get('/career', controller.career)
router.get('/category', controller.category)
router.get('/faq', controller.faq)
router.get('/intouch', controller.intouch)
router.get('/intouchSlider', controller.intouchSlider)
router.get('/projectAccom', controller.projectAccom)
router.get('/latestProject', controller.latestProject)
router.get('/project', controller.project)
router.get('/projectTitle', controller.projectTitle)
router.get('/slider', controller.slider)
router.get('/studies', controller.studies)
router.get('/testimonials', controller.testimonials)
router.get('/our_team', controller.our_team)
router.get('/partnership', controller.partnership)
router.post('/insertWhatsapp', controller.insertWhatsapp)
router.post('/insertContact', controller.insertContact)
router.get('/getContact', controller.getContact)
router.get('/getEmailReceiver', controller.getEmailReceiver)
router.post('/insertEmail', controller.insertEmail)
router.post('/deleteEmail', controller.deleteEmail)




module.exports = router;

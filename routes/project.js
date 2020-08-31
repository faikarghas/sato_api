const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/project');

router.use(bodyParser.json())

router.post('/editProject', controller.editProject)
router.post('/deleteProject', controller.deleteProject)
router.post('/insertProject', controller.insertProject)
router.post('/insertCategory', controller.insertCategory)
router.post('/deleteCategory', controller.deleteCategory)
router.post('/insertProjectTitle', controller.insertProjectTitle)



router.post('/deleteImage', controller.deleteImage)
router.post('/insertImageProject', controller.insertImageProject)
router.get('/getImageProject/:id', controller.getImageProject)


module.exports = router;

const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/admin');

router.use(bodyParser.json())

router.get('/editProject/:id', controller.editProject)
router.get('/project', controller.getProject)
router.get('/projectTitle', controller.getProjectTitle)
router.get('/category', controller.getCategory)




module.exports = router;

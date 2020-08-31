const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/ourTeam');

router.use(bodyParser.json())

router.post('/editOurTeam', controller.editOurTeam)
router.post('/insertOurTeam', controller.insertOurTeam)
router.post('/deleteOurTeam', controller.deleteOurTeam)
router.post('/insertPartnership', controller.insertPartnership)


module.exports = router;

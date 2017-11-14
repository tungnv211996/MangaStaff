var express = require('express');
var router = express.Router();
const StaffControllers = require('../controllers/StaffControllers');
const TaskStaffControllers = require('../controllers/TaskStaffControllers');

/*Create information of staff */
router.post('/api/saveInfor', StaffControllers.createInfor);

/*Update information of staff */
router.put('/api/editInfor/:idStaff', StaffControllers.updateInfor);

/*Create task of staff */
router.post('/api/saveTask', TaskStaffControllers.createTask);

/*Get all of staff */
router.get('/api/viewInfor', StaffControllers.getStaff);

/*Find information of staff by positon*/
router.get('/getInforByPositon', StaffControllers.findByPositon);

/*Get page index*/
router.get('/', function(req, res, next){res.render('index');});

module.exports = router;

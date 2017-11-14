const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const TaskStaffModel = require('../model/TaskStaffModel');

module.exports = {
    createTask: function(req, res){

        var task = new TaskStaffModel({
            _id: new ObjectID(),
            idStaff: req.body.idStaff,
            nameTask: req.body.nameTask,
            timeStartTask: req.body.timeStartTask,
            timeFinishTask: req.body.timeFinishTask,
            detailTask: req.body.detailTask,
        }).save(function(err){
            if(err){
                return res.status(500).json({
                    err: err || err.errmessage
                })
            }else{
                console.log('saved task');
                console.log(task.idStaff);
                return res.status(200).json({
                    message: 'Added task of staff'
                  });
            }
        })
    }
}
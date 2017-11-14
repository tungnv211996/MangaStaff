const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const StaffModel = require('../model/StaffModel');

module.exports = {
    createInfor: function(req, res){
        //console.log(JSON.stringify(req.body.nameStaff));
        var staff = new StaffModel({
            _id: new ObjectID(),
            nameStaff: req.body.nameStaff,
            emailStaff: req.body.emailStaff,
            phoneStaff: req.body.phoneStaff,
            positionStaff: req.body.positionStaff,
            statusStaff: req.body.statusStaff,
        }).save(function(err){
            if(err){
                return res.status(500).json({
                    err: err || err.errmessage
                })
            }else{
                console.log('saved');
                StaffModel.find({}, function(err, staffs) {
                    if (err) {
                      return res.status(500).json({
                        err: err || err.errmessage
                      })
                    } else {
                      return res.status(200).json({
                        staffs: staffs,
                        message: 'Added information of staff'
                      })
                    }
                }).sort( { _id : -1 } ).limit(1);
            }
        })
    },

    getStaff: function(req, res){
        StaffModel.find({}, function(err, staffs) {
            if (err) {
              return res.status(500).json({
                err: err || err.errmessage
              })
            } else {
              return res.status(200).json({
                staffs: staffs
              })
            }
          })
    },

    updateInfor: function(req, res){
        var id = req.params.idStaff;
        var o_id = new ObjectID(id);
        StaffModel.collection.update(
            {_id: o_id},
            {
                $set: {
                    nameStaff: req.body.nameStaff,
                    emailStaff: req.body.emailStaff,
                    phoneStaff: req.body.phoneStaff,
                    positionStaff: req.body.positionStaff,
                    statusStaff: req.body.statusStaff,
                }
            }, function(err){
                if (err) {
                    return res.status(500).json({
                        err: err || err.errmessage
                    });
                }else{
                    console.log('updated');
                    return res.status(200).json({
                        message: 'Updated information of staff'
                      });
                }
            }
        )
    },

    findByPosition: function(req, res){
        console.log(JSON.stringify(req.params.positionStaff));
        StaffModel.find({positionStaff: req.params.positionStaff}, function(err, staffs) {
            if (err) {
              return res.status(500).json({
                err: err || err.errmessage
              })
            } else {
              return res.status(200).json({
                staffs: staffs
              })
            }
        })
    },

    findByStatus: function(req, res){
        StaffModel.find({statusStaff: req.body.statusStaff}, function(err, staffs) {
            if (err) {
              return res.status(500).json({
                err: err || err.errmessage
              })
            } else {
              return res.status(200).json({
                staffs: staffs
              })
            }
          })
    },
}
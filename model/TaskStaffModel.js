const mongoose = require('mongoose');
var schema = mongoose.Schema;

var taskStaffSchema = new schema({
    idStaff: String,
    nameTask: String,
    timeStartTask: Date,
    timeFinishTask: Date,
    detailTask: String,
})
var TaskStaff = mongoose.model('taskstaffs', taskStaffSchema);

module.exports = TaskStaff;
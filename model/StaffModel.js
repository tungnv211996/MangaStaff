const mongoose = require('mongoose');
var schema = mongoose.Schema;

var StaffSchema = new schema({
    _id: schema.Types.ObjectId,
    nameStaff: String,
    emailStaff: String,
    phoneStaff: String,
    positionStaff: String,
    statusStaff: String,
})
var Staff = mongoose.model('staffs', StaffSchema);

module.exports = Staff;
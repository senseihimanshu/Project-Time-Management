const mongoose = require('mongoose');

module.exports = {
    projectObjId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        unique: true
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee' 
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        unique: true 
    },
    staffTimesheetIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'timesheet'
    }]
};
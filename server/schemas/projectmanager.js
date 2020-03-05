const mongoose = require('mongoose');

module.exports = {
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee' 
    },
    employeeIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee' 
    }],
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    timesheetIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'timesheet'
    }]
};
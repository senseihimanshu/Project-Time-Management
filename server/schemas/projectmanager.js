const mongoose = require('mongoose');

module.exports = {
    projectObjId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee' 
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    staffTimesheetIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'timesheet'
    }]
};
const mongoose = require('mongoose');

module.exports = {
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee' 
    },
    employeeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee' 
    }],
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }
};
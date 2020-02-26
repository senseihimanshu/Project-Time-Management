<
const employee=require('./employee');
const leave = require('./leave');
const  project=require('./project-details');
const timesheet=require('./timesheet');


module.exports={
    employee: employee,
    leave: leave,
    project: project,
     timesheet: timesheet
};

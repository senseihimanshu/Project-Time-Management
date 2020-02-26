const employeeDb=require('./employeeModel');
const leaveDb = require('./leaveModel');
const  projectDb=require('./projectModel');



module.exports={
    employee: employeeDb,
    leave: leaveDb,
    project: projectDb,
 
};
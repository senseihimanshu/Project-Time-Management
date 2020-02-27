
const employeeDb=require('./employee');
const leaveDb = require('./leave');
const  projectDb=require('./project');

console.log(employeeDb);

module.exports={
    employee: employeeDb,
    leave: leaveDb,
    project: projectDb,
 
};

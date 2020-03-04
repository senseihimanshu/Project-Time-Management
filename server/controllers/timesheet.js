const models = require('../models');

class Timesheet{
  constructor() {}

//   async create(req, res) {
//     console.log("Create timesheet req.body",req.body);
//     let timesheetObj = {
//       empObjId: req.body.projectId,
//       startDate: req.body.startDate,
//       endDate: req.body.endDate,
//       billable: req.body.billable,
//       companyName: req.body.companyName,
//       status: 'Pending',
//       customerName: req.body.customerName,
//       week:{pId:req.body.pId, 
//             date:req.body.date,
//             hours:req.body.hours,
//             leaveType:req.body.leaveType,
//             taskType:req.body.taskType},
//       hoursPerWeek:`hoursPerWeek`+req.body.hours
//     };

//     if(await model.project.get({ projectId: projectObj.projectId })) return res.status(400).send({
//       success: false,
//       payload: {
//         message: 'Project Id already exists'
//       }
//     }); 
// }
}

module.exports = new Timesheet();

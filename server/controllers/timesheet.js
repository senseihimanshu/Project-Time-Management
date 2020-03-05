const model = require('../models');

class Timesheet{
  constructor() {}

  async create(req, res) {
    //console.log("Create timesheet req.body",req.body);
    let timesheetObj = {
      empObjId: req.body.empObjId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      billable: req.body.billable,
      companyName: req.body.companyName,
      status: 'Pending',
      customerName: req.body.customerName,
      week:req.body.week,
    //  hoursPerWeek:`hoursPerWeek`+req.body.hours
    };

    const newTimesheet = await model.timesheet.save(timesheetObj);
   res.send(newTimesheet);
}

async show(req, res) {
  const empObjId= req.query.empObjId;
  var timesheet=[];
  if(empObjId){
  timesheet = await model.timesheet.get({empObjId}); }

  else{timesheet= await model.timesheet.get() }

  if (!timesheet) {
    console.log("Not available");
    return res.status(404).send(timesheet);
  }
  else{
  res.send(timesheet); 
}
}

// async index(req, res) {
//   const timesheet = await model.timesheet.get();

//   if (!timesheet) {
//     console.log("No timesheets available");
//     return res.status(404).send({
//       success: false,
//      timesheet:timesheet,
//         message: "Timesheets does not exist"
//     });
//   }
//   else{
//   res.send({
//     success: true,
    
// timesheet:timesheet,
//       message: "All Timesheets retrieved successfully"
    
//   }); 
// }
// }
async index(req, res) {
  // console.log("dikhaa rha huu");
   const timesheetList = await model.timesheet.get();
   res.send(timesheetList);
  // console.log(employeeList);
 }
async update(req, res) {
 const col={...req.body.week};
 console.log(col);
  const timesheet = await model.timesheet.update(
    { _id: req.query.id } ,
    { $push: {"week": col} }
  );
  res.send({
    success: true,
    payload: {
      timesheet
    }
  });
}

}

module.exports = new Timesheet();

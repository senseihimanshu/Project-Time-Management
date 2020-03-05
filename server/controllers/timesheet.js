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
   // console.log(newTimesheet);
   res.send(newTimesheet);

    // if(await model.project.get({ projectId: projectObj.projectId })) return res.status(400).send({
    //   success: false,
    //   payload: {
    //     message: 'Project Id already exists'
    //   }
    // }); 
}
}

module.exports = new Timesheet();

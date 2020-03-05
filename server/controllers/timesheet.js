const model = require('../models');

class Timesheet {
  constructor() {}

  async create(req, res) {
    let timesheetObj = {
      empObjId: req.body.empObjId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      billable: req.body.billable,
      companyName: req.body.companyName,
      customerName: req.body.customerName,
      week:req.body.week,
    };

    const newTimesheet = await model.timesheet.save(timesheetObj);
    console.log(newTimesheet['week']);

    await Promise.all(newTimesheet['week'].map(async (week) => {
      console.log(week['projectId']);
      const projectManager = (await model.project.get({ _id: week["projectId"] }, { projectManager: 1 })).projectManager;
      console.log(projectManager);
      await model.projectManager.update({ _id: projectManager }, { $push: { timesheetIds: newTimesheet } });
    }));

    console.log('Reached Here @timesheet.js/line26');

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
    return res.status(404).send({
      success: false,
      payload: {
        timesheet,
        message: "Timesheet does not exist"
      }
    });
  }
  else{
  res.send({
    success: true,
    payload: {
      timesheet,
      message: "Timesheet retrieved successfully"
    }
  }); 
}
}

async index(req, res) {
  const timesheet = await model.timesheet.get();

  if (!timesheet) {
    console.log("No timesheets available");
    return res.status(404).send({
      success: false,
      payload: {
        timesheet,
        message: "Timesheets does not exist"
      }
    });
  }
  else{
  res.send({
    success: true,
    payload: {
      timesheet,
      message: "All Timesheets retrieved successfully"
    }
  }); 
}
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

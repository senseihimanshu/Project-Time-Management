const model = require("../models");

class Timesheet {
  constructor() {}

  async create(req, res) {
    console.log(req.body);

    const reqScatteredData = req.body;

// { "project-0": { "_id": "5e65ef289b0b8a3ea421288c", "projectName": "synergy", "projectManager": "5e648fd47faf392b8480af4e", "clientName": "cyg" }, "task-type-0": null, "date-0": "2020-03-30", "hours-0": 21, "billable-0": true}
    // empObjId: ,
    // billable: ,
    // weekObj: {
    //   projectId: ,
    //   date: ,
    //   hours: ,
    //   taskType: 
    // },
    // clientName: 

    let weekObjArray = [];

    for(let dayOfWeek = 0 ; dayOfWeek < 5; dayOfWeek++){  
        weekObjArray.push({
          projectId: reqScatteredData[`project-${dayOfWeek}`] && reqScatteredData[`project-${dayOfWeek}`]._id,
          date: reqScatteredData[`date-${dayOfWeek}`],
          hours: reqScatteredData[`hours-${dayOfWeek}`],
          taskType: reqScatteredData[`task-type-${dayOfWeek}`],
          billable: reqScatteredData[`billable-${dayOfWeek}`],
          clientName: reqScatteredData[`project-${dayOfWeek}`] && reqScatteredData[`project-${dayOfWeek}`].clientName,
        })
    }
    const timesheetToSave = {
      empObjId: reqScatteredData.empObjId,
      week: weekObjArray
    }

    //Creating a new timesheet
    await model.timesheet.save(timesheetToSave);
    
    //Adding timesheets of employees to projectManager
    await Promise.all(
      timesheetToSave["week"].map(async week => {
        console.log(week["projectId"]);
        const projectManager = await model.project.get(
          { _id: week["projectId"] },
          { projectManager: 1 }
        );
        console.log(projectManager, projectManager);
        await model.projectManager.update(
          { _id: projectManager && projectManager.projectManager },
          { $push: { timesheetIds: timesheetToSave } }
        );
      })
    );

    //Adding timesheet to employee collection
    await model.employee.update(
      { _id: timesheetToSave.empObjId },
      { $push: { timesheet: timesheetToSave } }
    );

    console.log("Reached Here @timesheet.js/line26");

    res.send({
      success: true,
      payload: {
        data: timesheetToSave,
        message: 'Timesheet Added Successfully!'
      }
    });
  }

  async show(req, res) {
    const empObjId = req.query.empObjId;
    var timesheet = [];
    if (empObjId) {
      timesheet = await model.timesheet.get({ empObjId });
    } else {
      timesheet = await model.timesheet.get();
    }
    console.log(timesheet);
    console.log(timesheet[0].week[0]);
    if (!timesheet) {
      console.log("Not available");
      return res.status(404).send(timesheet);
    } else {
      res.send(timesheet);
    }
  }
  async index(req, res) {
    // console.log("dikhaa rha huu");
    const timesheetList = await model.timesheet.get();
    console.log(timesheetList);
    res.send(timesheetList);
    // console.log(employeeList);
  }
  async update(req, res) {
    const col = { ...req.body.week };
    console.log(col);
    const timesheet = await model.timesheet.update(
      { _id: req.query.id },
      { $push: { week: col } }
    );
    res.send({
      success: true,
      payload: {
        timesheet
      }
    });
  }
  async modify(req, res) {
    console.log(req, "status change");
    const timesheet = await model.timesheet.update(
      { _id: req.body._id },
      { $set: { status: req.body.status } }
    );
    res.send({
      success: true,
      payload: {
        data: {
          timesheet
        }
      }
    });
  }
}

module.exports = new Timesheet();

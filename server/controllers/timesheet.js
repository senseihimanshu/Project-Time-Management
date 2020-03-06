const model = require("../models");

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
      week: req.body.week
    };

    //Creating a new timesheet
    const newTimesheet = await model.timesheet.save(timesheetObj);
    console.log(newTimesheet["week"]);

    //Adding timesheets of employees to projectManager
    await Promise.all(
      newTimesheet["week"].map(async week => {
        console.log(week["projectId"]);
        const projectManager = await model.project.get(
          { _id: week["projectId"] },
          { projectManager: 1 }
        );
        console.log(projectManager, projectManager.projectManager);
        await model.projectManager.update(
          { _id: projectManager.projectManager },
          { $push: { timesheetIds: newTimesheet } }
        );
      })
    );

    //Adding timesheet to employee collection
    await model.employee.update(
      { _id: timesheetObj.empObjId },
      { $push: { timesheet: newTimesheet } }
    );
    await model.employee.update(
      { _id: timesheetObj.empObjId },
      { $push: { projectId: newTimesheet } }
    );
    console.log("Reached Here @timesheet.js/line26");
    console.log("dikhau", newTimesheet);

    res.send(newTimesheet);
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
        project
      }
    });
  }
}

module.exports = new Timesheet();

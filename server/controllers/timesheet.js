const model = require("../models");

class Timesheet {
  constructor() {}

  async create(req, res) {
    

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

    for (let dayOfWeek = 0; dayOfWeek < 5; dayOfWeek++) {
      weekObjArray.push({
        projectId:
          reqScatteredData[`project-${dayOfWeek}`] &&
          reqScatteredData[`project-${dayOfWeek}`]._id,
        date: reqScatteredData[`date-${dayOfWeek}`],
        hours: reqScatteredData[`hours-${dayOfWeek}`],
        taskType: reqScatteredData[`task-type-${dayOfWeek}`],
        billable: reqScatteredData[`billable-${dayOfWeek}`],
        clientName:
          reqScatteredData[`project-${dayOfWeek}`] &&
          reqScatteredData[`project-${dayOfWeek}`].clientName
      });
    }
    const timesheetToSave = {
      empObjId: reqScatteredData.empObjId,
      week: weekObjArray
    };
    console.log(timesheetToSave);
    //Creating a new timesheet
    const updatedTimesheetObjId = (await model.timesheet.save(timesheetToSave))._id;
    console.log(updatedTimesheetObjId, 'updatedTimesheetObjId');

    //Adding timesheets of employees to projectManager
    await Promise.all(
      timesheetToSave["week"].map(async week => {
        if (week.projectId) {
          const projectManager = (
            await model.project.get(
              { _id: week.projectId },
              { projectManager: 1 }
            )
          ).projectManager;

          console.log(week.projectId, projectManager, "Here man!");
          await model.projectManager.update(
            { _id: projectManager },
            { $push: { timesheetIds: updatedTimesheetObjId } }
          );

          // let timesheetIdsArr = (await model.employee.get(
          //   { _id: timesheetToSave.empObjId },
          //   { timesheet: 1 }
          // )).timesheet;
          //   console.log(timesheetIdsArr, timesheetToSave.empObjId, 'before');
            
          //   timesheetIdsArr.filter((item, index) => timesheetIdsArr.indexOf(item) === index);
          //   console.log(timesheetIdsArr, 'timesheetIdsArr');

          await model.employee.update(
            { _id: timesheetToSave.empObjId },
            { $addToSet: {timesheet: updatedTimesheetObjId} }
          );
        }
      })
    );

    //Adding timesheet to employee collection
    // await model.employee.update(
    //   { _id: timesheetToSave.empObjId },
    //   { $push: { timesheet: updatedTimesheetObjId } }
    // );

    console.log("Reached Here @timesheet.js/line26");

    res.send({
      success: true,
      payload: {
        data: timesheetToSave,
        message: "Timesheet Added Successfully!"
      }
    });
  }

  async show(req, res) {
    const empObjId = req.query.empObjId;
    console.log(req.query);
    var timesheet = [];
    if (empObjId) {
      console.log(await model.employee.get({ empId: empObjId }, { timesheet: 1, projectId: 1 }));
      timesheet = (await model.employee.get({ empId: empObjId }, { timesheet: 1, projectId: 1 })).timesheet;
    } else {
      return res.status(400).send({
        success: false,
        payload: {
          message: 'Employee doesn\'t exist'
        }
      });
    }
    if (!timesheet) {
      return res.status(200).send({
        success: true,
        payload: {
          data: null,
          message: 'No Timesheets for this account'
        }
      });
    } else {
      return res.status(200).send({
        success: true,
        payload: {
          data: {
            timesheet
          },
          message: 'Timesheets retrieved'
        }
      });
    }
  }

  async index(req, res) {
    const timesheetList = await model.timesheet.get();
    console.log(timesheetList,"all timesheet");
    res.send(timesheetList);
  }

  async searchTimesheets(req, res){
   
    console.log(req.query.date);
    let query=req.query.date;
    query = query.toLowerCase().trim()
    const timesheet = await model.project.getforsearch({ date: { $regex:`^${query}`, $options: 'i'}},{});
    console.log("==========>>>>>>>>>>>>>", timesheet);
    res.status(200).send(timesheet);

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

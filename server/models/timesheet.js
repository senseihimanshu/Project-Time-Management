const mongoose = require("mongoose");
const schema = require("../schemas");
const timesheetschema = new mongoose.Schema(schema.timesheet);

class Timesheet{
  constructor(){
    this.model = mongoose.model('Timesheet',timesheetschema);
  }
  
   //getting the timesheet data as per criteria  
    async get(criteria={},columns={}) {
      return this.model.findOne(criteria, columns);
   }

   async log(criteria = {}, columns = {}){
    return this.model.find(criteria, columns);
  }

  async save(timesheetObj) {
    let timesheet;
    if (
      await this.model.findOne({
        empObjId: timesheetObj.empObjId,
        startDate: timesheetObj["startDate"]
      })
    ) {
      timesheet = await this.model.updateOne(
        {
          empObjId: timesheetObj.empObjId,
          startDate: timesheetObj["startDate"]
        },
        { week: timesheetObj["week"] }
      );
      return {
        timesheet,
        typeOfOperation: "update",
        message: "Timesheet Updated Successfully"
      };
    }

    timesheet = await this.model.create(timesheetObj);
    return {
      timesheet,
      typeOfOperation: "create",
      message: "Timesheet Created Successfully"
    };
  }

  async count(criteria = {}) {
    const timesheetCount = await this.model.find().count(criteria);
    return timesheetCount;
  }
  //delete the timesheet data as per criteria
  async delete(criteria = {}) {
    return this.model.deleteOne(criteria);
  }

  async getforsearch(criteria = {}, columns = {}) {
    return this.model.find(criteria, columns).sort({ date: 1 });
  }
  async getTimesheet(criteria = {}, columns = {}) {
    return this.model.find({ date: `/^$columns/i` }).exec(callback);
  }
  async update(criteria = {}, updatedEmployeeObj) {
    return this.model.updateOne(criteria, updatedEmployeeObj);
  }
  async modify(req, res) {
    const timesheet = await model.timesheet.update(
      { _id: req.body._id },
      { $set: { status: req.body.status } }
    );
    res.send({
      success: true,
      payload: {
       review,
       message:'Review request completed'
      }
    });
  }
}

module.exports = new Timesheet();

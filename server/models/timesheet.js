const mongoose=require('mongoose');
const schema=require('../schemas');
const timesheetschema=mongoose.Schema(schema.timesheet);

class Timesheet{
  constructor(){
    this.model = mongoose.model('Timesheet',timesheetschema);
  }
   //getting the timesheet data as per criteria  
    async get(criteria={},columns={}){
      console.log("timesheet viewed")
       return await this.model.find(criteria,columns);
   }
   //saves the data of newly created timesheet entry
    async save(timesheetObj){
      console.log(timesheetObj, 'new timesheet created!');
      const timesheet = await this.model.create(timesheetObj);
       return timesheet;
    }
    //delete the timesheet data as per criteria
    async delete(criteria={}){
      console.log('timesheet deleted');
      return this.model.deleteOne(criteria);
    }
    //getting the data of all the timesheets
    async log(columns={}){
      console.log('viewed all timesheets');
      return this.model.find(columns);
    }
    async update(criteria={},updatedEmployeeObj){
      console.log('timesheet updated');
      return this.model.updateOne(criteria,updatedEmployeeObj);
   }
}

module.exports = new Timesheet();







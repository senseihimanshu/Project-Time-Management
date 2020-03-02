const mongoose=require('mongoose');
const schema=require('../schemas');
const timesheetschema=mongoose.Schema(schema);

class Timesheet{
  constructor(){
    this.model = mongoose.model('Timesheet',timesheetschema);
  }
   //getting the timesheet data as per criteria  
    async get(criteria={},columns={}){
      console.log("timesheet dikhauga")
       return this.model.find(criteria,columns);
   }
   //saves the data of newly created timesheet entry
    async save(timesheetObj){
      console.log(timesheetObj, 'new timesheet created!');
      const timesheet = await this.model.create(timesheetObj);
       return timesheet;
    }
    //delete the timesheet data as per criteria
    async delete(criteria={}){
      return this.model.deleteOne(criteria);
    }
    //getting the data of all the timesheets
    async log(columns={}){
      return this.model.find(columns);
    }
}

module.exports = new Timesheet();







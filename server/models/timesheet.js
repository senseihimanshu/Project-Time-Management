const mongoose = require('mongoose');
const schema = require('../schemas');
const timesheetschema = new mongoose.Schema(schema.timesheet);

class Timesheet{
  constructor(){
    this.model = mongoose.model('Timesheet',timesheetschema);
  }
  
   //getting the timesheet data as per criteria  
    async get(criteria={},columns={}) {
      const timesheetArray = await this.model.find(criteria,columns).populate({
          path: 'week.projectId',
          model: 'project'
      }).populate('empObjId');
      return timesheetArray;
   }

   async getTimesheetWeeks(criteria = {}, columns = {}){
    return this.model.find(criteria, columns);
   }

   async save(timesheetObj){
      let timesheet;
      if(await this.model.findOne({ empObjId: timesheetObj.empObjId, startDate: timesheetObj['startDate'] })){
        timesheet = await this.model.updateOne({ empObjId: timesheetObj.empObjId, startDate: timesheetObj['startDate'] } , { week: timesheetObj['week'] });
        return { timesheet, typeOfOperation: 'update', message: 'Timesheet Updated Successfully' };
      }
      
      timesheet = await this.model.create(timesheetObj);
      return { timesheet, typeOfOperation: 'create', message: 'Timesheet Created Successfully' };
    }

    async count(criteria={}){
      const timesheetCount=await this.model.find().count(criteria);
      return timesheetCount;
     }
    //delete the timesheet data as per criteria
    async delete(criteria={}){
      return this.model.deleteOne(criteria);
    }

    async getforsearch(criteria={}, columns={})
    {
      
      return this.model.find(criteria, columns).sort({date: 1});
}
  async getTimesheet(criteria={}, columns={}){
     return this.model.find({"date": `/^$columns/i`}).exec(callback);
  }
    async update(criteria={},updatedEmployeeObj){
      return this.model.updateOne(criteria,updatedEmployeeObj);
   }
}

module.exports = new Timesheet();







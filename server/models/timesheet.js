const mongoose=require('mongoose');
const schema=require('../schemas');
const timesheetschema=mongoose.Schema(schema.timesheet);

class Timesheet{
  constructor(){
    this.model = mongoose.model('Timesheet',timesheetschema);
  }
  
   //getting the timesheet data as per criteria  
    async get(criteria={},columns={}) {
      console.log("timesheet viewed");
      const timesheetArray = await this.model.find(criteria,columns).populate({
          path: 'week.projectId',
          model: 'project'
      }).populate('empObjId');
      console.log(timesheetArray);
      return timesheetArray;
   }

   async save(timesheetObj){
      console.log(timesheetObj, 'new timesheet created!');
      const timesheet = await this.model.findOneAndUpdate({empObjId: timesheetObj.empObjId}, timesheetObj, { upsert : true, new: true });
      return timesheet;
    }
    async count(criteria={}){
      console.log("we are getting clevel data for timesheets");
      const timesheetCount=await this.model.count(criteria);
      return timesheetCount;
     }
    //delete the timesheet data as per criteria
    async delete(criteria={}){
      console.log('timesheet deleted');
      return this.model.deleteOne(criteria);
    }

    async getforsearch(criteria={}, columns={})
    {
      
      console.log(criteria);
      return this.model.find(criteria, columns).sort({date: 1});
}
  async getTimesheet(criteria={}, columns={}){
     return this.model.find({"date": `/^$columns/i`}).exec(callback);
  }
    async update(criteria={},updatedEmployeeObj){
      console.log('timesheet updated');
      return this.model.updateOne(criteria,updatedEmployeeObj);
   }
}

module.exports = new Timesheet();







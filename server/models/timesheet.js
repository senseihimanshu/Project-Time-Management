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
          model: 'Project'
      }).populate('empObjId');
      console.log(timesheetArray);
      return timesheetArray;
   }

   async save(timesheetObj){
      console.log(timesheetObj, 'new timesheet created!');
      const timesheet = await this.model.update({empObjId: timesheetObj.empObjId}, timesheetObj, { upsert : true });
      return timesheet;
    }

    async delete(criteria={}){
      console.log('timesheet deleted');
      return this.model.deleteOne(criteria);
    }

    async update(criteria={},updatedEmployeeObj){
      console.log('timesheet updated');
      return this.model.updateOne(criteria,updatedEmployeeObj);
   }
}

module.exports = new Timesheet();







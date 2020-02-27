const mongoose=require('mongoose');
const schema=require('../schemas');
const timesheetschema=mongoose.Schema(schema);
class Employee{
  constructor(){
    this.model=mongoose.model('Employee',timesheetschema);
  }
   //getting the employee data as per criteria  
    async get(criteria={},columns={}){
       return this.model.find(criteria,columns);
   }
   //saves the data of newly created employee
    async save(timesheetObj){
      console.log(timesheetObj, 'new employee created!');
      const timesheet = await this.model.create(timesheetObj);
       return timesheet;
    }
    //delete the employee data as per criteria
    async delete(criteria={}){
      return this.model.deleteOne(criteria);
    }
    //getting the data of all the employees
    async log(columns={}){
      return this.model.find(columns);
    }
}

module.exports=new Employee();







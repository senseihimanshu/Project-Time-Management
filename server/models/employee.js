const mongoose=require('mongoose');
const { employee }=require('../schemas');
const employeeschema=mongoose.Schema(employee);

class Employee{
  constructor(){
    // console.log(this.model, 'Inside models/employee costructor');
    this.model=mongoose.model('employee',employeeschema);
  }
   //getting the employee data as per criteria  
    async get(criteria={},columns={}){
      const findDocument=await this.model.findOne(criteria,columns).populate('projectId', 'timesheet');
      return findDocument;
   }
   //saves the data of newly created employee
    async save(employeeObj){
      console.log("routes me hu")
      console.log(employeeObj, 'new employee created!');
      const employee = await this.model.create(employeeObj);
       return employee;
    }
    //update the employee data as per criteria and show updatedEmployeeObj
    async update(criteria={},updatedEmployeeObj){
       return this.model.updateOne(criteria,updatedEmployeeObj);
    }
    //delete the employee data as per criteria
    async delete(criteria={}){
      return this.model.deleteOne(criteria);
    }
    //getting the data of all the employees
    async log(criteria={},columns={}){
      return this.model.find(criteria,columns);
    }
}

const employeeObj = new Employee();


module.exports = employeeObj;

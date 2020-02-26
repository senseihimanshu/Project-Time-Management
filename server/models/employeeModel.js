const mongoose=require('mongoose');
const schema=require('../schemas');
const employeeschema=mongoose.Schema(schema);
class Employee{
  constructor(){
    this.model=mongoose.model('Employee',employeeschema);
  }
  
    async get(criteria={},columns={}){
       return this.model.find(criteria,columns);
   }
    async save(employeeObj){
      console.log(employeeObj, 'new employee created!');
      const employee = await this.model.create(employeeObj);
       return employee;
    }
    async update(criteria={},updatedObj){
       return this.model.update(criteria,updatedObj)
    }
    async delete(criteria={}){
      return this.model.deleteOne(criteria);
    }
    async log(columns={}){
      return this.model.find(columns);
    }
}

module.exports=new Employee();







const mongoose=require('mongoose');
const schema=require('../schemas');
const leaveschema=mongoose.Schema(schema);
class Employee{
  constructor(){
    this.model=mongoose.model('Leave',leaveschema);
  }
  

      async get(criteria){
        return this.model.find();
    }
      async save(employeeObj){
        console.log(employeeObj, 'Here man!');
        const employee = await this.model.create(employeeObj);
          return employee;
         
     }
      async update(criteria={},updatedObj){
         return this.model.update(criteria,updatedObj)
      }
      async delete(criteria){
        return this.model.deleteOne(criteria);
     }
     async log(criteria){
          return this.model.find();
     }
}

module.exports=new Employee();
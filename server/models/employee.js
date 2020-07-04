const mongoose=require('mongoose');
const { employee }=require('../schemas');
const employeeschema=mongoose.Schema(employee);

class Employee{
  constructor(){
    this.model=mongoose.model('employee',employeeschema);
  }
   //getting the employee data as per criteria  
    async get(criteria={},columns={}){
      return this.model.findOne(criteria,columns).select('-password');
   }
   async gets(criteria={}, columns={}){
    return this.model.find(criteria, columns).select('-password');
}

  async save(employeeObj){
    return this.model.create(employeeObj);
  }
    //update the employee data as per criteria and show updatedEmployeeObj
    async update(criteria={},updatedEmployeeObj){
       return this.model.updateOne(criteria,updatedEmployeeObj);
    }
    //delete the employee data as per criteria
    async delete(criteria={}){
      return this.model.deleteOne(criteria);
    }
    
    async log(criteria={},columns={}){
      return this.model.find(criteria, columns).select('-password');
    }
    async getEmp(criteria={}, columns={}){
       const empObj= await this.model.find(criteria,columns).sort({"name": 1 });
      return empObj;
    }
    async getforsearch(criteria={}, columns={})
    {
      
      return this.model.find(criteria, columns).sort({name: 1});
    }
 
  async getPagignation(criteria={}, columns={}){
     return this.model.find({"name": `/^$columns/i`}).exec(callback);
  }
  
}

const employeeObj = new Employee();


module.exports = employeeObj;

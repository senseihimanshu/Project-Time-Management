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
      const findDocument=await this.model.findOne(criteria,columns).populate('projectId');
      return findDocument;
   }
   async gets(criteria={}, columns={}){
    console.log(criteria);
    return this.model.find(criteria, columns);
}

   //saves the data of newly created employee
    async save(employeeObj){
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
      let match=1;
      let sort=2;
      console.log("inside request models body")
      //console.log(req);
      return this.model.find(criteria,columns);//.limit(match).skip(sort);
    }
    async getEmp(criteria={}, columns={}){
       const empObj= await this.model.find(criteria,columns).sort({"name": 1 });
        console.log(empObj);
      return empObj;
    }
    async getforsearch(criteria={}, columns={})
    {
      
      console.log(criteria);
      return this.model.find(criteria, columns).sort({name: 1});
}
 
  async getPagignation(criteria={}, columns={}){
     return this.model.find({"name": `/^$columns/i`}).exec(callback);
  }
}

const employeeObj = new Employee();


module.exports = employeeObj;

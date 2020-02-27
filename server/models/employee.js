const mongoose=require('mongoose');
const schema=require('../schemas');
const employeeschema=mongoose.Schema(schema.employee);
employeeschema.methods.isUnique = async function(empId, email) {
  const employeeWithEmpId = await Employee.findOne({ empId });
  const employeeWithEmail = await Employee.findOne({ email });

  if (employeeWithEmpId)
    return { status: false, message: "EmployeeId already exists" };
  if (employeeWithEmail)
    return { status: false, message: "Email already exists" };

  return { status: true };
};
class Employee{
  constructor(){
    console.log(this.model, 'Inside models/employee costructor');
    this.model=mongoose.model('Employee',employeeschema);
  }
   //getting the employee data as per criteria  
    async get(criteria={},columns={}){
      console.log(criteria);
       return await this.model.findOne(criteria,columns);
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
      return this.model.find(criteria,columns);
    }
}

module.exports=new Employee();

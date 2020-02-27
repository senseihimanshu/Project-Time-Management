const mongoose=require('mongoose');
const schema=require('../schemas');
const leaveschema=mongoose.Schema(schema);
class Leave{
  constructor(){
    this.model=mongoose.model('Leave',leaveschema);
  }
  
     
      async get(criteria){
        return this.model.find(criteria);
    }
      async save(employeeObj){
        console.log(employeeObj, 'new leave is on demand!');
        const leave = await this.model.create(leaveObj);
          return leave;
         
     }
      async update(criteria={},updatedObj){
         return this.model.update(criteria,updatedObj)
      }
      async delete(criteria){
        return this.model.deleteOne(criteria);
     }
     async log(){
          return this.model.find();
     }
}

module.exports=new Employee();
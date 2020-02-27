const mongoose=require('mongoose');
const schema=require('../schemas');
const leaveschema=mongoose.Schema(schema);
class Leave{
  constructor(){
    this.model=mongoose.model('Leave',leaveschema);
  }
  
     
      async get(criteria={}){
        return this.model.find(criteria);
    }
      async save(employeeObj){
        console.log(employeeObj, 'new leave is on demand!');
        const leave = await this.model.create(leaveObj);
          return leave;
      }
      
      async delete(criteria={}){
        return this.model.deleteOne(criteria);
     }
     async log(criteria={}){
          return this.model.find(criteria);
     }
}

module.exports=new Leave();
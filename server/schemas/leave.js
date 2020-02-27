const employee=require('./employee');
const project=require('./project-details');
const mongoose = require('mongoose');
const timesheet=require('./timesheet');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports={
   leaveType:{
       type:String,
       enum:["Earned leave","Casual leave","Sick leave"],
       required:true
   },
   startDate:{
        type:Date
     },
   endDate:{
        type:Date
   },
   empId:{
       type:ObjectId,
       ref:"employee"
   },
   projectId:{
       type:ObjectId,
       ref:"project"
   },
   timesheetId:{
        type:ObjectId,
        ref:"timesheet"
   }


}
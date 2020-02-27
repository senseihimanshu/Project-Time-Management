const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
const employee=require('./employee');
const project=require('./project-details');

module.exports={
    
    empId:{
        type:ObjectId,
        ref:"employee",
        default:null
    },
    pId:{
        type:ObjectId,
        ref:"project",
        default:null
    },
    
    taskType:{
         type:String,
         enum:["Offshore","Onsite","Earned leave","Casual leave","Sick leave"]
    },
    billable:{
         type:Boolean
    },
    companyName:{
        type:String,
        default:"CyberGroup"
    },
    workingHours:{
        date:[{type:Date}],
        days:[{type:String,
                enum:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
        }],
        hours:[{type:Number}]
    },
    status:{
        type:String,
        enum:["Approved","Declined","Pending"]
    },
    totalHoursWeek:{
         type:Number,
        default:0
    }



}
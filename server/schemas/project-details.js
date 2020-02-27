const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
const employee=require('./employee');
module.exports={
   
   projectName:{
      type:String,
      default:null
    },
    projectManager:{
       type:String,
       default:null
    },
    clientName:{
        type:String,
        default:null
    },
    startDate:{
        type:String,
        default:null
    },
    endDate:{
        type:String,
        default:null
    },
    empId:[
        {type:ObjectId,
         default:null,   
        ref:"employee"
    }],
    status:{
        type:String,
        enum:['Completed','Discarded','In progress'],
        required:true
    }
}

const mongoose = require('mongoose');
const project=require('./project-details');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports={
    
    name:{
        type:String,
        default:null
  },
    designation:{
         type:String,
         default:'consultant 1',
         enum:['consultant 1 ','consultant 2','associate 1','associate 2']
    },
    joining_date:{
      type:Date,
      default:null
    },
    contactNo:{
      type:String,
      default:null
    },
    address:{
      type:String,
      default:null
    },
    email:{
      type:String,
      required:true 
    },
    password:{
        type:String,
        required:true
    },
    projectId:[{
        type:ObjectId,
        ref:"project",
        default:null
    }]

    
}


  

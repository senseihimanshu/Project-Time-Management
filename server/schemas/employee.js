
const mongoose = require('mongoose');
const project=require('./project-details');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports={
    
    name:{
        type:String,
        required:true
  },
    designation:{
         type:String,
         default:'consultant 1',

      enum:['consultant 1','consultant 2','associate 1','associate 2']

    },
    role:[{
      type:String,
      default:'Employee',
      enum:['Project Manager','C-level Manager','Employee','Admin']
    }],
    joining_date:{
      type:Date,
      default:Date.now
    },
    phoneNo:{
      type:String,
      default:null,
      minlength: 8,
      maxlength: 12
    },
   address:{
         city:{
           type:String,
            default:null
           },
          state:{
            type:String,
            default:null
           },
          pincode:{
           type:String,
            default:null
          }
    },
    email:{
      type:String,
      required:true,
      unique:true
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


  

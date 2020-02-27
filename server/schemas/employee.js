
const mongoose = require('mongoose');
const project=require('./project-details');
var ObjectId = mongoose.Schema.Types.ObjectId;

const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  designation: [
    {
      type: String,
      enum: ["ADMIN", "CLEVEL", "PROJECTMANAGER", "EMPLOYEE"]
    }
  ],
  joining: {
    type: Date,
    default: Date.now()
  },
  phone: {
    type: String,
    minlength: 8,
    maxlength: 20
  },
  address: {
    type: String,
    minlength: 10,
    maxlength: 100
  },
  role:[{
    type:String,
    default:'Employee',
    enum:['Project Manager','C-level Manager','Employee','Admin']
  }],
  projectId:[{
    type:ObjectId,
    ref:"project",
    default:null
}]
});

employeeSchema.methods.isUnique = async function(empId, email) {
  const employeeWithEmpId = await Employee.findOne({ empId });
  const employeeWithEmail = await Employee.findOne({ email });

  if (employeeWithEmpId)
    return { status: false, message: "EmployeeId already exists" };
  if (employeeWithEmail)
    return { status: false, message: "Email already exists" };

  return { status: true };
};

module.exports = employeeSchema;
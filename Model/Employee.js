let conn= require('mongoose'); 
let employeeSchema = conn.Schema({
  _id:String,
  name:String,
  dept:String,
  sub_Known:[String],
  salary:Number,
  age:Number,
  isVaccinated:Boolean,
  dob:{type:Date}
})

module.exports = conn.model("Employee",employeeSchema)

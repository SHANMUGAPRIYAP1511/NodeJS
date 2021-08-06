let conn= require('mongoose'); 
let customerSchema = conn.Schema({
    _id:conn.Schema.Types.ObjectId,
    cname: String,
    age:Number,
    dob:{type:Date},
    salary: Number,
    isVaccinated: Boolean
})

module.exports = conn.model("Customer",customerSchema)


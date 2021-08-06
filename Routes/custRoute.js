let express = require('express')
let route = express.Router()
let mongoose=require('mongoose')
let Customer = require('../Model/customer')
route.post("/", (request, response) => {
    let cust=new Customer({
        _id:new mongoose.Types.ObjectId(),
        cname: request.body.cname,
        age:request.body.age,
        dob:request.body.dob,
        salary: request.body.salary,
        isVaccinated: request.body.isVaccinated
    });
    cust.save().then((data)=>
    {
        console.log("Customer Data inserted Successfully")
        console.log(data)
    }).catch((err)=>
    {
        console.log(err)
    })
    response.status(200).json({
        "response": "customer details posted successfully",
        "data":cust
    })
})
route.get("/", (request, response) => {
    Customer.find().then((res)=>
    {
        response.status(200).json({
            "response": "customer details fetched successfully",
            "Fetched Data":res
        })
        console.log("==================Customer Details=======================");
        console.log(JSON.stringify(res))
    })
   
})

route.get("/:custid", (request, response) => {
    const id=request.params.custid;
    Customer.findById(id).then((data)=>
    {
        console.log("Fetch By Id : "+id)
        console.log(data)
        response.status(200).json({
            "response": "data fetched by Id",
            "Fetched Data":data
        })
    })
    
})
route.patch("/:custid", (request, response) => {
    const id=request.params.custid;
    // const updateData={}
    // for(const op of request.body)
    // {
    //     updateData[op.propName]=op.value;
    // }
    Customer.updateOne({_id:id},{$set:{cname:request.body.cname,salary:request.body.salary,age:request.body.age,dob:request.body.dob,isVaccinated:request.body.isVaccinated}}).then((res)=>
    {
        console.log(res);
        response.status(200).json({
            "response": "customer details updated successfully",
            "Fetched Data":res
        })
    })
   
})
route.delete("/:custid", (request, response) => {
    const id=request.params.custid;
    Customer.findOneAndDelete({_id:id}).then((res)=>
    {
        console.log("Deleted Data");
        console.log(res);
        response.status(200).json({
            "response": "customer details deleted successfully",
            "Fetched Data":res
        })
    })
   
})

module.exports = route;
let express = require('express');
let route = express.Router();
let mongoose = require('mongoose')
let Employee = require('../Model/Employee')
route.post("/", (request, response) => {
    let employee = new Employee({
        _id: request.body._id,
        name: request.body.name,
        dept: request.body.dept,
        sub_Known: request.body.sub_Known,
        salary: request.body.salary,
        age: request.body.age,
        isVaccinated: request.body.isVaccinated,
        dob: request.body.dob
    })
    employee.save().then((data) => {
        console.log(data)
    })
    response.status(200).json({
        "output": "employee data saved",
        "posted_data": employee
    })
})
route.get("/findByDept", (request, response) => {
    Employee.aggregate([{ $group: { _id: "$dept", "Total Employees": { $sum: 1 } } }]).then((data) => {
        response.status(200).json({
            "data": data
        })
    })
})

route.get("/findByMatch", (request, response) => {
    Employee.aggregate([{ $match: { "name": /^va/ } }]).then((data) => {
        response.status(200).json({
            "data": data
        })
    })
})

route.get("/findByAgeAndSal", (request, response) => {
    Employee.aggregate([{ $match: { age: { $gte: 25 }, salary: { $lte: 50000 } } }]).then((data) => {
        response.status(200).json({
            "data": data
        })
    })
})

route.get("/findBySalFun", (request, response) => {
    Employee.aggregate([{ $group: { _id: null, "Maximum Salary": { $max: "$salary" }, "Minimum Salary": { $min: "$salary" }, "Average Salary": { $avg: "$salary" }, "Total Salary": { $sum: "$salary" } } }]).then((data) => {
        response.status(200).json({
            "data": data
        })
    })
})

// route.get("/findBySal",(request,response)=>
// {
//     Employee.aggregate([ {$match:
//         { $expr:
//           { $gt: [ { $getField: {$literal: "salary" } }, 40000 ] }
//         }
//      }]).then((data)=>
//     {
//         response.status(200).json({
//             "output":"filtered by dept",
//             "data":data
//         })
//     })  
// })

route.get("/findBySub", (request, response) => {
    Employee.aggregate([{
        $addFields:
        {
            favsub: { $first: "$sub_Known" }, skilled: { $last: "$sub_Known" }
        }
    }]).then((data) => {
        response.status(200).json({
            "data": data
        })
    })
})

route.get("/findByIn", (request, response) => {
    Employee.aggregate([{
        $project: {
            "contains java" : {
              $in: [ "java", "$sub_Known" ]
            }
          }
    }]).then((data) => {
        response.status(200).json({
            "data": data
        })
    })
})

route.get("/findBySortedOrder", (request, response) => {
    Employee.aggregate([{$sort:{name:-1,dept:1}}]).then((data) => {
        response.status(200).json({
            "data": data
        })
    })
})

route.get("/findByCase", (request, response) => {
    Employee.aggregate([{$project:{new_name:{$toUpper:"$name"},department:{$toLower:"$dept"}}}]).then((data) => {
        response.status(200).json({
            "data": data
        })
    })
})

route.get("/findByLimit",(request,response)=>
{
    Employee.aggregate([{$limit:3}]).then((data)=>
    {
        response.status(200).json({
            "output":data
        })
    })
})

route.get("/findByConcat",(request,response)=>
{
    Employee.aggregate([{$concat:"₹"+"$salary"}]).then((data)=>
    {
        response.status(200).json({
            "output":data
        })
    })
})

route.get("/findByUnwindAndCount",(request,response)=>
{
    Employee.aggregate([{$unwind:"$sub_Known"},{$sortByCount:"$sub_Known"}]).then((data)=>
    {
        response.status(200).json({
            "output":data
        })
    })
})
module.exports = route;

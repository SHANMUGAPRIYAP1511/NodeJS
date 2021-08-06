let express=require('express');
let data=express()
let bodyParser=require('body-parser')
let custRoute=require('./Routes/custRoute')
let empRoute=require('./Routes/employeeRoute')
let conn=require('mongoose');
conn.connect('mongodb+srv://diyashri:diyashri@nodejs-rest-api.ahk5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,useUnifiedTopology: true 
})
data.use(bodyParser.urlencoded({extended:false}))
data.use(bodyParser.json())
data.use('/customers',custRoute)
data.use('/employees',empRoute)
module.exports= data;
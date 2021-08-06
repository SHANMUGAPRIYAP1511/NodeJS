let http=require('http');
let port=3000;
let data=require('./Data')
http.createServer(data).listen(port)
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = new express()
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors())
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

// app.use(function(req,res,next){
//     res.header("Access-Control_Allow_Credentials", true);
//     res.header("Access-Control_Allow_Origin", req.headers.origin);
//     res.header("Access-Control_Allow_Methods", "GET,POST");
//     res.header("Access-Control_Allow_Headers", "X-Requested-With, X-Http-Method-Override,Content-Type, Accept");
//     next();
// })
const router = require('./routes/router')
app.use('/',router);

const port = process.env.PORT || 3000
app.listen(port)
console.log('app is listening on port: ' + port)



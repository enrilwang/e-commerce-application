const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = new express()
const cookieParser = require('cookie-parser');

app.use(cors({
    // origin: true,
    // credentials: true,
    
}));
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use(cookieParser());

const router = require('./routes/router')
app.use('/',router);

const port = process.env.PORT || 3000
app.listen(port)
console.log('app is listening on port: ' + port)

const all=require('./routes/api/all')
app.use('/api/all',all)
const login=require('./routes/api/login')
app.use('/api/login',login)



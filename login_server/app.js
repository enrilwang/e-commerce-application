const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = new express()
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: true,
    credentials: true,
    
}));

app.use((req, res, next) => {
    
    if(req.path !== '/' && !req.path.includes('.')){
      res.set({
        'Access-Control-Allow-Credentials': true, 
        'Access-Control-Allow-Origin': 'http://localhost:8080'||req.headers.origin , 
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', 
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
      })
    }
    req.method === 'OPTIONS' ? res.status(204).end() : next()
  })
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use(cookieParser());

const router = require('./routes/router')
app.use('/',router);

const port = process.env.PORT || 3000
app.listen(port)
console.log('app is listening on port: ' + port)




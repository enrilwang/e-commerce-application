const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = new express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

const router = require('./routes/router')
app.use('/',router);

const port = process.env.PORT || 3000
app.listen(port)
console.log('app is listening on port: ' + port)



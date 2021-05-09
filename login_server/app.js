const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = new express()

app.use(cors())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false}))



const phones=require('./routes/api/phones')
const bestSeller=require('./routes/api/bestseller')
app.use('/api/phones',phones)
app.use('/api/search',phones)
app.use('/api/bestSeller',bestSeller)

const port = process.env.PORT || 3000

app.listen(port)
console.log('app is listening on port: ' + port)



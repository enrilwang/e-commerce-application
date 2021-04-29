const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var session = require('express-session');
// const Router = require()

mongoose.connect("mongodb://localhost:27017/assignment");
mongoose.Promise = global.Promise;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.set('views', path.join(__dirname,'views'));
//app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req,res){
	res.render('survey.pug',{products:products})
});






app.listen(3000, err =>{
    if(err){
        console.log(err)
    }
    console.log("Server is running on port 3000")
})
const user = require("../models/userlisting")
const crypto = require("crypto")
var jwt = require("jsonwebtoken")


module.exports ={
  
  //get all user information 
  getAllUser:function(req,res,next) {
    user.find().exec()
        .then(data => res.json(data))
        .catch()
  },

  //get the user cookie
  getCookie: function(req,res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
    res.setHeader("Access-Control-Allow-Credentials","true")
    
    res.json({
      status:'0',
      msg:"",
      result:{
        cookie:req.cookies
      }
    })
    
  },


  //sign up function
  signUp:function(req, res, next) {
      var newUser = new user();
      let data = req.body;
      
      let password = crypto.createHash("md5").update(data.password).digest("hex");
      newUser.firstName = data.firstName;
      newUser.lastName = data.lastName;
      newUser.email = data.email;
      newUser.password = password;
      
      // check the user with the same email
      newUser.checkSameEmail(function(err,result){
        if(err){
            console.log("error!");
        }else if(result[0]){
            
            res.sendStatus(201);
        }else{
            newUser.save().then(() => {
              res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
              res.sendStatus(200)
            })
            .catch(err => next(err))
        }
      })  
  },
  


  //login function
  login: function(req, res, next){
    let data = req.body
    var currentUser = new user();
    
    let password = crypto.createHash('md5').update(data.password).digest("hex")
    currentUser.email = data.email;
    currentUser.password = password;

    currentUser.checkEmailandPassword(function(err, users){
      if(err){
          res.json({status:"1"})
          console.log("error!")
      }else if(users[0]){
        let userNow = users[0];
      
        //max age is 10 mins
        //set the cookie
        res.cookie('userToken', jwt.sign({data:data.email} , "shhhhh",{expiresIn: "10h"}) ,{maxAge: 600000})
        res.cookie('userName',userNow.firstName + " " + userNow.lastName,{maxAge: 600000})
        res.cookie('userEmail', userNow.email,{maxAge: 600000})
        res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
        res.setHeader("Access-Control-Allow-Credentials","true")
        
        res.json({
          status:'0',
          msg:"",
          result:{
            userName:userNow.firstName + " " + userNow.lastName,
            userEmail:userNow.email
          }
        })
    

      }else{
        //wrong email and password
        res.sendStatus(201);
      }
    })
  },

  //log out function 
  signOut: function(req, res) {
    console.log("logout")
    res.clearCookie("userToken").redirect("/");
  },


  //update function 
  updatePassword:function(req, res){
    
    let data = req.body
    let password = crypto.createHash('md5').update(data.password).digest("hex")
    user.update({email: data.email},{password: password}, function(err,res){
      if(err){
        console.log(err)
      }else{
        console.log("update successfully")
        console.log(res)
        res.sendStatus(200)
      }
    })
  },

  //update the profile
  updateProfile:function(req, res){
    
    let data = req.body
    let password = crypto.createHash('md5').update(data.password).digest("hex")
    var currentUser = new user();
    
    currentUser.email = data.email;
    currentUser.password = password;
    currentUser.checkSameEmail(function(err,doc){
      if(err){
        res.json({status:"1"})
        console.log("error!")
      }else if(doc[0]){
        //let userNow = users[0];
       
        user.update({email: data.email},{email: data.email,firstName:data.firstName,lastName:data.lastName}, function(err,res){
          if(err){
            console.log(err)
          }else{
            console.log("update successfully")
            console.log(res)
            res.sendStatus(200)
          }
        })
      }else {
        res.sendStatus(201)
      }
    })
    
  }


  
}
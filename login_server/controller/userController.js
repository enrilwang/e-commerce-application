const user = require("../models/userlisting")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

module.exports ={
  
  //get all user information 
  getAllUser:function(req,res,next) {
    user.find().exec()
        .then(data => res.json(data))
        .catch()
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
            newUser.save().then(() => {res.sendStatus(200)})
            .catch(err => next(err))
        }
      })  
  },
  


  //login function
  login: function(req, res, next){
    let data = req.body
    var currentUser = new user();
    
    let password = crypto.createHash('md5').update(data.password).digest("hex")
    currentUser.email = data.email
    currentUser.password = password
    currentUser.checkEmailandPassword(function(err, result){
      if(err){
          console.log("Query error!")
      }else if(result[0]){
        let loginUser = result[0]
        console.log(loginUser)
        const payload = {email}
        const token = jwt.sign(payload, secret,{
          expiresIn: "1h"
        })
        res.cookie('token', token,{maxAge: 1800000})
          .cookie('current-user-name',loginUser.firstName + " " + loginUser.lastName,{maxAge: 1800000})
          .cookie('current-user-email', loginUser.email,{maxAge: 1800000})
          .sendStatus(200)
      }else{
        console.log("wrong email and password")
        //wrong email and password
        res.sendStatus(201);
      }
    })
  },

  //update function 
  updateUserPassword:function(req, res){
    console.log("updating user password")
    let body = req.body
    let passwordEncrypt = crypto.createHash('md5').update(body.password).digest("hex")
    user.update({email: body.email},{password: passwordEncrypt}, function(err,docs){
      if(err){
        console.log(err)
      }else{
        console.log("update successfully")
        console.log(docs)
        res.sendStatus(200)
      }
    })
  },

  signOut: function(req, res) {
    console.log("logout")
    res.clearCookie("token").redirect("/");
  }

}
const userPhone = require("../models/userPhone")


module.exports ={
  
  //get all cart information 
  getAllCart:function(req,res,next) {
    userPhone.find({created:0}).exec()
        .then(data => res.json(data))
        .catch()
  },
  



  //sign up function
  add:function(req, res, next) {
      var newUser = new userPhone();
      let data = req.body;
  
      newUser.email = data.user.userEmail;
      newUser.userid = data.user.id;
      newUser.title = data.item.title;
      newUser.price = data.item.price;
      newUser.brand = data.item.brand;
      newUser.image = data.item.image;
      newUser.stock = data.item.stock;
      newUser.reviews = data.item.reviews;
      newUser.seller = data.item.seller;
      newUser.quantity = data.item.quantity;
      newUser.created = data.item.created;
      newUser.save().then(() => {
        res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
        res.sendStatus(200)
      })
     .catch(err => next(err))
      
  },
  


 
  //update function 
  updateQuantity:function(req, res){
    let data = req.body
    if (data.quantity == 0) {
        userPhone.deleteOne({title: data.product.title},function(err,result){
            if(err){
                console.log(err)
              }else{
    
                console.log("delete successfully")
              }
        })
        res.sendStatus(201)
    }else {
        userPhone.update({_id: data.product._id},{quantity: data.quantity}, function(err,res){
            if(err){
              console.log(err)
            }else{
              
              console.log("update successfully")
            }
      })
      res.sendStatus(200)
    }

  },


  
  delete:function(req, res){
    let data = req.body
    userPhone.deleteOne({title: data.product.title},function(err,result){
        if(err){
            console.log(err)
          }else{

            console.log("delete successfully")
          }
    })
    res.sendStatus(200)

  }
//   deleteAll:function(req, res){
//     let data = req.body
//     userPhone.deleteOne({title: data.product.title},function(err,result){
//         if(err){
//             console.log(err)
//           }else{

//             console.log("delete successfully")
//           }
//     })
//     res.sendStatus(200)

//   }
  

}

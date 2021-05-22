const phone = require("../models/phonelisting")
const userPhone = require("../models/userPhone")

module.exports ={
  //Search function
  getByTitle:function(req,res,next){
    title = req.params.title
    phone.findPhoneWithTitle(title,function(err,result){
      if(err){
        console.log("cannot find this title")
      }else {
        res.json(result)
      }
    })
  },


  //get phoneListing data that sold out soon
  getPhone:function(req,res,next) {
    phone.find({$or:
        [
          {$and:[{stock:{$gt:0}},{disabled:{$exists:false}}]},
          {$and:[{stock:{$gt:0}},{disabled:false}]}
        ]
    }).sort({stock:1}).limit(5).exec()
        .then(data => res.json(data))
        .catch()
  },

  //get the best seller
  getBestSeller:function(req,res,next) {
    phone.aggregate([
      {$unwind:"$reviews"},
      {
          $group:{
              _id:{Title:"$title",image:"$image"},
              
              title:{$first : "$title"},
              price:{$first : "$price"},
              brand:{$first : "$brand"},
              image:{$first : "$image"},
              stock:{$first : "$stock"},
              reviews:{"$push" : "$reviews"},
              seller:{$first : "$seller"},
              avgRating:{$avg:'$reviews.rating'}
          }

      },
      {$match:{$or:
        [
          {$and:[{stock:{$gt:0}},{disabled:{$exists:false}},{avgRating:{$gte:2}}]},
          {$and:[{stock:{$gt:0}},{disabled:false},{avgRating:{$gte:2}}]}
        ]
      }},
      {$sort:{avgRating:-1}},
      {$limit:5}
    ]).exec()
    .then(data => res.json(data))
    .catch() ;
  },

  //update stock after puchase
  updateStock:function(req,res,next) {
    let data = req.body
    for (let i = 0; i < data.length; i++) {
      let newStock = data.carts[i].stock - data.carts[i].quantity;
      phone.update({title: data.carts[i].title},{stock: newStock}, function(err,res){
        if(err){
          console.log(err)
        }else{
          console.log("update successfully")
          console.log(res)
        }
      })
      userPhone.deleteOne({title: data.carts[i].title},function(err,result){
        if(err){
            console.log(err)
          }else{

            console.log("delete successfully")
          }
    })
      
    }
    res.sendStatus(200)
  },

  //add new phone associated to the user
  addNewPhone:function(req,res,next) {
    let data = req.body
    var newUser = new phone();
    newUser.title = data.item.title;
    newUser.price = data.item.price;
    newUser.brand = data.item.brand;
    newUser.image = data.item.image;
    newUser.stock = data.item.stock;
    newUser.reviews = [];
    newUser.seller = data.item.seller;
    newUser.disabled = true;
    newUser.userId = data.userId;
    newUser.save().then(() => {
      res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
      res.sendStatus(200)
    })
   .catch(err => next(err))
  },

  //remove the item
  remove:function(req,res) {
    let data = req.body
    phone.deleteOne({title: data.product.title,price:data.product.price},function(err,result){
        if(err){
            console.log(err)
          }else{
            console.log("delete successfully")
          }
    })
    res.sendStatus(200)
  },

  changeStatus:function(req,res) {
    let data = req.body
    console.log(data.product._id)
    phone.update({title: data.product.title,userId:data.id},{disabled:data.disable }, function(err,res){
      if(err){
        console.log(err)
      }else{
        console.log("update successfully")
        
      }
    })
    res.sendStatus(200)
  }



}
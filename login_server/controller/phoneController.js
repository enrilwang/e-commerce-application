const phone = require("../models/phonelisting")
const userPhone = require("../models/userPhone")
module.exports ={

  //Search function
  getByTitle:function(req,res,next){
    title = req.params.title
    // console.log(req.params)
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
    phone.find({stock:{$gt:0}}).sort({stock:1}).limit(5).exec()
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
      
      {$match:{stock:{$gt:0},avgRating:{$gte:2}}},
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
    
    



  }
}
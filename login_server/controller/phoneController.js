const phone = require("../models/phonelisting")

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


  //get phoneListing data
  getAllPhone:function(req,res,next) {
    phone.find().exec()
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
              avgRating:{$avg:'$reviews.rating'}
          }
          
         
      },
      {$match:{avgRating:{$gte:2}}},
      {$sort:{avgRating:-1}},
      {$limit:5}
  

    ]).exec()
    .then(data => res.json(data))
    .catch() ;
  }

}
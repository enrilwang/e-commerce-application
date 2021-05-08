const express=require('express')
const phone = require('../../models/phonelisting')
const router=express.Router()

router.get('/',async (req,res)=>{
    
    res.send(await phone.aggregate([
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
    

    ]) );
})

module.exports=router
const express=require('express')
const { load } = require('mime')

const phone = require('../../models/phonelisting')
const router=express.Router()

router.get('/',async (req,res)=>{
   
    res.send(await phone.find())
})

router.post('/',async (req,res)=>{
   
    res.send(await phone.find())
})


router.get('/api/search',async (req,res)=>{
    // res.send('hello');
    res.send(await phone.find({},{brand:1}).limit(1));
    // console.log()
})

router.get('/api/bestSeller',async (req,res)=>{
    
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
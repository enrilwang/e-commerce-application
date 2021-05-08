
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const phoneSoldOut=require('../../login server/models/phonelisting')

mongoose.connect('mongodb://localhost:27017/assignment');
mongoose.connection.on('connected',()=>{
  console.log("mongoDB connected");
});

router.get('/',(req,res,next)=>{
 
    phoneSoldOut.find({},(err,doc)=>{        
      "use strict";
      if (err){
        res.json({
          status:1,
          msg:err.message
        })
      }else {
        res.json({
          status:0,
          msg:'',
          result:{
            count:doc.length,
            list:doc
          }
        })
      }
    })
  });
      

module.exports = router;
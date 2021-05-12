const express=require('express')
const router=express.Router()
const phoneController = require("../controller/phone")



router.get('/all', phoneController.getAllPhone)

router.get('/seller', phoneController.getBestSeller)

router.get('/search/:title',phoneController.getByTitle)


module.exports=router
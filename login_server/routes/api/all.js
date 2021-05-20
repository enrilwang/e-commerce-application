const express = require ('express')
const mongodb = require('mongodb')
const phoneController = require("../../controller/phoneController")

const router=express.Router()

router.get('/', phoneController.getAllPhone)

module.exports=router
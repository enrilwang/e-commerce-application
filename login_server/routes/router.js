const express=require('express')
const router=express.Router()
const phoneController = require("../controller/phoneController")
const userController = require("../controller/userController")


//get request
router.get('/all', phoneController.getAllPhone)
router.get('/seller', phoneController.getBestSeller)
router.get('/search/:title',phoneController.getByTitle)
router.get('/user', userController.getAllUser);
router.get('/',userController.getCookie);


//post request
router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
router.post('/updateStock',phoneController.updateStock)




module.exports=router
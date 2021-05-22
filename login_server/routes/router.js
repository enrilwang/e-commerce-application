const express=require('express')
const router=express.Router()
const phoneController = require("../controller/phoneController")
const userController = require("../controller/userController")
const userPhoneCOntroller = require("../controller/userPhoneController")

//get request
router.get('/soldsoon', phoneController.getPhone)
router.get('/seller', phoneController.getBestSeller)
router.get('/search/:title',phoneController.getByTitle)
router.get('/user', userController.getAllUser);
router.get('/',userController.getCookie);
router.get('/cart',userPhoneCOntroller.getAllCart)
router.get('/userAddList', userPhoneCOntroller.getAllList)



//post request
router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
router.post('/updateStock',phoneController.updateStock)
router.post('/updateProfile',userController.updateProfile)
router.post('/updatePassword',userController.updatePassword)
router.post('/add',userPhoneCOntroller.add)
router.post('/updateQuantity',userPhoneCOntroller.updateQuantity)
router.post('/deleteQuantity',userPhoneCOntroller.delete)
router.post('/addNewList',userPhoneCOntroller.addList)
router.post('/addToPhone',phoneController.addNewPhone)

module.exports=router
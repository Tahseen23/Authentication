const { signup, login } = require('../Controllers/AuthControllers')
const { signupValidation,loginValidation } = require('../Middlewares/validation')

const {forgetPassword,verify,setPassword}=require('../Controllers/ForgetPassword')

const router=require('express').Router()

router.post('/login',loginValidation,login)


router.post('/signup',signupValidation,signup)

router.post('/forgetPassword',forgetPassword)
router.post('/forgetPassword/verify',verify)
router.post('/setPassword',setPassword)

module.exports=router


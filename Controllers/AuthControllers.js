const UserModel=require('../Models/user.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const signup=async(req,res)=>{
  try{
    const {name,email,password,number}=req.body
    const user=await UserModel.findOne({email})
    if (user){
      return res.status(409).json({message:'User Already exits'})
    }

    const userModel=new UserModel({name,email,password,number})
    userModel.password=await bcrypt.hash(password,10)
    await userModel.save()
    res.status(201).json({message:'SignUp sucesss',sucess:true})
  }catch(err){
    res.status(500).json({
      message:'Internal Server Error',
      sucess:false
    })

  }

}


const login=async(req,res)=>{
  try{
    const {email,password}=req.body
    const user=await UserModel.findOne({email})
    const errorMsg='Auth failed email or password is wrong'
    if (!user){
      return res.status(403).json({message:errorMsg,sucess:false})
    }
    const isPassEqual=await bcrypt.compare(password,user.password)
    if (!isPassEqual){
      return res.status(403).json({message:errorMsg,sucess:false})
    }
    const jwtToken=jwt.sign({email:user.email,_id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'24h'}
    )
    const name=user.name
    res.status(200).json({message:'Login sucesss',sucess:true,jwtToken,email,password,name})
  }catch(err){
    res.status(500).json({
      message:'Internal Server Error',
      sucess:false
    })

  }

}


module.exports={
  signup,
  login
}
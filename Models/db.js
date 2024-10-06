const mongoose=require('mongoose')

const mongoUrl=process.env.MONGO

mongoose.connect(mongoUrl)
.then(()=>{
  console.log('Connected')
}).catch((err)=>{
  console.log(err)
})
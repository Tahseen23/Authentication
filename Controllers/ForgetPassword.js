const { string } = require("joi");
const userModel = require("../Models/user.js")
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const bcrypt = require('bcrypt')


let Phonenumber
const forgetPassword = async (req, res) => {
  try {
    const { number } = req.body;
    Phonenumber=number

    // Validate if number exists
    if (!number) {
      return res.status(400).json({ message: 'Number is required', success: false });
    }

    console.log('Received Number:', typeof number);
    console.log('Received Number:', number);


    const user = await userModel.findOne({ number });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'Number is wrong', success: false });
    }

    console.log('+' + number.toString())
    try {
      const otpRes=await client.verify.v2.services(process.env.ID)
        .verifications
        .create({ to: '+' + number.toString(), channel: 'sms' });
      if (otpRes){
        return res.status(200).json({sucess:true})
      }
    } catch (err) {
      return res.status(404).json({
        message: err.message, sucess: false
      })
    }

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false
    });
  }
};


const verify = async (req, res) => {
  const { otp } = req.body
  console.log(otp)
  const result = await client.verify.v2.services("VA6c0e8ed1042e8f76eaf82c5f3880341d").verificationChecks
  .create({to:'+' + Phonenumber.toString(),code:otp})
  console.log(result)
  if (!result.valid) {
    return res.status(404).json({ message: 'Invalid OTP', sucess: false })
  }
  return res.status(200).json({sucess:true})

}

const setPassword = async (req, res) => {
  const {  newPassword } = req.body
  console.log(newPassword)
  if (newPassword.length < 4) {
    return res.status(400).json({ message: 'PassWord is too short', sucess: false })
  }
  const user = await userModel.findOne({ Phonenumber })
  user.password = newPassword
  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()
  return res.status(200).json({ sucess: true })


}

module.exports = {
  forgetPassword,
  verify,
  setPassword
}
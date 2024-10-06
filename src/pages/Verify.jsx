import { ToastContainer } from 'react-toastify'
import { useContext, useState } from 'react'
import { handleError } from '../utils'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../context/Context'

const Verify = () => {

  const { otp, setOtp } = useContext(Context)
  const navigate = useNavigate()


  const verifyOtp = async (e) => {
    e.preventDefault()
      if(!otp){
        handleError('OTP is Required')
      }
      try {
        const url = 'http://localhost:8080/auth/forgetPassword/verify'
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ otp: otp })
        })
        const result = await response.json()
        console.log(result)
        if (result.sucess) {
          navigate('/setPassword')


        }
        else {
          handleError('Incorrect OTP Number')
        }


      } catch {
        handleError('Some thing happend')
       }
    // console.log(otp)
  }






  return (
    <div className="container">
      <h1>Forget Password</h1>
      <form onSubmit={verifyOtp} >
        <div>
          <label htmlFor="otp">OTP</label>
          <input onChange={(e) => { setOtp(e.target.value) }} type="tel" name="otp" placeholder="Enter OTP... " value={otp} />
        </div>

        <button type='submit'>Verify</button>:
      </form>

      <ToastContainer />
    </div>
  )

}

export default Verify
import { useContext, useState } from 'react'
import { handleError } from '../utils'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../context/Context'
import { Link } from 'react-router-dom'

function ForgetPassword() {

  const {number,setNumber}=useContext(Context)


  const navigate = useNavigate()


  const handleOTP = async (e) => {
    e.preventDefault()
    if (!number) {
      return handleError('Number is required')
    }
    try {
      const url = 'http://localhost:8080/auth/forgetPassword'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number })
      })
      const result = await response.json()
      console.log(result)
      if (result.sucess) {
        navigate('/forgetPassword/verify')


      }
      else {
        handleError('Incorrect Phone Number')
      }


    } catch { }
  


  }

  return (

    <div className="container">
      <h1>Forget Password</h1>
      <form onSubmit={handleOTP}>
        <div>
          <label htmlFor="number">Number</label>
          <input onChange={(e) => { setNumber(e.target.value) }} type="tel" name="number" placeholder="Enter your Number... " value={number} />
        </div>

        <button type='submit'>Get OTP</button>

        <span> Back to <Link to='/login'>Login</Link> Page</span>

      </form>

      <ToastContainer />
    </div>
  )
}
export default ForgetPassword


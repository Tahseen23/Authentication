import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { handleError } from '../utils'
import { Context } from '../../../context/Context'

const ForgetPassword=()=>{

  const {newPass,setnewPass}=useContext(Context)

  const navigate = useNavigate()

  const handlenewPass = async (e) => {
    e.preventDefault()
    if (!newPass) {
      return handleError('all fileds is required')
    }
    try {
      const url = 'http://localhost:8080/auth/setPassword'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({newPassword:newPass })
      })
      const result = await response.json()
      console.log(result)
      if (result.sucess) {
        navigate('/login')


      }
      else {
        handleError('Incorrect Email or Password is too short')
      }


    } catch { }


  }

  return (
    <div className="container">
      <h1>Set Password</h1>
      <form onSubmit={handlenewPass} >
        <div>
          <label htmlFor="password">New Password</label>
          <input onChange={(e) => { setnewPass(e.target.value) }} type="text" name="newPass" placeholder="Enter your password... " value={newPass} />
        </div>

        <button type='submit'>Set Password</button>:
      </form>

      <ToastContainer />
    </div>
  )
}

export default ForgetPassword
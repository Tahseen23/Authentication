import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSucess } from '../utils'
function LogIn() {
  const [loginInfo,setLoginInfo]=useState({
    email:'',
    password:''
  })

  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLogInInfo = { ...loginInfo };
    copyLogInInfo[name] = value;
    setLoginInfo(copyLogInInfo);
}

  const handleLogin= async (e)=>{
    e.preventDefault()
    const {email,password}=loginInfo
    if ( !email || !password){
      return handleError('All fields are required')
    }
    try{
      const url='http://localhost:8080/auth/login'
      const response=await fetch(url,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(loginInfo)
      })
      const result=await response.json()
      const {sucess,message,jwtToken,name,error}=result
      if (sucess){
        handleSucess(message)
        localStorage.setItem('token',jwtToken)
        localStorage.setItem('loggedInUser',name)
        setTimeout(()=>{
          navigate('/home')
        },1000)
      }else if(error){
        const details=error?.details[0].message
        handleError(details)
      }
      console.log(result)

    }catch(err){
      handleError(err)
    }
  }
  return (
    <div className='container'>
        <h1>LogIn</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    onChange={handleChange}
                    type='email'
                    name='email'
                    placeholder='Enter your email...'
                    value={loginInfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    onChange={handleChange}
                    type='password'
                    name='password'
                    placeholder='Enter your password...'
                    value={loginInfo.password}
                />
            </div>
            <button type='submit'>Signup</button>
            <span>Don't have an account ?
                <Link to="/signup">signUp</Link>
            </span>
            <span>
              <Link to='/forgetPassword'> Forget Password </Link>
            </span>
        </form>
        <ToastContainer />
    </div>
)
}

export default LogIn
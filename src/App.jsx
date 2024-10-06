import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Navigate, Route,Routes} from 'react-router-dom'
import LogIn from './pages/Login'
import SignUp from './pages/Signup'
import Home from './pages/Home'
import Verify from './pages/verify'
import RefreshHandler from './RefreshHandler'
import ForgetPassword from './pages/ForgetPassword'
import SetPassword from './pages/SetPassword'
import { Context } from '../../context/Context'


function App() {
  const [isAuth,setisAuth]=useState(false)
  const {number}=useContext(Context)
  const PrivateRoute=({element})=>{
    return isAuth?element:<Navigate to='/login'></Navigate>
  }

  const AnotherCheck=({element})=>{
    return number.length?element:<Navigate to='/forgetPassword'></Navigate>
  }



  return (
    <div className='App'>
      <RefreshHandler  setisAuth={setisAuth}/>
      <Routes>
      <Route path='/' element={<Navigate to='/login'/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/forgetPassword' element={<ForgetPassword />}></Route>
        <Route path='/forgetPassword/verify' element={ <AnotherCheck element={<Verify />}/>}></Route>
        <Route path='/setPassword' element={<AnotherCheck element={<SetPassword />}/>}></Route>
        <Route path='/home' element={<PrivateRoute element={<Home />}/>}></Route>

      </Routes>
    </div>
  )
}

export default App

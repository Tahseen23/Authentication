import { useEffect, useState } from "react"
import { handleError } from "../utils"
import { useNavigate } from "react-router-dom"

function Home(){
  const [loggedInUser,setLoggedInUser]=useState('')
  const navigate=useNavigate()
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const handleLogOut=(e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }

  const fetchProducts=async()=>{
    try{
      const url='http://localhost:8080/products'
      const headers={
        headers:{
          'Authorization':localStorage.getItem('token')
        }
      }
      const response=await fetch(url,headers)
      const result=await response.json()
      console.log(result)

    }catch(err){
      handleError(err)
    }
  }
  useEffect(()=>{
    fetchProducts()
  })
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default Home
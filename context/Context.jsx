import { createContext, useState } from "react";

export const Context=createContext()

const ContextProvider=(props)=>{
  const [number,setNumber]=useState('')
  const [otp,setOtp]=useState('')
  const [newPass,setnewPass]=useState('')
  
  const contextValue={
    number,setNumber,
    otp,setOtp,
    newPass,setnewPass
  }
  return (
   <Context.Provider value={contextValue}>
    {props.children}

   </Context.Provider>
  )
}

export default ContextProvider
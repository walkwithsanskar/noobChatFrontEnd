import React from 'react'
import {Navigate} from "react-router-dom"
import { useSelector } from 'react-redux'
import {toast} from "react-hot-toast"
const OpenRoute = ({children}) => {


    const {token , user} = useSelector((state)=>state.auth);

    if(token!=="null" && user!==null){
       
        return children
    }
    else{
        return  <>
          
        <Navigate to={"/"}/>
        </>
        

        
    }


}

export default OpenRoute
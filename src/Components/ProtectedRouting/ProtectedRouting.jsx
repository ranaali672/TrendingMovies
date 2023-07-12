import React from "react"
import { Navigate } from "react-router-dom"

export default function ProtecteRouting(props){
   
        if(localStorage.getItem('token')){
            return props.children
            //home , about , profile
        }else{
            //login 
            return <Navigate to='/login'/>
        }
    
     
}
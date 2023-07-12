import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login({saveUserData}) {
  let [apiError , setApiError] = useState("");
  let [loading , setLoading] = useState(false);
  let baseUrl=`https://route-ecommerce.onrender.com`;
  let navigate = useNavigate();
  let validate = Yup.object({
    email:Yup.string().required('email is required').email('email invalid'),
    password:Yup.string().required('password is required').matches(/^[A-z][a-z0-9]{5,10}/),
  })
  let formik =useFormik({
    initialValues:{
      name:'',
      email:'',
      password:''
    },validationSchema:validate ,onSubmit:sendLoginData
  })
 
 async function sendLoginData(values){
  setLoading(true)
  let {data} =await axios.post(`${baseUrl}/api/v1/auth/signin`,values).catch((err)=>{
    setApiError(err.response.data.message);
    setLoading(false)
  });
  if(data.message ==='success'){
   localStorage.setItem("token",data.token)
    //login
    // localStorage.setItem('token',data.token)
    saveUserData(data.user)
    navigate('../home')
    setLoading(false)

  }
  console.log(data);
 }

  return (<>
        <div className='w-75 mx-auto'>
          <h3 className='pt-4 mb-4 fs-2 text-info'>Login Now</h3>
          <form onSubmit={formik.handleSubmit}>

            {apiError?<div className='alert alert-danger'> {apiError}</div>:""}
           

            <label htmlFor="email" className='my-2 fs-5'>Email :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2"  type="email" name="email" id="email" />
            {formik.errors.email &&formik.touched.email ?<div className='alert alert-danger'>{formik.errors.email}</div> : ""}

            <label htmlFor="password" className='my-2 fs-5'>Password :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2"  type="password" name="password" id="password" />
            {formik.errors.password &&formik.touched.password ?<div className='alert alert-danger'>{formik.errors.password}</div> : ""}

            
            <button type='submit' className='btn btn-info my-3 px-4 rounded-5 text-white fw-bold'> {loading ?<i className='fas fa-spinner fa-spin'></i> : "Login"}</button>
          </form>
        </div>
    </>
  )
}

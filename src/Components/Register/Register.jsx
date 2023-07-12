import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Register() {
  let baseUrl=`https://route-ecommerce.onrender.com`;
  let [apiError , setApiError] = useState("");
  let [loading , setLoading] = useState(false);
  let navigate = useNavigate();
  let validate = Yup.object({
    name:Yup.string().required('name is required').min(3,'minumun name is 3 char').max(15, 'maximum is 15 char'),
    email:Yup.string().required('email is required').email('email invalid'),
    password:Yup.string().required('password is required').matches(/^[A-z][a-z0-9]{5,10}/),
    rePassword:Yup.string().required('password is required').oneOf([Yup.ref('password')],'rePassword dont match'),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}/ , "this not egyptian phone")
  })
  let formik =useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema:validate ,onSubmit:sendRegisterData
  })
 
 async function sendRegisterData(values){
  setLoading(true)
  //baseUrl = https://ecommerce.routemisr.com/
  let {data} =await axios.post(`${baseUrl}/api/v1/auth/signup`,values).catch((err)=>{
    setApiError(err.response.data.message);
    setLoading(false)
  });
  if(data.message ==='success'){
    //login
    navigate('/login')
    setLoading(false)

  }
  console.log(data);
 }

  return (<>
        <div className='w-75 mx-auto'>
          <h3 className='pt-3 mb-4 fs-2 text-info'>Register Now</h3>
          <form onSubmit={formik.handleSubmit}>

            {apiError?<div className='alert alert-danger'> {apiError}</div>:""}
            <label htmlFor="name" className='text-capitalize'>name :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur}  className="form-control my-2"  type="text" name='name' id='name' />
            {formik.errors.name &&formik.touched.name ?<div className='alert alert-danger'>{apiError}</div> : ""}
            

            <label className='text-capitalize my-1' htmlFor="email">email :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2"  type="email" name="email" id="email" />
            {formik.errors.email &&formik.touched.email ?<div className='alert alert-danger'>{formik.errors.email}</div> : ""}

            <label className='text-capitalize my-1' htmlFor="password">password :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2"  type="password" name="password" id="password" />
            {formik.errors.password &&formik.touched.password ?<div className='alert alert-danger'>{formik.errors.password}</div> : ""}

            <label className='text-capitalize my-1' htmlFor="rePassword">rePassword :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2"   type="password" name="rePassword" id="rePassword" />
            {formik.errors.rePassword &&formik.touched.rePassword ?<div className='alert alert-danger'>{formik.errors.rePassword}</div> : ""}

            <label className='text-capitalize my-1' htmlFor="tel">phone :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control my-2"  type="phone" name="phone" id="phone" />
            {formik.errors.phone &&formik.touched.phone ?<div className='alert alert-danger'>{formik.errors.phone}</div> : ""}
            <button type='submit' className='btn btn-info my-3 px-4 rounded-5 text-white fw-bold'> {loading ?<i className='fas fa-spinner fa-spin'></i> : "Register"}</button>
          </form>
        </div>
    </>
  )
}

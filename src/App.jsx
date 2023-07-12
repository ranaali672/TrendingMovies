import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'
import ProtectedRouting from './Components/ProtectedRouting/ProtectedRouting'
import MovieDetails from './Components/MovieDetails/MovieDetails.jsx';
export default function App(){
  let[userData ,setUserData]= useState(null)
  useEffect(()=>{
    if(localStorage.getItem('token')){
      let token =localStorage.getItem('token')
      console.log(token);
      let data =jwt_decode(token)
      saveUserData(data)
  }
  },[])
  function saveUserData(data){
setUserData(data)
  }
  function logOut(){
    setUserData(null)
    localStorage.removeItem('token')
    return <Navigate to='/login'/>
  }

  function ProtectedRouting2(props){
    if(localStorage.getItem("token")!=null){
      return <Navigate to='./Home'></Navigate>
    }else{
      return props.children
    }
  }


  let routers = createBrowserRouter([
    { path:"", element: <Layout  logOut={logOut} userData={userData} setUserData={setUserData}/> , children: [
      {path:"movies" , element: <ProtectedRouting> <Movies/></ProtectedRouting>},
      {path:"tvshow" , element:<ProtectedRouting><Tvshow/></ProtectedRouting> },
      {path:"people" , element:<ProtectedRouting><People/></ProtectedRouting> },
      {path:"moviedetails/:id/:mediaType" , element: <ProtectedRouting> <MovieDetails/></ProtectedRouting>},
      {path:"login" , element: <Login saveUserData={saveUserData} />},
      {index:true, element:<ProtectedRouting2><Register /></ProtectedRouting2> },
      {path:'register',element:<Register ></Register>},
      {path:"home" , element: <ProtectedRouting><Home/></ProtectedRouting> },
      {path:"*" , element: <Notfound/>},
    ]}
  ])
  return <RouterProvider router={routers}></RouterProvider>
}



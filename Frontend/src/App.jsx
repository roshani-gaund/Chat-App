import React, { useEffect } from 'react'

import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import {  Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './util/useAuthStore.js';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Profile from './Pages/Profile.jsx';

import Navbar from './component/Navbar.jsx';

const App = () => {
  const {authUser, checkAuth,isCheckingAuth}=useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  console.log({authUser}) ;
  if(isCheckingAuth && !authUser)return(
    <div className='flex item-center justify-content-center h-screen'>
      <Loader className=" size-10 animate-spin"/>
    </div>
  )
  return (
    <div>
      <Navbar/>
        <Routes>
        
          <Route path='/' element={authUser?<Home/>:<Navigate to="/signup"/>} />
          <Route path="/signup" element={!authUser?<Signup />:<Navigate to="/"/>} />
          <Route path="/login" element={!authUser?<Login />:<Navigate to="/"/>} />
          <Route path='/profile' element={<Profile/>}/>
          

        </Routes>
        <Toaster/>
      
    </div>
  )
}

export default App
  import React from 'react'
  import {Routes,Route} from 'react-router-dom'
  import Home from './pages/HomePage'
  import Login from './pages/Login'
  import EmailVerify from './pages/EmailVerify'
  import ResetPassword from './pages/ResetPassword'
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  export default function App() {
    return (
      <div>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/Login' element={<Login/>}/> 
          <Route path='/email-verify' element={<EmailVerify/>}/> 
          <Route path='/resetpassword' element={<ResetPassword/>}/> 
        </Routes>
        {/* <h1 class="text-3xl font-bold underline">Starting here </h1> */}
      </div>
    )
  }

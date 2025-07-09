import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from'axios'
import { AppContext } from '../context/AppContext';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

export default function EmailVerify() {
      axios.defaults.withCredentials = true;
      const {backendUrl,isLoggedin,userdata,getUserData} = useContext(AppContext);
        
        const navigate = useNavigate()


        const  handleInput = (e,index) => {
            if(e.target.value.length > 0 && index < inputRef.current.length - 1) {
                inputRef.current[index + 1].focus();
            }
        }

        const handleKeyDown = ( e ,index) => {
          if(e.key === 'Backspace' && e.target.value === '' && index > 0) {
                inputRef.current[index - 1].focus();
            }
        }

          const handlePaste = (e) => {
            const paste = e.clipboardData.getData('text').slice(0, 6);
              const chars = paste.split('');
                chars.forEach((ch, index) => {
                  if (inputRef.current[index]) {
                    inputRef.current[index].value = ch;
                  }
            })
          }
        const inputRef = React.useRef([]) 
        // topp one are most imp

        //backend Verifications

          const onSubmitHandler = async(e) => {
              try {
                e.preventDefault();
                const otpArray = inputRef.current.map(e=> e.value)
                const otp = otpArray.join('');
                
                const {data} = await axios.post(backendUrl + '/api/auth/verify-Account',{otp})
                if(data.success) {
                  toast.success(data.message);
                  getUserData();
                  navigate('/')
                }else {
                  toast.error(data.message);
                }
              } catch (error) {
                toast.error(error.message);
              }
          }
      useEffect(() => {
        isLoggedin && userdata && userdata.isAccountVerifed && navigate('/')
      }, [isLoggedin,userdata])
  return (
        <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-200 to-purple-400 relative">
      <img
      onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      /> 
        <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96'  onSubmit={onSubmitHandler}>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>
                Email Verify OTP  
            </h1>
            <p className='text-center mb-6 text-indigo-300'> Enter the 6 Code Sent To Your Email</p>
            <div className="flex justify-between mb-8" onPaste={handlePaste}>
              {Array(6).fill(0).map((_,index )=>(
                <input type='text' maxLength='1' key={index} required className='w-12 h-12 bg-[#333A5C]
                text-white text-center text-xl rounded-md'  ref={e=> inputRef.current[index ] = e}
                onInput={(e) => handleInput(e,index)}
                onKeyDown={(e) => handleKeyDown(e,index)}/>
              ))}
            </div>
              <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify Email</button>
        </form>
    </div>
  );
}

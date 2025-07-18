import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'

export default function Login() {
const navigate = useNavigate();

  const {backendUrl,setLogedIn,getUserData} = useContext(AppContext);
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const onSubmitHandler = async(e) => {
    try {
        e.preventDefault(); 
        axios.defaults.withCredentials = true;
        if(state === 'Sign Up') {
            const {data} = await axios.post(backendUrl + '/api/auth/regester', {name,email,password},{withCredentials: true});
              if(data.success) {
                setLogedIn(true);
                getUserData();
                navigate('/');
              }else {
                toast.error(error.response?.data?.message || error.message || "Something went wrong");

              }
          }else {
            const {data} = await axios.post(backendUrl + '/api/auth/login', {email,password}, {
      withCredentials: true
    });
            if(data.success) {
                setLogedIn(true);
                getUserData();
                navigate('/');
              }else {
                toast.error(error.response?.data?.message || error.message || "Something went wrong");

              }
          }
    } catch (error) {
          toast.error(error.response?.data?.message || error.message || "Something went wrong");

    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 relative">
      <img
      onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      /> 
      <div className="bg-slate-900 p-8 sm:p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-2xl font-bold text-white mb-1">
          {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="mb-6">
          {state === 'Sign Up' ? 'Join us by creating a new account' : 'Log in to continue your journey'}
        </p>

        <form onSubmit={ onSubmitHandler }>
          {state === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="person" />
              <input
                type="text"
                onChange={e => setName(e.target.value)}
                value={name}
                placeholder="Full Name"
                className="bg-transparent w-full outline-none text-white"
                required
              />
            </div>
          )} 
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="email" />
            <input
              type="email"
              onChange={e=> setEmail(e.target.value)}
              placeholder="Email"
              value={email}
              className="bg-transparent w-full outline-none text-white"
              required
            />
          </div> 
          <div className="mb-2 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="password" />
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="bg-transparent w-full outline-none text-white"
              required
            />
          </div>

          {state === 'Log In' && (
            <p className="text-right text-xs text-purple-300 mb-4 hover:underline cursor-pointer"
            onClick={() => navigate('/resetpassword')}>
              Forgot Password?
            </p>
          )}

          <button
            
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2.5 rounded-full"
          >
            {state}
          </button>
        </form>

        <p className="mt-4 text-center">
          {
            state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span
              className="text-purple-400 underline cursor-pointer"
              onClick={() => setState(state === 'Sign Up' ? 'Log In' : 'Sign Up')}
            >
              {state === 'Sign Up' ? 'Log in here' : 'Sign up now'
          }
            </span>
        </p>
      </div>
    </div>
  );
}

import React,{useContext} from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
export default function NavBar() {
    const navigate =useNavigate()
    const {userdata,backendUrl,setUserData,setLogedIn} = useContext(AppContext)
    const handleVerify = async() => {
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')
            if(data.success) {
              navigate('/email-verify');
              toast.success(data.message);
            } else {
              toast.error(data.message)
            }
        } catch (error) {
          toast.error(error.message)
        }
    }
    const handleLogout = async() => {
        try {
            axios.defaults.withCredentials = true
            const {data} = await axios.post(backendUrl + '/api/auth/logout')
            data.success && setLogedIn(false)
            data.success && setUserData(false)
            navigate('/')
        } catch (error) {
          toast.error(error.message)
        }
    }

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img src={assets.logo} alt='asd' className='w-28 sm:w-32'/>
        {userdata? 
        <div className="relative group">
  <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg cursor-pointer">
    {userdata.name[0].toUpperCase()}
  </div>

  <div className="absolute hidden group-hover:flex flex-col top-12 right-0 z-20 bg-white shadow-xl rounded-lg overflow-hidden min-w-[150px] transition-all duration-300">
    <ul className="list-none m-0 p-0 text-sm text-gray-800">
      {
        !userdata.isAccountVerifed && 
        <li className="px-4 py-2 hover:bg-indigo-50 cursor-pointer border-b" onClick={handleVerify}>
          ✅ Verify Email
        </li>
      }
      <li className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-500" onClick={handleLogout}>
        🚪 Log Out
      </li>
    </ul>
  </div>
</div>
:
        <button onClick={()=> navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Login <img src={assets.arrow_icon} alt="" /></button>
        }
        </div>
  )
}

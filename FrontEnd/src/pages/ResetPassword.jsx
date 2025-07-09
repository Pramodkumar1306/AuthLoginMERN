import React , {useContext, useState} from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ResetPassword() {

  const {backendUrl} = useContext(AppContext)

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setisEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmited, setIsOtpSubmited] = useState(false)


  
  
  
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
//---------------------------------------------------------------------------------------------
            const onSubmitEmail = async(e) => {
                e.preventDefault();
                try {
                  const {data} = await axios.post(backendUrl + '/api/auth/sentresetotp' , {email})
                  data.success ? toast.success(data.message) : toast.error(data.message)
                  data.success && setisEmailSent(true)
                } catch (error) {
                  toast.error(error.message)
                }
            }
        
        const onSubmitOtp = async(e) => {
          e.preventDefault();
          const otpArray = inputRef.current.map(e=> e.value)
          const enteredOtp = otpArray.join('');
          
            if (enteredOtp.length < 6 || otpArray.includes('')) {
              return toast.error("Please enter all 6 digits");
            }
            setOtp(enteredOtp);
            
            
            setIsOtpSubmited(true); 
        }
        
        const onSubmitNewPassword = async (e) => {
            e.preventDefault();
            try {
              const res = await axios.post(backendUrl + '/api/auth/resetpassword', {
                email,
                otp,
                newPassword
              });
  
              res.data.success
                ? toast.success(res.data.message)
                : toast.error(res.data.message);

              if (res.data.success) navigate('/login');
            } catch (error) {
              toast.error(error.message + " onSubmit");
              
            }
          };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-200 to-purple-400 relative">
      <img
      onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      /> 
      {/* // enter the email Id */}

      {
        !isEmailSent && 
      
      <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96' action="">
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>
                Email To Reset Password  
            </h1>
            <p className='text-center mb-6 text-indigo-300'>Enter Your Register Email Address</p>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="" />
              <input type="email" placeholder='Email Id Dal'  
              className='bg-transparent outline-none text-white'
              value={email}
              onChange={e => setEmail(e.target.value)} required/>
            </div>
              <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Send Code</button>
      </form>
}
    {/* OTP Input Form */}
{!isOtpSubmited && isEmailSent &&
        <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96' >
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>
                Reset OTP Password
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
              <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify Email</button>
        </form>
          
}
        {/* // enter the email Id */}

        {
          isOtpSubmited && isEmailSent && 
        
      <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96' action="">
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>
                New Password 
            </h1>
            <p className='text-center mb-6 text-indigo-300'>Enter The New Password bleow</p>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input type="password" placeholder='Enter The Password'  
              className='bg-transparent outline-none text-white'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)} required/>
            </div>
              <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Reset Password</button>
      </form>
}
    </div>

              // Enter New Password



  )
}

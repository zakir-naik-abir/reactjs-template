import { Link, useLocation, useNavigate } from 'react-router-dom'
import SocialMedia from './SocialMedia'
import { ImSpinner11 } from "react-icons/im";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const { signIn, loading, setLoading, resetPassword, showPassword, setShowPassword } = useAuth();
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async(e) =>{
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const email = form.email.value;
    
    try{
      setLoading(true)
      await signIn(email, password);
      navigate(from)
      toast.success('Login Successful')
    }catch(err){
      console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
  };

  const handleResetPassword = async() =>{
    if(!email) return toast.error('Please write your email first!')
    try{
      await resetPassword(email)
      toast.success('Password reset successful. Check your email')
      setLoading(false)
    }catch(error){
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
    console.log(email)
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md rounded-md p-8 bg-gray-100 text-gray-900'>
        <div className=' text-center'>
          <h1 className='mb-5 text-3xl font-serif '>Log in to your account</h1>
        </div>
        <SocialMedia/>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <i className='px-3 text-sm dark:text-gray-400 font-serif '>
          Or login with email & password
          </i>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <form
          onSubmit={handleLogin}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-2'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input onBlur={e => setEmail(e.target.value)} type='email' name='email' id='email'  required placeholder='Enter your email' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-gray-400 bg-gray-200 text-gray-900' data-temp-mail-org='0' />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
                <label onClick={handleResetPassword} htmlFor='password' className='text-sm mb-2 hover:underline hover:text-rose-400 text-gray-400'>
                Forgot password?
                </label>
              </div>
              <div className='relative'>
              <input type={showPassword ? "text" : "password" } name='password' autoComplete='current-password' id='password' required placeholder='Enter your password' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-gray-400 bg-gray-200 text-gray-900' />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute top-[10px] right-4 text-2xl">
                {
                  showPassword ? <IoEye></IoEye> : <IoMdEyeOff></IoMdEyeOff>
                }
              </span>
              </div>
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-rose-400 hover:bg-rose-500 w-full rounded-md py-[10px] text-white'
            >
              {loading ? (
                    <ImSpinner11 className='animate-spin m-auto text-2xl' />
                  ):(
                    'Continue'
                  )}
            </button>
          </div>
        </form>
        
        <p className='p-1 text-sm text-center text-gray-600'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-gray-600 font-bold'
          >
            <i>Sign Up</i>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoEye } from 'react-icons/io5';
import { IoMdEyeOff } from 'react-icons/io';
import useAuth from '../../hooks/useAuth';
import { ImSpinner11 } from 'react-icons/im';
import toast from 'react-hot-toast';
import { imageUpload } from '../../api/utils';

const SignUp = () => {
  const { createUser, loading, setLoading, resetPassword, showPassword, setShowPassword, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async e =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    try{
      setLoading(true)
      const image_url = await imageUpload(image)
      const { data } = await createUser(email, password)
      console.log(data)
      await updateUserProfile(name, image_url)
      navigate(from)
      toast.success('Signup Successful')
    }catch(err){
      console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-10 rounded-md bg-gray-100  text-gray-900'>
        <div className='mb-5 text-center'>
        
          <h1 className='text-3xl font-serif '>Sign up to your account</h1>
        </div>
        {/* <SocialMedia/> */}
        {/* <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <i className='px-3 text-sm dark:text-gray-400 font-serif '>
          Or login with email & password
          </i>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div> */}
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-gray-400 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
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
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 font-bold text-gray-600'
          >
            <i>Login</i>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp;

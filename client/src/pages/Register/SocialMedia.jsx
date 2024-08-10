import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";
import toast from "react-hot-toast";
import { ImSpinner11 } from "react-icons/im";

const SocialMedia = () => {
  const { signInWithGoogle, signInWithGithub, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const handleGoogleLogin = async() =>{
    try{
      setLoading(true)
      await signInWithGoogle()
      navigate(from)
      toast.success('Google Login Successful')
    }catch(error){
      console.error(error.message)
      toast.error(error.message)
      setLoading(false)
    }
  };

  const handleGithubLogin = async() =>{
    try{
      await signInWithGithub()
      navigate(from)
      toast.success('Github Login Successful')
    }catch(error){
      console.error(error.message)
      toast.error(error.message)
      setLoading(false)
    }
  };
  return (
    <div>
      <div className="space-y-3">
        <div className="cursor-pointer">
          <button disabled={loading} onClick={handleGoogleLogin} className='w-full btn btn-outline flex justify-center'>
            <FcGoogle className="text-3xl"></FcGoogle>
            <span className="text-gray-600 ">Login with google</span>
          </button>
        </div>
        <div className="cursor-pointer">
          <button disabled={loading} onClick={handleGithubLogin} className=' w-full btn-outline  btn  flex justify-center'>
            <IoLogoGithub className="text-3xl text-gray-600"></IoLogoGithub>
            <span className="text-gray-600 ">Login with github</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SocialMedia;
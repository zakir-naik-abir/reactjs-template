import Container from '../Container'
import { MdDashboardCustomize, MdOutlineLogout } from "react-icons/md";
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import { IoSettingsSharp } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme)
  } ,[theme])

  const handleToggle = e =>{ 
    if(e.target.checked) {
      setTheme('dark')
    }
    else{
      setTheme('light')
    }
  };

  const links = <>
    <li>
      <NavLink to={'/'}  className={({isActive}) => isActive? 'text-primary font-semibold' : 'font-semibold'}>Home</NavLink>
    </li>
    <li>
      <NavLink to={'/login'}  className={({isActive}) => isActive? 'text-primary font-semibold' : 'font-semibold'}>Login</NavLink>
    </li>
    <li>
      <NavLink to={'/signup'}  className={({isActive}) => isActive? 'text-primary font-semibold' : 'font-semibold'}>Signup</NavLink>
    </li>
    
  </>

  return (
    <div className='fixed bg-white text-slate-500 w-full  z-10 shadow-sm '>
      <div className=' border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between md:gap-0'>
            {/* Logo */}
            <div className="dropdown flex items-center ">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-40 border-2 border-gray-200 z-[1] shadow bg-base-100  w-28 ">            
                {links}
              </ul>
              <Link to={'/'}>
                <h2 className='text-2xl font-bold'>XYZ</h2>
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex md:flex">
              <ul className="menu menu-horizontal ">
                {links}
              </ul>
            </div>
            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center py-2'>
                {/* Dropdown btn */}
                <div title={user?.displayName} onClick={() => setIsOpen(!isOpen)} >
                  {/* Avatar */}
                  <img
                    className='rounded-full avatar'
                    referrerPolicy='no-referrer'
                    src={user && user.photoURL ? user.photoURL : avatarImg}
                    alt='profile'
                    height='30'
                    width='30'
                  />
                </div>
              </div>
              {/* profile */}
              {isOpen && (
                <div className='absolute rounded-sm shadow w-[140px]  bg-white overflow-hidden right-0 top-12 text-sm border-[2px] border-gray-100'>
                  <div className='flex flex-col cursor-pointer '>
                    {user ? (
                      <>
                        <div className='  p-[6px] transition font-semibold cursor-pointer flex justify-center items-center gap-1 border-b-2 border-black'>
                          <img className='rounded-full p-[2px] bg-slate-400' referrerPolicy='no-referrer' src={user && user.photoURL ? user.photoURL : avatarImg} alt='profile'  height='20' width='20' />
                          <h3>{user?.displayName}</h3>
                        </div>
                        
                        <Link to={'/dashboard'} className=' hover:bg-gray-200 p-[6px] transition font-semibold cursor-pointer flex items-center gap-1'>
                          <p className='p-[5px] rounded-full
                          bg-gray-300'><MdDashboardCustomize  /></p>
                          DashBoard
                        </Link>
                        
                        <div className=' hover:bg-gray-200 p-[6px] transition font-semibold cursor-pointer flex items-center gap-1'>
                          <p className='p-[5px] rounded-full
                          bg-gray-300'><IoSettingsSharp /></p>
                          Setting
                        </div>
                        
                        {/* theme */}
                        <div onChange={handleToggle} className=' hover:bg-gray-200 p-[6px] transition font-semibold cursor-pointer flex items-center gap-1'>
                          <p className='p-[4px] rounded-full
                          bg-gray-300 flex'>
                            <label className=" swap swap-rotate">
                              {/* this hidden checkbox controls the state */}
                              
                              <input type="checkbox" className="theme-controller" value="synthwave" />
                              {/* sun icon */}
                              <svg className="swap-off fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                              
                              {/* moon icon */}
                              <svg className=" swap-on fill-current w-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                              
                            </label>
                          </p>
                          Theme
                        </div>

                        <div onClick={logOut} className=' hover:bg-gray-200 p-[6px] transition font-semibold cursor-pointer flex items-center gap-1'>
                        <p className='p-[6px] rounded-full bg-gray-300'><MdOutlineLogout /></p>
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className=' hover:bg-gray-200 p-[6px] transition font-semibold cursor-pointer flex items-center gap-1'
                        > 
                          <p className='p-[6px] rounded-full bg-gray-300'><RiLoginBoxLine /></p>
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className=' hover:bg-gray-200 p-[6px] transition font-semibold cursor-pointer flex items-center gap-1'
                        > 
                          <p className='p-[6px] rounded-full bg-gray-300'><SiGnuprivacyguard /></p>
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar

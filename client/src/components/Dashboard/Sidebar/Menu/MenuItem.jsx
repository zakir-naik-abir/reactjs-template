import { NavLink } from "react-router-dom"

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink to={address} className={({isActive}) => `flex items-center px-4 py-2 my-5 hover:bg-gray-200 text-green-700 ${isActive ? 'bg-gray-300 text-gray-700 ' : 'text-gray-500' }`}>
      <Icon className='w-6 h-auto' />
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  )
}

export default MenuItem;
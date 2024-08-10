import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
const MainLayout = () => {
  return (
    <div className=''>
      <div className='h-16'>
        <Navbar />
      </div>
      <div className=' min-h-[calc(100vh-0px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout;

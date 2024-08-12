import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
const MainLayout = () => {
  return (
    <div className='h-screen'>
      <div className='h-14'>
        <Navbar />
      </div>
      <div className='h-screen min-h-[calc(100vh-300px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout;

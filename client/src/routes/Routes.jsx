import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import Login from '../pages/Register/Login'
import SignUp from '../pages/Register/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUser from '../pages/Dashboard/Admin/ManageUser'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <RoomDetails />,
      },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // {
      //   index: true,
      //   element: <PrivateRoute><Statistics /></PrivateRoute>
      // },
      // for admin
      {
        path: "manageUsers",
        element: <PrivateRoute><ManageUser /></PrivateRoute>,
      },
    ]
  }
])

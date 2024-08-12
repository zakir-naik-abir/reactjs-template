import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";
import Swal from 'sweetalert2';
import UpdateUserModal from "../../../components/Modal/UpdateUserModal";

const UserDataRows = ({ user, refetch, index }) => {

  const {user: loggedInUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (role) =>{
      const { data } = await axiosSecure.patch(`/users/update/${user?.email}`, role)
      return data
    },
    onSuccess: data =>{
      // if(user?.role === 'admin') return toast.error('Action Not Allowed')
      refetch()
      console.log(data)
      toast.success('User Role Updated Successfully!')
      setIsOpen(false)
    },
  });

  const handleDeleteUser =  async id =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if(result.isConfirmed) {
        const res = await axiosSecure.delete(`/userDelete/${id}`);
        if(res.data.deletedCount > 0){
          refetch();
          toast.success('User Delete Successful!')
        }
      }
    });
  }

  // modal
  const modalHandler = async (selected) =>{
    
    if(loggedInUser.email === user.email){
      toast.error('Action Not Allowed')
      return setIsOpen(false)
    }

    const userRole = {
      role: selected,
      status: 'Verified',
    }
    
    try{
      await mutateAsync(userRole)
    }catch(err){
      toast.error(err.message)
    }
  };
  

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
        <p className='text-gray-900 whitespace-no-wrap'>{index + 1}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
      <button
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          {/* <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-sm'
          ></span> */}
          <button className='btn btn-sm   bg-green-300  text-2xl p-1  rounded-sm'>
            <MdBrowserUpdated/>
          </button>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <button onClick={() => handleDeleteUser(user?._id)} className="bg-gray-300 p-1 text-red-600 rounded-sm text-2xl">
          <MdDeleteForever></MdDeleteForever>
        </button>
      </td>
    </tr>
  )
}

export default UserDataRows
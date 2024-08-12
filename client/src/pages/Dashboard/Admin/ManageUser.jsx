import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UserDataRows from "./ManageUserRows";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure()

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async() =>{
      const { data } = await axiosSecure(`/users`);
      return data;
    },
  });

  if(isLoading) return <LoadingSpinner/>

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <Helmet>
          <title>Manage Users</title>
        </Helmet>
        {/* <SectionTitle heading={'Manage Users'}/> */}
        <h3 className="flex justify-center font-bold text-4xl mt-5">Total Users: {users.length}</h3>
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden">
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Index
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <UserDataRows
                      key={user?._id}
                      user={user}
                      index={index}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUser;
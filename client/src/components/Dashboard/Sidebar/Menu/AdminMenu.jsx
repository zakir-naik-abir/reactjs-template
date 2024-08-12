import MenuItem from "./MenuItem"
import { FaUserFriends } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <MenuItem label={'Manage Users'}  address='manageUsers' icon={FaUserFriends} />
  )
}

export default AdminMenu;
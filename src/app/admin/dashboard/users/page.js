import UserList from "@/components/admin/UserList"
import { IoArrowBackSharp } from "react-icons/io5"
import Link from "next/link"
function UsersPage() {
    return (
        <>
            <Link className="p-5" href="/admin/dashboard/" >
            <IoArrowBackSharp size={20} />
            </Link>
            
            <UserList />
        </>
    )
}
export default UsersPage
import EventList from "@/components/admin/EventList"
import Link from "next/link"
import { IoArrowBackSharp } from "react-icons/io5"

function AllEvents(){
    return(
        <> 
        <Link href="/admin/dashboard/" >
        <IoArrowBackSharp />
        </Link>
        <EventList />
        </>
    )
}
export default AllEvents
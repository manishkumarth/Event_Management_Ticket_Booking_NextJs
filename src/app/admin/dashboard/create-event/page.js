import CreateEditEvent from "@/components/admin/CreateEditEvent"
import Link from "next/link"
import { IoArrowBackSharp } from "react-icons/io5"

function CreateEventPage() {
  return (
    <>
      <Link href="/admin/dashboard/" >
        <IoArrowBackSharp />
      </Link>
      <CreateEditEvent action="create" />
    </>
  )
}
export default CreateEventPage
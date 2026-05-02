import CreateEditEvent from "@/components/admin/CreateEditEvent";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";

async function UpdateEventPage({ params }) {
  const { id } = await params
  return (
    <>
      <Link className="p-5" href="/admin/dashboard/all-events/" >
        <IoArrowBackSharp />
      </Link>
      <CreateEditEvent action="edit" id={id} />
    </>
  );
}

export default UpdateEventPage;

import { IoArrowBackSharp } from "react-icons/io5"
import Link from "next/link"
import ValidateTicketWithId from "@/components/admin/ValidateWithId"

function ValidateWithIdPage() {
    return (
        <div className="min-h-screen flex flex-col items-center p-5">

            {/* Top Bar */}
            <div className="w-full max-w-2xl flex items-center gap-4 mb-6">

                <Link
                    href="/admin/dashboard/validate-ticket/"
                    className="p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                    <IoArrowBackSharp size={20} />
                </Link>

                <h2 className="text-xl font-semibold text-gray-800">
                    Validate Ticket (Manual ID)
                </h2>

            </div>

            {/* Card */}
            <div className="w-full max-w-2xl border shadow-md rounded-xl p-6">
                <ValidateTicketWithId />
            </div>

        </div>
    )
}

export default ValidateWithIdPage
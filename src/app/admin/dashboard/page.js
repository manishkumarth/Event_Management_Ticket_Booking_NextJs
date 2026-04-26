import Link from "next/link";
import { FaPlus, FaList, FaTicketAlt, FaUsers } from "react-icons/fa";

function DashboardPage() {
    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <Link href="/admin/dashboard/create-event">
                <div className="bg-green-500 text-white p-6 rounded-2xl shadow-md hover:scale-105 transition cursor-pointer flex flex-col items-center justify-center gap-3">
                    <FaPlus size={30} />
                    <h2 className="text-lg font-semibold">Create Event</h2>
                </div>
            </Link>

            <Link href="/admin/dashboard/all-events">
                <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-md hover:scale-105 transition cursor-pointer flex flex-col items-center justify-center gap-3">
                    <FaList size={30} />
                    <h2 className="text-lg font-semibold">All Events</h2>
                </div>
            </Link>

            <Link href="/admin/dashboard/validate-ticket">
                <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-md hover:scale-105 transition cursor-pointer flex flex-col items-center justify-center gap-3">
                    <FaTicketAlt size={30} />
                    <h2 className="text-lg font-semibold">Validate Ticket</h2>
                </div>
            </Link>

            <Link href="/admin/dashboard/users">
                <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-md hover:scale-105 transition cursor-pointer flex flex-col items-center justify-center gap-3">
                    <FaUsers size={30} />
                    <h2 className="text-lg font-semibold">Users</h2>
                </div>
            </Link>

        </div>
    );
}

export default DashboardPage;
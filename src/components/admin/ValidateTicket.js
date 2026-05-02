import Link from "next/link"
import { IoArrowBackSharp } from "react-icons/io5"

function ValidateTicket() {
    return (
        <div className="flex flex-col items-center justify-center p-5">

                <Link
                    href="/admin/dashboard/"
                    className="p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                    <IoArrowBackSharp size={20} />
                </Link>

            {/* 📦 Card */}
            <div className="shadow-red-500/50 rounded-xl p-8 w-full max-w-md text-center">

                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Validate Ticket
                </h2>

                {/* Buttons */}
                <div className="flex flex-col gap-4 p-5">

                    <Link
                        href="/admin/dashboard/validate-ticket/qr-reader"
                        className="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 active:scale-95 transition"
                    >
                        🎥 Scan QR Code
                    </Link>

                    <Link
                        href="/admin/dashboard/validate-ticket/with-id/"
                        className="w-full py-3 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-500 hover:text-white active:scale-95 transition"
                    >
                        🔢 Validate with ID
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default ValidateTicket
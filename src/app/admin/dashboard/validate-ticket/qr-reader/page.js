import QrReader from "@/components/admin/QrReader"
import Link from "next/link"
import { IoArrowBackSharp } from "react-icons/io5";

function QrReaderPage() {
    return (
        <div className=" mt-5 flex flex-col items-center justify-center">
             <div className="w-full max-w-2xl flex items-center gap-4 mb-6">
                  <Link
                    href="/admin/dashboard/validate-ticket/"
                     className="p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                    <IoArrowBackSharp size={20} />
                </Link>
                <h2 className="text-xl font-semibold mb-6 text-white z-10">
                Scan QR Ticket
            </h2>
            </div>
            

            {/* Scanner Container */}
            <div className="z-10">
                <QrReader />
            </div>

        </div>
    )
}

export default QrReaderPage
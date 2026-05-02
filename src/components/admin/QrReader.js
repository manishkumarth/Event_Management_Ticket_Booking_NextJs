"use client"
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

function QrReader() {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState(null)
    const [validateText, setValidateText] = useState("")

    const handleScan = (detectedCodes) => {
        detectedCodes.forEach(code => {
            setIsOpen(false)
            setData(code.rawValue)
            document.getElementById('my_modal_5').showModal()
        });
    };
    const validate = async () => {
        let ticket_id = data.split(' ')
        ticket_id = ticket_id[0]
        console.log("id", ticket_id)
        try {
            const response = await fetch(`/api/validate-ticket/${ticket_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json()
            console.log("result", result)
            if (result) {
                setValidateText(result)
                document.getElementById('my_modal_6').showModal()
            }
            console.log("result", result)
        } catch (error) {
            alert("server error", error)
        }
    }


    return (
        <div className="relative flex items-center justify-center overflow-hidden bg-black text-white px-4">

            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/bg-video.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8 text-center">

                {/* Header */}
                <div className="mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center border border-red-400/20 mb-4">
                        <span className="text-3xl">📷</span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-wide">
                        QR Ticket Scanner
                    </h2>

                    <p className="text-gray-300 text-sm mt-2">
                        Scan and validate ticket instantly
                    </p>
                </div>

                {/* Scanner */}
                {isOpen && (
                    <div className="rounded-2xl overflow-hidden border border-white/20 shadow-lg">
                        <Scanner
                            onScan={handleScan}
                            onError={(error) => console.error(error)}
                        />
                    </div>
                )}

                {/* Button Section */}
                {!isOpen && !data && (
                    <div className="space-y-5">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-gray-300 text-sm">
                            Click below to scan a QR ticket for validation.
                        </div>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 font-semibold shadow-lg"
                        >
                            Start Scanner
                        </button>
                    </div>
                )}

                {/* Success Badge */}
                {data && (
                    <div className="mt-6 bg-green-500/20 border border-green-400/30 rounded-xl p-4 text-green-300">
                        Ticket scanned successfully ✅
                    </div>
                )}
            </div>

            {/* Scan Modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-3xl bg-white text-black border border-gray-200 shadow-2xl">

                    <div className="text-center mb-4">
                        <div className="text-5xl mb-2">🎫</div>
                        <h3 className="font-bold text-2xl">Scanned Ticket</h3>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4 text-sm break-words text-center text-gray-700">
                        {data}
                    </div>

                    <div className="modal-action w-full flex gap-3">
                        <form method="dialog" className="flex gap-3 w-full">
                            <button
                                className="flex-1 border border-gray-300 rounded-xl py-3 hover:bg-gray-100 transition"
                                onClick={() => setData(null)}
                            >
                                Cancel
                            </button>

                            <button
                                className="flex-1 bg-green-500 text-white rounded-xl py-3 hover:bg-green-600 transition"
                                onClick={() => {
                                    setData(null)
                                    validate()
                                }}
                            >
                                Validate
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Validation Modal */}
            <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-3xl bg-white text-black text-center shadow-2xl">

                    <button
                        className="absolute right-4 top-4 text-xl text-gray-500 hover:text-black"
                        onClick={() => document.getElementById("my_modal_6").close()}
                    >
                        ✕
                    </button>

                    <div className="mb-4 text-5xl">
                        {validateText?.isValid ? "✅" : "❌"}
                    </div>

                    <h2 className="text-2xl font-bold mb-2">
                        Ticket Status
                    </h2>

                    <p className="text-gray-600 text-lg">
                        {validateText?.message}
                    </p>
                </div>
            </dialog>
        </div>
    )
}

export default QrReader
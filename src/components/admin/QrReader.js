"use client"
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

function QrReader() {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState(null)

    const handleScan = (detectedCodes) => {
        detectedCodes.forEach(code => {
            setIsOpen(false)
            setData(code.rawValue)
            document.getElementById('my_modal_5').showModal()
        });
    };

    return (
        <div className="relative flex justify-center text-white">

            {/* 🎥 Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-full h-full object-cover"
            >
                <source src="/bg-video.mp4" type="video/mp4" />
            </video>

            {/* Overlay (darken effect) */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center">

                <h2 className="text-xl font-semibold mb-4">
                    QR Ticket Scanner
                </h2>

                {
                    isOpen && (
                        <div className="rounded-lg overflow-hidden border">
                            <Scanner
                                onScan={handleScan}
                                onError={(error) => console.error(error)}
                            />
                        </div>
                    )
                }

                {
                    !isOpen && !data && (
                        <>
                            <p className="mb-4 text-gray-200">
                                Click below to scan ticket
                            </p>

                            <button
                                onClick={() => setIsOpen(true)}
                                className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600 active:scale-95 transition"
                            >
                                Scan QR
                            </button>
                        </>
                    )
                }

                {
                    data && (
                        <div className="mt-4 text-green-400">
                            Ticket Scanned ✅
                        </div>
                    )
                }

            </div>

            {/* Modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box text-black">

                    <h3 className="font-bold text-lg mb-2">Scanned Data</h3>

                    <p className="py-2 break-words bg-gray-100 p-2 rounded">
                        {data}
                    </p>

                    <div className="modal-action flex gap-2">

                        <form method="dialog" className="flex gap-2 w-full">

                            <button
                                className="flex-1 border border-gray-400 rounded py-2 hover:bg-gray-200 transition"
                                onClick={() => setData(null)}
                            >
                                Close
                            </button>

                            <button
                                className="flex-1 bg-green-500 text-white rounded py-2 hover:bg-green-600 transition"
                                onClick={() => setData(null)}
                            >
                                Approve
                            </button>

                        </form>

                    </div>
                </div>
            </dialog>

        </div>
    );
}

export default QrReader
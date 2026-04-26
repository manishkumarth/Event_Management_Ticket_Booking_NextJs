"use client"
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
function QrReader() {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState(null)
    const handleScan = (detectedCodes) => {
        console.log('Detected codes:', detectedCodes);
        detectedCodes.forEach(code => {
            console.log(`Format: ${code.format}, Value: ${code.rawValue}`);
            setIsOpen(false)
            setData(code.rawValue)
            document.getElementById('my_modal_5').showModal()
        });
    };

    const scanBtn = () => {
        setIsOpen(true)
    }
    return (
        <>
            {
                isOpen && <Scanner
                    onScan={handleScan}
                    onError={(error) => console.error(error)}
                />
            }
            {
                !data && <div>
                    <h3>Click on scan to make entery of ticket</h3>

                    <button className='btn' onClick={scanBtn}>scan</button>
                </div>
            }


            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4"> {data}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={() => setData(null)}>Close</button>
                            <button className="btn" onClick={() => setData(null)}>Aprove</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    );
}
export default QrReader
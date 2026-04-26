import QrReader from "@/components/QrReader"

function QrReaderPage() {
    return (<>
        <div className="flex justify-center items-center flex-col h-[200px] w-[200px] border">
            <div className="mx-auto">
                <QrReader />
            </div>
        </div>
    </>)
}
export default QrReaderPage
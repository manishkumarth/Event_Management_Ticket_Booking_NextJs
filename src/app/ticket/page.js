import ViewTicket from "@/components/ViewTicket"

function Ticket(){
    const ticket_data=[
        {
            id:"1001",
            eventName:"movie",
            isValid:false,
        },
        {
            id:"1002",
            eventName:"local party",
            isValid:true,
        },
        {
            id:"1003",
            eventName:"delhi show",
            isValid:false,
        },
        {
            id:"1004",
            eventName:"Arijit shingh show",
            isValid:true,
        },
        {
            id:"1005",
            eventName:"bike riding",
            isValid:false,
        },
        {
            id:"1006",
            eventName:"movie",
            isValid:true,
        },
    ]
    return(
        <div className="flex flex-col gap-4 mx-10 mt-5">
            <div>
                <button>expire</button>
                <button>active</button>
            </div>
            {
                ticket_data.map((data)=>(
                    <ViewTicket key={data.id} ticketData={data} />
                ))
            }
      
        </div>
    )
}
export default Ticket
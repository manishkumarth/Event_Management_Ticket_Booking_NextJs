"use client"

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
function UserList() {
    const [data, setData] = useState([
        // {
        //     _id: "1",
        //     name: "Manish Kumar",
        //     email: "manish@gmail.com",
        //     role: "admin",
        //     createdAt: "2026-01-10"
        // },
        // {
        //     _id: "2",
        //     name: "Rahul Sharma",
        //     email: "rahul@gmail.com",
        //     role: "user",
        //     createdAt: "2026-02-15"
        // },
        // {
        //     _id: "3",
        //     name: "Priya Singh",
        //     email: "priya@gmail.com",
        //     role: "user",
        //     createdAt: "2026-03-01"
        // }
    ])
    const deleteUser = (id,role) => {
        if(role==="admin") return
        const newData=data.filter((item)=> item._id!==id)
        setData(newData)
        toast.success("User Deleted Successfully")
    }
    async function GetUserList() {
       try{
         const response= await fetch("/api/get-user")
        const data=await response.json()
        console.log("data",data)
        setData(data.users)
       }catch(error){
        alert("server error")
       }
    }
    useEffect(()=>{
        GetUserList()
        console.log("dataa",data)
    },[])
    return (
        <div 
        
        className="p-5 md:overflow-hidden overflow-x-auto">
            <table className="min-w-full ">

                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Created At</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>

                <tbody
               
                >
                    <AnimatePresence>
                    {data.map((user) => (
                        <motion.tr
                        
                        layout
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 200, transition: { duration: 0.3 } }}
                       
                       key={user._id} className="text-center">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2 capitalize">{user.role}</td>
                            <td className="p-2">{user.createdAt}</td>

                            <td className="p-2 flex gap-2 justify-center">
                                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                                    View
                                </button>
                                <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                                    Edit
                                </button>
                                <button onClick={()=>deleteUser(user._id,user.role)} className="px-3 py-1 bg-red-500 text-white rounded">
                                    Delete
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                    </AnimatePresence>
                </tbody>

            </table>
        </div>
    );
}

export default UserList;
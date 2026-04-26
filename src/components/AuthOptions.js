// app/page.js
"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AuthOptions() {
  const { data: session, status } = useSession()
  const router=useRouter()
  console.log("data", session, status)
  return (
    <>
     

      <div style={{ padding: "50px", fontFamily: "sans-serif" }} className="flex justify-center flex-col gap-5">
        <div
          onClick={() => signIn("github")}
          className="flex gap-4 border rounded-md px-4 py-2 bg-gray-800 cursor-pointer"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            width="20"
          />
          Sign in with GitHub
        </div>

        <div onClick={() => signIn("google")}
          className="flex gap-4 border rounded-md px-4 py-2 bg-sky-100 cursor-pointer">
          <img className="w-7" src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" /> Sign in with Google
        </div>
      </div>
    </>
  )
}
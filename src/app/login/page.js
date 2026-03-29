"use client"
import { useState,useEffect } from "react"
import GithubPage from "@/components/AuthOptions"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"
import {useRouter} from "next/navigation"
import AuthOptions from "@/components/AuthOptions"
function Login() {
    const [inputs, setInputs] = useState({ email: "", password: "" })
    const {data:session}=useSession()
    const router =useRouter()

    //  Block login page if already logged in
    useEffect(() => {
        if (status === "loading") return
        if (session) {
            router.push("/profile")
        }
    }, [session])

    const handleSignIn = async () => {
        console.log("inputs", inputs);
        const res = await signIn("credentials", {
            email: inputs.email,
            password: inputs.password,
            redirect: false,
        })
        console.log("signIn",res)
        if (res?.ok) {
            toast.success("Login success")
            router.push("/profile") // ✅ redirect
        } else {
            toast.error("Login failed")
        }
    }
    return (
        <>
            <div>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-">
                    
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
                    </div>

                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm rounded-md bg-black-50 md:p-4 p-0">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={inputs.email}
                                        onChange={(e)=>setInputs({...inputs,email:e.target.value})}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                    <Link href="forget-password" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={inputs.password}
                                        onChange={(e)=>setInputs({...inputs,password:e.target.value})}
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                onClick={handleSignIn}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>

                        <p className="mt-5 text-center text-sm/6 text-gray-400">
                            Not a member?{' '}
                            <Link href="signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
                               SignUp
                            </Link>
                        </p>
                        <div className="flex justify-center">
                        <AuthOptions />
                    </div>
                    </div>
                </div>

                
            </div>
        </>
    )
}
export default Login
"use client"
import { useState } from "react"
import Link from "next/link"
import { toast } from "react-toastify"
import GithubPage from "@/components/AuthOptions"
function SignUp() {
    const [inputs, setInputs] = useState({ name: "", email: "", password: "" })
    // { name, email, password } 

    const handleSignUp = async () => {
        console.log(inputs)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();

            if (res.ok) {
                console.log("Success:", data);
                toast.success("register success")
            } else {
                console.log("Error:", data);
                toast.warn("failed to registration")
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">
                                    name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={inputs.name}
                                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                        className="block w-full border rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
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
                                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                        className="block w-full border rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
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
                                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                        autoComplete="current-password"
                                        className="block w-full border rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    onClick={handleSignUp}
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    SignUp
                                </button>
                            </div>
                        </div>

                        <p className="mt-10 text-center text-sm/6 text-gray-400">
                            Not a member?{' '}
                            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                login
                            </Link>
                           
                       </p>
                       {/* <GithubPage /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUp
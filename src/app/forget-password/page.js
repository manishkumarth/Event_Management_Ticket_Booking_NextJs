"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";

function ForgetPassword() {
    const [inputs, setInputs] = useState({ name: "", mobile: "", password: "" });
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(0);
    const router = useRouter()

    const sendOtp = async () => {
        console.log("otp send sucess")
        try {
            setStep(1)
        } catch (err) {
            console.log(err)
        }
    }
    const verifyOtp = async () => {
        setStep(2)
    }

    const updatePassword = async () => {
        setStep(0)
        router.push("/login");
    }
    return (
        <>
            <div>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Forget Your Password</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">
                            {
                                step === 0 && (
                                    <div>
                                        <label htmlFor="mobile" className="block text-sm/6 font-medium text-gray-100">
                                            mobile number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="mobile"
                                                name="mobile"
                                                type="text"
                                                value={inputs.number}
                                                onChange={(e) => setInputs({ ...inputs, mobile: e.target.value })}
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                )
                            }

                            {
                                step === 1 && (
                                    <div>
                                        <label htmlFor="Otp" className="block text-sm/6 font-medium text-gray-100">
                                            Otp
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="Otp"
                                                name="mobile"
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            {
                                step === 2 && (
                                    <div>
                                        <label htmlFor="mobile" className="block text-sm/6 font-medium text-gray-100">
                                            password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="mobile"
                                                name="mobile"
                                                type="text"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                

                            <div>
                                {
                                    step === 0 && <button
                                        type="submit"
                                        onClick={sendOtp}
                                        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Send Otp
                                    </button>
                                }

                                {
                                    step === 1 && (
                                        <button
                                            type="submit"
                                            onClick={verifyOtp}
                                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            Verify Otp
                                        </button>
                                    )
                                }

                                {
                                    step === 2 && (
                                        <button
                                            type="submit"
                                            onClick={updatePassword}
                                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            Update Password
                                        </button>
                                    )
                                }

                            </div>
                        </div>

                        <p className="mt-10 text-center text-sm/6 text-gray-400">
                            Not a member?{' '}
                            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ForgetPassword
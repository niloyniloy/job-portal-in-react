import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkJobSeekerLogin } from "./../../api/ApiCalls";
import LogInIcon from "./../icons/LogInIcon";
import UserLoginIcon from "./../icons/UserLoginIcon";
import BuildingIcon from "./../icons/BuildingIcon";
import SignInIcon from "./../icons/SignInIcon";


function JobSeekerLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = () => {

        checkJobSeekerLogin(email, password, setError);
    }

    return (

        <main className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                {/* Page Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-8 w-8 text-primary"
                        >
                            <path d="m10 17 5-5-5-5" />
                            <path d="M15 12H3" />
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-3">
                        Welcome Back
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Sign in to access your account
                    </p>
                </div>
                {/* Account Type Toggle */}
                <div className="w-full text-center">
                    <div className="card p-2 mb-8 inline-flex mx-auto w-full max-w-md">
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <button className="btn btn-primary text-center">
                                <UserLoginIcon />
                                Job Seeker
                            </button>
                            <Link to={`/login/company`} className="btn btn-ghost text-center" reloadDocument>
                                <BuildingIcon />
                                Employer
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Registration Card */}
                <div className="card p-8 md:p-10">

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        {error.length > 0 &&
                            <div className="space-y-2">
                                <label for="email" className="label text-red-500">
                                    {error}
                                </label>
                            </div>
                        }

                        <div className="space-y-2">
                            <label for="email" className="label"
                            >Email Address
                                <span className="text-red-500">*</span></label
                            >
                            <div className="relative">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    data-lucide="mail"
                                    className="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                                >
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                                    <rect x={2} y={4} width={20} height={16} rx={2} />
                                </svg>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="input pl-10"
                                    placeholder="you@example.com"
                                    onChange={(e) => {
                                        setError("");
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    data-lucide="lock"
                                    className="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                                >
                                    <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>

                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="input pl-10 pr-10"
                                    placeholder="Enter your password"
                                    onChange={(e) => { setError(""); setPassword(e.target.value); }}
                                    required
                                />
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary w-full text-base h-11"
                            onClick={() => handleLogin()}
                        >
                            <SignInIcon />
                            Sign In
                        </button>
                    </form>


                    <div className="relative my-8">
                        <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                        >
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span
                                className="px-4 bg-card text-muted-foreground font-medium"
                            >Or continue with</span
                            >
                        </div>
                    </div>


                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Don't have an account?
                        <Link
                            to={`/register/user`}
                            className="text-primary hover:underline font-medium"
                            reloadDocument
                        >Sign up as Job Seeker
                        </Link>
                    </div>
                </div>
                {/* Feature Highlights */}

            </div>
        </main>
    )
}

export default JobSeekerLogin

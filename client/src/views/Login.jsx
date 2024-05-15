import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    useEffect(() => {
        document.title = "Login";
    }, [])
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <form className="w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4 flex justify-center">
                        <h1
                            className="block text-gray-700 text-3xl font-bold mb-2"
                        >
                            Login
                        </h1>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                    </div>
                    <button
                        className=" mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Sign In
                    </button>
                    <div className="flex justify-center items-center">
                        <Link to={"/register"} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Don't have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}
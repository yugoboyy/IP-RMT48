import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleOnSubmit = (async (event) => {
        event.preventDefault()
        try {
            let { data } = await axios({
                method: "post",
                url: "http://localhost:3000/login",
                data: {
                    email,
                    password
                }
            })
            localStorage.setItem("access_token", data.access_token)
            navigate("/")
        } catch (error) {
            console.error(error.response?.data.message || error.mesage)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        }
    })

    async function handleCredentialResponse(response) {
        const googleToken = response.credential

        try {
            let { data } = await axios({
                method: "post",
                url: "http://localhost:3000/login/google",
                data: {
                    googleToken
                }
            })
            localStorage.setItem("access_token", data.access_token)
            navigate("/")
        } catch (error) {
            console.error(error.response?.data.message || error.mesage)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        }

    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "730683743033-cc49meaplb4v06n2cu6aiqv5f9dv214o.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        // google.accounts.id.prompt();
    }, [])

    useEffect(() => {
        document.title = "Login";
    }, [])
    return (
        <>
            <div className="flex flex-col h-screen items-center justify-center">
                <form onSubmit={handleOnSubmit} className="w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className=" mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <div className="flex justify-center items-center">
                        <Link to={"/register"} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Don't have an account?
                        </Link>
                    </div>
                </form>
                <div className="flex flex-col items-center justify-center" >
                    <h1>
                        or
                    </h1>
                    <div id="buttonDiv"></div>

                </div>
            </div>
        </>
    )
}
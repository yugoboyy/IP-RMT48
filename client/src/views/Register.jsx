import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { serverApi } from "../utils/api";

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [uid, setUid] = useState("")
    const [gender, setGender] = useState("")
    const navigate = useNavigate()

    async function handleOnSubmit(event) {
        event.preventDefault()
        try {
            let { data } = await serverApi({
                method: "post",
                url: "/user",
                data: {
                    name,
                    email,
                    password,
                    gender,
                    uid
                }
            })
            navigate("/login")
        } catch (error) {
            console.error(error.response?.data.message || error.message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });

        }
    }

    useEffect(() => {
        document.title = "Register";
    }, [])
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <form onSubmit={(event) => handleOnSubmit(event)} className="w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4 flex justify-center">
                        <h1
                            className="block text-gray-700 text-3xl font-bold mb-2"
                        >
                            Register
                        </h1>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="uid"
                        >
                            UID
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="uid"
                            type="number"
                            placeholder="UID"
                            value={uid}
                            onChange={(e) => setUid(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="uid"
                        >
                            Gender
                        </label>
                        <select className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}>
                            <option value="">--Choose--</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <button
                        className=" mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <div className="flex justify-center items-center">
                        <Link to={"/login"} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Already have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}
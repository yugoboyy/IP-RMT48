import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const token = localStorage.getItem("access_token")
    const navigate = useNavigate()

    async function handleOnLogout() {
        try {
            localStorage.clear()
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src="https://cdn2.steamgriddb.com/icon/65ae27b8c33157282761f37083da12dd.png"
                        className="h-8"
                    />
                </Link>
                <div className="flex gap-2">
                    {token ?
                        <div className="flex gap-8">
                            <Link to={"/myCharacters"} className="text-4xl font-bold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                <h1>My Characters</h1>
                            </Link>
                            <Link to={"/"} className="text-4xl font-bold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                <h1>Home</h1>
                            </Link>
                            <Link to={"/accountDetail"} className="text-4xl font-bold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                <h1>Account Detail</h1>
                            </Link>
                        </div> :
                        <Link to={"/"} className="text-4xl font-bold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                            <h1>Home</h1>
                        </Link>}
                </div>
                <div>
                    {token ?
                        <button onClick={() => handleOnLogout()} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                            Logout
                        </button> :
                        <Link to={"/login"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </Link>}
                </div>
            </div>
        </nav>
    )
}
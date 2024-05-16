import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

export default function AccountDetail() {
    const [accountDetail, setAccountDetail] = useState({})
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [uid, setUid] = useState("")
    const [file, setFile] = useState(null);
    const navigate = useNavigate()

    async function fetchUserDetail() {
        try {
            let { data } = await axios({
                method: "get",
                url: "http://localhost:3000/userDetail",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("access_token")
                }
            })
            setName(data.name)
            setEmail(data.email)
            setGender(data.gender)
            setUid(data.uid)
            setAccountDetail(data)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleOnSubmit(event) {
        event.preventDefault()
        try {
            let { data } = await axios({
                method: "put",
                url: "http://localhost:3000/userDetail",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("access_token")
                },
                data: {
                    name,
                    gender,
                    uid
                }
            })
            fetchUserDetail()
            Swal.fire({
                title: "Good job!",
                text: "Update success",
                icon: "success"
            });
        } catch (error) {
            console.error(error.response?.data.message || error.message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        }
    }

    const handleOnUpdateImg = async (event) => {
        event.preventDefault()
        try {
            const formData = new FormData();
            formData.append("imgUrl", file);

            const { data } = await axios.patch(
                `http://localhost:3000/userDetail`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization: "Bearer " + localStorage.getItem("access_token")
                    },
                }
            );
            fetchUserDetail()
            Swal.fire({
                title: "Good job!",
                text: "Update success",
                icon: "success"
            });

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
        fetchUserDetail()
    }, [])

    useEffect(() => {
        document.title = "Account Detail";
    }, [])
    return (
        <div className="flex items-center flex-col gap-3">
            <div className=" flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold">Hello {accountDetail.name}</h1>
                <h1 className="text-xl font-bold">({email})</h1>
            </div>
            <div className="flex w-full items-center justify-center gap-3">
                <form action="" onSubmit={handleOnUpdateImg}>
                    <img style={{ width: "30rem" }} src={accountDetail.imgUrl} alt="" />
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])} />
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save Image
                    </button>
                </form>
                <div>
                    <form className="flex flex-col w-full items-center justify-center mt-5 gap-2 mb-2" action="" onSubmit={(event) => handleOnSubmit(event)}>
                        <div className="flex w-full items-left justify-left">
                            <label htmlFor="">Name :</label>
                        </div>
                        <input className="shadow appearance-none border w-full rounded py-2 px-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <div className="flex w-full items-left justify-left">
                            <label htmlFor="">Gender :</label>
                        </div>
                        <select className="shadow border rounded w-full text-center py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={gender} onChange={(e) => setGender(e.target.value)} name="" id="">
                            <option value="">--Choose--</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <div className="flex w-full items-left justify-left">
                            <label htmlFor="">UID :</label>
                        </div>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" value={uid} onChange={(e) => setUid(e.target.value)} />
                        <button
                            className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update
                        </button>
                    </form>
                    <button
                        className="mb-5 w-full hover:bg-red-800 border border-red-700 text-red-700 hover:text-white font-bold py-2 px-4 rounded focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyCharacterCard({ myCharacter, fetchMyCharacters }) {
    const [characterDetail, setCharacterDetail] = useState("")

    async function fetchCaracterDetail() {
        try {
            let { data } = await axios({
                method: 'get',
                url: 'https://genshin.jmp.blue/characters/' + myCharacter.name
            })
            setCharacterDetail(data)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleOnDelete(name) {
        try {
            let { data } = await axios({
                method: "delete",
                url: 'http://localhost:3000/myCharacter/' + name,
                headers: {
                    authorization: "Bearer " + localStorage.getItem("access_token")
                }
            })
            fetchMyCharacters()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCaracterDetail()
    }, [])

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={`https://genshin.jmp.blue/characters/${myCharacter.name}/card`} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {characterDetail.name}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Level: {myCharacter.level}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Constalation: {myCharacter.constalation}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Normal Attack: {myCharacter.normalAttack}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Elemental Skill: {myCharacter.elementalSkill}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Elemental Burst: {myCharacter.elementalBurst}
                </p>
                <Link to={"/myCharacter/" + myCharacter.name} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Edit
                </Link>
                <button onClick={() => handleOnDelete(myCharacter.name)} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Delete
                </button>
            </div>
        </div>
    )
}
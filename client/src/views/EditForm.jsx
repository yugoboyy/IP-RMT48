import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditForm() {
    const { name } = useParams()
    const [level, setLevel] = useState(1)
    const [constalation, setConstalation] = useState(0)
    const [normalAttack, setnormalAttack] = useState(1)
    const [elementalSkill, setelementalSkill] = useState(1)
    const [elementalBurst, setelementalBurst] = useState(1)
    const navigate = useNavigate()

    async function fetchMyCaracterDetail() {
        try {
            let { data } = await axios({
                method: 'get',
                url: 'http://localhost:3000/myCharacter/' + name,
                headers: {
                    authorization: "Bearer " + localStorage.getItem("access_token")
                }
            })
            setLevel(data.level)
            setConstalation(data.constalation)
            setnormalAttack(data.normalAttack)
            setelementalSkill(data.elementalSkill)
            setelementalBurst(data.elementalBurst)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleOnSubmit(event) {
        event.preventDefault()
        try {
            let { data } = await axios({
                method: 'put',
                url: 'http://localhost:3000/myCharacter/' + name,
                headers: {
                    authorization: "Bearer " + localStorage.getItem("access_token")
                },
                data: {
                    level,
                    constalation,
                    normalAttack,
                    elementalSkill,
                    elementalBurst
                }
            })
            navigate("/myCharacters")
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchMyCaracterDetail()
    }, [])

    return (
        <div className=" flex h-screen items-center justify-center">
            <img className="max-w-sm" src={`https://genshin.jmp.blue/characters/${name}/card`} alt="" />
            <form onSubmit={(event) => handleOnSubmit(event)} className="w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="level"
                    >
                        Level (Max 90)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="level"
                        type="number"
                        placeholder="Level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="constalation"
                    >
                        Constalation (Max 6)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="constalation"
                        type="number"
                        placeholder="Constalation"
                        value={constalation}
                        onChange={(e) => setConstalation(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="normalAttack"
                    >
                        Normal Attack (Max 10)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="normalAttack"
                        type="number"
                        placeholder="Normal Attack"
                        value={normalAttack}
                        onChange={(e) => setnormalAttack(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="elementalSkill"
                    >
                        Elemental Skill (Max 10)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="elementalSkill"
                        type="number"
                        placeholder="Elemental Skill"
                        value={elementalSkill}
                        onChange={(e) => setelementalSkill(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="elementalBurst"
                    >
                        Elemental Burst (Max 10)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="elementalBurst"
                        type="number"
                        placeholder="Elemental Burst"
                        value={elementalBurst}
                        onChange={(e) => setelementalBurst(e.target.value)}
                    />
                </div>
                <button
                    className=" mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Update
                </button>
                <button
                    className=" mb-4 w-full hover:bg-red-800 border border-red-700 text-red-700 hover:text-white font-bold py-2 px-4 rounded focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={() => navigate('/myCharacters')}
                >
                    Back
                </button>
            </form>
        </div>
    )
}
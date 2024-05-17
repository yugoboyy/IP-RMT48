import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { genshinApi, serverApi } from "../utils/api";
import SkillTable from "../components/SkillTable";
import Swal from "sweetalert2";

export default function CharacterDetail() {
    let { character } = useParams();
    const [characterDetail, setCharacterDetail] = useState({})
    const [name, setName] = useState(character)
    const navigate = useNavigate()
    const [skill, setSkill] = useState([])

    async function fetchCharacterDetail() {
        try {
            let { data } = await genshinApi({
                method: 'get',
                url: '/characters/' + character
            })
            setCharacterDetail(data)
            setSkill(data.skillTalents)
            setName(data.name)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleOnAdd() {
        try {
            if (!localStorage.getItem("access_token")) {
                navigate("/login")
            } else {
                let { data } = await serverApi({
                    method: "post",
                    url: "/myCharacter",
                    data: {
                        name: character
                    },
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("access_token")
                    }
                })
                navigate("/myCharacters")
            }
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
        fetchCharacterDetail()
    }, [])

    useEffect(() => {
        document.title = name;
    }, [name])
    return (
        <div className="flex flex-col bg-slate-200 items-center justify-center">
            <h1 className="text-7xl bg-slate-300 font-bold w-full text-center" >{characterDetail.name}</h1>
            <div className="flex flex-col justify-center items-center gap-5">
                <img src={`https://genshin.jmp.blue/characters/${character}/gacha-splash`} alt={`https://genshin.jmp.blue/characters/${character}/portrait`} />
                <table className="w-3/4">
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{characterDetail.name}</td>
                        </tr>
                        <tr>
                            <td>Title</td>
                            <td>{characterDetail.title}</td>
                        </tr>
                        <tr>
                            <td>Vision</td>
                            <td>{characterDetail.vision}</td>
                        </tr>
                        <tr>
                            <td>Weapon</td>
                            <td>{characterDetail.weapon}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{characterDetail.gender}</td>
                        </tr>
                        <tr>
                            <td>Nation</td>
                            <td>{characterDetail.nation}</td>
                        </tr>
                        <tr>
                            <td>Affiliation</td>
                            <td>{characterDetail.affiliation}</td>
                        </tr>
                        <tr>
                            <td>Rarity</td>
                            <td>{characterDetail.rarity}</td>
                        </tr>
                        <tr>
                            <td>Constellation</td>
                            <td>{characterDetail.constellation}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{characterDetail.description}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex gap-3">
                    {skill.map((skillName, index) => {
                        return (
                            <SkillTable key={index} skillName={skillName} />
                        )
                    })}
                </div>
            </div>
            <button
                onClick={() => handleOnAdd()}
                className=" mb-10 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
            >
                Add Character
            </button>
        </div>
    )
}
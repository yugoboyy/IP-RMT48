import axios from "axios";
import { useEffect, useState } from "react";
import MyCharacterCard from "../components/MyCharacterCard";

export default function MyCharacter() {
    const [myCharacters, setMyCharacters] = useState([])

    async function fetchMyCharacters() {
        try {
            let { data } = await axios({
                method: "get",
                url: "http://localhost:3000/myCharacters",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("access_token")
                }
            })
            setMyCharacters(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchMyCharacters()
    }, [])

    useEffect(() => {
        document.title = "My Character";
    }, [])
    return (
        <div className="flex flex-wrap justify-center gap-6 mt-10 mb-10">
            {myCharacters.map((myCharacter, index) => {
                return <MyCharacterCard key={index} myCharacter={myCharacter} fetchMyCharacters={fetchMyCharacters}/>
            })}
        </div>
    )
}
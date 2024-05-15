import { useEffect, useState } from "react";
import axios from "axios"
import CharacterCard from "../components/CharacterCard";

export default function Home() {
    const [characterList, setCharacterList] = useState([])
    console.log(characterList)

    async function fetchCharacters() {
        try {
            let { data } = await axios({
                method: 'get',
                url: 'https://genshin.jmp.blue/characters'
            })
            setCharacterList(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchCharacters()
    }, [])

    useEffect(() => {
        document.title = "Home";
    }, [])
    return (
        <>
            {characterList.map((character, index) => {
                return <CharacterCard key={index} character={character} />
            })}
        </>
    )
}
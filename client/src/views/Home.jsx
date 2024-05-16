import { useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/character/characterSlice";

export default function Home() {
    const characterList = useSelector(state => state.characters.list)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCharacters())
    }, [])

    useEffect(() => {
        document.title = "Home";
    }, [])

    return (
        <>
            <div className="flex flex-wrap gap-10 items-center justify-center mt-10">
                {characterList.map((character, index) => {
                    return <CharacterCard key={index} character={character} />
                })}
            </div>
        </>
    )
}
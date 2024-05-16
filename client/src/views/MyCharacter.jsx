import axios from "axios";
import { useEffect, useState } from "react";
import MyCharacterCard from "../components/MyCharacterCard";

export default function MyCharacter() {
    const [myCharacters, setMyCharacters] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState("")
    const [search, setSearch] = useState("")
    const [paginationOption, setPaginationOption] = useState({
        totalData: 0,
        totalPages: 1,
        dataPerPage: 0,
    });

    async function fetchMyCharacters() {
        try {
            let { data } = await axios({
                method: "get",
                url: "http://localhost:3000/myCharacters",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("access_token")
                },
                params: {
                    page: currentPage,
                    filter,
                    search
                }
            })
            const { totalData, totalPages, dataPerPage } = data
            setMyCharacters(data.data)
            setPaginationOption({ totalData, totalPages, dataPerPage })
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
                return <MyCharacterCard key={index} myCharacter={myCharacter} fetchMyCharacters={fetchMyCharacters} />
            })}
        </div>
    )
}
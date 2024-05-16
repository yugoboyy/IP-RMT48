import { useEffect, useState } from "react";
import MyCharacterCard from "../components/MyCharacterCard";
import { serverApi } from "../utils/api";
import InfiniteScroll from 'react-infinite-scroll-component';

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

    console.log(myCharacters)

    async function fetchMyCharacters(currentPage) {
        try {
            if (paginationOption.totalPages && currentPage > paginationOption.totalPages) {
                return;
            }
            let { data } = await serverApi({
                method: "get",
                url: "/myCharacters",
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
            setPaginationOption({ totalData, totalPages, dataPerPage })
            // setMyCharacters(data.data)
            return data.data
        } catch (error) {
            console.error(error)
        }
    }

    async function handleSearch() {
        try {
            (async () => {
                let data = await fetchMyCharacters(1)
                setMyCharacters(data)
            })()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        (async () => {
            let data = await fetchMyCharacters(1)
            setMyCharacters(data)
        })()
    }, [filter])

    useEffect(() => {
        (async () => {
            let data = await fetchMyCharacters(1)
            setMyCharacters(data)
        })()
    }, [])

    useEffect(() => {
        document.title = "My Character";
    }, [])
    return (
        <>
            <div className="flex justify-between mr-5 ml-5 gap-3">
                <div>
                    <label className="text-2xl" htmlFor="">Filter by constalation: </label>
                    <select onChange={(e) => setFilter(e.target.value)} className="shadow border rounded py-2 px-3 text-gray-700 mt-5 leading-tight focus:outline-none focus:shadow-outline" name="" id="">
                        <option value="">--Choose--</option>
                        <option value="0">Constalation 0</option>
                        <option value="1">Constalation 1</option>
                        <option value="2">Constalation 2</option>
                        <option value="3">Constalation 3</option>
                        <option value="4">Constalation 4</option>
                        <option value="5">Constalation 5</option>
                        <option value="6">Constalation 6 </option>
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-5 mr-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={() => handleSearch()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5">Search</button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-3 mb-10">
                <InfiniteScroll
                    dataLength={myCharacters.length} //This is important field to render the next data
                    next={async () => {
                        const nextPage = currentPage + 1;
                        const data = await fetchMyCharacters(nextPage);
                        setMyCharacters([...myCharacters, ...data]);
                        setCurrentPage(nextPage)
                    }}
                    hasMore={currentPage < paginationOption.totalPages}
                    loader={<h4>Loading...</h4>}
                    className="flex flex-wrap justify-center gap-6 mt-3 mb-10"
                >
                    {myCharacters.map((myCharacter, index) => {
                        return <MyCharacterCard key={index} myCharacter={myCharacter} fetchMyCharacters={fetchMyCharacters} paginationOption={paginationOption} />
                    })}
                </InfiniteScroll>

            </div>
        </>

    )
}
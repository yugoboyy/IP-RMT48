import axios from "axios";


export const serverApi = axios.create({
    baseURL: "http://localhost:3000"
})

export const genshinApi = axios.create({
    baseURL: "https://genshin.jmp.blue"
})
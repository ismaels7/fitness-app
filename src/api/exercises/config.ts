import axios from "axios"

export const exerciseAPI = axios.create({
    baseURL: "https://exercisedb.p.rapidapi.com",
    headers: {
        "x-rapidapi-key": "ba55c395e9msh828bbfcbfb61b82p1e13acjsn27d906234eae",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com"
    }
})
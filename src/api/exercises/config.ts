import axios from "axios"

export const exerciseAPI = axios.create({
    baseURL: "https://exercisedb.p.rapidapi.com/",
    headers: {
        'x-rapidapi-key': 'c9d9e25a34msh5f2b90ee078153fp1398d4jsn222587993dfe',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
       }
})
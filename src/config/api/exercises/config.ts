import axios from "axios"

export const exerciseAPI = axios.create({
    baseURL: "https://exercisedb.p.rapidapi.com/",
    headers: {
        'x-rapidapi-key': 'ec39e029damshfb7d68e1e271789p1ef89ejsn09195e195755',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
})
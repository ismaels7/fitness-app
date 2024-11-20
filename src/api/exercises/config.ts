import axios from "axios"

export const exerciseAPI = axios.create({
    baseURL: "https://exercisedb.p.rapidapi.com/",
    headers: {
        'x-rapidapi-key': '1ce896cf51mshe2be712cb952b09p1a58bfjsne03c89933f33',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
})
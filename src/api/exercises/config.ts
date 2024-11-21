import axios from "axios"

export const exerciseAPI = axios.create({
    baseURL: "https://exercisedb.p.rapidapi.com/",
    headers: {
      'x-rapidapi-key': '1cfbb3475dmsh7884833c27354d1p1383eejsn1939eaa106b2',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
})
import axios from "axios"

export const exerciseAPI = axios.create({
    baseURL: "https://exercisedb.p.rapidapi.com/",
    headers: {
        'x-rapidapi-key': '663f82fa75msh3f50c643fbe46ffp199ff4jsn620bacdacc51',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
})
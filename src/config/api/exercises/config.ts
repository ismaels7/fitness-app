import axios from "axios"

export const exerciseAPI = axios.create({
    baseURL: "https://exercisedb.p.rapidapi.com/",
    headers: {
      'x-rapidapi-key': 'd151935154msh21c14fc7d1b55b8p1ca203jsncf603a873069',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
})
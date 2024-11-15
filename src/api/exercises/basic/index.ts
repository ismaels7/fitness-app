import { exerciseAPI } from "../config";
import { AxiosResponse } from "axios";

type ApiParams = {
    perPage?: number,
    page?: number
}

export const fetchExercises = async ({perPage, page}: ApiParams) : Promise<any> => {
    try {
        const response: AxiosResponse<any> = await exerciseAPI.get('/exercises', {
            params: {
                limit: perPage,
                offset: page
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching /exercises")
        throw error
    }
}
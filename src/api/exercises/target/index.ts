import { exerciseAPI } from "../config";
import { AxiosResponse } from "axios";

type FetchTargetExerciseParams = {
    id: string
}
export const fetchTargets = async () => {
    try {
        const response: AxiosResponse<any> = await exerciseAPI.get('/exercises/targetList');
        return response.data
    } catch (error) {
        console.error("Error fetching targetList")
        throw error
    }
}

export const fetchExercisesByTarget = async ({id}: FetchTargetExerciseParams) => {
    try {
        const response: AxiosResponse<any> = await exerciseAPI.get(`/exercises/target/${id}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching target/${id}`)
        throw error
    }
}
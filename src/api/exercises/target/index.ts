import { ExerciseType } from "../basic";
import { exerciseAPI } from "../config";
import { AxiosResponse } from "axios";

type FetchTargetExerciseParams = {
    id: string
}
export const fetchTargets = async (): Promise<string[]> => {
    try {
        const response: AxiosResponse<string[]> = await exerciseAPI.get('/exercises/targetList');
        return response.data
    } catch (error) {
        console.error("Error fetching targetList")
        throw error
    }
}

export const fetchExercisesByTarget = async ({id}: FetchTargetExerciseParams): Promise<ExerciseType[]> => {
    try {
        const response: AxiosResponse<ExerciseType[]> = await exerciseAPI.get(`/exercises/target/${id}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching target/${id}`)
        throw error
    }
}
import { exerciseAPI } from "../config";
import { AxiosResponse } from "axios";

type FetchExercisesParams = {
    perPage?: number,
    offset?: number
}

type FetchExerciseParams = {
    id: string
}

export type ExerciseType = {
    id: string,
    name: string,
    bodyPart: string,
    target: string,
    equipment: string,
    gifUrl: string,
    secondaryMuscles: string[],
    instructions: string[]


}

export const fetchExercises = async ({perPage, offset}: FetchExercisesParams) : Promise<ExerciseType[]> => {
    try {
        const response: AxiosResponse<ExerciseType[]> = await exerciseAPI.get('/exercises', {
            params: {
                limit: perPage,
                offset: offset
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching /exercises")
        throw error
    }
}

export const fetchExercise =  async({id}:FetchExerciseParams): Promise<ExerciseType> => {
    try {
        const response: AxiosResponse<ExerciseType> = await exerciseAPI.get(`/exercises/exercise/${id}`)
        return response.data
    } catch(error) {
        console.error(`Error while fetching /exercises/${id}`)
        throw error
    }
}
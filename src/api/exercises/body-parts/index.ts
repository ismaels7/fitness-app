import { ExerciseType } from "../basic";
import { exerciseAPI } from "../config";
import { AxiosResponse } from "axios";

type FetchExerciseByAreaParams = {
    id: string
}

export const fetchBodyParts = async (): Promise<string[]> => {
    try {
        const response: AxiosResponse<string[]> = await exerciseAPI.get('/exercises/bodyPartList');
        return response.data
    } catch (error) {
        console.error("Error fetching bodyPartsList")
        throw error
    }
}

export const fetchExercisesByBodyPart = async({id}:FetchExerciseByAreaParams): Promise<ExerciseType[]> => {
    try {
        const response: AxiosResponse<ExerciseType[]> = await exerciseAPI.get(`/exercises/bodyPart/${id}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching exercises per body part ${id}`)
        throw error
    }
}
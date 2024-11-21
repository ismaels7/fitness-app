import { ExerciseType } from "../basic";
import { exerciseAPI } from "../config";
import { AxiosResponse } from "axios";

type FetchExerciseByEquipmentParams = {
    id: string
}


export const fetchEquipments = async ():Promise<string[]> => {
    try {
        const response: AxiosResponse<string[]> = await exerciseAPI.get('/exercises/equipmentList');
        return response.data
    } catch (error) {
        console.error("Error fetching equipmentList")
        throw error
    }
}

export const fetchExerciseByEquipment= async({id}:FetchExerciseByEquipmentParams): Promise<ExerciseType[]> => {
    try {
        const response: AxiosResponse<ExerciseType[]> = await exerciseAPI.get(`/exercises/equipment/${id}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching exercise by equipment ${id}`)
        throw error
    }
}
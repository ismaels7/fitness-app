import { exerciseAPI } from "../config";
import { AxiosResponse } from "axios";

type FetchExerciseByEquipmentParams = {
    id: string
}


export const fetchEquipments = async () => {
    try {
        const response: AxiosResponse<any> = await exerciseAPI.get('/exercises/equipmentList');
        return response.data
    } catch (error) {
        console.error("Error fetching equipmentList")
        throw error
    }
}

export const fetchExerciseByEquipment= async({id}:FetchExerciseByEquipmentParams): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await exerciseAPI.get(`/exercises/equipment/${id}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching exercise by equipment ${id}`)
        throw error
    }
}
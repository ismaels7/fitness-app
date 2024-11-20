import { exerciseAPI } from "../config";
import { AxiosResponse } from "axios";

export const fetchEquipments = async () => {
    try {
        const response: AxiosResponse<any> = await exerciseAPI.get('/exercises/equipmentList');
        return response.data
    } catch (error) {
        console.error("Error fetching equipmentList")
        throw error
    }
}
import { exerciseAPI } from "../config";
import { AxiosResponse } from "axios";

export const fetchBodyParts = async () => {
    try {
        const response: AxiosResponse<any> = await exerciseAPI.get('/exercises/bodyPartList');
        return response.data
    } catch (error) {
        console.error("Error fetching bodyPartsList")
        throw error
    }
}
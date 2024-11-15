import { exerciseAPI } from "../config";
import { AxiosResponse } from "axios";

export const fetchTarget = async () => {
    try {
        const response: AxiosResponse<any> = await exerciseAPI.get('/exercises/targetList');
        return response.data
    } catch (error) {
        console.error("Error fetching targetList")
        throw error
    }
}
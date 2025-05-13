import axios from "../components/axios"
import { handleError } from "../Helpers/ErrorHandler";
import type { ResponseHelper } from "../Models/ResponseHelper";
import type { UserToken } from "../Models/UserToken";

export const loginAPI = async (username: string, password: string) => {
    try {
        const data= await axios.post<ResponseHelper<UserToken>>('/api/v1/auth/login', {
            username: username,
            password: password
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const registerAPI = async (
    username: string, 
    email: string,
    password: string
) => {
    try {
        const data= await axios.post<ResponseHelper<UserToken>>('/api/v1/auth/register', {
            username: username,
            email: email,
            password: password
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}
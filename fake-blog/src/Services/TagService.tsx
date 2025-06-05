import axios from "../components/axios"
import { handleError } from "../Helpers/ErrorHandler";


export interface Tag{
    id: number,
    name: string;
    slug: string;
}

export async function getAllTags(): Promise<Tag[] | undefined>{
    try {
        const data = await axios.get('/api/v1/posts/tags');   
        console.log(data.data.data);
        return data.data.data;
    } catch (error) {
        handleError(error);
    }
}
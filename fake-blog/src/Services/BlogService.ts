import axios from "../components/axios";

export interface Blog{
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
    author: {
        id: number;
        name: string;
        avatar: string;
    }
}

export async function getAllBlogs(): Promise<Blog[]>{
    const res = await axios.get('/api/v1/posts');
    return res.data.data;
}
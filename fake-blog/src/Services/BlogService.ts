import axios from "../components/axios";
import type { Tag } from "./TagService";

export interface Blog{
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
    comment_count: number;
    likes_count: number;
    author: {
        id: number;
        name: string;
        avatar_url: string;
    }
    tags: Tag[];
}

export async function getAllBlogs(): Promise<Blog[]>{
    const res = await axios.get('/api/v1/posts');
    return res.data.data;
}
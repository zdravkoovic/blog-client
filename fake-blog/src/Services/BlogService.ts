import axiosSSR from "@/components/auth/axiosSSR";
import axios from "../components/axios";
import slugify from 'react-slugify';
import type { ResponseHelper } from "@/Models/ResponseHelper";

export interface Blog{
    id: number;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
    comments_count: number;
    likes_count: number;
    image_url: string;
    author: {
        name: string;
        avatar_url: string;
    }
    tags: {
        ids: number[];
        names: string[];
        slugs: string[];
    };    
    cover_image: string;
    did_user_like: boolean;
    did_user_save: boolean;
}

export async function getAllBlogs(page: number, token? : string): Promise<ResponseHelper<Blog[]>> {
    const res = await axiosSSR.get(`/posts?page=${page}`, {
        headers: {
            Cookie: `access_token=${token}`
        }
    });
    return res.data;
}

export async function createBlog(title: string, content: string, category_id: number, tag_ids: string[]): Promise<number> {
    const res = await axiosSSR.post('/posts', {
        title: title,
        slug: slugify(title),
        content: content,
        category_id: category_id,
        tag_ids: tag_ids
    });
    return res.status;
}

export async function DeleteBlog(commentId: number)
{
    await axios.delete('http://localhost:8000/delete_comment/'+commentId);
}

export async function searchBlogs(query: string): Promise<Blog[]> {
    try {
        const response = await axios.get(`/api/v1/posts/search?query=${encodeURIComponent(query)}`);
        return response.data.data; 
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}

export async function save1unsave(blogId: number) {
    try {
        const result  = await axiosSSR.post(`/save/${blogId}`)
        return result.data;
    } catch(error){
        console.error('Search error:', error);
    }
}
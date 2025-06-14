import axios from "../components/axios";
import type { Tag } from "./TagService";
import slugify from 'react-slugify';

export interface Blog{
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
    comments_count: number;
    likes_count: number;
    author: {
        id: number;
        name: string;
        avatar_url: string;
    }
    tags: Tag[];
    comments: Comment[];
    
    cover_image: string;
}

export interface Paginate{
    current_page: number,
    data: Blog[]
    last_page: number
}

export async function getAllBlogs(page: number): Promise<Paginate>{
    const res = await axios.get(`/api/v1/posts?page=${page}`);
    return res.data.data;
}

export async function createBlog(title: string, content: string, category_id: number, tag_ids: string[]): Promise<Blog> {
    const res = await axios.post('http://localhost:5173/posts', {
        title: title,
        slug: slugify(title),
        content: content,
        category_id: category_id,
        tag_ids: tag_ids
    }, {
        withCredentials: true,
    });
    return res.data.data;
}

export async function DeleteBlog(commentId: number)
{
    await axios.delete('http://localhost:8000/delete_comment/'+commentId);
}
import axiosSSR from "@/components/auth/axiosSSR";
import { handleError } from "@/Helpers/ErrorHandler";
import type { ResponseHelper } from "@/models/ResponseHelper";
import type { Blog } from "@/Services/BlogService";

export async function getAllBlogs(page: number, token? : string): Promise<ResponseHelper<Blog[]>> {
    const res = await axiosSSR.get(`/posts?page=${page}`, {
        headers: {
            Cookie: `access_token=${token}`
        }
    });
    return res.data;
}

export async function getBlogsByCategory(categoryId: number, page: number, token? : string): Promise<ResponseHelper<Blog[]> | undefined>
{
    try {
        const res  = await axiosSSR.get('/blogsByCategory', {
            params: {
                category: categoryId,
                page
            },
            headers: {
                Cookie: `access_token=${token}`
            }
        });

        return res.data;

    } catch (error) {
        handleError(error);
        throw error;
    }
}

export async function save1unsave(blogId: number) {
    try {
        const result = await axiosSSR.post(`/save/${blogId}`)
        return result.data;
    } catch (error) {
        console.error('Search error:', error);
    }
}
import axiosSSR from "@/components/auth/axiosSSR";
import axios from "@/components/axios";
import { handleError } from "@/Helpers/ErrorHandler";
import type { ResponseHelper } from "@/Models/ResponseHelper";

export interface Comment
{
    id: number;
    content: string;
    updated_at: string;
    user_can_modify: boolean;
    user_nickname: string;
    user_avatar_path: string;
}

export async function getComments(blogId: number) : Promise<Comment[] | undefined>
{
    try {
        const data = await axiosSSR.get('/comments/' + blogId);
        return data.data;
    } catch (error) {
        handleError(error);
    }
}

export async function postComment(blogId: number, content: string): Promise<Comment | undefined> {
    try {
        const comment = await axiosSSR.post('/comment', {
            post_id: blogId,
            content: content
        });
        return comment.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteComment(id: number) 
{
    try {
        const data = await axiosSSR.delete('/comment/' + id);
        console.log(data.data);
        return data.data;
    } catch (error) {
        handleError(error);
    }
}


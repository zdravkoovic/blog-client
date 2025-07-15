import axiosSSR from '@/components/auth/axiosSSR'
import { Button } from '@/components/ui/button'
import { handleError } from '@/Helpers/ErrorHandler'
import { useBlogStore } from '@/store/useBlogStore'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
    lc: number,
    blogId: number,
    likedByUser: boolean
}

export default function({lc, blogId, likedByUser}: Props) {

    const handleLike = async () => {
        const newLiked = !liked;
        const newLikesCount = liked ? likesCount - 1 : likesCount + 1;
        setLiked(!liked);
        setLikesCount((prev) => liked ? prev - 1 : prev + 1);
        try {
            console.log("Blog ID",blogId);
            useBlogStore.getState().updateBlog(blogId, {
                likes_count: newLikesCount,
                did_user_like: newLiked
            })
            useBlogStore.getState();
            const res = await axiosSSR.post("/like", {post_id: blogId});
            if(res.status === 200) {
                toast.success(`Blog is ${res.data === 1 ? "liked" : "unliked"}`);
            }
            else toast.error("Something went wrong when you liked the blog");
        } catch (error) {
            setLiked(false);
            setLikesCount((prev) => prev - 1);
            toast.error("Faild in the previous action. Blog is not liked by you.");
            handleError(error);
        }
    }

    const [liked, setLiked] = useState(likedByUser);
    const [likesCount, setLikesCount] = useState(lc);

  return (
    <Button variant="ghost" onClick={handleLike} className="flex items-center gap-2">
      <Heart className={
            `w-5 h-5 ${
            liked ? "fill-red-500 text-red-500" : "text-gray-500"
            } transition-colors`
        } 
        /> {likesCount} Likes
    </Button>
  )
}
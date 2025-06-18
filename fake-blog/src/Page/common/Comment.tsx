import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/Services/DateService"
import Spinner from "./Spinner"
import { deleteComment, getComments, postComment, type Comment } from "@/Services/CommentService"
import { useEffect, useState } from "react"
import { MoreVertical } from "lucide-react"
import { toast } from "react-toastify"

type Props = {
  blogId: number;
  comments_count: number;
  setCommentsCount: (count: number) => void;
}

export default function Comments({blogId, comments_count, setCommentsCount}: Props) {

  const handleEditComment = (commentId: number) => 
  {

  }
  const handleDeleteComment = async (commentId: number) => 
  {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    setCommentsCount(comments_count - 1);
    const response  = await deleteComment(commentId);
    
    if(response?.status === 200) toast.success("Your comment is deleted!");
    else toast.error('Something went wrong with deleting your comment!');
  }

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setLoading(true);
    const newEntry = await postComment(blogId, newComment);
    console.log(newEntry);
    if(newEntry !== undefined){
      setComments([newEntry, ...comments]);
      setNewComment("");
      setVisible(true);
      setLoading(false);
    }
  };

  useEffect( () => {
    getComments(blogId).then(res => {
      if(res !== undefined)
        setComments(res);
        console.log(res);
        setVisible(true);
        setLoading(false);
    });
  }, [])

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  return (      
  <div className="space-y-6">
    {/* Spinner dok traje učitavanje */}
    {loading && (
      <div className="flex justify-center py-6">
        <Spinner />
      </div>
    )}

  {/* Komentari */}
<div className={`space-y-4 min-w-lg transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
  {comments.map((comment) => (
    <div
      key={comment.id}
      className="flex items-start gap-4 dark:bg-blue-950 rounded-xl p-4 shadow-sm relative"
    >
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={comment.user_avatar_path}
          alt={comment.user_nickname}
          className="rounded-full object-cover"
        />
      </Avatar>

      <div className="dark:bg-blue-950 flex flex-col w-full">
        <div className="flex justify-between items-start">
          <div className="flex justify-center content-center gap-2">
            <p className="mb-0 text-sm font-semibold text-gray-900 dark:text-white">
              {comment.user_nickname}
            </p>
            <span className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {formatDate(comment.updated_at)} {new Date(comment.updated_at).toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {comment.user_can_modify && (
            <div className="relative">
              <button
                onClick={() => setActiveMenuId(prev => prev === comment.id ? null : comment.id)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-blue-800"
              >
                <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>

              {activeMenuId === comment.id && (
                <div className="absolute right-0 z-10 mt-2 w-28 bg-gray-50 dark:bg-blue-950 shadow-md rounded-md py-1 text-sm">
                  <button
                    onClick={() => {
                      handleEditComment(comment.id);
                      setActiveMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-800 text-gray-800 dark:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteComment(comment.id);
                      setActiveMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-800 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-gray-100 dark:bg-blue-900 text-sm text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 mt-2 whitespace-pre-line">
          {comment.content}
        </div>
      </div>
    </div>
  ))}
</div>




    {/* Forma za novi komentar */}
   <form
  onSubmit={handleCommentSubmit}
  className="p-6 bg-gray-50 dark:bg-inherit rounded-xl shadow-md transition-colors duration-200"
>
  <p className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
    Dodaj komentar
  </p>

  <textarea
    placeholder="Napiši nešto..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white 
               border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none
               resize-none min-h-[100px] transition-colors duration-200"
  />
  
  <div className="flex justify-end mt-2">
    <button
      type="submit"
      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium 
                 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:ring-offset-2"
    >
      Pošalji komentar
    </button>
  </div>
</form>
  </div>
  )
}
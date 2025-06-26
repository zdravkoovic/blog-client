import { useLocation } from "react-router-dom"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/Services/DateService";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Like from "./common/Like";
import Comments from "./common/Comment";


type Props = {}

export default function BlogPage({} : Props) {
  const location = useLocation();
  const { blog } = location.state

  const [comments_count, setCommentsCount] = useState(blog.comments_count);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      setReady(true);

    }, 0);
  }, []);

  if(!ready) return null;

  return (
    <div className="h-full pt-40 max-w-3xl mx-auto p-6 space-y-8">
  {/* Naslov i autor */}
  <div className="space-y-2">
    <p className="dark:text-white text-4xl font-bold">{blog.title}</p>
    <div className="flex items-center space-x-4 text-sm text-gray-600">
      <Avatar className="w-13 h-13">
        <AvatarImage src={blog.author.avatar_url} className="rounded-full object-cover" />
      </Avatar>
      <span className="font-bold dark:text-white">{blog.author.name}</span>
      <span className="dark:text-white">·</span>
      <time dateTime={blog.updated_at} className="mr-4 dark:text-white">
        {formatDate(blog.updated_at)} {new Date(blog.updated_at).toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' })}
      </time>
    </div>
  </div>

  {/* Sadržaj */}
  <div className="prose prose-lg dark:prose-invert">
    <p className="dark:text-white">{blog.content}</p>
  </div>

  {/* Tagovi */}
  <div className="flex flex-wrap gap-2 mb-3">
    {blog.tags.names.map((tag: string, index: number) => (
      <span
        key={blog.tags.ids[index] || blog.tags.slugs[index] || tag}
        className="px-2 py-0.5 bg-indigo-100 dark:bg-yellow-600 text-indigo-700 dark:text-white rounded text-xs font-semibold"
      >
        #{tag}
      </span>
    ))}
  </div>

  {/* Likes i Komentari */}
  <div className="dark:text-white flex items-center gap-4">
    <Like blogId={blog.id} lc={blog.likes_count} likedByUser={blog.did_user_like}/>
    <Button variant="ghost" className="dark:text-white flex items-center gap-2 text-gray-600">
      <MessageCircle className="w-5 h-5" /> {comments_count} Comments
    </Button>
  </div>

  {/* Komentari i forma za dodavanje komentara */}
  <Comments blogId={blog.id} comments_count={comments_count} setCommentsCount={setCommentsCount}/>

</div>
  )
}
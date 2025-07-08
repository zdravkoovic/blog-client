import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { save1unsave, type Blog } from "@/Services/BlogService"
import { formatDate } from "@/Services/DateService";
import ThumbUp from '@mui/icons-material/ThumbUp';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import { Link } from "react-router-dom";
import { useBlogStore } from "@/store/useBlogStore";
import { toast } from "react-toastify";

type Props = {
    id: number;
    slug: string;
    blog: Blog;
    avatar_url: string;
    author_name: string;
    title: string;
    content: string;
    comments_count: number;
    likes_count: number;
    blog_image_url?: string;
    did_user_save: boolean;
    ref?: (node: HTMLDivElement) => void
}

export default function BlogCard({
    id,
    slug,
    blog,
    avatar_url,
    author_name,
    title,
    content,
    comments_count,
    likes_count,
    blog_image_url,
    did_user_save,
    ref
}: Props) {

    const handleSaveBlogClick = async (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        
        useBlogStore.getState().updateBlog(id, {
            did_user_save: !did_user_save
        })

        const result = await save1unsave(id);

        result?.data ? toast.success("Blog is saved") : toast.info("Blog is unsaved");
    } 

  return (
    <div key={id} className="mb-0" ref={ref}>
        <Link
            to={slug}
            state={{ blog: blog }}
            className="no-underline block z-20"
            onClick={() => {
                sessionStorage.setItem("scrollY", window.scrollY.toString());
            }}
        >
            <article
                className="flex flex-row items-start py-8 border-b border-gray-200 dark:border-gray-800 bg-transparent shadow-none rounded-none hover:bg-gray-50 dark:hover:bg-[#151a3a] transition-colors cursor-pointer"
            >
                {/* Leva strana: tekstualni deo */}
                <div className="flex-1 flex flex-col justify-between pr-8">
                {/* Autor */}
                <div className="flex items-center mb-4">
                    <Avatar className="w-10 h-10 mr-3">
                        <AvatarImage src={avatar_url} className="rounded-full object-cover" />
                    </Avatar>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{author_name}</span>
                    </div>

                    {/* Naslov */}
                    <p className="text-3xl font-extrabold tracking-tight dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                        <strong>{title}</strong>
                    </p>

                    {/* Sažetak */}
                    <p
                        className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2 font-medium"
                        dangerouslySetInnerHTML={{
                        __html: content.length > 180
                            ? content.slice(0, 180) + "..."
                            : content
                        }}
                    />

                    {/* Tagovi */}
                    {blog.tags && blog.tags.names.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {blog.tags.names.map((tag, index) => (
                                <span
                                    key={blog.tags.ids[index] || blog.tags.slugs[index] || blog.tags.names[index]}
                                    className="px-2 py-0.5 bg-indigo-100 dark:bg-yellow-600 text-indigo-700 dark:text-white rounded text-xs font-semibold"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Donji deo: datum, komentari, lajkovi, save */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <time dateTime={blog.updated_at}>
                        {formatDate(blog.updated_at)}
                        </time>
                        <div className="flex items-center gap-x-4">
                        <button className="flex items-center gap-x-1 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                            <ChatBubbleOutline fontSize="small" />
                            <span>{comments_count}</span>
                        </button>
                        <button className="flex items-center gap-x-1 hover:text-pink-400 transition-colors">
                            <ThumbUp fontSize="small" />
                            <span>{likes_count}</span>
                        </button>
                        <button 
                            className={`flex items-center gap-x-1 transition-colors duration-200 ${
                                did_user_save ? 'text-yellow-500' : 'hover:text-yellow-500 text-gray-500'
                            }`} 
                            title={blog.did_user_save ? 'Unsave' : 'Save'}
                            onClick={handleSaveBlogClick}
                        >
                            <svg width="20" height="20" fill={did_user_save ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" 
                                />
                            </svg>
                        </button>

                        </div>
                    </div>
                    </div>
                        
                    {/* Desna strana: slika bloga */}
                    <div className="w-64 min-w-[16rem] h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-none">
                    {blog.image_url ? (
                        <img
                        src={blog_image_url}
                        alt={title}
                        className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                        Nema slike
                        </div>
                    )}
                    </div>
                </article>
                </Link>
            </div>
  )
}
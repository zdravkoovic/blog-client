import { useContext, useEffect, useRef, useState } from "react"
import { getAllBlogs, type Blog } from "../Services/BlogService";
import { formatDate } from "../Services/DateService";
import Spinner from "./common/Spinner";
import ThumbUp from '@mui/icons-material/ThumbUp';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import { Link } from "react-router-dom";
import { BlogContext } from "../Context/blogContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";


type Props = {
    blogs: Blog[];
}

export default function BlogsPage({blogs}: Props){

    return (
        <div className="blogs dark:bg-[#0a0f2c] mx-auto max-w-4xl px-4 flex flex-col gap-4 mt-0 pt-0">
            {blogs.map((blog) => (
            <div key={blog.id} className="mb-0">
                <Link
                to={blog.slug}
                state={{ blog: blog }}
                className="no-underline block"
                >
                <article
                    className="flex flex-row items-start py-8 border-b border-gray-200 dark:border-gray-800 bg-transparent shadow-none rounded-none hover:bg-gray-50 dark:hover:bg-[#151a3a] transition-colors cursor-pointer"
                >
                    {/* Leva strana: tekstualni deo */}
                    <div className="flex-1 flex flex-col justify-between pr-8">
                    {/* Autor */}
                    <div className="flex items-center mb-4">
                        <Avatar className="w-10 h-10 mr-3">
                        <AvatarImage src={blog.author.avatar_url} className="rounded-full object-cover" />
                        </Avatar>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{blog.author.name}</span>
                    </div>

                    {/* Naslov */}
                    <p className="text-3xl font-extrabold tracking-tight dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                        <strong>{blog.title}</strong>
                    </p>

                    {/* Sažetak */}
                    <p
                        className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2 font-medium"
                        dangerouslySetInnerHTML={{
                        __html: blog.content.length > 180
                            ? blog.content.slice(0, 180) + "..."
                            : blog.content
                        }}
                    />

                    {/* Tagovi */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {blog.tags.map((tag) => (
                                <span
                                    key={tag.id || tag.slug || tag.name}
                                    className="px-2 py-0.5 bg-indigo-100 dark:bg-yellow-600 text-indigo-700 dark:text-white rounded text-xs font-semibold"
                                >
                                    #{tag.name}
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
                            <span>{blog.comments_count}</span>
                        </button>
                        <button className="flex items-center gap-x-1 hover:text-pink-400 transition-colors">
                            <ThumbUp fontSize="small" />
                            <span>{blog.likes_count}</span>
                        </button>
                        <button className="flex items-center gap-x-1 hover:text-yellow-500 transition-colors" title="Save">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    </div>
                    {/* Desna strana: slika bloga */}
                    <div className="w-64 min-w-[16rem] h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-none">
                    {blog.image_url ? (
                        <img
                        src={blog.image_url}
                        alt={blog.title}
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
            ))}
        </div>
    )
}
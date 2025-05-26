import { useEffect, useRef, useState } from "react"
import { getAllBlogs, type Blog } from "../Services/BlogService";
import { formatDate } from "../Services/DateService";
import Spinner from "./common/Spinner";
import ThumbUp from '@mui/icons-material/ThumbUp';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';


type Props = {}

interface BlogChannel {
    blog: Blog;
}

export default function BlogsPage({}: Props){
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchBlogs = async (page = 1) => {
            const res = await getAllBlogs(page);
            const {data, current_page, last_page} = res;

            setBlogs(prev => (page === 1) ? data : [...prev, ...data]);
            setCurrentPage(current_page);
            setLastPage(last_page);
            setLoading(false);
        }

        fetchBlogs(1);

        const channel = window.Echo.channel('posts');

        const handler = (e: BlogChannel) => {
            console.log(e.blog);
            setBlogs(prev => [e.blog, ...prev]);
        };

        channel.listen('NewPost', handler);

        

        return () => {
            channel.stopListening('NewPost');
            window.Echo.leaveChannel('posts');
        }
    }, [])

    useEffect(() => {
        if(!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    !loading &&
                    currentPage < lastPage
                ) {
                    setLoading(true);
                    getAllBlogs(currentPage + 1).then((res) => {
                        const { data, current_page } = res;
                        setBlogs(prev => [...prev, ...data]);
                        setCurrentPage(current_page);
                    })
                    .finally(() => setLoading(false));
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        observer.observe(loadMoreRef.current);

        return () => {
            observer.disconnect();
        }
    }, [currentPage, lastPage, loading])


    return (
        <>
        <div className="blogs mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
        <article
            key={blog.id}
            className="flex flex-col justify-between bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
        {/* Opcionalna cover slika */}
        {blog.cover_image && (
        <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-48 object-cover"
        />
        )}

        <div className="p-6 flex flex-col flex-grow">
        {/* Datum i tagovi */}
        <div className="flex flex-wrap items-center text-xs text-gray-500 mb-3">
            <time dateTime={blog.updated_at} className="mr-4">
            {formatDate(blog.updated_at)}
            </time>
            {blog.tags.map((tag) => (
            <span
                key={tag.slug}
                className="mb-1 mr-2 inline-block bg-indigo-100 text-indigo-800 text-[10px] font-medium px-2 py-1 rounded-full"
            >
                {tag.name}
            </span>
            ))}
        </div>

        {/* Naslov */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group">
            <a href={blog.slug} className="hover:text-indigo-600 transition-colors">
            {blog.title}
            </a>
            
        </h3>

        {/* Kratki sadržaj */}
        <p
            className="prose prose-sm prose-gray dark:prose-invert flex-grow mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Lajkovi i komentari */}
        <div className="mt-2 flex items-center gap-x-6 text-sm text-gray-500">
            <button className="flex items-center gap-x-1 hover:text-indigo-600 transition-colors">
            <ThumbUp fontSize="small" />
            <span>{blog.likes_count}</span>
            </button>
            <button className="flex items-center gap-x-1 hover:text-indigo-600 transition-colors">
            <ChatBubbleOutline fontSize="small" />
            <span>{blog.comments_count}</span>
            </button>
        </div>
        </div>

        {/* Podnožje: autor */}
        <div className="border-t border-gray-100 dark:border-gray-700 p-4 flex items-center">
        <img
            alt={blog.author.name}
            src={blog.author.avatar_url}
            className="w-10 h-10 rounded-full mr-3 bg-gray-50"
        />
        <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {blog.author.name}
            </p>
            {/* Uloga autora, ako postoji */}
            {blog.author.role && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
                {blog.author.role}
            </p>
            )}
        </div>
        </div>
    </article>
    ))}
    <div ref={loadMoreRef} />
    </div>
    {loading && <Spinner />}
    </>
    )
}
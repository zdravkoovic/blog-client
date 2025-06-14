import { useContext, useEffect, useId, useRef, useState } from "react"
import { getAllBlogs, type Blog } from "../Services/BlogService";
import { formatDate } from "../Services/DateService";
import Spinner from "./common/Spinner";
import ThumbUp from '@mui/icons-material/ThumbUp';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import { Link } from "react-router-dom";
import { BlogContext } from "../Context/blogContext";
import { UserContext } from "../Context/userContext";
import SearchBar from "./common/SearchBar";


type Props = {}

interface BlogChannel {
    blog: Blog;
}

export default function BlogsPage({}: Props){
    const initialBlogs : Blog[] = useContext(BlogContext);
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);

    const user = useContext(UserContext);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const fetchBlogs = async (page = 1) => {
    //         const res = await getAllBlogs(page);
    //         const {data, current_page, last_page} = res;

    //         // setBlogs(prev => (page === 1) ? data : [...prev, ...data]);
    //         blogs.concat(data);
    //         setLastPage(last_page);
    //         setLoading(false);
    //     }
        
    //     // setCurrentPage(1);
    //     // fetchBlogs(1);

    //     // const channel = window.Echo.channel('posts');

    //     // const handler = (e: BlogChannel) => {
    //     //     console.log(e.blog);
    //     //     setBlogs(prev => [e.blog, ...prev]);
    //     // };

    //     // channel.listen('NewPost', handler);

        

    //     // return () => {
    //     //     channel.stopListening('NewPost');
    //     //     window.Echo.leaveChannel('posts');
    //     // }
    // }, [])

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
                        const { data, current_page, last_page } = res;
                        setBlogs(prev => [...prev, ...data]); 
                        setCurrentPage(current_page);
                        setLastPage(last_page);
                    })
                    .finally(() => setLoading(false));
                }
            },
            {
                root: null,
                rootMargin: '-15px',
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
            {user !== null &&
                <div className="pt-30">
                    <SearchBar />
                </div> 
            }
            <div className="blogs dark:bg-[#0a0f2c] mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
            <article
                key={blog.id}
                className="flex flex-col justify-between dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-800"
            >
                <div className="p-6 flex flex-col flex-grow">
                    
                    {/* Datum i tagovi */}
                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <time dateTime={blog.updated_at} className="mr-4">
                        {formatDate(blog.updated_at)}
                        </time>
                        {blog.tags.map((tag) => (
                        <span
                            key={tag.slug}
                            className="mb-1 mr-2 inline-block bg-indigo-100 text-indigo-800 dark:bg-yellow-600 dark:text-indigo-200 text-[10px] font-medium px-2 py-1 rounded-full"
                            >
                            {tag.name}
                        </span>
                        ))}
                    </div>


                    {/* Naslov */}
                    <p className="text-3xl font-semibold  dark:text-white mb-2 line-clamp-2 group">
                        <Link to={blog.slug} state={{blog: blog}} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            {blog.title}
                        </Link>
                    </p>

                    {/* Kratki sadržaj */}
                    <p
                        className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 p-3 rounded-md leading-relaxed line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Lajkovi i komentari */}
                    <div className="mt-auto flex items-center gap-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <button className="flex items-center gap-x-1 hover:text-pink-400 transition-colors">
                            <ThumbUp fontSize="small" />
                            <span>{blog.likes_count}</span>
                        </button>
                        <button className="flex items-center gap-x-1 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                            <ChatBubbleOutline fontSize="small" />
                            <span>{blog.comments_count}</span>
                        </button>
                    </div>

                    {/* Podnožje: autor */}
                    <div className="mt-auto border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center">
                        <img
                            alt={blog.author.name}
                            src={blog.author.avatar_url}
                            className="justify-center w-10 h-10 rounded-full mr-3 bg-gray-100 dark:bg-gray-800"
                        />
                        <div>
                            <p className="mb-0 flex justify-center text-gray-900 dark:text-gray-200">
                                {blog.author.name}
                            </p>
                        </div>
                    </div>
                </div>
            </article>
            ))}
            </div>
            <div ref={loadMoreRef} className="dark:bg-[#0a0f2c] flex justify-around pt-55 pb-3">
                {loading && <Spinner />}
            </div>
        </>
    )
}
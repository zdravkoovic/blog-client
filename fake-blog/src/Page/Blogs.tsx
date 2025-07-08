import { useBlogStore } from "@/store/useBlogStore";
import BlogCard from "./common/BlogCard";
import { BlogSkeleton } from "./common/BlogSkeleton";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Spinner from "./common/Spinner";
import { getAllBlogs } from "@/Services/BlogService";
import useSavedBlogs from "@/hooks/useSavedBlogs";
import { UserContext } from "@/Context/userContext";


type Props = {}

export default function BlogsPage({}: Props){
    const all = useBlogStore(state => state.all);
    const filtered = useBlogStore(state => state.filtered);
    const loading = useBlogStore(state => state.loading);

    const blogs = filtered ?? all;

    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loadingScroll, setLoadingScroll] = useState(false);
    const [page, setPage] = useState<number>(1);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostElementRef = useCallback(
        (node: HTMLDivElement) => {
            if(loadingScroll) return;
            if(observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(
                (entries) => {
                if(entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
                },
                {threshold: 1.0}
            );
            if (node) observer.current.observe(node);
        },
        [loadingScroll, hasMore]
        );
    
    useEffect(() => {

        if(page === 1) return;
        setLoadingScroll(true);
        getAllBlogs(page).then(res => {
            useBlogStore.getState().appendBlogs(res.data);
            setLoadingScroll(false);
            setHasMore(page !== res.meta.last_page);
        })

    }, [page])

    return (
        <div className="blogs dark:bg-[#0a0f2c] mx-auto max-w-4xl px-4 flex flex-col gap-4 mt-0 pt-0">
            {/* BlogSkeleton fade */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: loading ? 1 : 0,
                    pointerEvents: loading ? "auto" : "none",
                    transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
                    zIndex: 2,
                }}
            >
                <BlogSkeleton />
            </div>
            <div
                style={{
                 opacity: loading ? 0 : 1,
                    transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
                    zIndex: 1,
                }}
            >
                {blogs.map((blog, index) => {
                    if(blogs.length === index + 1) 
                    {
                        return (
                            <BlogCard 
                                author_name={blog.author.name}
                                avatar_url={blog.author.avatar_url}
                                blog={blog}
                                comments_count={blog.comments_count}
                                content={blog.content}
                                id={blog.id}
                                likes_count={blog.likes_count}
                                slug={blog.slug}
                                title={blog.title}
                                blog_image_url={undefined}
                                key={blog.id}
                                did_user_save={blog.did_user_save}
                                ref={lastPostElementRef}
                            />
                        )
                    }
                    else
                    {
                        return (
                            <BlogCard 
                                author_name={blog.author.name}
                                avatar_url={blog.author.avatar_url}
                                blog={blog}
                                comments_count={blog.comments_count}
                                content={blog.content}
                                id={blog.id}
                                likes_count={blog.likes_count}
                                slug={blog.slug}
                                title={blog.title}
                                blog_image_url={undefined}
                                key={blog.id}
                                did_user_save={blog.did_user_save}
                            />
                        )
                    }
                })}
                {loadingScroll && 
                    <div className={`flex justify-center mt-3 mb-3 duration-500 ease-in-out transform transition-transform ${loadingScroll ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>                        
                        <Spinner />
                    </div>
                }
            </div>
        </div>
    )
}
import { useBlogStore } from "@/store/useBlogStore";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { getAllBlogs } from "@/Services/BlogService";
import { BlogSkeleton } from "../components/BlogSkeleton";
import BlogCard from "../components/BlogCard";
import Spinner from "@/components/ui/Spinner";
import { UserContext } from "@/Context/userContext";
import useBlogsByCategory from "../hooks/useBlogsByCategory";
import { useCategories } from "@/features/categories/hooks/useCategories";


type Props = {}

export default function BlogsPage({}: Props){
    const { category } = useCategories();

    const user = useContext(UserContext);
    const {
        data,
        isLoading,
        isError,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage
        // isPlaceholderData
    } = useBlogsByCategory(user?.id, category);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastBlogElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isFetchingNextPage) return;   
            if (observer.current) observer.current.disconnect();
            
            observer.current = new IntersectionObserver(
                (entries) => {
                if(entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
                },
                {threshold: 1.0}
            );
            if (node) observer.current.observe(node);
        },
        [isFetchingNextPage, hasNextPage, fetchNextPage]
        );

    const blogs = data?.pages.flatMap(p => p.data) ?? [];

    if (isLoading) return <BlogSkeleton />
    if (isError) return <p>Došlo je do greške pri učitavanju.</p>;

    if(isFetching && !isFetchingNextPage) return <BlogSkeleton />

    return (
        <div className="blogs dark:bg-[#0a0f2c] mx-auto max-w-4xl px-4 flex flex-col gap-4 mt-0 pt-0">
            <div
                style={{
                 opacity: isLoading ? 0 : 1,
                    transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
                    zIndex: 1,
                }}
            >
                {blogs?.map((blog, index) => {
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
                                ref={lastBlogElementRef}
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
                {isFetchingNextPage && 
                    <div className={`flex justify-center mt-3 mb-3 duration-500 ease-in-out transform transition-transform ${isFetchingNextPage ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>                        
                        <Spinner />
                    </div>
                }
            </div>
        </div>
    )
}
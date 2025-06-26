import type { Blog } from "@/Services/BlogService";
import BlogCard from "./common/BlogCard";


type Props = {
    blogs: Blog[];
}

export default function BlogsPage({blogs}: Props){

    return (
        <div className="blogs dark:bg-[#0a0f2c] mx-auto max-w-4xl px-4 flex flex-col gap-4 mt-0 pt-0">
            {blogs.map((blog) => (
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
                />
            ))}
        </div>
    )
}
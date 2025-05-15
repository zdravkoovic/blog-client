import { useEffect, useState } from "react"
import { getAllBlogs, type Blog } from "../Services/BlogService";
import { formatDate } from "../Services/DateService";
import Spinner from "./common/Spinner";

type Props = {}

export default function BlogsPage({}: Props){
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllBlogs().then(data => {
            setBlogs(data);
            setLoading(false);
        });
    }, [])

    if(loading) return <Spinner />;

    return (
    <div>
        <div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogs.map((blog) => (
            <article key={blog.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={blog.created_at} className="text-gray-500">
                    {formatDate(blog.created_at)}
                </time>
                <a
                    href={blog.slug}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                    {blog.slug}
                </a>
                </div>
                <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a>
                    <span className="absolute inset-0" />
                    {blog.title}
                    </a>
                </h3>
                <p 
                    className="mt-5 line-clamp-3 text-sm/6 text-gray-600"
                    dangerouslySetInnerHTML={{
                        __html: blog.content
                    }}
                    ></p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                <img alt="" src={blog.author.avatar} className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                    <a>
                        <span className="absolute inset-0" />
                        {blog.author.name}
                    </a>
                    </p>
                    <p className="text-gray-600">{blog.author.name}</p>
                </div>
                </div>
            </article>
            ))}
        </div>
        </div>
    </div>
    )
}
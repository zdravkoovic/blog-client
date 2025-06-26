import type { Blog } from "@/Services/BlogService"
import type React from "react";
import { useBlogStore } from "./useBlogStore";
import { useEffect } from "react";

type Props = {
    blogs: Blog[];
    children: React.ReactNode;
}

export default function ZustandInitializer({blogs, children}: Props) {
    const setBlogs = useBlogStore((state) => state.setBlogs);
    const alreadySet = useBlogStore((state) => state.blogs.length > 0);

    useEffect(() => {
        if(!alreadySet && blogs.length > 0) setBlogs(blogs);
    }, [])

  return (
    <>{children}</>
  )
}
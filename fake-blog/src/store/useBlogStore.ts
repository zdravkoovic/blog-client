import type { Blog } from "@/Services/BlogService"
import { create } from 'zustand';

type BlogStore =
{
    blogs: Blog[];
    setBlogs: (blogs: Blog[]) => void;
    appendBlogs: (blogs: Blog[]) => void;
    updateBlog: (id: number, data: Partial<Blog>) => void;
}

export const useBlogStore = create<BlogStore>(set => ({
    blogs: [],
    setBlogs: (blogs) => set({blogs}),
    appendBlogs: (newBlogs) => 
        set((state) => ({
            blogs: [
                ...state.blogs,
                ...newBlogs.filter(
                    (nb) => !state.blogs.find((b) => b.id === nb.id)
                )
            ]
        })),
    updateBlog: (id, data) => 
        set(state => ({
            blogs: state.blogs.map(blog => 
                blog.id === id ? {...blog, ...data} : blog
            )
        }))
}));
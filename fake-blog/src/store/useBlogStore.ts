import type { Blog } from "@/Services/BlogService"
import { create } from 'zustand';

type BlogStore =
{
    all: Blog[];
    filtered: Blog[] | null;
    loading: boolean;
    setAll: (blogs: Blog[]) => void;
    setFiltered: (blogs: Blog[]) => void;
    setLoading: (condition: boolean) => void;
    clearFiltered: () => void;
    appendBlogs: (blogs: Blog[]) => void;
    updateBlog: (id: number, data: Partial<Blog>) => void;
}

export const useBlogStore = create<BlogStore>(set => ({
    all: [],
    filtered: null,
    loading: false,
    setAll: (blogs) => set({all: blogs}),
    appendBlogs: (newBlogs) => 
        set((state) => ({
            all: [
                ...state.all,
                ...newBlogs.filter(
                    (nb) => !state.all.find((b) => b.id === nb.id)
                )
            ]
        })),
    updateBlog: (id, data) => 
        set(state => ({
            all: state.all.map(blog => 
                blog.id === id ? {...blog, ...data} : blog
            ),
            filtered: state.filtered
            ? state.filtered.map(blog => blog.id === id ? {...blog, ...data} : blog)
            : null
        })),
        setFiltered: blogs => set({filtered: blogs}),
        clearFiltered: () => set({filtered: null}),
        setLoading: (condition: boolean) => set({loading: condition})
}));
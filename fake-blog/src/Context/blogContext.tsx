import { createContext } from "react";
import type { Blog } from "../Services/BlogService";

export const BlogContext = createContext<Blog[]>([]);
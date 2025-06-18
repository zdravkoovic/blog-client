import type { Category } from "@/Services/CategoryService";
import { createContext } from "react";

export const CategoryContext = createContext<Category[]>([]);
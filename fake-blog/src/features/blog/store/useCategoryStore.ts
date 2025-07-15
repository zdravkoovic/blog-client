import type { Category } from "@/models/Category";
import { create } from "zustand";

const all: Category = { id: -1, name: 'all', slug: 'all' };

interface CategoryState {
    categories: Category[];
    setCategories: (categories: Category[]) => void;

    category: Category;
    setCategory: (category: Category) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories }),
    
    category: all,
    setCategory: (category) => set({ category }),
}));
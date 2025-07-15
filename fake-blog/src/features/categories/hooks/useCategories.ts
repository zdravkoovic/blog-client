import { CategoryContext } from "@/context/categoryContext";
import { useCategoryStore } from "@/features/blog/store/useCategoryStore";
import type { Category } from "@/services/CategoryService";
import { useContext, useState } from "react";

const all : Category = {id: -1, name: 'all', slug: 'all'}; 

export function useCategories()
{
  return useCategoryStore();
}
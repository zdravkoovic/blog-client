import { useCategoryStore } from "@/features/blog/store/useCategoryStore";

export function useCategories()
{
  return useCategoryStore();
}
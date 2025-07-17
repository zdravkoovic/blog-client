import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query"
import { getBlogsByCategory } from "../api/blogAPI";
import type { Category } from "@/models/Category";


export default function useBlogsByCategory(
  userId: number | undefined,
  category: Category
) {
  return useInfiniteQuery(
    {
      queryKey: ['blogs', category.slug, userId],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await getBlogsByCategory(category.id, pageParam);
        if (!result) throw new Error('Failed to fetch blogs by category');
        return result;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const next = lastPage.meta.current_page + 1;
        return next <= lastPage.meta.last_page ? next : undefined;
      },
      staleTime: 1000 * 60,
      placeholderData: keepPreviousData,
      enabled: !!userId && !!category,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  )
}
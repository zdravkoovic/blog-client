import { getSavedBlogs } from "@/Services/CategoryService"
import { useQuery } from "@tanstack/react-query"


export default function useSavedBlogs(userId : number) {
  return useQuery({
    queryKey: ['saved-blogs', userId],
    queryFn: async () => {
        const result = await getSavedBlogs();
        if(result === undefined) throw new Error('Failed to fetch saved blogs');
        return result;
    },
    staleTime: 1000*60*10,
  })
}
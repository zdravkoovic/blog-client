import {  useMutation, useQueryClient, type InfiniteData, type QueryKey } from "@tanstack/react-query";
import { save1unsave } from "../api/blogAPI";
import type { ResponseHelper } from "@/models/ResponseHelper";
import type { Blog } from "@/models/Blog";
import { useCategories } from "@/features/categories/hooks/useCategories";

export function useSaveBlog(userId: number | undefined)
{
    const qc = useQueryClient();
    const { categories } = useCategories();
    // const key = ['blogs', categorySlug, userId] as const;

    return useMutation<
        Blog | undefined,
        Error,
        number,
        { snapshots?: Array<[ReadonlyArray<unknown>, InfiniteData<ResponseHelper<Blog[]>> | undefined]> }
        >({
            mutationFn: async (blogId: number) => {
                const response = await save1unsave(blogId)
                return response?.data;
            },
            onMutate: async (blogId: number) => {
            
                await qc.cancelQueries({ predicate: query => query.queryKey[0] === 'blogs' });
            
                const snapshots = qc.getQueriesData<InfiniteData<ResponseHelper<Blog[]>>>({ predicate: query => query.queryKey[0] === 'blogs' });

                for (const category of categories) {
                    
                    qc.setQueryData<InfiniteData<ResponseHelper<Blog[]>>>(['blogs', category.slug, userId], (oldData) => {
                        if (!oldData) return oldData;
                        
                        return {
                            ...oldData,
                            pages: oldData.pages.map((page) => ({
                                ...page,
                                data: page.data
                                    .map((b) => {
                                        if(b.id !== blogId) return b;
                                        
                                        const updatedBlog = { ...b, did_user_save: !b.did_user_save };
                                        
                                        if(category.slug === 'saved' && !updatedBlog.did_user_save) {
                                            return null;
                                        }

                                        return updatedBlog;
                                    })
                                    .filter((b) => b !== null)
                            })
                        )}
                    })
                }

            return { snapshots };
        },
        
        onSuccess: (_data, blogId, context) => {
            if (userId === undefined) return;   

            const key: QueryKey = ['blogs', 'saved', userId];    
            
            qc.setQueryData<InfiniteData<ResponseHelper<Blog[]>>>(key, (oldData) => {
                if (!oldData) return oldData;

                if (_data?.did_user_save) {
                    const alredyExists = oldData.pages.some(page => page.data.some(blog => blog.id === blogId))

                    if (alredyExists) return oldData;

                    return {
                        ...oldData,
                        pages: [
                            {
                                ...oldData.pages[0],
                                data: [_data, ...oldData.pages[0].data]
                            },
                            ...oldData.pages.slice(1)
                        ]
                    }
                } else {
                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) => ({
                            ...page,
                            data: page.data.filter((blog) => _data?.id !== blog.id)
                        })),
                    };
                }
            })
        },
            
        onError: (_err, _blogId, context) => {
            context?.snapshots?.forEach(([key, snapshot]) => {
                qc.setQueryData <InfiniteData<ResponseHelper<Blog[]>>>(key as any, snapshot);
            });
        },
        
        onSettled: () => {
        },
    });
}
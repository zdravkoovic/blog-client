export interface Blog{
    id: number;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
    comments_count: number;
    likes_count: number;
    image_url: string;
    author: {
        name: string;
        avatar_url: string;
    }
    tags: {
        ids: number[];
        names: string[];
        slugs: string[];
    };    
    cover_image: string;
    did_user_like: boolean;
    did_user_save: boolean;
}
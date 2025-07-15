import { useState, useRef, useContext, useEffect } from "react";
import { type Category } from "@/services/CategoryService";
import { useBlogStore } from "@/store/useBlogStore";
import { UserContext } from "@/Context/userContext";
import useSavedBlogs from "@/features/blog/hooks/useBlogsByCategory";
import { useCategories } from "../hooks/useCategories";
import { CategoryContext } from "@/context/categoryContext";

type Props = {};

const all : Category = {id: -1, slug: 'all', name: 'all'}

export default function Categories({}: Props) {

    const contextCategories = useContext(CategoryContext);

    const {categories, setCategories, category, setCategory} = useCategories();


    // const { data: filtered, isLoading } = useSavedBlogs(user?.id ?? -1); // ima i isError

    const scrollRef = useRef<HTMLUListElement>(null);


    useEffect(() => {
        setCategories(contextCategories);
    }, [contextCategories]);

    // useEffect(() => {
    //     if(slug === 'saved'){
    //         useBlogStore.getState().setLoading(isLoading);
    //     }
    // }, [isLoading, slug])

    // useEffect(() => {
    //     sessionStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));        
    // }, [selectedCategory]);

    return (
        <div className="w-full">
            <div className="relative flex items-center w-full z-0">
                {/* Full-width bottom border, always visible */}
                <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-300 dark:bg-gray-700 z-0 pointer-events-none" />
                {/* Left Arrow */}
                <button
                    type="button"
                    className="flex items-center justify-center p-1 dark:text-white hover:text-blue-600 transition-colors self-stretch z-10"
                    aria-label="Scroll left"
                    onClick={() => {
                        if (scrollRef.current) {
                            scrollRef.current.parentElement?.scrollBy({ left: -scrollRef.current.parentElement.clientWidth, behavior: "smooth" });
                        }
                    }}
                    tabIndex={0}
                    style={{ position: "static", marginRight: "4px" }}
                >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="h-full flex items-center">
                        <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <div className="overflow-x-auto px-0 no-scrollbar w-full flex-1 flex items-center relative z-0" style={{ minWidth: 0 }}>
                    <ul
                        ref={scrollRef}
                        className="flex gap-2 min-w-max scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 items-center h-12 w-full relative"
                        style={{ alignItems: "center", marginBottom: 0 }}
                    >
                        {/* All categories */}
                        <li 
                            className="relative flex flex-col items-center justify-center h-full"
                            onClick={() => setCategory(all)}
                        >
                            <span
                                className={`cursor-pointer px-4 py-2 rounded-full transition-colors whitespace-nowrap select-none
                                    ${category.slug === all.slug
                                    ? "text-blue-600 dark:text-yellow-600 font-semibold"
                                    : "text-gray-800 dark:text-white hover:text-blue-600"}
                                `}
                                title="All categories"
                                tabIndex={0}
                                role="button"
                                onKeyDown={e => {
                                    if (e.key === "Enter" || e.key === " ") setCategory(all);
                                }}
                            >
                                All categories
                            </span>
                            {category.slug === all.slug && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 block w-4/5 h-1 bg-blue-600 dark:bg-yellow-800 rounded-full"></span>
                            )}
                        </li>
                        {/* Categories */}
                        {categories.map((item) => (
                            <li 
                                key={item.id} 
                                className="relative flex flex-col items-center justify-center h-full"
                                onClick={() => setCategory(item)}
                            >
                                <span
                                    className={`cursor-pointer px-4 py-2 rounded-full transition-colors whitespace-nowrap select-none
                                    ${item?.id === category.id
                                        ? "text-blue-600 dark:text-yellow-600 font-semibold"
                                        : "text-gray-800 dark:text-white hover:text-blue-600"}
                                    `}
                                    title={item.name}
                                    tabIndex={item.id}
                                    role="button"
                                    // onKeyDown={e => {
                                    //     if (e.key === "Enter" || e.key === " ") setCategory(item);
                                    // }}
                                >
                                    {item.name}
                                </span>
                                {item?.id === category.id && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 block w-4/5 h-1 bg-blue-600 dark:bg-yellow-800 rounded-full"></span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Right Arrow */}
                <button
                    type="button"
                    className="flex items-center justify-center p-1 dark:text-white hover:text-blue-600 transition-colors self-stretch z-10"
                    aria-label="Scroll right"
                    onClick={() => {
                        if (scrollRef.current) {
                            scrollRef.current.parentElement?.scrollBy({ left: scrollRef.current.parentElement.clientWidth, behavior: "smooth" });
                        }
                    }}
                    tabIndex={0}
                    style={{ position: "static", marginLeft: "4px" }}
                >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="h-full flex items-center">
                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

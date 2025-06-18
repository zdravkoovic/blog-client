import { useContext, useEffect, useRef, useState } from "react";
import { userAuth } from "../Context/userAuth";
import BlogsPage from "./Blogs";
import LoginBtn from "./common/LoginBtn";
import { UserContext } from "@/Context/userContext";
import { getAllBlogs, type Blog } from "@/Services/BlogService";
import { BlogContext } from "@/Context/blogContext";
import Spinner from "./common/Spinner";
import Categories from "./common/Categories";
import { CategoryContext } from "@/Context/categoryContext";
import type { Category } from "@/Services/CategoryService";
import { SearchResultsContext } from "@/Context/searchResultsContext";
import { BlogSkeleton } from "./common/BlogSkeleton";

type Props = {};

export default function HomePage({}: Props) {
  // Contexts
  const { isLoggedIn } = userAuth();
  const user = useContext(UserContext);
  const initialBlogs: Blog[] = useContext(BlogContext);
  const categories: Category[] = useContext(CategoryContext);
  const { results, searchLoading } = useContext(SearchResultsContext);

  // State
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);

  // Refs
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Infinite scroll effect
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          currentPage < lastPage
        ) {
          setLoading(true);
          getAllBlogs(currentPage + 1)
            .then((res) => {
              const { data, current_page, last_page } = res;
              setBlogs((prev) => [...prev, ...data]);
              setCurrentPage(current_page);
              setLastPage(last_page);
            })
            .finally(() => setLoading(false));
        }
      },
      {
        root: null,
        rootMargin: "-15px",
        threshold: 0.1,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentPage, lastPage, loading]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-4 md:px-24 lg:px-56 mt-24">
      {/* Main content: categories + blogs (2/3) */}
      <div className="lg:col-span-2 flex flex-col">
        {!isLoggedIn() && <LoginBtn />}

        {user !== null && (
          <div className="pt-10 flex overflow-y-auto no-scrollbar">
            <Categories categories={categories} />
          </div>
        )}

        <div className="h-6" />

        {/* Blog list with skeleton loading */}
        <div style={{ position: "relative", minHeight: "300px" }}>
          {/* BlogSkeleton fade */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: searchLoading ? 1 : 0,
              pointerEvents: searchLoading ? "auto" : "none",
              transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
              zIndex: 2,
            }}
          >
            <BlogSkeleton />
          </div>
          {/* BlogsPage fade */}
          <div
            style={{
              opacity: searchLoading ? 0 : 1,
              transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
              zIndex: 1,
            }}
          >
            <BlogsPage blogs={results.length ? results : blogs} />
          </div>
        </div>

        {/* Infinite scroll loader */}
        <div
          ref={loadMoreRef}
          className="dark:bg-[#0a0f2c] flex justify-around pt-16 pb-6"
        >
          {loading && <Spinner />}
        </div>
      </div>

      {/* Suggestions sidebar (1/3) */}
      <div className="hidden lg:block lg:col-span-1">
        <div
          className="dark:bg-[#1a223f] rounded-lg shadow p-6 mt-10"
          style={{
            position: "sticky",
            top: "6rem",
            maxHeight: "calc(100vh - 6rem - 2.5rem)",
            overflowY: "auto",
          }}
        >
          <p className="text-3xl font-extrabold dark:text-white mb-6">
            Predloženi blogovi
          </p>
          <div className="text-gray-500">
            Ovde će biti predloženi blogovi...
          </div>
        </div>
      </div>
    </div>
  );
}
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { userAuth } from "../Context/userAuth";
import BlogsPage from "./Blogs";
import LoginBtn from "./common/LoginBtn";
import { UserContext } from "@/Context/userContext";
import { getAllBlogs } from "@/Services/BlogService";
import Spinner from "./common/Spinner";
import Categories from "./common/Categories";
import { CategoryContext } from "@/Context/categoryContext";
import type { Category } from "@/Services/CategoryService";
import { useBlogStore } from "@/store/useBlogStore";

type Props = {};

export default function HomePage({}: Props) {
  // Contexts
  const { isLoggedIn } = userAuth();
  const user = useContext(UserContext);
  const categories: Category[] = useContext(CategoryContext);

  // State
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [ready, setReady] = useState(false);

  // Refs
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Infinite scroll effect
  // useEffect(() => {
  //   if (!loadMoreRef.current) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (
  //         entry.isIntersecting
  //       ) {
  //         setLoading(true);
  //         getAllBlogs(currentPage + 1)
  //           .then((res) => {
  //             const { data, meta } = res;
  //             useBlogStore.getState().appendBlogs(data);
  //             setCurrentPage(meta.current_page);
  //             setLastPage(meta.last_page);
  //           })
  //           .finally(() => setLoading(false));
  //       }
  //     },
  //     {
  //       root: null,
  //       rootMargin: "10px",
  //       threshold: 0.1,
  //     }
  //   );

  //   observer.observe(loadMoreRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");

    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
      sessionStorage.removeItem("scrollY"); // Obavezno obriši da se ne ponavlja
    }

    setReady(true);
  }, [])

  if(!ready) return null;

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
            <BlogsPage/>
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
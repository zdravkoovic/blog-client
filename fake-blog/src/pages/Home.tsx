import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Context/userContext";
import type { Category } from "@/services/CategoryService";
import LoginBtn from "@/features/auth/components/LoginBtn";
import BlogsPage from "@/features/blog/pages/Blogs";
import { userAuth } from "@/context/userAuth";
import { CategoryContext } from "@/context/categoryContext";
import Categories from "@/features/categories/components/Categories";

type Props = {};

export default function HomePage({}: Props) {
  // Contexts
  const { isLoggedIn } = userAuth();
  const user = useContext(UserContext);
  const categories: Category[] = useContext(CategoryContext);

  // State
  const [ready, setReady] = useState(false);

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
            <Categories/>
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
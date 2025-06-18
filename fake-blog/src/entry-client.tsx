import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { Blog } from "./Services/BlogService";
import { BlogContext } from "./Context/blogContext";
import { routeDefinitions } from "./Routes/Routes";
import { UserContext } from "./Context/userContext";
import type { User } from "./Models/User";
import { CategoryContext } from "./Context/categoryContext";
import type { Category } from "./Services/CategoryService";

const initialBlogs = (window as any).__INITIAL_BLOGS__ as Blog[] || [];
const initialCategories = (window as any).__CATEGORIES__ as Category[] || [];
const user = (window as any).__USER__ as User || null;

// console.group('🕵️ pre-hydration HTML')
// console.log(document.getElementById('root')!.innerHTML)
// console.groupEnd()

const browserRouter = createBrowserRouter(routeDefinitions);

ReactDOM.hydrateRoot(
    document.getElementById('root')!,
    <UserContext.Provider value={user}>
        <CategoryContext.Provider value={initialCategories}>
        <BlogContext.Provider value={initialBlogs}>
          <RouterProvider router={browserRouter} />
        </BlogContext.Provider>
        </CategoryContext.Provider>
      </UserContext.Provider>
)

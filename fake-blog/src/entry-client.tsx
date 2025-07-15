import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { Blog } from "./Services/BlogService";
import { routeDefinitions } from "./routes/Routes";
import { UserContext } from "./Context/userContext";
import type { User } from "./Models/User";
import { CategoryContext } from "./context/categoryContext";
import type { Category } from "./services/CategoryService";
import ZustandInitializer from "./store/ZustandInitializer";

const initialBlogs = (window as any).__INITIAL_BLOGS__ as Blog[] || [];
const initialCategories = (window as any).__CATEGORIES__ as Category[] || [];
const user = (window as any).__USER__ as User || null;

const browserRouter = createBrowserRouter(routeDefinitions);

ReactDOM.hydrateRoot(
    document.getElementById('root')!,
    <UserContext.Provider value={user}>
        <CategoryContext.Provider value={initialCategories}>
        <ZustandInitializer blogs={initialBlogs}>
          <RouterProvider router={browserRouter} />
        </ZustandInitializer>
        </CategoryContext.Provider>
      </UserContext.Provider>
)

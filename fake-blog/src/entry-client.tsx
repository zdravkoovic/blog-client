import * as ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter, renderMatches, RouterProvider } from "react-router-dom";
import type { Blog } from "./Services/BlogService";
import { BlogContext } from "./Context/blogContext";
import { routeDefinitions } from "./Routes/Routes";

const initialBlogs = (window as any).__INITIAL_BLOGS__ as Blog[] || []

// console.group('🕵️ pre-hydration HTML')
// console.log(document.getElementById('root')!.innerHTML)
// console.groupEnd()

const browserRouter = createBrowserRouter(routeDefinitions);

ReactDOM.hydrateRoot(
    document.getElementById('root')!,
      <BlogContext.Provider value={initialBlogs}>
        <RouterProvider router={browserRouter} />
      </BlogContext.Provider>
)

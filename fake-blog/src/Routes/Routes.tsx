import HomePage from "@/pages/Home";
import App from "../App";
import LoginPage from "@/features/auth/pages/Login";
import RegisterPage from "@/features/auth/pages/Register";
import BlogPage from "@/features/blog/pages/BlogDetailes";
import Page404 from "@/pages/404";

export const routeDefinitions = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: ':slug', element: <BlogPage /> },
      { path: '*', element: <Page404 /> },
    ],
  },
]
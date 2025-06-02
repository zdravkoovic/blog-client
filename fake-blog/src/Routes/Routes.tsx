import App from "../App";
import LoginPage from "../Page/Login";
import RegisterPage from "../Page/Register";
import Page404 from "../Page/404";
import HomePage from "../Page/Home";
import BlogPage from "../Page/Blog";

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
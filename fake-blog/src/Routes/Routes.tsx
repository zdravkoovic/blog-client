import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Page/Login";
import RegisterPage from "../Page/Register";
import Page404 from "../Page/404";
import HomePage from "../Page/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path:"", element: <HomePage />},
            {path:"login", element: <LoginPage />},
            {path:"register", element: <RegisterPage />},
            {path:"*", element: <Page404 />}
        ],
    }
])
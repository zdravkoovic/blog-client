import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Page/Home";
import LoginPage from "../Page/Login";
import RegisterPage from "../Page/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path:"", element: <HomePage />},
            {path:"login", element: <LoginPage />},
            {path:"register", element: <RegisterPage />}
        ],
    }
])
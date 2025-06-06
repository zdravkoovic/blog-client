import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "../components/axios";
import type { User } from "../Models/User";

type UserContextType = {
    user: User | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children}: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if(user && token){
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        username: string, 
        email: string, 
        password: string
    ) => {
        await registerAPI(username, email, password).then((res) => {
            if(res) {
                localStorage.setItem("token", res?.data.data.token);
                const userObj = {
                    id: res?.data.data.user.id,
                    name: res?.data.data.user.name,
                    email: res?.data.data.user.email,
                    avatar_url: res?.data.data.user.avatar_url
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.data.token);
                setUser(userObj);
                toast.success("Register success!");
                navigate("/");
            }
        }).catch((e) => toast.warning("Server error occured!")); 
    };

    const loginUser = async (
        username: string, 
        password: string
    ) => {
        await loginAPI(username, password)
            .then((res) => {
                if(res) {
                    localStorage.setItem("token", res?.data.data.token);
                    const userObj = {
                        id: res?.data.data.user.id,
                        name: res?.data.data.user.name,
                        email: res?.data.data.user.email,
                        avatar_url: res?.data.data.user.avatar_url
                    }
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.data.token);
                    setUser(userObj);
                    toast.success("Login success!");
                    navigate("/");
                }
        }).catch((e) => toast.warning("Server error occured!")); 
    };

    const isLoggedIn = () => {
        return !!user;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        navigate("/login");
    };

    return (
        <UserContext.Provider value={{loginUser, user, token, logout, isLoggedIn, registerUser }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const userAuth = () => React.useContext(UserContext);
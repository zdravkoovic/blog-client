import * as Yup from "yup";
import { userAuth } from '../Context/userAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosSSR from "../components/auth/axiosSSR";
import Spinner from "./common/Spinner";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {}

type LoginFormsInputs = {
    email: string;
    password: string;
};

const validation = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required!")
});

export default function LoginPage({}: Props) {
    
    // const {loginUser} = userAuth();
    const [loginClicked, setLoginClicked] = useState(false);

    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm<LoginFormsInputs>({resolver: yupResolver(validation)});

    const handleLogin = async (form: LoginFormsInputs)=> {
        // loginUser(form.email, form.password);
        setLoginClicked(true);
        const message = await axiosSSR.post('/login', {
            email: form.email,
            password: form.password
        }, {
            withCredentials: true
        });
        if(message.status === 200){
            console.log(message.data);
            window.location.href = '/';
        }
    }

    return (
    <section className="h-screen bg-gray-50 dark:bg-gray-900">    
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="dark:text-gray-400 sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=600"
                className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(handleLogin)} method="POST" className="space-y-6">
                <div className="flex items-center mb-2">
                <label htmlFor="text" className="dark:text-gray-400 flex text-sm/6 font-medium text-gray-900">
                    Email address
                </label>
                </div>
                <div>
                <div>
                    <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md  px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                "
                    {...register("email")}
                    />
                    {errors.email ? <p>{errors.email.message}</p> : ""}
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="dark:text-gray-400 block text-sm/6 font-medium text-gray-900">
                    Password
                    </label>
                    <div className="dark:text-gray-300 text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </a>
                </div>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    "
                    {...register("password")}
                    />
                    {errors.password ? <p>{errors.password.message}</p> : ""}
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="loginBtnLoader flex  w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded shadow-md"
                >
                    <span>Sign in</span>
                    {loginClicked && (
                        <div className="ml-6">
                            <Spinner />
                        </div>
                    )}
                </button>
                </div>
            </form>

            <div className="mt-3 text-center text-sm/6 text-gray-500">
                Not a member?{' '}
                <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign Up
                </Link>
            </div>
            </div>
        </div>
    </section>

    );
}
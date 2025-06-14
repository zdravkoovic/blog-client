import * as Yup from "yup";
import { userAuth } from '../Context/userAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router-dom";

type Props = {}

type RegisterFormsInputs = {
    username: string;
    email: string;
    password: string;
};

const validation = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required!"),
    password: Yup.string().required("Password is required!")
});

export default function RegisterPage({}: Props) {
    
    const {loginUser} = userAuth();
    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm<RegisterFormsInputs>({resolver: yupResolver(validation)});

    const handleLogin = (form: RegisterFormsInputs)=> {
        loginUser(form.username, form.password);
    }

    return (
    <section className="h-screen bg-gray-50 dark:bg-gray-900">    
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="dark:text-gray-400 sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=600"
                className="mx-auto h-10 w-auto mb-1.5"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Welcome! Sign Up
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
                <div className="flex items-center mb-2">
                <label htmlFor="text" className="dark:text-gray-400 flex text-sm/6 font-medium text-gray-900">
                    Username
                </label>
                </div>
                <div>
                <div className="mt-2">
                    <input
                    id="username"
                    type="text"
                    required
                    className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    "
                    {...register("username")}
                    />
                    {errors.username ? <p>{errors.username.message}</p> : ""}
                </div>
                </div>

                <div className="flex items-center mb-2">
                <label htmlFor="email" className="dark:text-gray-400 flex text-sm/6 font-medium text-gray-900">
                    Email
                </label>
                </div>
                <div>
                <div className="mt-2">
                    <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
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
                    Sign Up
                </button>
                </div>
            </form>

            <div className="mt-3 text-center text-sm/6 text-gray-500">
                You are alredy a member?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign In
                </Link>
            </div>
            </div>
        </div>
    </section>

    );
}
import Spinner from "./Spinner";

type Props = {
    spinner?: boolean;
};

export default function SearchButton({ spinner }: Props) {
    return (
        <button
            type="submit"
            className="relative min-w-[3rem] h-10 rounded-3xl text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center  overflow-hidden"
        >
            {/* Spinner */}
            <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    spinner ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <span className="flex items-center justify-center h-5 w-5">
                    <Spinner />
                </span>
            </span>

            {/* Search Icon */}
            <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    spinner ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </span>
        </button>
    );
}
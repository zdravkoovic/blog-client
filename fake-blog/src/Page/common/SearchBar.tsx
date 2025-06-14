import { useEffect, useState } from "react";
import axios from "../../components/axios";
import Spinner from "./Spinner";

type Props = {}

const SearchBar = (props: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [spinner, setSpinner] = useState(true);
  const [query, setQuery] = useState("");
  const [recommends, setRecommends] = useState([]);
  const [showRecommends, setShowRecommends] = useState(false);

  const handleInputChenge = async (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    // setShowRecommends(true);
    if(value.length < 4) {
      setRecommends([]);
      // setShowRecommends(false);
      return;
    }

    try {
      setSpinner(true);
      setShowRecommends(true);
      const response = await axios.get('/api/v1/manticore/autocomplete/' + query);
      setSpinner(false);
      const data = response.data.data;

      setRecommends(data);
    } catch (error) {
      console.error('Autocomplete error: ', error);
      setRecommends([]);
    }
  }

  const handleResultClick = (title: string) => {
    setQuery(title);
    setRecommends([]);
    setShowRecommends(false);
  }

  return (
    <div className="dark:bg-[#0a0f2c]">
        <form className="dark:bg-[#0a0f2c] max-w-lg mx-auto">
          <div className="flex">
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                id="dropdown-button" data-dropdown-toggle="dropdown" className="shrink-0 z-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                All categories
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              {showDropdown &&
                <div id="dropdown" className="absolute mt-5 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                  <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                  </li>
                  <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                  </li>
                  <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                  </li>
                  <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                  </li>
                  </ul>
                </div>
              }
                <div className="relative w-full flex">
                  <div>
                    <input 
                      onChange={handleInputChenge}
                      type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search by title" required />
                    
                    {showRecommends  && (
                      <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
                        {spinner && <Spinner />}
                        {recommends.map((title, index) => (
                          <li
                            key={index}
                            onClick={() => handleResultClick(title)}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          >
                            {title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                    <button type="submit" className="relative p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        {/* <span className="sr-only">Search</span> */}
                    </button>
                </div>
            </div>
        </form>
      </div>
  )
}

export default SearchBar
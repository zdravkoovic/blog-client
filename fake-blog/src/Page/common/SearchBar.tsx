import { useRef, useState, useEffect, useContext } from "react";
import Spinner from "./Spinner";
import { searchBlogs } from "@/Services/BlogService";
import SearchButton from "./SearchButton";
import { SearchResultsContext } from "@/Context/searchResultsContext";
import { autocomplete } from "@/Services/ManticoreService";

type Props = {};

const SearchBar = ({}: Props) => {  
  const [spinner, setSpinner] = useState(true);
  const [spinnerForSearching, setSpinnerForSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [recommendsUsers, setRecommendsUsers] = useState<string[]>();
  const [recommendsBlogs, setRecommendsBlogs] = useState<string[]>();
  const [showRecommends, setShowRecommends] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { setResults, setSearchLoading } = useContext(SearchResultsContext);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);

  const recommendsRef = useRef<HTMLUListElement>(null);

  const handleInputChenge = async (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if(debounceTimeout.current) clearTimeout(debounceTimeout.current);

    if(value.length < 4) {
      setRecommendsUsers([]);
      setRecommendsBlogs([]);
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        setSpinner(true);
        setShowRecommends(true);
        const response = await autocomplete(value);
        setSpinner(false);
        const data = response;
        console.log('Autocomplete results:', data);
        // setRecommends(data);
      } catch (error) {
        console.error('Autocomplete error: ', error);
        setRecommendsUsers([]);
        setRecommendsBlogs([]);
      }
    }, 800);
  }

  const handleResultClick = (title: string) => {
    setQuery(title);
    setRecommendsUsers([]);
    setRecommendsBlogs([]);
    setShowRecommends(false);
    setSelectedIndex(-1);
  }

  const submitSearch = async (e: any) => {
          e.preventDefault();
          try {
            setSpinnerForSearching(true);
            setSearchLoading(true);
            if(query === '') {
              setResults([]);
              setSpinnerForSearching(false);
              setSearchLoading(false);
              return;
            }
            const response = await searchBlogs(query);
            setSearchLoading(false);
            setResults(response);
            setSpinnerForSearching(false);
          } catch (error) {
            setSpinner(false);
            console.error('Search error:', error);
          }
        }

  // Scroll into view when selectedIndex changes
  useEffect(() => {
    if (selectedIndex >= 0 && listRefs.current[selectedIndex]) {
      listRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showRecommends || recommendsUsers?.length === 0) return;

    // if (e.key === "ArrowDown") {
    //   e.preventDefault();
    //   setSelectedIndex((prev) => (prev < recommends.length - 1 ? prev + 1 : 0));
    // } else if (e.key === "ArrowUp") {
    //   e.preventDefault();
    //   setSelectedIndex((prev) => (prev > 0 ? prev - 1 : recommends.length - 1));
    // } else if (e.key === "Enter") {
    //   if (selectedIndex >= 0 && selectedIndex < recommends.length) {
    //     e.preventDefault();
    //     handleResultClick(recommends[selectedIndex]);
    //   }
    // } else if (e.key === "Escape") {
    //   setShowRecommends(false);
    // }
  };

  useEffect(() => {
  if (!showRecommends) return;
  if (spinnerForSearching) setShowRecommends(false);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      recommendsRef.current &&
      !recommendsRef.current.contains(event.target as Node)
    ) {
      setShowRecommends(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [showRecommends, spinnerForSearching]);

  return (
    <div className="dark:bg-[#0a0f2c] z-10">
      <form
        className="dark:bg-[#0a0f2c] max-w-lg mx-auto"
        onSubmit={submitSearch}
      >
        <div className="flex z-10 relative">
          <div className="relative w-full flex">
            <input
              onChange={handleInputChenge}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              value={query}
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-96 h-10 z-10 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search by title"
            />

            {showRecommends && query.length > 2 && (
              <>
                {/* Overlay for closing dropdown */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowRecommends(false)}
                  tabIndex={-1}
                  aria-hidden="true"
                />
                {/* Dropdown container with arrow */}
                <div className="absolute left-0 right-0 z-20 mt-1 w-full flex flex-col items-stretch" style={{ top: "100%" }}>
                  {/* Arrow */}
                  <div className="flex justify-start pl-6">
                    <div
                      className="w-4 h-4 bg-gray-50 dark:bg-gray-700 border-l border-t border-gray-300 dark:border-gray-600 rotate-45 -mb-2"
                      style={{
                        boxShadow: "0px -2px 6px rgba(0,0,0,0.04)",
                      }}
                    />
                  </div>
                  {/* Dropdown list */}
                  <ul
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl shadow-xl max-h-60 overflow-auto transition-all duration-200"
                    ref={recommendsRef}
                  >
                    {spinner && (
                      <div className="flex items-center dark:bg-gray-700 justify-center p-4">
                        <Spinner />
                      </div>
                    )}

                    <span>People</span>
                    {recommendsUsers?.map((name, index) => (
                      <li
                        key={index}
                        onClick={() => handleResultClick(name)}
                        className={`px-4 py-2 text-black dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition-colors duration-150 ${
                          index === selectedIndex
                            ? "bg-blue-100 dark:bg-blue-900"
                            : ""
                        } first:rounded-t-xl last:rounded-b-xl`}
                        ref={el => { listRefs.current[index] = el; }}
                      >
                        {name}
                      </li>
                    ))}

                    <span>Topics</span>
                    {recommendsBlogs?.map((title, index) => (
                      <li
                        key={index}
                        onClick={() => handleResultClick(title)}
                        className={`px-4 py-2 text-black dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition-colors duration-150 ${
                          index === selectedIndex
                            ? "bg-blue-100 dark:bg-blue-900"
                            : ""
                        } first:rounded-t-xl last:rounded-b-xl`}
                        ref={el => { listRefs.current[index] = el; }}
                      >
                        {title}
                      </li>
                    ))}

                  </ul>
                </div>
              </>
            )}

            <SearchButton spinner={spinnerForSearching}/>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
import { useRef, useState, useEffect, useContext } from "react";
import axios from "../../components/axios";
import Spinner from "./Spinner";
import { searchBlogs, type Blog } from "@/Services/BlogService";
import SearchButton from "./SearchButton";
import { SearchResultsContext } from "@/Context/searchResultsContext";

type Props = {};

const SearchBar = ({}: Props) => {  
  const [spinner, setSpinner] = useState(true);
  const [spinnerForSearching, setSpinnerForSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [recommends, setRecommends] = useState<string[]>([]);
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
      setRecommends([]);
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        setSpinner(true);
        setShowRecommends(true);
        const response = await axios.get('/api/v1/manticore/autocomplete/' + value);
        setSpinner(false);
        const data = response.data.data;
        setRecommends(data);
      } catch (error) {
        console.error('Autocomplete error: ', error);
        setRecommends([]);
      }
    }, 800);
  }

  const handleResultClick = (title: string) => {
    setQuery(title);
    setRecommends([]);
    setShowRecommends(false);
    setSelectedIndex(-1);
  }

  // Scroll into view when selectedIndex changes
  useEffect(() => {
    if (selectedIndex >= 0 && listRefs.current[selectedIndex]) {
      listRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showRecommends || recommends.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < recommends.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : recommends.length - 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < recommends.length) {
        e.preventDefault();
        handleResultClick(recommends[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowRecommends(false);
    }
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
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setSpinnerForSearching(true);
            setSearchLoading(true);
            const response = await searchBlogs(query);
            setSearchLoading(false);
            setResults(response);
            console.log('Search results:', response);
            setSpinnerForSearching(false);
          } catch (error) {
            setSpinner(false);
            console.error('Search error:', error);
          }
        }}
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
              required
            />

            {showRecommends && query.length > 3 && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowRecommends(false)}
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <ul
                  className="absolute left-0 right-0 z-20 mt-0.5 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                  ref={recommendsRef}
                  style={{ top: "100%" }}
                >
                  {spinner && (
                    <div className="flex items-center justify-center p-4">
                      <Spinner />
                    </div>
                  )}
                  {recommends.map((title, index) => (
                    <li
                      key={index}
                      onClick={() => handleResultClick(title)}
                      className={`px-4 py-2 text-black hover:bg-blue-100 cursor-pointer ${
                        index === selectedIndex ? "bg-blue-100" : ""
                      }`}
                      ref={el => { listRefs.current[index] = el; }}
                    >
                      {title}
                    </li>
                  ))}
                </ul>
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
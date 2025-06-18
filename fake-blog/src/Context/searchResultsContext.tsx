import type { Blog } from "@/Services/BlogService";
import { createContext, useState } from "react";

export const SearchResultsContext = createContext<{
  results: Blog[];
  setResults: (blogs: Blog[]) => void;
  searchLoading: boolean;
  setSearchLoading: (loading: boolean) => void;
}>({
  results: [],
  setResults: () => {},
  searchLoading: false,
  setSearchLoading: () => {},
});

export function SearchResultsProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<Blog[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  return (
    <SearchResultsContext.Provider value={{ results, setResults, searchLoading, setSearchLoading }}>
      {children}
    </SearchResultsContext.Provider>
  );
}
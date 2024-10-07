"use client";

import { search, SearchResult } from "@/data/search";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const SearchContext = createContext<SearchResult | null>(null);

type SearchProviderProps = {
  children: ReactNode;
};

export default function SearchProvider(props: SearchProviderProps) {
  const searchParams = useSearchParams();
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    setSearchResult(null);
    search(Object.fromEntries(searchParams)).then(setSearchResult);
  }, [searchParams]);

  return (
    <SearchContext.Provider value={searchResult}>
      {props.children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);

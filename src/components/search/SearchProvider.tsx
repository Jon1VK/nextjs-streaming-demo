"use client";

import { SearchResult } from "@/data/search";
import { Context, createContext, ReactNode, useContext } from "react";

const SearchContext = createContext<Promise<SearchResult> | null>(
  null
) as Context<Promise<SearchResult>>;

type SearchProviderProps = {
  children: ReactNode;
  searchResultPromise: Promise<SearchResult>;
};

export default function SearchProvider(props: SearchProviderProps) {
  return (
    <SearchContext.Provider value={props.searchResultPromise}>
      {props.children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);

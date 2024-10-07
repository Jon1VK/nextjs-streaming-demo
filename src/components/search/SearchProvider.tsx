"use client";

import { SearchResult } from "@/data/search";
import { Context, createContext, ReactNode, useContext } from "react";

const SearchContext = createContext<SearchResult | null>(
  null
) as Context<SearchResult>;

type SearchProviderProps = {
  children: ReactNode;
  searchResult: SearchResult;
};

export default function SearchProvider(props: SearchProviderProps) {
  return (
    <SearchContext.Provider value={props.searchResult}>
      {props.children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);

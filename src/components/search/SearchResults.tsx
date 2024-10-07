"use client";

import { useURLSearchParamsState } from "@/hooks/useURLSearchParamsState";
import { searchSchema } from "@/schemas/searchSchema";
import { useMemo } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import PageMenu from "../common/PageMenu";
import ShoeCard from "../common/ShoeCard";
import { useSearchContext } from "./SearchProvider";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useURLSearchParamsState(searchSchema);
  const searchResult = useSearchContext();

  const pageCount = useMemo(
    () => Math.ceil((searchResult?.total ?? 0) / searchParams.limit),
    [searchParams.limit, searchResult?.total]
  );

  return (
    <>
      {searchResult?.shoes ? (
        <ul className="grid lg:grid-cols-3 gap-8">
          {searchResult.shoes.map((shoe) => (
            <li key={shoe.id} className="grid items-stretch">
              <ShoeCard shoe={shoe} />
            </li>
          ))}
        </ul>
      ) : (
        <LoadingSpinner className="w-16 h-16 mx-auto" />
      )}
      <PageMenu
        pageCount={pageCount}
        currentPage={searchParams.page}
        onClick={(page) => {
          setSearchParams({ page });
        }}
      />
    </>
  );
}

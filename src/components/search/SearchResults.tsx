"use client";

import { useURLSearchParamsState } from "@/hooks/useURLSearchParamsState";
import { searchSchema } from "@/schemas/searchSchema";
import { use, useMemo } from "react";
import PageMenu from "../common/PageMenu";
import ShoeCard from "../common/ShoeCard";
import { useSearchContext } from "./SearchProvider";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useURLSearchParamsState(searchSchema);
  const searchResultPromise = useSearchContext();

  const searchResult = use(searchResultPromise);

  const pageCount = useMemo(
    () => Math.ceil(searchResult.total / searchParams.limit),
    [searchParams.limit, searchResult.total]
  );

  return (
    <>
      <ul className="grid lg:grid-cols-3 gap-8">
        {searchResult.shoes.map((shoe) => (
          <li key={shoe.id} className="grid items-stretch">
            <ShoeCard shoe={shoe} />
          </li>
        ))}
      </ul>
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

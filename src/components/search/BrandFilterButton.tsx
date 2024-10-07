"use client";

import { useURLSearchParamsState } from "@/hooks/useURLSearchParamsState";
import { searchSchema, ShoeBrand } from "@/schemas/searchSchema";
import { Suspense, use } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { Button } from "../ui/button";
import { useSearchContext } from "./SearchProvider";

type BrandFilterButtonProps = {
  brand: "ALL" | ShoeBrand;
};

export default function BrandFilterButton({ brand }: BrandFilterButtonProps) {
  const [searchParams, setSearchParams] = useURLSearchParamsState(searchSchema);

  return (
    <Button
      onClick={() => setSearchParams({ page: 1, brand })}
      aria-current={searchParams.brand === brand ? "true" : undefined}
      variant={searchParams.brand === brand ? "default" : "outline"}
      className="flex gap-1"
    >
      {brand}
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<LoadingSpinner />}
      >
        <BrandTotal brand={brand} />
      </Suspense>
    </Button>
  );
}

type BrandTotalProps = {
  brand: "ALL" | ShoeBrand;
};

const BrandTotal = ({ brand }: BrandTotalProps) => {
  const searchResultPromise = useSearchContext();
  const searchResult = use(searchResultPromise);
  const total = searchResult.totals[brand];
  return <span>({total})</span>;
};

import LoadingSpinner from "@/components/common/LoadingSpinner";
import BrandFilter from "@/components/search/BrandFilter";
import SearchForm from "@/components/search/SearchForm";
import SearchProvider from "@/components/search/SearchProvider";
import SearchResults from "@/components/search/SearchResults";
import { search } from "@/data/search";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home({ searchParams }: { searchParams: unknown }) {
  const searchResultPromise = search(searchParams);

  return (
    <SearchProvider searchResultPromise={searchResultPromise}>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Running Shoes Search
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Search for the available running shoes in the online store. You can
        filter the search results by the shoe brand.
      </p>
      <SearchForm />
      <BrandFilter />
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Search Results
      </h2>
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<LoadingSpinner className="w-16 h-16 mx-auto" />}
      >
        <SearchResults />
      </Suspense>
    </SearchProvider>
  );
}

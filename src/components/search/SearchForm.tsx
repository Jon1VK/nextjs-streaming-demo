"use client";

import { useURLSearchParamsState } from "@/hooks/useURLSearchParamsState";
import { searchSchema } from "@/schemas/searchSchema";
import { FormEventHandler, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchForm(props: HTMLAttributes<HTMLFormElement>) {
  const [searchParams, setSearchParams] = useURLSearchParamsState(searchSchema);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newParams = searchSchema.parse(
      Object.fromEntries(new FormData(e.currentTarget))
    );
    setSearchParams({ query: newParams.query }, { reset: true });
  };

  return (
    <form {...props} onSubmit={onSubmit}>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          name="query"
          defaultValue={searchParams.query}
          placeholder="Search phrase"
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}

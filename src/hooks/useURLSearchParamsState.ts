"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useURLSearchParamsState = <T extends z.ZodType<object, any, any>>(
  schema: T
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parseResult = useMemo(
    () => schema.parse(Object.fromEntries(searchParams)) as z.infer<T>,
    [searchParams, schema]
  );

  const updateURLSearchParams = useCallback(
    (
      newParams: Partial<z.infer<T>>,
      opts?: { replace?: boolean; allowEmpty?: boolean; reset?: boolean }
    ) => {
      const url = new URL(
        opts?.reset ? window.location.href.split("?")[0]! : window.location.href
      );
      Object.entries(newParams).forEach(([k, v]) => {
        if (v == null || (!opts?.allowEmpty && v.toString() === "")) {
          url.searchParams.delete(k);
        } else {
          url.searchParams.set(k, v.toString());
        }
      });
      if (opts?.replace) {
        router.replace(url.toString());
      } else {
        router.push(url.toString());
      }
    },
    [router]
  );

  return [parseResult, updateURLSearchParams] as const;
};

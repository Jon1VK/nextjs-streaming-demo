"use client";

import { Fragment, type MouseEvent } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type PageMenuProps = {
  pageCount: number;
  currentPage: number;
  onClick: (pageNumber: number) => void;
};

export default function PageMenu(props: PageMenuProps) {
  if (props.pageCount < 2) return null;

  const pageNumbers = getPageNumbers(props.pageCount, props.currentPage);

  const createPageChangeHandler =
    (pageNumber: number) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (pageNumber > 0 && pageNumber <= props.pageCount) {
        props.onClick(pageNumber);
      }
    };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={props.currentPage === 1 ? "true" : undefined}
            onClick={createPageChangeHandler(props.currentPage - 1)}
          />
        </PaginationItem>
        {pageNumbers.map((page, i) => (
          <Fragment key={page}>
            {i > 0 && pageNumbers[i - 1] !== page - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                isActive={page === props.currentPage}
                onClick={createPageChangeHandler(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          </Fragment>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={
              props.currentPage === props.pageCount ? "true" : undefined
            }
            onClick={createPageChangeHandler(props.currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

const getPageNumbers = (pageCount: number, currentPage: number) => {
  if (pageCount < 6) {
    return Array(pageCount)
      .fill(undefined)
      .map((_, i) => i + 1);
  }
  const pageSet = new Set([
    1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    pageCount,
  ]);
  return [...pageSet.values()]
    .filter((page) => 1 <= page && page <= pageCount)
    .sort((a, b) => a - b);
};

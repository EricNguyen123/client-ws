import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination"
import ItemPagination from "./ItemPagination";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BasePaginationProps = {
  pages: number;
  chagneData: (i: number) => void;
  currentPage?: number;
}

export function BasePagination({ pages, chagneData, currentPage = 1 }: BasePaginationProps) {
  const [page, setPage] = useState<number>(currentPage);
  let hasShownLowerEllipsis = false;
  let hasShownUpperEllipsis = false;
  
  const calculateThresholds = (current: number) => {
    const low = Math.max(current - 2, 1);
    const up = Math.min(current + 2, pages);
    return { lower: low, upper: up };
  };

  const [thresholds, setThresholds] = useState<{ lower: number; upper: number }>(
    calculateThresholds(currentPage)
  );

  const handleChangePage = (page: number) => {
    setPage(page);
    chagneData(page);
    setThresholds(calculateThresholds(currentPage));
  }

  useEffect(() => {
    setPage(currentPage);
    setThresholds(calculateThresholds(currentPage));
  }, [currentPage, pages]);

  return (
    <Pagination className="p-2">
      <PaginationContent>
        <ItemPagination index={currentPage - 1 === 0 ? pages : currentPage - 1} onClick={handleChangePage}>
          <ChevronLeft />
        </ItemPagination>
        {Array.from({ length: pages }, (_, index) => {
          const pageIndex = index + 1;

          if (pageIndex < thresholds.lower && pageIndex > 1) {
            if (!hasShownLowerEllipsis) {
              hasShownLowerEllipsis = true;
              return (
                <PaginationItem key={`ellipsis-lower`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          }
        
          if (pageIndex > thresholds.upper && pageIndex < pages) {
            if (!hasShownUpperEllipsis) {
              hasShownUpperEllipsis = true;
              return (
                <PaginationItem key={`ellipsis-upper`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          }        

          if (
            pageIndex === 1 ||
            pageIndex === pages ||
            (pageIndex >= thresholds.lower && pageIndex <= thresholds.upper)
          ) {
            return (
              <ItemPagination
                key={pageIndex}
                index={pageIndex}
                onClick={handleChangePage}
                active={page === pageIndex}
              />
            );
          }

          return null;
        })}

        <ItemPagination index={currentPage + 1 > pages ? 1 : currentPage + 1} onClick={handleChangePage}>
          <ChevronRight />
        </ItemPagination>
      </PaginationContent>
    </Pagination>
  )
}

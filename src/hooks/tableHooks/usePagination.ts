import { useState, useMemo, useEffect } from "react";

type UsePaginationOptions = {
  serverSide?: boolean;
  onPageChange?: (page: number, rowsPerPage: number) => void;
  page?: number;
  rowsPerPage?: number;
};

export const usePagination = <T>(
  data: T[],
  rowsPerPageOptions: number[],
  options: UsePaginationOptions = {}
) => {
  const { serverSide = false, onPageChange, page: controlledPage, rowsPerPage: controlledRowsPerPage } = options;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // Use controlled values in serverSide mode
  const actualPage = serverSide && typeof controlledPage === "number" ? controlledPage : page;
  const actualRowsPerPage = serverSide && typeof controlledRowsPerPage === "number" ? controlledRowsPerPage : rowsPerPage;

  useEffect(() => {
    if (serverSide && onPageChange) {
      onPageChange(actualPage, actualRowsPerPage);
    }
  }, [actualPage, actualRowsPerPage, serverSide, onPageChange]);

  const paginatedData = useMemo(() => {
    if (serverSide) return data;
    return data.slice(actualPage * actualRowsPerPage, actualPage * actualRowsPerPage + actualRowsPerPage);
  }, [data, actualPage, actualRowsPerPage, serverSide]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return { paginatedData, handleChangePage, handleChangeRowsPerPage, rowsPerPage: actualRowsPerPage, page: actualPage };
};
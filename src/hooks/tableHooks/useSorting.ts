
import type { Column } from "@/types/components/Table/TableProps";
import { useState, useMemo } from "react";

export const useSorting = <T>(data: T[], columns: Column<T>[]) => {
    const [orderBy, setOrderBy] = useState<keyof T | null>(columns[0]?.id as keyof T || null);
    const [orderDirection, setOrderDirection] = useState<"asc" | "desc" | null>(null);
  
    const handleSort = (columnId: keyof T) => {
      const isAsc = orderBy === columnId && orderDirection === "asc";
      setOrderDirection(isAsc ? "desc" : "asc");
      setOrderBy(columnId);
      
      // console.log("Sorting triggered for column:", columnId, "Direction:", isAsc ? "desc" : "asc");
  };
  
  const sortedData = useMemo(() => {
      if (!orderBy || !orderDirection) return data;
  
      // console.log("Sorting with orderBy:", orderBy, "orderDirection:", orderDirection);
      return [...data].sort((a, b) => {
          const valueA = a[orderBy];
          const valueB = b[orderBy];
  
          if (valueA < valueB) return orderDirection === "asc" ? -1 : 1;
          if (valueA > valueB) return orderDirection === "asc" ? 1 : -1;
          return 0;
      });
  }, [data, orderBy, orderDirection]);
  
  
    return { sortedData, handleSort, orderBy, orderDirection };
  };
  
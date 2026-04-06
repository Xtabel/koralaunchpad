// src/hooks/tableHooks/useTableSearch.ts
import { useState, useMemo } from "react";

export const useTableSearch = <T>(
  data: T[],
  initialSearchTerm = "",
  searchKeys?: (keyof T)[],
  serverSide = false,
  onServerSearch?: (searchTerm: string) => void
) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    
    if (serverSide && onServerSearch) {
      onServerSearch(newSearchTerm);
    }
  };

  // Filtered data for client-side search
  const filteredData = useMemo(() => {
    if (serverSide || !searchTerm || !searchKeys || searchKeys.length === 0) {
      return data;
    }
    
    // Split the search term into tokens/words and filter out empty strings
    const searchTokens = searchTerm
      .toLowerCase()
      .split(/\s+/)
      .filter(token => token.length > 0);
    
    if (searchTokens.length === 0) return data;
    
    return data.filter((item) => {
      // For each item, check if ALL search tokens are found in ANY of the searchable fields
      return searchTokens.every(token => {
        return searchKeys.some(key => {
          const value = item[key];
          if (value === null || value === undefined) return false;
          
          return String(value)
            .toLowerCase()
            .includes(token);
        });
      });
    });
  }, [data, searchTerm, searchKeys, serverSide]);

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    filteredData: serverSide ? data : filteredData,
  };
};
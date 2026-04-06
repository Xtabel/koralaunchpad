import { useState, useMemo } from 'react';

type FilterValue = string | number | string[] | number[] | Date | null | undefined;
type Filters = Record<string, FilterValue>;

interface UseTableFiltersOptions {
  /**
   * List of filter keys to check for active state
   * If not provided, checks all filter values
   */
  activeFilterKeys?: string[];
  
  /**
   * Custom function to determine if filters are active
   */
  isActiveCheck?: (filters: Filters) => boolean;
}

export const useTableFilters = <T extends Filters>(
  initialFilters: T = {} as T,
  options: UseTableFiltersOptions = {}
) => {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { activeFilterKeys, isActiveCheck } = options;

  // Determine if any filters are active
  const isFilterActive = useMemo(() => {
    if (isActiveCheck) {
      return isActiveCheck(filters);
    }

    const keysToCheck = activeFilterKeys || Object.keys(filters);
    
    return keysToCheck.some((key) => {
      const value = filters[key];
      
      // Check for active values
      if (value instanceof Date) return true;
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== "" && value !== undefined;
    });
  }, [filters, activeFilterKeys, isActiveCheck]);

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      const value = filters[key];
      if (Array.isArray(value)) {
        acc[key] = [] as FilterValue;
      } else if (value instanceof Date) {
        acc[key] = null;
      } else {
        acc[key] = "";
      }
      return acc;
    }, {} as Record<string, FilterValue>);

    setFilters(clearedFilters as T);
  };

  return {
    filters,
    setFilters,
    isFilterActive,
    clearFilters,
    filterAnchorEl,
    setFilterAnchorEl,
  };
};
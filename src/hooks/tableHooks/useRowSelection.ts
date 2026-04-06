import { useState, useCallback } from 'react';

export interface UseRowSelectionOptions<T> {
  /** Function to get unique ID from row data */
  getRowId: (row: T) => string | number;
  /** Initial selected rows */
  initialSelected?: (string | number)[];
  /** Callback when selection changes */
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
}

export const useRowSelection = <T>(
  data: T[],
  options: UseRowSelectionOptions<T>
) => {
  const { getRowId, initialSelected = [], onSelectionChange } = options;
  const [selected, setSelected] = useState<(string | number)[]>(initialSelected);

  const handleSelectAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSelected = event.target.checked 
        ? data.map(row => getRowId(row))
        : [];
      setSelected(newSelected);
      onSelectionChange?.(newSelected);
    },
    [data, getRowId, onSelectionChange]
  );

  const handleSelectOne = useCallback(
    (id: string | number) => {
      const newSelected = selected.includes(id)
        ? selected.filter(item => item !== id)
        : [...selected, id];
      setSelected(newSelected);
      onSelectionChange?.(newSelected);
    },
    [selected, onSelectionChange]
  );

  const handleToggleRow = useCallback(
    (row: T) => {
      const id = getRowId(row);
      handleSelectOne(id);
    },
    [getRowId, handleSelectOne]
  );

  const isSelected = useCallback(
    (id: string | number) => selected.includes(id),
    [selected]
  );

  const isRowSelected = useCallback(
    (row: T) => isSelected(getRowId(row)),
    [isSelected, getRowId]
  );

  const isAllSelected = data.length > 0 && selected.length === data.length;
  const isIndeterminate = selected.length > 0 && selected.length < data.length;

  const clearSelection = useCallback(() => {
    setSelected([]);
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  return {
    selected,
    setSelected,
    handleSelectAll,
    handleSelectOne,
    handleToggleRow,
    isSelected,
    isRowSelected,
    isAllSelected,
    isIndeterminate,
    selectedCount: selected.length,
    clearSelection,
  };
};
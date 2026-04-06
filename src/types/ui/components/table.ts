export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  tableName?: string | React.ReactNode
  rowsPerPageOptions?: number[]
  loading?: boolean
  hideActions?: boolean
  toolbar?: React.ReactNode
  onFilter?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDownload?: (e: React.MouseEvent<HTMLButtonElement>) => void
  filter?: boolean
  download?: boolean
  search?: boolean
  emptyMessage?: string
  actions?: React.ReactNode
  emptyStateComponent?: React.ReactNode
  simpleTable?: boolean
  onRowClick?: (row: T) => void
  searchKeys?: string[]
  serverSide?: boolean
  initialSearchTerm?: string
  onServerSearch?: (searchTerm: string) => void | undefined
  onServerPageChange?: (newPage: number, newRowsPerPage: number) => void
  /** For server-side pagination: controlled page (0-based) */
  page?: number
  /** For server-side pagination: controlled rows per page */
  rowsPerPage?: number
  count?: number
  filterActive?: boolean
  onlySearch?: boolean
  onlySearchActions?: React.ReactNode
  inlineSearchFilter?: boolean

  // Selection properties
  /** Enable row selection with checkboxes */
  selectable?: boolean
  /** Array of currently selected rows (controlled) */
  selectedRows?: T[]
  /** Callback when selection changes */
  onSelectionChange?: (selectedRows: T[]) => void
  /** Key to use for identifying unique rows (default: 'id') */
  rowIdKey?: keyof T
  /** Callback to clear all selections */
  onClearSelection?: () => void
}
export interface ModalDataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    tableName?: string | React.ReactNode;
    rowsPerPageOptions?: number[];
    loading?: boolean;
    hideActions?: boolean;
    toolbar?: React.ReactNode;
    onFilter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDownload?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    filter?: boolean;
    download?: boolean;
    search?: boolean;
    emptyMessage?: string;
    actions?: React.ReactNode;
    emptyStateComponent?: React.ReactNode;
    simpleTable?: boolean;
    onRowClick?: (row: T) => void;
    searchKeys?: string[];
    serverSide?: boolean;
    initialSearchTerm?: string;
    onServerSearch?: (searchTerm: string) => void | undefined;
    onServerPageChange?: (newPage: number, newRowsPerPage: number) => void;
    /** For server-side pagination: controlled page (0-based) */
    page?: number;
    /** For server-side pagination: controlled rows per page */
    rowsPerPage?: number;
    count?:number
    filterActive?:boolean
    onlySearch?: boolean
    inlineSearchFilter?: boolean

     // Selection props
  enableSelection?: boolean;
  getRowId?: (row: T) => string | number;
  initialSelected?: (string | number)[];
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  showSelectionFooter?: boolean;
  selectionFooterText?: string;
}

import React from 'react'

export interface Column<T> {
  id: keyof T | string;
  label: string;
  minWidth?: number;
  sortable?: boolean;
  renderCell?: (value: T[keyof T], row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}


export interface ActionProps {
  text: string;
  type: "filter" | "download" | "view" | "edit";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  display?: boolean;
  active?: boolean;
}

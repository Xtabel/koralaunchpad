import { Box, Table, TableContainer, TablePagination } from '@mui/material'
import Background from '../Paper/Background'
import { usePagination } from '@/hooks/tableHooks/usePagination'
import { useSorting } from '@/hooks/tableHooks/useSorting'
import { TableHeader } from './subcomponents/TableHeader'
import { CustomTableBody } from './subcomponents/TableBody'
import { TableToolbar } from './subcomponents/TableToolbar'

import { useTableSearch } from '@/hooks/tableHooks'
import { LoadingOverlay } from '../Loader/LoadingOverlay'
import type { DataTableProps } from '@/types'

/**
 * DataTable Component - A reusable table component with sorting, pagination, selection, and action buttons
 *
 * @template T - The type of data being displayed in the table
 *
 * @param {Object} props
 * @param {Column<T>[]} props.columns - Array of column definitions (must include id, label, and optional minWidth, align, sortable, renderCell)
 * @param {T[]} props.data - Array of data items to display in the table
 * @param {string} [props.tableName="pass tableName prop here"] - Title displayed above the table
 * @param {number[]} [props.rowsPerPageOptions=[5, 10, 15]] - Options for rows per page in pagination
 * @param {boolean} [props.loading=false] - Shows loading overlay when true
 * @param {boolean} [props.hideActions=false] - Hides the action buttons section when true
 * @param {ReactNode} [props.toolbar] - Custom content to display in the toolbar area
 * @param {(e: React.MouseEvent<HTMLButtonElement>) => void} [props.onFilter] - Handler for filter button click
 * @param {(e: React.MouseEvent<HTMLButtonElement>) => void} [props.onDownload] - Handler for download button click
 * @param {(searchTerm: string) => void | undefined} [props.onServerSearch] - Handler for server-side search
 * @param {boolean} [props.filter=true] - Shows/hides the filter button
 * @param {boolean} [props.download=true] - Shows/hides the download button
 * @param {boolean} [props.search=true] - Shows/hides the search box
 * @param {string} [props.emptyMessage="no data available"] - Shows empty message when table data is empty
 * @param {ReactNode} [props.actions] - Add more actions beside the filter and download csv
 * @param {ReactNode} [props.emptyStateComponent] - Add a different empty state component
 * @param {(row: T) => void} [props.onRowClick] - Handler for clicking the entire row
 * @param {boolean} [props.serverSide=false] - determines if the search, pagination or sorting is done client or server side
 * @param {number} [props.page] - Controlled page for server-side pagination
 * @param {number} [props.rowsPerPage] - Controlled rows per page for server-side pagination
 * @param {boolean} [props.selectable=false] - Enable row selection with checkboxes
 * @param {T[]} [props.selectedRows] - Array of currently selected rows
 * @param {(selectedRows: T[]) => void} [props.onSelectionChange] - Callback when selection changes
 * @param {keyof T} [props.rowIdKey='id'] - Key to use for identifying unique rows
 */

const DataTable = <T,>(props: DataTableProps<T>) => {
  const {
    columns,
    data,
    tableName = 'pass tableName prop here',
    rowsPerPageOptions = [20, 25, 50],
    loading,
    hideActions = false,
    toolbar,
    onFilter,
    onDownload,
    filter = true,
    download = true,
    search = true,
    emptyMessage,
    actions,
    emptyStateComponent,
    simpleTable = false,
    onRowClick,
    searchKeys,
    serverSide = false,
    initialSearchTerm = '',
    onServerSearch,
    onServerPageChange,
    page: controlledPage,
    rowsPerPage: controlledRowsPerPage,
    count,
    filterActive,
    onlySearch = false,
    onlySearchActions,
    inlineSearchFilter = false,
    selectable = false,
    selectedRows = [],
    onSelectionChange,
    rowIdKey = 'id' as keyof T,
    onClearSelection,
  } = props

  const { searchTerm, handleSearch, filteredData } = useTableSearch<T>(
    data,
    initialSearchTerm,
    searchKeys as (keyof T)[],
    serverSide,
    onServerSearch
  )

  const { sortedData, handleSort, orderBy, orderDirection } = useSorting(
    filteredData,
    columns
  )

  // For serverSide, use controlled values; otherwise, use local pagination
  const pagination = usePagination(sortedData, rowsPerPageOptions, {
    serverSide,
    onPageChange: onServerPageChange,
    page: controlledPage,
    rowsPerPage: controlledRowsPerPage,
  })

  const paginatedData = serverSide ? sortedData : pagination.paginatedData
  const page = serverSide ? controlledPage ?? 0 : pagination.page
  const rowsPerPage = serverSide
    ? controlledRowsPerPage ?? rowsPerPageOptions[0]
    : pagination.rowsPerPage

  const handleChangePage = serverSide
    ? (_event: unknown, newPage: number) => {
        if (onServerPageChange) onServerPageChange(newPage, rowsPerPage)
      }
    : pagination.handleChangePage

  const handleChangeRowsPerPage = serverSide
    ? (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10)
        if (onServerPageChange) onServerPageChange(0, newRowsPerPage)
      }
    : pagination.handleChangeRowsPerPage

  // Selection handlers
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelectionChange) return

    if (event.target.checked) {
      // Add all rows from current page that aren't already selected
      const newSelections = paginatedData.filter(
        row => !selectedRows.some(selected => selected[rowIdKey] === row[rowIdKey])
      )
      onSelectionChange([...selectedRows, ...newSelections])
    } else {
      // Remove all rows from current page from selection
      const currentPageIds = paginatedData.map(row => row[rowIdKey])
      onSelectionChange(
        selectedRows.filter(row => !currentPageIds.includes(row[rowIdKey]))
      )
    }
  }

  const handleSelectRow = (row: T) => {
    if (!onSelectionChange) return

    const rowId = row[rowIdKey]
    const isSelected = selectedRows.some(r => r[rowIdKey] === rowId)

    if (isSelected) {
      onSelectionChange(selectedRows.filter(r => r[rowIdKey] !== rowId))
    } else {
      onSelectionChange([...selectedRows, row])
    }
  }

  // Check if all rows on CURRENT PAGE are selected
  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every(row =>
      selectedRows.some(selected => selected[rowIdKey] === row[rowIdKey])
    )

  // Check if some (but not all) rows on current page are selected
  const isIndeterminate =
    !isAllSelected &&
    paginatedData.some(row =>
      selectedRows.some(selected => selected[rowIdKey] === row[rowIdKey])
    )

  return (
    <Box>
      <Background>
        <TableToolbar
          tableName={tableName}
          toolbar={toolbar}
          onDownload={onDownload}
          onFilter={onFilter}
          onSearch={handleSearch}
          searchValue={searchTerm}
          onlySearch={onlySearch}
          onlySearchActions={onlySearchActions}
          showSearch={search}
          showFilter={filter}
          showDownload={download}
          hideActions={hideActions}
          moreActions={actions}
          simpleTable={simpleTable}
          filterActive={filterActive}
          inlineSearchFilter={inlineSearchFilter}
          selectedCount={selectedRows.length}
          onClearSelection={onClearSelection}
        />
        <LoadingOverlay
          active={loading}
          styles={{
            overlay: (base: React.CSSProperties) => ({
              ...base,
              background: 'rgba(3, 34, 64, 0.08);',
            }),
          }}
          spinner
        >
        <TableContainer>
          <Table>
            {/* Table Header */}
            <TableHeader
              columns={columns}
              orderBy={orderBy}
              orderDirection={orderDirection}
              handleSort={handleSort}
              selectable={selectable}
              isAllSelected={isAllSelected}
              isIndeterminate={isIndeterminate}
              onSelectAll={handleSelectAll}
            />

            {/* Table Body */}
            <CustomTableBody
              columns={columns}
              data={paginatedData}
              emptyMessage={emptyMessage}
              emptyStateComponent={emptyStateComponent}
              onRowClick={onRowClick}
              selectable={selectable}
              selectedRows={selectedRows}
              onSelectRow={handleSelectRow}
              rowIdKey={rowIdKey}
            />
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={serverSide ? count ?? 0 : sortedData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={
            paginatedData.length === 0 ? [] : rowsPerPageOptions
          }
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </LoadingOverlay>
      </Background>
    </Box>
  )
}

export default DataTable
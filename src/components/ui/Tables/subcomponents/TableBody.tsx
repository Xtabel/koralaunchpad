import { TableCell, TableRow, TableBody, Stack, Checkbox } from '@mui/material'
import EmptyTableState from './EmptyTableState'
import type { Column } from '@/types/components/Table/TableProps'

interface TableBodyProps<T> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  emptyStateComponent?: React.ReactNode
  onRowClick?: (row: T) => void
  selectable?: boolean
  selectedRows?: T[]
  onSelectRow?: (row: T) => void
  rowIdKey?: keyof T
}

const tableBodyCellStyles = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

export const CustomTableBody = <T,>({
  columns,
  data,
  emptyMessage = 'No data available',
  emptyStateComponent,
  onRowClick,
  selectable = false,
  selectedRows = [],
  onSelectRow,
  rowIdKey = 'id' as keyof T,
}: TableBodyProps<T>) => {
  if (data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length + (selectable ? 1 : 0)}
            sx={{ height: '300px' }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ height: '100%' }}
            >
              {emptyStateComponent || <EmptyTableState message={emptyMessage} />}
            </Stack>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <TableBody>
      {data.map((row, index) => {
        const isSelected = selectedRows.some(
          selected => selected[rowIdKey] === row[rowIdKey]
        )

        return (
          <TableRow
            key={index}
            selected={isSelected}
            sx={{
              cursor: onRowClick ? 'pointer' : 'default',
              '&:hover': {
                backgroundColor: 'grey.50',
              },
              '&.Mui-selected': {
                backgroundColor: 'primary.lighter',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  onChange={e => {
                    e.stopPropagation()
                    onSelectRow?.(row)
                  }}
                  sx={{
                    color: 'grey.400',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              </TableCell>
            )}
            {columns.map(column => (
              <TableCell
                key={column.id as string}
                align={column.align}
                sx={{
                  ...tableBodyCellStyles,
                  textAlign: column.align || 'left',
                }}
                onClick={
                  onRowClick && !selectable ? () => onRowClick(row) : undefined
                }
              >
                {column.renderCell
                  ? column.renderCell(row[column.id as keyof T], row)
                  : (row[column.id as keyof T] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        )
      })}
    </TableBody>
  )
}
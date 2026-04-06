import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material'
import HeaderCell from './HeaderCell'
import type { Column } from '@/types'


interface TableHeaderProps<T> {
  columns: Column<T>[]
  orderBy: keyof T | null
  orderDirection: 'asc' | 'desc' | null
  handleSort: (columnId: keyof T) => void
  selectable?: boolean
  isAllSelected?: boolean
  isIndeterminate?: boolean
  onSelectAll?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TableHeader = <T,>({
  columns,
  orderBy,
  orderDirection,
  handleSort,
  selectable = false,
  isAllSelected = false,
  isIndeterminate = false,
  onSelectAll,
}: TableHeaderProps<T>) => {
  return (
    <TableHead>
      <TableRow>
        {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={onSelectAll}
              sx={{
                color: 'grey.400',
                '&.Mui-checked': {
                  color: 'primary.main',
                },
                '&.MuiCheckbox-indeterminate': {
                  color: 'primary.main',
                },
              }}
            />
          </TableCell>
        )}
        {columns.map(column => (
          <HeaderCell
            key={column.id as string}
            column={column}
            handleSort={handleSort}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
        ))}
      </TableRow>
    </TableHead>
  )
}
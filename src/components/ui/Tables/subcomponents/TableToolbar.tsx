import { Box, Stack, Typography } from '@mui/material'
import Searchbox from '../../Search/TableSearch'

import { ActionButton, CustomButton } from '../../Button'
import type { ActionProps } from '@/types'

// Separate interfaces for better Single Responsibility
interface TableHeaderProps {
  tableName: string | React.ReactNode
  showSearch?: boolean
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void
  simpleTable?: boolean
  moreActions?: React.ReactNode
  searchValue?: string
  onlySearch?: boolean
  onlySearchActions?: React.ReactNode
  inlineSearchFilter?: boolean
  showFilter?: boolean
  onFilter?: (event: React.MouseEvent<HTMLButtonElement>) => void
  filterActive?: boolean
}

interface TableActionProps {
  onFilter?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onDownload?: (event: React.MouseEvent<HTMLButtonElement>) => void
  showFilter?: boolean
  showDownload?: boolean
  toolbar?: React.ReactNode
  moreActions?: React.ReactNode
  simpleTable?: boolean
  filterActive?: boolean
  onlySearch?: boolean
  onlySearchActions?: React.ReactNode
}

// Main interface extends the sub-interfaces
interface TableToolbarProps extends TableHeaderProps, TableActionProps {
  hideActions?: boolean
  searchValue?: string
  selectedCount?: number
  onClearSelection?: () => void
  inlineSearchFilter?: boolean
}

// Separate component for the header section
const TableHeader = ({
  tableName,
  showSearch,
  onSearch,
  simpleTable,
  moreActions,
  searchValue,
  onlySearch,
  onlySearchActions,
  inlineSearchFilter = false,
  showFilter = true,
  onFilter,
  filterActive,
}: TableHeaderProps) => {
  return (
    <>
      {onlySearch && showSearch ? (
        <Stack
          p="5px"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Searchbox
            onChange={onSearch}
            value={searchValue}
            placeholder="Search"
          />
          {onlySearchActions}
        </Stack>
      ) : (
        <Stack
          p="5px"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {typeof tableName === 'string' ? (
            <Typography
              sx={{
                color: '#121926',
                fontWeight: 600,
                fontSize: {
                  xs: '12px',
                  sm: '12px',
                  md: '14px',
                  lg: '16px',
                },
              }}
            >
              {tableName}
            </Typography>
          ) : (
            tableName
          )}
          <Stack direction="row" gap={2} alignItems="center">
            {showSearch && (
              <Searchbox
                onChange={onSearch}
                value={searchValue}
                placeholder="Search"
              />
            )}
            {inlineSearchFilter && showFilter && onFilter && (
              <Box position="relative" display="inline-flex">
                <ActionButton
                  text="Filter"
                  type="filter"
                  onClick={onFilter}
                  sx={
                    filterActive
                      ? {
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          backgroundColor: 'secondary.lighter',
                          '&:hover': { backgroundColor: 'secondary.lighter' },
                        }
                      : {}
                  }
                />
                {filterActive && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 4,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'secondary.main',
                    }}
                  />
                )}
              </Box>
            )}
            {simpleTable && moreActions}
          </Stack>
        </Stack>
      )}
    </>
  )
}

// Separate component for actions
const TableActions = ({
  filterActive,
  onFilter,
  onDownload,
  showFilter = true,
  showDownload = true,
  toolbar,
  moreActions,
  simpleTable,
}: TableActionProps) => {
  const actions: ActionProps[] = [
    {
      text: 'Filter',
      type: 'filter',
      onClick: onFilter,
      display: showFilter,
      active: filterActive,
    },
    {
      text: 'Download',
      type: 'download',
      onClick: onDownload,
      display: showDownload,
    },
  ]

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={toolbar ? 'space-between' : 'flex-end'}
      width="100%"
    >
      {toolbar}
      <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 1, lg: 2 }}>
        {actions.map(({ text, display, active, ...actionProps }) =>
          display ? (
            <Box key={text} position="relative" display="inline-flex">
              {/* Action Button */}
              <ActionButton
                text={text}
                {...actionProps}
                sx={{
                  ...(actionProps.type === 'filter' && active
                    ? {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        backgroundColor: 'secondary.lighter',
                        '&:hover': { backgroundColor: 'secondary.lighter' },
                      }
                    : {}),
                }}
              />

              {/* Active indicator only for filter */}
              {actionProps.type === 'filter' && active && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'secondary.main',
                  }}
                />
              )}
            </Box>
          ) : null
        )}
        {!simpleTable && moreActions}
      </Stack>
    </Stack>
  )
}

// Main component using composition
export const TableToolbar = ({
  tableName,
  onSearch,
  onFilter,
  onDownload,
  showSearch = true,
  showFilter = true,
  showDownload = true,
  hideActions = false,
  onlySearch = false,
  onlySearchActions,
  toolbar,
  moreActions,
  simpleTable,
  searchValue,
  filterActive,
  selectedCount = 0,
  onClearSelection,
  inlineSearchFilter = false,
}: TableToolbarProps) => (
  <Box p={2} display="flex" flexDirection="column" gap={2}>
    {/* Selection Banner */}
    {selectedCount > 0 && (
      <Box
        sx={{
          bgcolor: 'primary.lighter',
          p: 1.5,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
          {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
        </Typography>
        <CustomButton
          size="small"
          variant="text"
          onClick={onClearSelection}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Clear Selection
        </CustomButton>
      </Box>
    )}

    {tableName && (
      <TableHeader
        tableName={tableName}
        showSearch={showSearch}
        onSearch={onSearch}
        simpleTable={simpleTable}
        moreActions={moreActions}
        searchValue={searchValue}
        onlySearch={onlySearch}
        onlySearchActions={onlySearchActions}
        inlineSearchFilter={inlineSearchFilter}
        showFilter={showFilter}
        onFilter={onFilter}
        filterActive={filterActive}
      />
    )}

    {!hideActions && (
      <TableActions
        filterActive={filterActive}
        onFilter={onFilter}
        onDownload={onDownload}
        showFilter={inlineSearchFilter ? false : showFilter}
        showDownload={showDownload}
        toolbar={toolbar}
        moreActions={moreActions}
        simpleTable={simpleTable}
      />
    )}
  </Box>
)
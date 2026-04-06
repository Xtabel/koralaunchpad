import { IconButton, Stack } from "@mui/material";
import { CustomButton } from "@/components/ui";
import { CSVIcon, FillCloseIcon, FilterIcon } from "@/assets/icons";
import { pxToRem } from "@/styles/Themes/typography";

interface TableActionsProps {
  showFilter?: boolean;
  showDownload?: boolean;
  isFilterActive?: boolean;
  onFilterClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDownloadClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClearFilters?: () => void;
  filterLabel?: string;
  downloadLabel?: string;
  additionalActions?: React.ReactNode;
}

const TableActions = ({
  showFilter = true,
  showDownload = true,
  isFilterActive = false,
  onFilterClick,
  onDownloadClick,
  onClearFilters,
  filterLabel = "Filter",
  downloadLabel = "Download",
  additionalActions,
}: TableActionsProps) => {
  const handleEndIconClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the filter popover from opening
    onClearFilters?.();
  };

  return (
    <Stack direction="row" gap={1} alignItems="center">
      {/* Filter Button */}
      {showFilter && (
        <CustomButton
          variant="outlined"
          startIcon={
            <FilterIcon
              sx={{
                fontSize: "12px",
                color: isFilterActive ? "inherit" : "#52575C",
              }}
            />
          }
          endIcon={
            isFilterActive ? (
              <IconButton
                onClick={handleEndIconClick}
                sx={{
                  "&:hover": {
                    backgroundColor: "grey.300",
                  },
                padding: 0.2,
                }}
              >
                <FillCloseIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            ) : null
          }
          onClick={onFilterClick}
          sx={(theme) => ({
            py: pxToRem(10),
            px: pxToRem(14),
            fontWeight: 400,
            border: `1px solid ${
              isFilterActive ? theme.palette.primary.main : theme.palette.grey[100]
            }`,
            backgroundColor: isFilterActive
              ? "#EBEEF0"
              : theme.palette.common.white,
          })}
        >
          {filterLabel}
        </CustomButton>
      )}

      {/* Download Button */}
      {showDownload && (
        <CustomButton
          onClick={onDownloadClick}
          startIcon={<CSVIcon sx={{ color: "#FFF" }} />}
          sx={{
            py: pxToRem(10),
            px: pxToRem(14),
            fontWeight: 400,
          }}
        >
          {downloadLabel}
        </CustomButton>
      )}

      {/* Additional Actions */}
      {additionalActions}
    </Stack>
  );
};

export default TableActions;
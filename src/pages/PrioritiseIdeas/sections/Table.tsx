import { useState, useMemo } from "react";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { DataTable, MenuPopover, TableTabs } from "@/components/ui";
import { CustomSelectField } from "@/components/forms";
import { CustomButton } from "@/components/ui/Button";
import EmptyTableState from "@/components/ui/Tables/subcomponents/EmptyTableState";
import { EmptyStates } from "@/assets/icons";
import StatusChip from "@/components/ui/Chips/StatusChip";
import type { Column } from "@/types";
import {
  MOCK_PRIORITISE_IDEAS,
  PRIORITISE_TAB_FILTERS,
  PRIORITISE_CATEGORY_OPTIONS,
  RANK_COLORS,
  CATEGORY_CHIP_COLOR,
  type PrioritiseRow,
  type PrioritiseStatus,
} from "@/_mock/prioritiseIdeas";
import { pxToRem } from "@/styles/Themes/typography";

const TABS = [
  { label: "Pending" },
  { label: "Approved" },
  { label: "In Pilot" },
  { label: "Completed" },
  { label: "Rejected" },
];

interface PrioritiseIdeasTableProps {
  onView?: (row: PrioritiseRow) => void;
  onApprove?: (row: PrioritiseRow) => void;
}

const PrioritiseIdeasTable: React.FC<PrioritiseIdeasTableProps> = ({
  onView,
  onApprove,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [ideas, setIdeas] = useState<PrioritiseRow[]>(MOCK_PRIORITISE_IDEAS);

  // Filter popover
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [pendingCategory, setPendingCategory] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  // Per-row action popover
  const [actionAnchorEl, setActionAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [activeRow, setActiveRow] = useState<PrioritiseRow | null>(null);

  const filteredData = useMemo(() => {
    const statusFilter = PRIORITISE_TAB_FILTERS[activeTab];
    return ideas.filter((row) => {
      const statusMatch =
        statusFilter === "all" ||
        row.status === (statusFilter as PrioritiseStatus);
      const categoryMatch =
        activeCategory === "all" || row.category === activeCategory;
      return statusMatch && categoryMatch;
    });
  }, [activeTab, ideas, activeCategory]);

  // ── Filter handlers ──────────────────────────────────────────────────
  const handleOpenFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPendingCategory(activeCategory);
    setFilterAnchorEl(e.currentTarget);
  };
  const handleCloseFilter = () => setFilterAnchorEl(null);
  const handleApplyFilter = () => {
    setActiveCategory(pendingCategory);
    handleCloseFilter();
  };

  // ── Action dropdown handlers ─────────────────────────────────────────
  const handleOpenAction = (
    e: React.MouseEvent<HTMLButtonElement>,
    row: PrioritiseRow,
  ) => {
    setActiveRow(row);
    setActionAnchorEl(e.currentTarget);
  };
  const handleCloseAction = () => {
    setActionAnchorEl(null);
    setActiveRow(null);
  };

  const handleView = () => {
    if (!activeRow) return;
    onView?.(activeRow);
    handleCloseAction();
  };

  const handleApprove = () => {
    if (!activeRow) return;
    if (onApprove) {
      onApprove(activeRow);
    } else {
      // Optimistic update
      setIdeas((prev) =>
        prev.map((r) =>
          r.id === activeRow.id
            ? { ...r, isApproved: true, status: "approved" as const }
            : r,
        ),
      );
    }
    handleCloseAction();
  };

  // ── Columns ──────────────────────────────────────────────────────────
  const columns: Column<PrioritiseRow>[] = [
    {
      id: "rank",
      label: "Rank",
      sortable: true,
      minWidth: 70,
      renderCell: (_, row) => (
        <Typography fontSize="13px" fontWeight={600} color="text.primary">
          {row.rank}
        </Typography>
      ),
    },
    {
      id: "ideaTitle",
      label: "Idea",
      sortable: true,
      minWidth: 200,
      renderCell: (_, row) => (
        <Box>
          <Typography fontSize="13px" fontWeight={600} color="text.primary">
            {row.ideaTitle}
          </Typography>
          <Typography
            fontSize="11px"
            color="text.secondary"
            fontStyle={row.submittedBy === "Anonymous" ? "italic" : "normal"}
          >
            {row.submittedBy}
          </Typography>
        </Box>
      ),
    },
    {
      id: "category",
      label: "Category",
      sortable: true,
      minWidth: 130,
      renderCell: (_, row) => (
        <StatusChip
          status="Inactive"
          displayText={row.category}
          customColor={CATEGORY_CHIP_COLOR}
        />
      ),
    },
    {
      id: "score",
      label: "Score",
      sortable: true,
      minWidth: 90,
      renderCell: (_, row) => (
        <Typography fontSize="13px" fontWeight={500} color="text.primary">
          {row.score}/10
        </Typography>
      ),
    },
    {
      id: "rankLabel",
      label: "Rank",
      sortable: false,
      minWidth: 140,
      renderCell: (_, row) => (
        <StatusChip
          status="Inactive"
          displayText={row.rankLabel}
          customColor={RANK_COLORS[row.rankLabel]}
        />
      ),
    },
    {
      id: "reviewerCount",
      label: "Reviews",
      sortable: false,
      minWidth: 110,
      renderCell: (_, row) => (
        <Typography fontSize="12px" color="text.secondary">
          {row.reviewerCount} reviewers
        </Typography>
      ),
    },
    {
      id: "isApproved",
      label: "Action",
      sortable: false,
      minWidth: 100,
      renderCell: (_, row) => {
        if (row.isApproved) {
          return (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CheckIcon sx={{ fontSize: 14, color: "#4CAF50" }} />
              <Typography fontSize="12px" fontWeight={600} color="#4CAF50">
                Approved
              </Typography>
            </Stack>
          );
        }
        return (
          <IconButton size="small" onClick={(e) => handleOpenAction(e, row)}>
            <MoreVertIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <DataTable<PrioritiseRow>
        columns={columns}
        data={filteredData}
        tableName="Idea Prioritisation"
        search
        filter
        download={false}
        filterActive={activeCategory !== "all"}
        onFilter={handleOpenFilter}
        rowsPerPageOptions={[10, 25, 50]}
        searchKeys={["ideaTitle", "submittedBy", "category", "rankLabel"]}
        emptyStateComponent={
          <EmptyTableState
            message={`No ${TABS[activeTab].label.toLowerCase()} ideas found.`}
            icon={<EmptyStates.EmptyIdeaIcon sx={{ fontSize: "120px" }} />}
          />
        }
        toolbar={
          <TableTabs
            tabs={TABS}
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            bgColor="#F5F5F5"
            activeBgColor="#FFFFFF"
            activeTextColor="#000000"
            textColor="#666666"
            scrollable
          />
        }
      />

      {/* ── Filter popover ───────────────────────────────────────────── */}
      <MenuPopover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleCloseFilter}
        sx={{ width: 280 }}
      >
        <Stack sx={{ p: 2, gap: 1.5 }}>
          <Typography fontSize="14px" fontWeight={600}>
            Filter Ideas
          </Typography>
          <CustomSelectField
            label="Category"
            value={pendingCategory}
            options={PRIORITISE_CATEGORY_OPTIONS}
            onChange={(val) => setPendingCategory(val as string)}
            placeholder="-- Select category --"
            multiple={false}
          />
          <Stack direction="row" justifyContent="flex-end" gap={1}>
            <CustomButton variant="outlined" onClick={handleCloseFilter}>
              Cancel
            </CustomButton>
            <CustomButton onClick={handleApplyFilter}>Apply</CustomButton>
          </Stack>
        </Stack>
      </MenuPopover>

      {/* ── Action dropdown ──────────────────────────────────────────── */}
      <MenuPopover
        open={Boolean(actionAnchorEl)}
        anchorEl={actionAnchorEl}
        onClose={handleCloseAction}
        sx={{ width: 180 }}
      >
          <MenuList sx={{ fontSize: pxToRem(10), padding:0 }}>
            <MenuItem onClick={handleView}>
              <ListItemIcon>
                <VisibilityOutlinedIcon
                  sx={{ fontSize: 16, color: "text.secondary" }}
                />
              </ListItemIcon>
              <ListItemText><Typography sx={{fontSize: "13px !important" }}>View</Typography></ListItemText>
            </MenuItem>

            <Divider sx={{ my: 0 }} />

            <MenuItem onClick={handleApprove}>
              <ListItemIcon>
                <ThumbUpOutlinedIcon
                  sx={{ fontSize: 16, color: "success.main" }}
                />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "13px !important", color: "success.main" }}>
               <Typography sx={{fontSize: "13px !important" }}>Approve</Typography>
              </ListItemText>
            </MenuItem>
          </MenuList>
      </MenuPopover>
    </>
  );
};

export default PrioritiseIdeasTable;

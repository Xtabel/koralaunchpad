import React, { useState, useMemo } from "react";
import { Box, Popover, Stack, Typography } from "@mui/material";
import { DataTable, TableTabs } from "@/components/ui";
import { CustomSelectField } from "@/components/forms";
import { CustomButton } from "@/components/ui/Button";
import EmptyTableState from "@/components/ui/Tables/subcomponents/EmptyTableState";
import { EmptyStates } from "@/assets/icons";
import type { Column } from "@/types";
import {
  MOCK_IDEAS,
  TAB_FILTERS,
  type IdeaRow,
  type ReviewStatus,
} from "@/_mock/reviewAndScore";
import ScoreCell from "./ScoreCell";
import ActionCell from "./ActionCell";
import StatusChip from "./StatusChip";
import CategoryChip from "./CategoryChip";

const TABS = [
  { label: "All" },
  { label: "Awaiting My Score" },
  { label: "Under Review" },
  { label: "Fully Scored" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "Technology", label: "Technology" },
  { value: "Operations", label: "Operations" },
  { value: "Finance", label: "Finance" },
  { value: "Product", label: "Product" },
  { value: "People & Culture", label: "People & Culture" },
];

interface IdeaReviewTableProps {
  onScoreClick?: (row: IdeaRow) => void;
}

const IdeaReviewTable: React.FC<IdeaReviewTableProps> = ({ onScoreClick }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [ideas, setIdeas] = useState<IdeaRow[]>(MOCK_IDEAS);

  // Filter popover state
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [pendingCategory, setPendingCategory] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredData = useMemo(() => {
    const statusFilter = TAB_FILTERS[activeTab];

    return ideas.filter((row) => {
      const statusMatch =
        statusFilter === "all" || row.status === (statusFilter as ReviewStatus);
      const categoryMatch =
        activeCategory === "all" || row.category === activeCategory;
      return statusMatch && categoryMatch;
    });
  }, [activeTab, ideas, activeCategory]);

  const handleScore = (row: IdeaRow) => {
    if (onScoreClick) {
      onScoreClick(row);
    } else {
      // Optimistic update until modal is wired
      setIdeas((prev) =>
        prev.map((r) =>
          r.id === row.id
            ? { ...r, hasScored: true, score: 8.0, status: "scored" as const }
            : r
        )
      );
    }
  };

  const handleOpenFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPendingCategory(activeCategory);
    setFilterAnchorEl(e.currentTarget);
  };

  const handleCloseFilter = () => setFilterAnchorEl(null);

  const handleApplyFilter = () => {
    setActiveCategory(pendingCategory);
    handleCloseFilter();
  };

  const isFilterActive = activeCategory !== "all";

  const columns: Column<IdeaRow>[] = [
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
      renderCell: (_, row) => <CategoryChip label={row.category} />,
    },
    {
      id: "submittedAt",
      label: "Submitted",
      sortable: false,
      minWidth: 120,
      renderCell: (_, row) => (
        <Typography fontSize="12px" color="text.secondary">
          {row.submittedAt}
        </Typography>
      ),
    },
    {
      id: "status",
      label: "Status",
      sortable: true,
      minWidth: 140,
      renderCell: (_, row) => <StatusChip status={row.status} />,
    },
    {
      id: "score",
      label: "Score",
      sortable: true,
      minWidth: 160,
      renderCell: (_, row) => <ScoreCell score={row.score} />,
    },
    {
      id: "hasScored",
      label: "Action",
      sortable: false,
      minWidth: 110,
      renderCell: (_, row) => (
        <ActionCell
          hasScored={row.hasScored}
          onScore={() => handleScore(row)}
        />
      ),
    },
  ];

  return (
    <>
      <DataTable<IdeaRow>
        columns={columns}
        data={filteredData}
        tableName="Idea Reviews"
        search
        filter
        download={false}
        filterActive={isFilterActive}
        onFilter={handleOpenFilter}
        rowsPerPageOptions={[10, 25, 50]}
        searchKeys={["ideaTitle", "submittedBy", "category"]}
        emptyStateComponent={
          <EmptyTableState
            message={`No ${activeTab !== 0 ? TABS[activeTab].label.toLowerCase() : ""} ideas found.`}
            icon={<EmptyStates.EmptyIdeaIcon sx={{ fontSize: "120px" }} />}
          />
        }
        toolbar={
          // TableTabs passed as toolbar — sits in the DataTable action bar
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

      {/* Filter Popover */}
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Stack sx={{ width: 280, p: 2, gap: 1.5 }}>
          <Typography fontSize="14px" fontWeight={600}>
            Filter Ideas
          </Typography>
          <CustomSelectField
            label="Category"
            value={pendingCategory}
            options={CATEGORY_OPTIONS}
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
      </Popover>
    </>
  );
};

export default IdeaReviewTable;
import { type ReactNode } from "react";
import { AddIcon } from "@/assets/icons";
import { CustomButton } from "@/components/ui";
import { pxToRem } from "@/styles/Themes/typography";
import { Badge, Stack, Typography } from "@mui/material";
import CardSearchbox from "@/components/ui/Search/CardSearch";
import CustomIconTabs from "@/components/ui/Tabs/CustomIconTab";

interface TabData {
  icon: React.ReactElement; // Using React element for icons
}
interface SetupOverviewProps {
  // Title section
  title: string;
  badgeCount?: number;
  showBadge?: boolean;

  // Search
  showSearch?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Action button
  showActionButton?: boolean;
  actionButtonText?: string;
  actionButtonIcon?: ReactNode;
  onActionClick?: () => void;

  // Tabs
  tabs?: TabData[];
  showTabs?: boolean;
  selectedTab?: number;
  onTabChange?: (event: React.SyntheticEvent, newValue: number) => void;

  // Custom content
  additionalContent?: ReactNode;
  extraButtons?: ReactNode;

}

const SetupOverview: React.FC<SetupOverviewProps> = ({
  title,
  badgeCount,
  showBadge = true,
 showSearch = true,
  searchValue = "",
  searchPlaceholder = "Search...",
  onSearchChange,
  showActionButton = true,
  actionButtonText = "Create",
  actionButtonIcon = <AddIcon />,
  onActionClick,
  tabs,
  showTabs = true,
  selectedTab = 0,
  onTabChange,
  additionalContent,
  extraButtons,
}) => {

  return (
    <>
      {/* Header Section */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb="20px"
      >
        <Stack direction="row" gap={2} alignItems="center">
          <Stack direction="row" gap={2} alignItems="center">
            <Typography
              color="primary"
              fontFamily="Poppins"
              fontSize="16px"
              fontStyle="normal"
              fontWeight="500"
              lineHeight="normal"
            >
              {title}
            </Typography>
            {showBadge && badgeCount !== undefined && (
              <Badge
                sx={{
                  color: "rgba(26, 80, 204, 1)",
                  "& .MuiBadge-badge": {
                    backgroundColor: "rgba(7, 100, 163, 0.08)",
                  },
                }}
                badgeContent={badgeCount}
              />
            )}
          </Stack>
          {showSearch && (
            <CardSearchbox
              value={searchValue}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
            />
          )}
        </Stack>

        <Stack direction={"row"} gap={2}>
          {showActionButton && onActionClick && (
          <CustomButton
            startIcon={actionButtonIcon}
            onClick={onActionClick}
            sx={{ p: pxToRem(12), fontWeight: 400 }}
          >
            {actionButtonText}
          </CustomButton>
        )}
          {extraButtons}
        </Stack>
      </Stack>

      {/* Tabs Section */}
      {showTabs && onTabChange && (
        <CustomIconTabs value={selectedTab} onChange={onTabChange} tabs={tabs}/>
      )}

      {/* Additional Content */}
      {additionalContent}
    </>
  );
};

export default SetupOverview;
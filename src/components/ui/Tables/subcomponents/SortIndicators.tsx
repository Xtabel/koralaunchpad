import { Stack } from "@mui/material";
import { SortDownIcon, SortUpIcon } from "@/assets/icons";

interface SortIndicatorProps {
  isActive: boolean;
  direction: "asc" | "desc" | null;
}

const SortIndicators = ({ isActive, direction }: SortIndicatorProps) => {
  return (
    <Stack gap={0} alignItems="center">
      <SortUpIcon sx={{
        fontSize: "8px",
        color: isActive && direction === "asc" ? "blue" : "gray",
      }} />
      <SortDownIcon sx={{
        fontSize: "8px",
        color: isActive && direction === "desc" ? "blue" : "gray",
      }} />
    </Stack>
  );
};

export default SortIndicators;

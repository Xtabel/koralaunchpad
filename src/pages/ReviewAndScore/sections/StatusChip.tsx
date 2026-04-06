import React from "react";
import { Box } from "@mui/material";
import type { ReviewStatus } from "@/_mock/reviewAndScore";


const STATUS_CONFIG: Record<ReviewStatus, { label: string; bg: string; color: string }> = {
  under_review: { label: "Under review", bg: "#FFF3E0", color: "#E65100" },
  scored:        { label: "Scored",        bg: "#E8F5E9", color: "#2E7D32" },
  awaiting_score:{ label: "Awaiting Score",bg: "#EDE7F6", color: "#4527A0" },
  fully_scored:  { label: "Fully Scored",  bg: "#E8F5E9", color: "#1B5E20" },
};

const StatusChip: React.FC<{ status: ReviewStatus }> = ({ status }) => {
  const { label, bg, color } = STATUS_CONFIG[status];
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.4,
        borderRadius: "20px",
        bgcolor: bg,
        color,
        fontSize: "11px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
};

export default StatusChip;
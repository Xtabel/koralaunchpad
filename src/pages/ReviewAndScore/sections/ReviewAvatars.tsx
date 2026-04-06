import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { Reviewer } from "@/_mock/reviewAndScore";


interface ReviewAvatarsProps {
  reviewers: Reviewer[];
  reviewCount: number;
  reviewTotal: number;
  maxVisible?: number;
}

const ReviewAvatars: React.FC<ReviewAvatarsProps> = ({
  reviewers,
  reviewCount,
  reviewTotal,
  maxVisible = 4,
}) => {
  const visible = reviewers.slice(0, maxVisible);
  const overflow = reviewers.length - maxVisible;

  return (
    <Stack direction="row" alignItems="center" spacing={0.75}>
      {/* Overlapping avatar circles */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {visible.map((r, i) => (
          <Box
            key={i}
            sx={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              bgcolor: r.color,
              border: "2px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ml: i === 0 ? 0 : "-8px",
              zIndex: visible.length - i,
              fontSize: "9px",
              fontWeight: 700,
              color: "white",
            }}
          >
            {r.initials}
          </Box>
        ))}

        {overflow > 0 && (
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              bgcolor: "grey.300",
              border: "2px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ml: "-8px",
              zIndex: 0,
              fontSize: "9px",
              fontWeight: 700,
              color: "text.secondary",
            }}
          >
            +{overflow}
          </Box>
        )}
      </Box>

      <Typography fontSize="12px" color="text.secondary" fontWeight={500}>
        {reviewCount}/{reviewTotal}
      </Typography>
    </Stack>
  );
};

export default ReviewAvatars;
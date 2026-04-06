import React from "react";
import { Box, Stack, Typography } from "@mui/material";

interface ScoreCellProps {
  score: number | null;
}

const ScoreCell: React.FC<ScoreCellProps> = ({ score }) => {
  if (score === null) {
    return (
      <Typography fontSize="12px" color="text.disabled">
        Not scored yet
      </Typography>
    );
  }

  const percent = (score / 10) * 100;

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      {/* Progress track */}
      <Box
        sx={{
          width: 80,
          height: 4,
          borderRadius: 2,
          bgcolor: "grey.200",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${percent}%`,
            height: "100%",
            bgcolor: "#4CAF50",
            borderRadius: 2,
          }}
        />
      </Box>
      <Typography fontSize="12px" fontWeight={600} color="text.primary">
        {score}
      </Typography>
    </Stack>
  );
};

export default ScoreCell;
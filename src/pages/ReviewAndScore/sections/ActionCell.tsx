import React from "react";
import { Stack, Typography } from "@mui/material";
import { CustomButton } from "@/components/ui";
import CheckIcon from "@mui/icons-material/Check";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface ActionCellProps {
  hasScored: boolean;
  onScore: () => void;
}

const ActionCell: React.FC<ActionCellProps> = ({ hasScored, onScore }) => {
  if (hasScored) {
    return (
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <CheckIcon sx={{ fontSize: 14, color: "#4CAF50" }} />
        <Typography fontSize="12px" fontWeight={600} color="#4CAF50">
          Scored
        </Typography>
      </Stack>
    );
  }

  return (
    <CustomButton
      size="small"
      variant="contained"
      startIcon={<StarBorderIcon sx={{ fontSize: "14px !important" }} />}
      onClick={onScore}
      sx={{
        fontSize: "12px",
        px: 2,
        py: 0.75,
        textTransform: "none",
        bgcolor: "#5B4FCF",
        "&:hover": { bgcolor: "#4a3eb8" },
      }}
    >
      Score
    </CustomButton>
  );
};

export default ActionCell;
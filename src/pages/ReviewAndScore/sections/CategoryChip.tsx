import React from "react";
import { Box } from "@mui/material";

const CategoryChip: React.FC<{ label: string }> = ({ label }) => (
  <Box
    sx={{
      display: "inline-flex",
      px: 1.5,
      py: 0.5,
      borderRadius: "8px",
      bgcolor: "grey.100",
      color: "text.secondary",
      fontSize: "11px",
      fontWeight: 500,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </Box>
);

export default CategoryChip;
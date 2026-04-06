import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Typography } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  autoHideDuration?: number | null;
  onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  severity,
  autoHideDuration,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        iconMapping={{
          success: <CheckCircleIcon fontSize="inherit" />,
          error: <ErrorIcon fontSize="inherit" />,
        }}
        sx={{
          width: "100%",
          minWidth: 250,
          bgcolor: severity === "success" ? "#d4edda" : "#f8d7da", // Lighter background colors
          color: severity === "success" ? "#155724" : "#721c24", // Darker text
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography fontWeight="bold">
            {message.includes("online") ? "You're back online!" : "You are offline"}
          </Typography>
          <Typography variant="body2">
            {message.includes("online") ? "Connected to the internet." : "No internet connection."}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;

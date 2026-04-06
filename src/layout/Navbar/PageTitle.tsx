import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const location = useLocation();

  const segment = location.pathname.split("/")[1] || "";

  const formattedTitle = segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Typography
      variant="body2"
      color="text.dark"
      fontWeight="medium"
      sx={{ fontSize: { xs: "10px", md: "14px" } }}
    >
      {formattedTitle && formattedTitle !== "Not Found" ? formattedTitle : null}
    </Typography>
  );
};

export default PageTitle;

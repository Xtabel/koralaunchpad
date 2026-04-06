import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { dashboardBanner } from "@/assets/img";
import { ExtOfficerInfoIcon } from "@/assets/icons";


interface OverviewBannerProps {
  title?: string;
  messageTemplate: string;
  icon?: React.ReactNode;
  iconBackgroundColor?: string;
  backgroundImage?: string;
}

const OverviewBanner: React.FC<OverviewBannerProps> = ({
  title = "Thanks for joining! We're just verifying a few details.",
  messageTemplate = "You'll have full access to your dashboard shortly.",
  icon,
  iconBackgroundColor,
  backgroundImage = dashboardBanner,
}) => {
  
  return (
    <Paper
      elevation={0}
      sx={{
        paddingLeft: "20px",
        paddingY: "20px",
        paddingRight: "40px",
        borderRadius: "8px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: "#FFF1DE",
        width: "100%",
        // height: "106px",
        border: "1px dashed #FFB868",
        borderWidth: "2px",
      }}
    >
      {/* Main content wrapper with space-between */}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between"
        sx={{ flex: 1 }}
      >
        {/* Left content - Icon and Text */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#FFFFFF",
            gap: 2,
          }}
        >
          <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              backgroundColor: iconBackgroundColor || "#FFF3E4",
                              borderRadius: "50px",
                              width: 52,
                              height: 52,
                            }}
                          >
                            {icon || <ExtOfficerInfoIcon sx={{ fontSize: "30px" }} />}
                          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#784000"
              }}
            >
              {title}
            </Typography>
            <Typography
              fontWeight={500}
              fontSize={"14px"}
              color="#A17643"
            >
              {messageTemplate}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default OverviewBanner;
import React, { type JSX } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { CustomButton } from "@/components/ui";

interface BannerProps {
  title: JSX.Element | string;
  description: string[] | string;
  buttonText?: string;
  onClick?: () => void;
  bannerImage?: string;
}

const BannerCard: React.FC<BannerProps> = ({
  title,
  description,
  buttonText,
  bannerImage,
  onClick,
}) => {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        color: "white",
        p: {
          xs: 2,
          md: 4,
        },
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography
        fontWeight="600"
        fontSize={{ xs: "16px", sm: "16px", md: "24px", lg: "32px" }}
        mb={2}
      >
        {title}
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 0, md: 1 }}
        alignItems="flex-start"
      >
        {Array.isArray(description) ? (
          <Stack direction="row" alignItems="center" sx={{ minWidth: 0 }}>
            {description.map((feature, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ minWidth: 0 }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 400,
                    fontSize: { xs: "8px", sm: "8px", md: "10px", lg: "10px" },
                    textAlign: "left",
                    whiteSpace: "nowrap",
                  }}
                >
                  {feature}
                </Typography>
                {description.length - 1 !== index && (
                  <Box
                    sx={{
                      width: "4px",
                      height: "4px",
                      bgcolor: "#D9D9D9",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                )}
              </Stack>
            ))}
          </Stack>
        ) : (
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.80)",
              fontFamily: '"Averta PE"',
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        mt={3}
        sx={{ mb: { xs: 0, sm: 0, md: 3, lg: 3 } }}
      >
        <CustomButton
          onClick={onClick}
          sx={{
            bgcolor: "#1C80FF",
            color: "white",
            fontSize: "10px",
            fontWeight: 500,
            boxShadow: "5px 12px 20px 0 rgba(0, 0, 0, 0.12)",
            "&:hover": {
              bgcolor: "#3884e7",
            },
            borderRadius: 1,
            py: 1,
          }}
        >
          {buttonText}
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default BannerCard;

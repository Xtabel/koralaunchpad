import React from "react";
import { Box, Typography } from "@mui/material";
import Background from "../Paper/Background";

import { AddIcon, EmptyStates } from "@/assets/icons";
import { CustomButton } from "../Button";

interface EmptyCardProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  emptyIcon?: React.ReactNode;
  noStartIcon?: boolean;
  onClick?: () => void;
  extraButtons?: React.ReactNode; // renamed from customButtons
  isMarginTop?: boolean;
  style?: {
    title?: React.CSSProperties;
    subtitle?: React.CSSProperties;
    button?: React.CSSProperties;
  };
}

const EmptyCard = ({
  title,
  subtitle,
  buttonText,
  emptyIcon,
  onClick,
  noStartIcon = false,
  extraButtons,
  isMarginTop = false,
  style,
}: EmptyCardProps) => {
  return (
    <Background
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        height: "500px",
        marginTop: isMarginTop ? "20px" : "0px",
        border: "none",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        {emptyIcon ? (
          emptyIcon
        ) : (
          <EmptyStates.EmptyPageIcon sx={{ fontSize: "100px" }} />
        )}

        <Typography
          fontSize="14px"
          fontWeight={600}
          color="grey.800"
          style={style?.title}
        >
          {title}
        </Typography>

        <Typography
          fontSize="12px"
          fontWeight={400}
          color="grey.600"
          align="center"
          style={style?.subtitle}
        >
          {subtitle.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Typography>

        <Box display="flex" gap={2} mt={1}>
          {buttonText && (
            <CustomButton
              startIcon={!noStartIcon && <AddIcon sx={{color:'white !important'}} />}
              sx={{ px: "20px", py: "10px", fontWeight: 400, fontSize:'12px' }}
              onClick={onClick}
              style={style?.button}
            >
              {buttonText}
            </CustomButton>
          )}

          {extraButtons}
        </Box>
      </Box>
    </Background>
  );
};

export default EmptyCard;

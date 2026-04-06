import { alpha, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Background from "../Paper/Background";

import { VerticalEllipsisDark } from "@/assets/icons";
import React from "react";
import { CustomIconButton } from "../Button";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  rightAdornment?: {
    iconProps?: {
      icon?: React.ReactNode;
      iconDefault?: boolean;
      onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    };
    noIcon?: boolean;
    content?: React.ReactNode;
  };
};

const LayoutPage = ({ title, subtitle, children, rightAdornment }: Props) => {
  const theme = useTheme();
  const { palette } = theme;
  return (
    <Background sx={{ border: "none" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        p={3}
        flexWrap={"wrap"}
        sx={{gap:{xs:2, md:0, width:"100%"}}}
      >
        <Stack>
          <Typography
            color="primary"
            fontFamily="Poppins"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: alpha(palette.text.secondary as string, 0.6) }}
          >
            {subtitle}
          </Typography>
        </Stack>
        {rightAdornment && (
          <Stack direction="row" alignItems="center" gap={1} sx={{justifyContent:'space-between', width:{xs:'100%', md:'fit-content'}}}>
            {rightAdornment?.content}
            {!rightAdornment.noIcon
              ? rightAdornment?.iconProps?.icon ?? (
                  <CustomIconButton
                    onClick={rightAdornment?.iconProps?.onClick}
                  >
                    <VerticalEllipsisDark />
                  </CustomIconButton>
                )
              : null}
          </Stack>
        )}
      </Stack>

      <Stack p={2}>{children}</Stack>
    </Background>
  );
};

export default LayoutPage;

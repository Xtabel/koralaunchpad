import React from "react";
import { styled, useTheme, type Theme } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import { StyledTooltip } from "@/styles/StyledComponents/Tooltip";
import type { StatusChipProps } from "@/types/ui/components/chips";
const getStyles = (theme: Theme) => ({
  Rejected:  { color: theme.palette.error.main,     backgroundColor: theme.palette.error.light,     borderColor: theme.palette.error.light },
  Approved:  { color: theme.palette.success.main,   backgroundColor: theme.palette.success.light,   borderColor: theme.palette.success.light },
  Pending:   { color: theme.palette.warning.main,   backgroundColor: theme.palette.warning.light,   borderColor: theme.palette.warning.light },
  Recalled:  { color: theme.palette.error.main,     backgroundColor: theme.palette.error.light,     borderColor: theme.palette.error.light },
  Ongoing:   { color: theme.palette.secondary.main, backgroundColor: theme.palette.secondary.light, borderColor: theme.palette.secondary.light },
  Upcoming:  { color: theme.palette.info.main,      backgroundColor: theme.palette.info.light,      borderColor: theme.palette.info.light },
  Inactive:  { color: theme.palette.grey.A400,      backgroundColor: theme.palette.grey.A100,         borderColor: theme.palette.grey.A200 },
  Overdue:   { color: theme.palette.warning.main,   backgroundColor: theme.palette.warning.light,   borderColor: theme.palette.warning.light },
  Active:    { color: theme.palette.success.main,   backgroundColor: theme.palette.success.light,   borderColor: theme.palette.success.light },
  Completed: { color: theme.palette.grey.A400,      backgroundColor: theme.palette.grey.A100,         borderColor: theme.palette.grey.A200 },
  Defaulted: { color: theme.palette.error.main,     backgroundColor: theme.palette.error.light,     borderColor: theme.palette.error.light },
  Orange:    { color: theme.palette.warning.dark,   backgroundColor: theme.palette.warning.light,     borderColor: theme.palette.warning.main },
});

interface ChipContainerProps {
  $color: string;
  $backgroundColor: string;
  $borderColor: string;
}

const ChipContainer = styled(Box)<ChipContainerProps>(
  ({ $color, $backgroundColor, $borderColor }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
    borderRadius: "100px",
    color: $color,
    backgroundColor: $backgroundColor,
    border: `1.5px solid ${$borderColor}`,
    minWidth: "80px",
    maxWidth: "100px",
  })
);

interface CustomColor {
  color: string;
  backgroundColor: string;
  borderColor: string;
}

const StatusChip: React.FC<
  StatusChipProps & {
    displayText?: string;
    customColor?: CustomColor;
  }
> = ({ status, sx, displayText, fontSize, tooltip, customColor }) => {
  const theme = useTheme();

  const {
    color = "",
    backgroundColor = "",
    borderColor = "",
  } = customColor ?? getStyles(theme)[status as keyof ReturnType<typeof getStyles>] ?? {};

  return (
    <StyledTooltip title={tooltip}>
      <ChipContainer
        $color={color}
        $backgroundColor={backgroundColor}
        $borderColor={borderColor}
        sx={{ ...sx }}
      >
        <Typography
          variant="caption"
          fontWeight={500}
          sx={{
            fontSize: fontSize ?? { xs: "6px", md: "11px" },
          }}
        >
          {displayText || status}
        </Typography>
      </ChipContainer>
    </StyledTooltip>
  );
};

export default StatusChip;
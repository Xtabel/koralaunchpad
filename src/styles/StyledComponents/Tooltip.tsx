import { styled } from '@mui/material/styles';
import Tooltip, { type TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { type Theme } from '@mui/material/styles';

interface StyledTooltipProps extends TooltipProps {
  width?: string;
}

export const StyledTooltip = styled(({ className, ...props }: StyledTooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))<StyledTooltipProps>(({ theme, width }: { theme: Theme; width?: string }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.grey[800],
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.grey[800],
    width: width ?? '200px',
  },
}));

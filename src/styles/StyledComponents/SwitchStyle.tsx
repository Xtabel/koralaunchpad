import { styled } from '@mui/material/styles';
import Switch, { type SwitchProps } from '@mui/material/Switch';

interface AntSwitchProps extends SwitchProps {
  variant?: "default"|"green";
}

export const AntSwitch = styled(Switch, {
  // This prevents the 'green' prop from being passed to the DOM
  shouldForwardProp: (prop) => prop !== 'green',
})<AntSwitchProps>(({ theme, variant = 'default' }) => ({
  width: 32,
  height: 18,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(13px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 3.5,
    '&.Mui-checked': {
      transform: 'translateX(13px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: variant === "green" ? '#40DD7F' : theme.palette.primary.main,
        ...theme.applyStyles('dark', {
          backgroundColor: '#177ddc',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor: '#D2D1D4',
    boxSizing: 'border-box',
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255,255,255,.35)',
    }),
  },
}));
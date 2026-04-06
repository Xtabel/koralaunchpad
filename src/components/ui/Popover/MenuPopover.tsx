import React, { type ReactNode } from 'react';
import { Popover, type PopoverProps, type SxProps, type Theme } from '@mui/material';

// ----------------------------------------------------------------------

interface MenuPopoverProps extends Omit<PopoverProps, 'children'> {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

const MenuPopover: React.FC<MenuPopoverProps> = ({ children, sx, ...other }) => {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          mt: 1.0,
          ml: 0.5,
          // overflow: 'inherit',
          boxShadow: '10px 20px 40px 0px rgba(37, 40, 43, 0.08)',
          border: (theme) => `solid 1px ${theme.palette.grey[100]}`,
          borderRadius: '20px',
          width: 300,
          ...sx
        }
      }}
      {...other}
    >
      {children}
    </Popover>
  );
};

export default MenuPopover;

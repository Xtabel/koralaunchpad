import { useState } from 'react';
import { Box, Badge, Divider, Typography, Button } from '@mui/material';
import { ActiveNotificationIcon, DefaultNotificationIcon } from '@/assets/icons/Icons';
import MenuPopover from '@/components/ui/Popover/MenuPopover';
import { EmptyStates } from '@/assets/icons';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          padding: '9px 9px',
          minWidth: 0,
          borderRadius: '8px',
          border: 'none', // ✅ remove border
          '&:hover': { border: 'none' },
        }}
      >
        <Badge badgeContent={0} color="error">
          {open ? (
            <ActiveNotificationIcon sx={{ fontSize: '24px', color: 'grey.400' }} />
          ) : (
            <DefaultNotificationIcon sx={{ fontSize: '24px', color: 'text.darker' }} />
          )}
        </Badge>
      </Button>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorEl} sx={{ width: 500 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ActiveNotificationIcon sx={{ color: 'primary.main', fontSize: '20px' }} />
              <Typography variant="subtitle1" color={'text.dark'}>
                Notifications Centre
              </Typography>
            </Box>
            <Box
              sx={{
                paddingY: '60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <EmptyStates.EmptyNotificationIcon sx={{ width: '100px', height: '100px' }} />
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  No notifications to display
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  You will get updated on all activities here
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider />
      </MenuPopover>
    </>
  );
}

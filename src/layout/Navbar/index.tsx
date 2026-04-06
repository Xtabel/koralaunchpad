import {
  Button,
  Divider,
  Toolbar as MuiToolbar,
  Stack,
  useMediaQuery,
  Box,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import ProfileMenu from './Profile';

import NotificationsPopover from './Notification';
import PageTitle from './PageTitle';
import type { NavbarProps } from '@/types/ui';


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isDesktop?: boolean;
  drawerwidth?: number;
  hasNoSidebar?: boolean;
}

const appbarMobile = 64;
const appbarDesktop = 72;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'open' && prop !== 'isDesktop' && prop !== 'drawerwidth' && prop !== 'hasNoSidebar',
})<AppBarProps>(({ theme, isDesktop, drawerwidth, hasNoSidebar }) => ({
  // Remove transitions that might cause movement
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1.5px solid ${theme.palette.grey[100]}`,
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  // FIXED: Mobile always full width (ignore sidebar), desktop accounts for sidebar
  // ServiceProvider always full width with logo
  ...(hasNoSidebar
    ? {
        width: '100%',
        marginLeft: 0,
      }
    : isDesktop
      ? {
          width: `calc(100% - ${drawerwidth}px)`,
          marginLeft: `${drawerwidth}px`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }
      : {
          width: '100%',
          marginLeft: 0,
          // No transitions on mobile
        }),
}));

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  minHeight: appbarMobile,
  [theme.breakpoints.up('lg')]: {
    minHeight: appbarDesktop,
    padding: theme.spacing(0, 3),
  },
}));


const Navbar: React.FC<NavbarProps> = ({ open, handleDrawerOpen, drawerwidth }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <AppBar
      open={open}
      isDesktop={isDesktop}
      drawerwidth={drawerwidth}
      elevation={0}
    >
      <Toolbar sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
          {!open && !isDesktop && (
            <Button color="inherit" onClick={handleDrawerOpen} sx={{ minWidth: 0, mr: 1, p: 1, "&:hover": { backgroundColor: "transparent" } }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <Box sx={{ width: 18, height: 2, backgroundColor: "#333" }} />
                <Box sx={{ width: 18, height: 2, backgroundColor: "#333" }} />
                <Box sx={{ width: 18, height: 2, backgroundColor: "#333" }} />
              </Box>
            </Button>
          )}
          <PageTitle />
        </Box>

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
          <NotificationsPopover />
          <Divider orientation="vertical" sx={{ height: 24, alignSelf: "center", mx: 1 }} />
          <ProfileMenu />
        </Stack>

      </Toolbar>
    </AppBar>
  );
};



export default Navbar;

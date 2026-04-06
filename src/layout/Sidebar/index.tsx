import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Drawer, Stack } from "@mui/material";

import MenuSection from "./MenuSection";
import type { SidebarProps } from "@/types/ui";
import Scrollbar from "@/components/ui/ScrollBar/ScrollBar";
import { SIDEBAR_CONFIG } from "@/routes/SidebarRoutes";
import { logo } from "@/assets";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
  },
}));

export default function Sidebar({
  open,
  handleDrawerClose,
  drawerwidth,
}: SidebarProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const renderContent = (
    <>
      <Box
        sx={{
          pl: 3,
          py: 2.5,
          fontWeight: 700,
          fontFamily: "Avertape, sans-serif",
        }}
      >
        <Stack direction="row" alignItems="center" gap="8px">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "auto", height: "32px", objectFit: "contain" }}
          />
        </Stack>
      </Box>

      <Scrollbar
        sx={{
          mt: 2,
          height: 1,
          "& .simplebar-content": {
            height: 1,
            display: "flex",
            flexDirection: "column",
          },
          "& .simplebar-track": { display: "none" }, // hides the stroke/track
          "& .simplebar-scrollbar": { display: "none" }, // hides the thumb
        }}
      >
        <Box sx={{ mr: 2, ml: 2, pb: 4 }}>
          <MenuSection menuConfig={SIDEBAR_CONFIG} drawerwidth={drawerwidth} />
        </Box>
      </Scrollbar>
    </>
  );

  const drawerSx = {
    width: drawerwidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerwidth,
      boxSizing: "border-box",
      borderRight: `1.5px solid ${theme.palette.grey[100]}`,
      bgcolor: "background.neutral",
    },
  };

  return (
    <RootStyle sx={{ width: isDesktop ? drawerwidth : "auto" }}>
      {!isDesktop && (
        <Drawer
          open={open}
          onClose={handleDrawerClose}
          PaperProps={{ sx: { width: drawerwidth } }}
        >
          {renderContent}
        </Drawer>
      )}
      {isDesktop && (
        <Drawer open variant="persistent" anchor="left" sx={drawerSx}>
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}

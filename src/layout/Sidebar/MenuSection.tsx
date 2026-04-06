import React, { useState } from "react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  Typography,
} from "@mui/material";
import { SmallArrowIOSRightIcon, SmallArrowIOSUpIcon } from "@/assets";
import type { MenuItemProps, MenuSectionProps } from "@/types/ui";

const StyledListItem = styled(ListItemButton)<{
  component?: React.ElementType;
  to?: string;
}>(({ theme }) => ({
  ...theme.typography.caption,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(2.5),
  color: theme.palette.text.primary,
  fontWeight: "fontWeightMedium",
  marginBottom: theme.spacing(0.5),
  "&:hover": { bgcolor: "grey.70", borderRadius: "10px" },
}));

const StyledListItemIcon = styled(ListItemIcon)({ height: 20, minWidth: 30 });

const styles = {
  activeRoot: {
    color: "primary.main",
    bgcolor: "grey.70",
    borderRadius: "10px",
  },
  activeSub: {
    color: "primary.main",
    bgcolor: "grey.70",
    borderRadius: "10px",
  },
  activeIcon: { color: "primary.main" },
};

function MenuItem({ item, active }: MenuItemProps) {
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const isAnyChildActive = children?.some((child) => active(child.path));
  const isActive = isActiveRoot || isAnyChildActive;
  const iconSx = { fontSize: 20 };

  return (
    <>
      <StyledListItem
        onClick={children ? () => setOpen((p) => !p) : undefined}
        sx={isActive ? styles.activeRoot : undefined}
        component={children ? "div" : RouterLink}
        to={children ? undefined : path}
      >
        <StyledListItemIcon sx={isActiveRoot ? styles.activeIcon : undefined}>
          {icon &&
            (isActiveRoot
              ? React.cloneElement(<icon.active />, { sx: iconSx })
              : React.cloneElement(<icon.default />, { sx: iconSx }))}
        </StyledListItemIcon>
        <ListItemText disableTypography primary={title} />
        {info && info}
        {children &&
          (open ? <SmallArrowIOSUpIcon /> : <SmallArrowIOSRightIcon />)}
      </StyledListItem>

      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ display: "flex", gap: 2, ml: 4 }}>
            <Divider orientation="vertical" flexItem />
            <List component="div" disablePadding sx={{ flex: 1 }}>
              {children.map((child) => (
                <StyledListItem
                  key={child.title}
                  component={RouterLink}
                  to={child.path}
                  sx={{
                    flex: 1,
                    fontSize: "12px",
                    color: "text.secondary",
                    ...(active(child.path) ? styles.activeSub : undefined),
                  }}
                >
                  <ListItemText disableTypography primary={child.title} />
                </StyledListItem>
              ))}
            </List>
          </Box>
        </Collapse>
      )}
    </>
  );
}

export default function MenuSection({
  menuConfig,
  ...other
}: MenuSectionProps) {
  const { pathname } = useLocation();
  const match = (path: string) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box {...other}>
      <List disablePadding>
        <Box sx={{ mb: 0.5 }}>
          <Typography
            variant="caption"
            sx={{
              paddingLeft: 2.5,
              color: "text.secondary",
              display: "block", // caption is inline by default — force block
              textAlign: "left", // override any inherited centering
            }}
          >
            MAIN
          </Typography>

          {/* <Typography variant="caption" sx={{ paddingLeft: 2.5, color: "text.secondary" }}>MAIN</Typography> */}
        </Box>
        {menuConfig.main.map((item) => (
          <MenuItem key={item.title} item={item} active={match} />
        ))}
        {menuConfig.management.length > 0 && (
          <>
            <Box sx={{ mt: 4, mb: 1 }}>
              <Typography
                variant="caption"
                sx={{ paddingLeft: 2.5, color: "text.secondary" }}
              >
                MANAGEMENT
              </Typography>
            </Box>
            {menuConfig.management.map((item) => (
              <MenuItem key={item.title} item={item} active={match} />
            ))}
          </>
        )}
      </List>
    </Box>
  );
}

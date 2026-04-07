import React, { useState } from "react";
import { Avatar, Box, MenuItem, ListItemIcon, Typography } from "@mui/material";
import { LogoutIcon } from "@/assets/icons";
import { useNavigate } from "react-router-dom";
import { avatar } from "@/assets";
import { MenuPopover } from "@/components/ui";

// ── Dummy user — swap for real auth later ──────────────────
const DUMMY_USER = {
  name: "Amara Kelechi",
  initials: "AK",
  avatarUrl: avatar,
};

const ProfileMenu: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Avatar
        sx={{
          width: 36,
          height: 36,
          cursor: "pointer",
          bgcolor: "#4B46D0",
          fontSize: "13px",
          fontWeight: 700,
        }}
        src={DUMMY_USER.avatarUrl}
        onClick={handleOpen}
      >
        {DUMMY_USER.initials}
      </Avatar>

      <MenuPopover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: "10px",
            border: "1px solid",
            borderColor: "grey.100",
            overflow: "visible",
          },
        }}
      >
                {/* User info — not clickable */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "grey.100" }}>
          <Typography fontSize="13px" fontWeight={600}>
            {DUMMY_USER.name}
          </Typography>
          <Typography fontSize="11px" color="text.secondary">
            Product Lead
          </Typography>
        </Box>

                {/* Logout */}
        <MenuItem onClick={handleLogout} sx={{ px: 2, py: 1.2, color: "error.main" }}>
          <ListItemIcon sx={{ minWidth: 30 }}>
            <LogoutIcon sx={{ fontSize: 18, color: "error.main" }} />
          </ListItemIcon>
          <Typography fontSize="13px" fontWeight={500}>
            Log out
          </Typography>
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default ProfileMenu;

import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MainContent from "./MainContent";

const PortalLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [windowDimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });


  const drawerwidth: number = 260;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);


  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <CssBaseline />
   
            <Sidebar
              open={open}
              handleDrawerClose={handleDrawerClose}
              drawerwidth={drawerwidth}
            />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Navbar
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              drawerwidth={drawerwidth}
            />
            <MainContent>
              <Outlet />
            </MainContent>
          </Box>
    </Box>
  );
};

export default PortalLayout;

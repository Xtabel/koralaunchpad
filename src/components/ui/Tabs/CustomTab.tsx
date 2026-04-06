import React from "react";
import { Box, Tab, IconButton } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { DownloadIcon } from "@/assets/icons";

interface TabData {
  label: string;
  content: React.ReactNode;
}

interface CustomTabProps {
  tabs: TabData[];
  downloadIcon?: React.ReactNode;
}

const CustomTab: React.FC<CustomTabProps> = ({ tabs, downloadIcon }) => {
  const [value, setValue] = React.useState("0");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const commonStyles = {
    color: "#637381",
    textAlign: "start",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    margin: "-10px",
  };

  return (
    <Box
      sx={{
        typography: "body1",
        margin: "20px",
        padding: "15px 25px 15px 25px",
        width: "auto",
        height: "auto",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1.5px solid #E8E8E8",
            borderColor: "divider",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="custom tabs"
            sx={{
              flexGrow: "1",
              color: "#637381",
              textAlign: "center",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {tabs.map((tab, index) => (
              <Tab label={tab.label} value={index.toString()} key={index} />
            ))}
          </TabList>
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "39px",
              height: "36px",
              backgroundColor: "#032240",
              borderRadius: "5px",
              color: "#FFFFFF",
              padding: "8px 10px 8px 10px",
              "&:hover": {
                backgroundColor: "#1B3A57",
              },
            }}
          >
            {downloadIcon || <DownloadIcon />}
          </IconButton>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel value={index.toString()} sx={commonStyles} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default CustomTab;

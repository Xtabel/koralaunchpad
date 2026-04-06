import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { ListDashesIcon, SquaresFourIcon } from '@/assets/icons';

// Define the type for the tabs
interface TabData {
  icon: React.ReactElement; // Using React element for icons
}

interface CustomTabsProps {
  tabs?: TabData[]; // Optional tabs prop with default
  value: number; // Controlled tab index
  onChange: (event: React.SyntheticEvent, newValue: number) => void; // Callback for tab change
  bgColor?: string; // Optional background color
  activeBgColor?: string; // Optional active tab background color
alignRight?: boolean; // Optional prop to align tabs to the right
}

const CustomIconTabs: React.FC<CustomTabsProps> = ({
  tabs,
  value,
  onChange,
  bgColor = '#f5f5f5',
  activeBgColor = '#ffffff',
   alignRight = true,
}) => {
  // Default tabs with controlled icon colors based on active state
  const defaultTabs: TabData[] = [
    { 
      icon: (
        <SquaresFourIcon 
          sx={{ 
            color: value === 0 ? '#000000' : 'grey.600',
            transition: 'color 0.3s'
          }} 
        />
      ) 
    },
    { 
      icon: (
        <ListDashesIcon 
          sx={{ 
            color: value === 1 ? '#000000' : 'grey.600',
            transition: 'color 0.3s'
          }} 
        />
      ) 
    },
  ];

  const finalTabs = tabs || defaultTabs;

  return (
    <Box sx={{ display: 'flex', justifyContent: alignRight ? 'flex-end' : 'flex-start' }}>
    <Box sx={{ mb:2, borderRadius: 2, bgcolor: bgColor, border:"1px solid #E7E7E7", display: 'inline-flex', overflow: 'hidden' }}>
      <Tabs
        value={value}
        onChange={onChange}
        sx={{
          minHeight: 'unset',
          '& .MuiTabs-indicator': { display: 'none' },
          '& .MuiTabs-flexContainer': { gap: 0 },
          '& .MuiTab-root': {
            minWidth: 'unset',
            minHeight: 'unset',
            p: "10px 7px",
            // borderRadius: 1.5,
            transition: 'background-color 0.3s',
            '& .MuiSvgIcon-root': {
              fontSize: '20px',
            },
            '&.Mui-selected': {
              bgcolor: activeBgColor,
            },
          },
        }}
      >
        {finalTabs.map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            disableRipple
          />
        ))}
      </Tabs>
    </Box>
    </Box>
  );
};

export default CustomIconTabs;
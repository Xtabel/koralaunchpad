// import React, { useState } from "react";
// import { Tabs, Tab, Box } from "@mui/material";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel({ children, value, index, ...other }: TabPanelProps) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`tabpanel-${index}`}
//       aria-labelledby={`tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3, paddingTop: 0 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `tab-${index}`,
//     "aria-controls": `tabpanel-${index}`,
//   };
// }

// interface CustomSideTabProps {
//   tabs: {
//     label: string;
//     icon: React.ReactNode;
//     activeIcon?: React.ReactNode;
//     content: React.ReactNode;
//   }[];
//   orientation?: "horizontal" | "vertical";
// }

// const CustomSideTab: React.FC<CustomSideTabProps> = ({
//   tabs,
//   orientation = "vertical",
// }) => {
//   const [value, setValue] = useState(0);

//   const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{
//       display: "flex",
//       height: "500px", // Set a fixed height for the container
//       overflow: "hidden", // Prevent outer container from scrolling
//     }}>
//       {/* Side Tabs */}
//       <Box sx={{
//         borderRight: orientation === "vertical" ? 1 : 0,
//         borderColor: "#ECEEFB",
//         position: "sticky",
//         top: 0,
//         height: "100%", // Take full height of parent
//         display: "flex",
//         flexDirection: "column",
//       }}>
//         <Tabs
//           orientation={orientation}
//           value={value}
//           onChange={handleChange}
//           aria-label={`${orientation} tabs`}
//           sx={{
//             minWidth: 150,
//             height: "100%",
//             ".MuiTab-root": {
//               margin: "0px 20px 0px 0px",
//               alignItems: "flex-start",
//               textAlign: "left",
//               paddingLeft: 2,
//               fontSize: "12px",
//               fontWeight: 400,
//             },
//             ".Mui-selected": {
//               backgroundColor: "grey.50",
//               borderRadius: "8px",
//               fontWeight: 500,
//               color: "text.darker",
//             },
//             "& .MuiTabs-indicator": {
//               display: "none",
//             },
//           }}
//         >
//           {tabs.map((tab, index) => (
//             <Tab
//               key={index}
//               label={
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   {value === index && tab.activeIcon ? tab.activeIcon : tab.icon}
//                   {tab.label}
//                 </Box>
//               }
//               {...a11yProps(index)}
//             />
//           ))}
//         </Tabs>
//       </Box>

//       {/* Tab Panels */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto", // Scrollable content
//           padding: 0,
//           "&::-webkit-scrollbar": {
//             width: 5,
//             height: 5,
//           },
//           "&::-webkit-scrollbar-track": {
//             backgroundColor: "#fff",
//           },
//           "&::-webkit-scrollbar-thumb": {
//             backgroundColor: "#DCDCDC",
//             borderRadius: 2,
//           },
//         }}
//       >
//         {tabs.map((tab, index) => (
//           <TabPanel key={index} value={value} index={index}>
//             {tab.content}
//           </TabPanel>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default CustomSideTab;
import React, { useState } from 'react'
import {
  Tabs,
  Tab,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, paddingTop: 0 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  }
}

interface CustomSideTabProps {
  tabs: {
    label: string
    icon: React.ReactNode
    activeIcon?: React.ReactNode
    content: React.ReactNode
  }[]
  orientation?: 'horizontal' | 'vertical'
}

const CustomSideTab: React.FC<CustomSideTabProps> = ({
  tabs,
  orientation = 'vertical',
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Mobile breakpoint (< 600px)
  const [value, setValue] = useState(0)
  const [hoveredTab, setHoveredTab] = useState<number | null>(null)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleTouchStart = (index: number) => {
    setHoveredTab(index)
  }

  const handleTouchEnd = () => {
    setHoveredTab(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '500px', // Fixed height for container
        overflow: 'hidden', // Prevent outer container scroll
      }}
    >
      {/* Side Tabs */}
      <Box
        sx={{
          borderRight: orientation === 'vertical' && !isMobile ? 1 : 0,
          borderColor: '#ECEEFB',
          position: 'sticky',
          top: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          width: isMobile ? '50px' : '150px', // Narrower width on mobile
          transition: 'width 0.3s ease', // Smooth width transition
        }}
      >
        <Tabs
          orientation={orientation}
          value={value}
          onChange={handleChange}
          aria-label={`${orientation} tabs`}
          sx={{
            height: '100%',
            '.MuiTab-root': {
              margin: isMobile ? '0 2px' : '0 20px 0 0',
              alignItems: isMobile ? 'center' : 'flex-start',
              textAlign: isMobile ? 'center' : 'left',
              padding: isMobile ? '2px' : '12px 16px',
              minWidth: isMobile ? '40px' : 'auto',
              position: 'relative', // For positioning the overlay
            },
            '.Mui-selected': {
              backgroundColor: isMobile ? 'transparent' : 'grey.50',
              borderRadius: '8px',
              fontWeight: 500,
              color: 'text.darker',
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              onMouseEnter={() => isMobile && setHoveredTab(index)}
              onMouseLeave={() => isMobile && setHoveredTab(null)}
              onTouchStart={() => isMobile && handleTouchStart(index)}
              onTouchEnd={() => isMobile && handleTouchEnd()}
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? 0 : 1,
                    position: 'relative',
                  }}
                >
                  {value === index && tab.activeIcon
                    ? tab.activeIcon
                    : tab.icon}
                  <Typography
                    variant='body2'
                    sx={{
                      display: isMobile ? 'none' : 'block', // Hide text on mobile by default, show on desktop
                      position: isMobile ? 'absolute' : 'static',
                      left: isMobile ? '50px' : 'auto',
                      bgcolor: isMobile ? 'grey.800' : 'transparent',
                      color: isMobile ? 'white' : 'inherit',
                      p: isMobile ? '8px 12px' : 0,
                      borderRadius: isMobile ? '8px' : 0,
                      zIndex: 10,
                      whiteSpace: 'nowrap',
                      boxShadow: isMobile
                        ? '0 2px 8px rgba(0,0,0,0.2)'
                        : 'none',
                      transition: 'opacity 0.2s ease',
                      opacity: isMobile ? (hoveredTab === index ? 1 : 0) : 1, // Always visible on desktop
                    }}
                  >
                    {tab.label}
                  </Typography>
                </Box>
              }
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 0,
          '&::-webkit-scrollbar': {
            width: 5,
            height: 5,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#fff',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#DCDCDC',
            borderRadius: 2,
          },
        }}
      >
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </Box>
  )
}

export default CustomSideTab

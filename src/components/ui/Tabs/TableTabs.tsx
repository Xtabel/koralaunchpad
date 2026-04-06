import React from 'react'
import { Tabs, Tab, Box, useTheme, useMediaQuery } from '@mui/material'

// Define the type for the tabs
interface TabData {
  label: string
  badgeContent?: number // Optional badge content for a badge
}

interface TableTabsProps {
  tabs: TabData[]
  value: number // Controlled tab index
  onChange: (event: React.SyntheticEvent, newValue: number) => void // Callback for tab change
  small?: boolean // Optional prop to make the tabs smaller
  bgColor?: string // Optional prop to set the background color
  activeBgColor?: string // Optional prop to set the active tab background color
  activeTextColor?: string // Optional prop to set the active tab text color
  textColor?: string // Optional prop to set the tab text color
  forSetup?: boolean // Optional prop to set the tab to the full width of its container
  scrollable?: boolean // Optional prop to enable scrollable tabs
}

const TableTabs: React.FC<TableTabsProps> = ({
  tabs,
  value,
  onChange,
  // small,
  bgColor,
  activeBgColor,
  activeTextColor,
  textColor,
  forSetup = false,
  scrollable = true, // Enable scrollable by default
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Check if the screen is mobile size

  return (
    <Box
      sx={
        forSetup
          ? {
              backgroundColor: theme.palette.background.paper,
              borderRadius: '10px',
              padding: '10px',
            }
          : undefined
      }
    >
      <Box
        sx={{
          display: forSetup ? 'flex' : 'inline-flex',
          backgroundColor: bgColor ? bgColor : theme.palette.background.default,
          borderRadius: '10px',
          padding: isMobile ? '1px' : '4px',
          margin: isMobile ? '1px' : '0px',
          height: isMobile ? '40px' : '48px',
          // Ensure the container can handle overflow for scrollable tabs
          overflow: scrollable ? 'hidden' : 'visible',
          width: forSetup ? '100%' : 'auto',
        }}
      >
        <Tabs
          value={value}
          onChange={onChange}
          variant={scrollable ? 'scrollable' : 'standard'}
          scrollButtons={false} // Disable scroll buttons
          allowScrollButtonsMobile={false} // Disable scroll buttons on mobile
          aria-label="custom tab design"
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            // Ensure tabs container takes full width when forSetup is true
            width: forSetup ? '100%' : 'auto',
            minWidth: 0, // Allow shrinking below content size
            '& .MuiTabs-flexContainer': {
              // Add some padding when scrollable to prevent clipping
              // ...(scrollable && { paddingRight: '8px' }),
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: isMobile ? '8px' : '12px',
              lineHeight: isMobile ? '10px' : '16px',
              color: textColor ? textColor : theme.palette.text.secondary,
              minWidth: scrollable ? 'auto' : 'unset', // Allow tabs to be narrower when scrollable
              minHeight: isMobile ? '32px' : '40px',
              // Adjust margin for scrollable tabs
              '&:not(:last-child)': {
                marginRight: scrollable 
                  ? (isMobile ? '4px' : '8px') // Reduced margin for scrollable
                  : (isMobile ? '0px' : '16px'), // Original margin for non-scrollable
              },
              borderRadius: '10px',
              // Add some padding for better touch targets on mobile
              ...(isMobile && scrollable && {
                minWidth: '80px',
                paddingLeft: '8px',
                paddingRight: '8px',
              }),
              '&.Mui-selected': {
                backgroundColor: activeBgColor
                  ? activeBgColor
                  : theme.palette.common.white,
                color: activeTextColor
                  ? activeTextColor
                  : theme.palette.primary.main,
                borderRadius: '10px',
                fontWeight: 600,
                border: `1px solid ${theme.palette.grey[100]}`,
              },
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: {
                      xs: '2px',
                      sm: '2px',
                      lg: scrollable ? '4px' : '8px', // Reduce gap when scrollable
                    },
                    // Prevent text wrapping in scrollable mode
                    whiteSpace: scrollable ? 'nowrap' : 'normal',
                  }}
                >
                  {tab.label}
                  {tab.badgeContent && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        fontSize: isMobile ? '10px' : '12px',
                        fontWeight: 500,
                        height: isMobile ? '16px' : '20px',
                        width: isMobile ? '16px' : '20px',
                        borderRadius: '50%',
                        // Make badge slightly smaller in scrollable mode for better fit
                        ...(scrollable && isMobile && {
                          height: '14px',
                          width: '14px',
                          fontSize: '9px',
                        }),
                      }}
                    >
                      {tab.badgeContent}
                    </Box>
                  )}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  )
}

export default TableTabs
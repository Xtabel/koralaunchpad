import React, { forwardRef, type ReactElement, type ReactNode, type ReactPortal } from 'react';

import { alpha, autocompleteClasses, Box, Typography } from "@mui/material";
import { type Theme } from "@mui/material";
import { ArrowIOSDownIcon } from '@/assets/icons/Icons';

// Define the structure of your option type
type OptionType = {
  label: string; // Example property
  value: string | number; // Example property
  // Add any additional properties that your options may have
};

// Define the structure of the state
type StateType = {
  selected: boolean;
};

// Define the structure of ownerState
type OwnerStateType = {
  getOptionLabel: (option: OptionType) => string | number | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | null | undefined;
};

export default function GlobalStyleOverrides(theme: Theme) {
  return {
    MuiDialogContent: {
      styleOverrides: {
        root: {
          "&::-webkit-scrollbar": {
            width: 5,
            height: 5,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.paper,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.grey[100],
            borderRadius: 2,
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ArrowIOSDownIcon,

      },

      styleOverrides: {
        root: {
          borderRadius: '8px',
          // boxShadow: ,
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.background.disabled,
          }
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        list: {
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          // backgroundImage: `url(${cyan}), url(${red})`,
          backdropFilter: "blur(20px)",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "right top, left bottom",
          backgroundSize: "50%, 50%",
        },

        paper: {
          border: `1px solid ${theme.palette.background.disabled}`,
          boxShadow: "2px 4px 8px 0px rgba(0, 0, 0, 0.08)",
          borderRadius: "10px",
          width: "auto",
          padding: "0px",
          "&::-webkit-scrollbar": {
            width: 5,
            height: 5,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#fff",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.grey[100],
            borderRadius: 2,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          color: "#111827"
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        renderOption: forwardRef<HTMLLIElement, React.HTMLProps<HTMLLIElement> & { key: string; option: OptionType; state: StateType; ownerState: OwnerStateType }>(
          (props, ref) => {
            const { key, option, state, ownerState, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{
                  borderRadius: '8px',
                  margin: '5px',
                  [`&.${autocompleteClasses.option}`]: {
                    padding: '8px',
                    backgroundColor: state.selected ? 'lightgray' : 'white',
                  },
                }}
                ref={ref}
                {...optionProps}
              >
                <Typography fontSize={"12px"} color="grey.900"> {ownerState.getOptionLabel(option)}</Typography>
              </Box>
            );
          }
        )
      },
      styleOverrides: {
        listbox: {
          "&::-webkit-scrollbar": {
            width: 5,
            height: 5,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#fff",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#DCDCDC",
            borderRadius: 2,
          },
        },
        root: {},
        option: {},
        popper: {},
        paper: {
          backgroundColor: "rgba(255, 255, 255, 1)",
          backgroundSize: "50%, 50%",
          padding: "4px",
          borderRadius: "10px",
          border: `1px solid ${theme.palette.background.disabled}`,
          boxShadow: "2px 4px 8px 0px rgba(0, 0, 0, 0.08)"


        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "&:not(& .Mui-selected)": {
            // color: "#032240", // Adjust unselected day text color
            border: "none"
          },
          "& .Mui-selected": {
            backgroundColor: "#1976d2", // Selected day background color
            color: "#ffffff", // Selected day text color
            "&:hover": {
              backgroundColor: "#1565c0", // Selected hover state
            },
          },
        },
        today: {
          borderRadius: "8px",
          border: "1px solid rgba(3, 34, 64, 0.20)",
          color: theme.palette.primary.main,
          fontWeight: 600,
          position: "relative",
          boxSizing: "border-box",
          backgroundColor: "rgba(3, 34, 64, 0.001); !important",
          '&::after': {
            content: '"."',
            position: "absolute",
            bottom: 0,
            fontSize: "15px",
          }
        },
        selected: {
          borderRadius: "8px",
        },

      },
    },
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          backgroundColor: "#fafafa",
          borderRadius: "10px",
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          fontSize: "12px",
          fontWeight: 600,
          color: theme.palette.grey[500]
        }
      }
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        button: {
          border: `1px solid ${theme.palette.background.disabled}`,
          borderRadius: "8px",
          fontSize: "12px"
        }
      }
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        switchViewButton: {
          fontSize: "12px !important"
        }
      }
    },
    MuiPickersYear: {
      styleOverrides: {
        yearButton: {
          fontSize: "12px",
          fontWeight: 500,
          color: theme.palette.grey[800]
        }
      }
    },

    MuiYearCalendar: {
      styleOverrides: {
        root: {
          "&::-webkit-scrollbar": {
            width: 5,
            height: 5,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.paper,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.grey[100],
            borderRadius: 2,
          },
        }
      }
    },
    MuiCardContent:{
      styleOverrides:{
        root:{
          "&:last-child":{paddingBottom:"0px !important"}
          }
      }
    }
  };
}

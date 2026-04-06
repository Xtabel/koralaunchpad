import type { Theme } from "@mui/material";

export default function DataTableOverrides(theme: Theme) {
    return {
        MuiTableContainer: {
            styleOverrides: {
                paper: {
                    overflow: "auto",
                    boxShadow: "none",
                },
                root: {
                    overflowY: "hidden",
                    overflowX: 'hidden',
                    "&:hover": {
                        overflowY: "auto",
                        overflowX: 'auto',
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
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: "transparent",
                    fontSize: "10px",
                    "& .MuiTableRow-root": {

                        // Prevent extra styling on header row
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: "10px 20px", // Consistent padding for cells
                    textAlign: "left",
                    border: "none",
                    whiteSpace: "nowrap", // Prevent text wrapping
                    flex: 1,
                    fontSize: "12px",
                },
                head: {
                    background: "#FAFAFA !important",
                    borderColor: "#E2E2E4",
                    borderStyle: "solid",
                    borderWidth: "1px 0 1px 0"
                },
                body:{
                    fontSize: "12px",
                    color: theme.palette.text.secondary,
                    fontWeight: 400,
                    lineHeight: "160%",
                    letterSpacing: "0.14px",
                    whiteSpace: "nowrap",
                }
            },
        },

        MuiTablePagination: {
            styleOverrides: {
                root: {
                    fontSize: "12px"
                },
                selectLabel: {
                    fontSize: "12px !important"
                },
                displayedRows: {
                    fontSize: "12px"
                },
                toolbar:{
                    padding:"20px"
                }
            }
        }
    };
}

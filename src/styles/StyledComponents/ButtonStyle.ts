
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
export const StyledButton = styled(Button)(
  ({ theme, loading }) => ({
    borderRadius: "8px",
    // boxShadow:
    //   variant !== "outlined" && variant !== "text"
    //     ? "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"
    //     : "none",
    boxShadow:'none',
    fontSize: "9px",

    // [theme.breakpoints.up("md")]: {
    //   fontSize: "12px",
    // },

  ...(!loading && {
      "&.Mui-disabled": {
        color: theme.palette.text.disabled,
      },
    }),
    
    "& .MuiButton-startIcon": {
      fontSize: "10px",
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },
    "& .MuiButton-startIcon>*:nth-of-type(1)": {
      fontSize: "10px",
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },
  })
);
export const LinkStyledButton = styled(Button)(
  ({theme }) => ({
    backgroundColor:'transparent',
    color: "#184AB7",
    fontSize: "11px",
    fontWeight: 500,
    textDecoration:'underline',
    padding:0,
    margin:0,
    textAlign:'left',
    "&:hover": {
      backgroundColor:'transparent',
      textDecoration:'underline',
    },
    "&.Mui-disabled": {
      color: theme.palette.text.disabled,
      backgroundColor:'transparent',
      cursor:'not-allowed'
    },
  })
);

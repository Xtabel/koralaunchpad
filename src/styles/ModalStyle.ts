import { Dialog, type DialogProps, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StyledDialogProps extends DialogProps {
    fullScreen?: boolean;
    right?: number; // Add right property
    width?: string; 
    height?: string; 
    overflow?:string;
}
export const StyledDialog = styled(Dialog)<StyledDialogProps>(({ theme, fullScreen, right, width, height, overflow }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(3),
         ...(overflow && {overflow:overflow}),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(2),
    },
    "& > .MuiBackdrop-root": {
        // background: theme.palette.primary.main,
        background:"#032240",
        opacity: ".3 !important",
    },
    "& .MuiDialog-paper": {
        borderRadius: fullScreen ? "0px" : "20px",
        background: theme.palette.background.paper,
        boxShadow: '5px 20px 40px 0px rgba(37, 40, 43, 0.08)',
        border: `0.5px solid ${theme.palette.background.default}`,
        position: 'fixed',
        right: `${right}px`,
        margin: "20px",
        // Remove fixed width & height using correctly interpolated values:
        height: height ?? 'fit-content',
        width: width,
        transition: 'right 0.3s ease',
    },
}));



export const StyledSplitModalDiv = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    margin: "auto",
    overflow: "hidden",
    background: "transparent"
}));

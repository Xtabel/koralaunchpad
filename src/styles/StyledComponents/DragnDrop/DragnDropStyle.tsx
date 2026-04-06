import { CloudAddIcon } from "@/assets/icons";
import { alpha, Stack, styled, Typography } from "@mui/material";

const DropzoneContainer = styled(Stack)(({ theme }) => ({
    // border: "2px dashed #cccccc",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    textAlign: "center",
    cursor: "pointer",
    width:"100%",
    boxSizing:'border-box',
    backgroundImage:`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' strokeWidth='4' strokeDasharray='6%2c 14' stroke-dashoffset='0' strokeLinecap='square'/%3e%3c/svg%3e")`, 
    "&:hover": {
        borderColor: theme.palette.primary.main,
    },
}));

const CloudIcon = styled(CloudAddIcon)({
    fontSize: 32,
    color: "#003240",
});

const FileHintText = styled(Typography)(({ theme }) => ({
    fontSize: "10px",
    fontWeight: 500,
    color: alpha(theme.palette.primary.light, 0.6),
    marginTop: theme.spacing(1),
    "& span": {
        textDecoration: "underline",
        fontWeight: 500,
        color: theme.palette.primary.main,
    },
}));

export {
    DropzoneContainer,
    CloudIcon,
    FileHintText
}
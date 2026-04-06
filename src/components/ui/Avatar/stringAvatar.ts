import { hexToRgba, stringToColor } from "@/utils/Helperfunc";
import { type SxProps } from "@mui/material";

export function stringAvatar(name: string, color: string, bold: boolean, width: number, height: number, sx?: SxProps) {
    const trimmedName = name?.trim();
    const baseColor = color || stringToColor(trimmedName); 
    const backgroundcolor = hexToRgba(baseColor, 0.1);  // Lightened color for background
  
    const nameParts = trimmedName?.split(" ");
    let initials = "";
  
    if (nameParts?.length === 1) {
      initials = nameParts[0][0];
    } else if (nameParts?.length === 2) {
      initials = `${nameParts[0][0]}${nameParts[1][0]}`;
    } else if (nameParts?.length > 2) {
      initials = `${nameParts[0][0]}${nameParts[nameParts?.length - 1][0]}`;
    }
  
    return {
      sx: {
        color: baseColor, 
        bgcolor: backgroundcolor, 
        fontWeight: bold ? 600 : 500,
        width: width,
        height: height,
        fontSize: bold ? "20px" : "14px",
        ...sx,
      },
      children: initials?.toUpperCase(),
      backgroundcolor,
    };
  }
import { Avatar, type SxProps } from "@mui/material";
import { hexToRgba, stringToColor } from "@/utils/Helperfunc";

// Function to generate avatar's initials and custom styles
function stringAvatar(name: string, color: string, bold: boolean) {
  const trimmedName = name?.trim();
  const baseColor = color || stringToColor(trimmedName);
  const backgroundColor = hexToRgba(baseColor, 0.1);

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
      bgcolor: backgroundColor,
      fontWeight: bold ? 600 : 500,
      width: 40, // Ensure consistent size
      height: 40, // Ensure consistent size
      fontSize: bold ? "20px" : "14px",
    },
    children: initials.toUpperCase(),
  };
}

interface AvatarWithImgProps {
  name: string;
  imageUrl: string;
  status?: string;
  width?: number;
  height?: number;
  sx?: SxProps;
}

// Avatar component that accepts image, status, and color
const AvatarWithImg: React.FC<AvatarWithImgProps> = ({
  name,
  imageUrl,
  status,
  width = 40,  // Default width of 56 if not provided
  height = 40,  // Default height of 56 if not provided
  sx,
}) => {
  return (
    <Avatar
      src={imageUrl}
      alt={name}
      sx={{
        width: width, // Always set the width
        height: height, // Always set the height
        border: status === "Approved" ? "2px solid green" : status === "Inactive" ? "2px solid orange" : "none",
        // For when there's no image URL (uses initials)
        ...(!imageUrl && stringAvatar(name, "", false).sx), // Ensure consistent size even for initials
        ...sx,
      }}
    >
      {/* In case imageUrl is not provided, render initials */}
      {!imageUrl && stringAvatar(name, "", false).children}
    </Avatar>
  );
};

export default AvatarWithImg;

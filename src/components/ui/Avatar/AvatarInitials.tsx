// AvatarInitials.tsx
import { type SxProps } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "./stringAvatar";

export default function AvatarInitials({
	text,
	color = "",
	bold = false,
	width = 40,
	height = 40,
	sx,
}: {
	text: string;
	color?: string;
	bold?: boolean;
	width?: number;
	height?: number;
	sx?: SxProps;
}) {
	const avatarProps = stringAvatar(text, color, bold, width, height, sx);
	return <Avatar {...avatarProps} />;
}

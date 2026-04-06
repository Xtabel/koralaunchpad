import { EmptyStates } from "@/assets/icons";
import { Box, Typography } from "@mui/material";

export default function EmptyListPlaceholder({ msgText, icon }: { msgText?: string, icon?: React.ReactNode }) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "rgba(236, 238, 251, 0.20)",
				border: "1.5px solid #ECEEFB",
				borderRadius: "12px",
				padding: "20px",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{icon ? icon : <EmptyStates.EmptyCardIcon sx={{ fontSize: "70px" }} />}
				<Typography
					sx={{
						color: "grey.600",
						fontSize: "12px",
						marginTop: "10px",
					}}
				>
					{msgText}
				</Typography>
			</Box>
		</Box>
	);
}
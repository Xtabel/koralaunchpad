import { SuccessBadgeIcon } from "@/assets/icons";
import { CustomButton } from "@/components/ui";
import { Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  onClick?: () => void;
};
const AnonymousMessage: React.FC<Props> = ({ onClick }) => {
  return (
    <Stack>
      <SuccessBadgeIcon />
      <Typography>Your idea has been shared successfully</Typography>
      <Typography fontSize={10} sx={{ color: "grey.400", m: 0, p: 0 }}>
        Thanks for sharing your idea! It was submitted anonymously, and we
        didn’t store any personal details. You can always share more ideas!!!!
      </Typography>
      <CustomButton onClick={onClick}>Share Ideas</CustomButton>
    </Stack>
  );
};

export default AnonymousMessage;

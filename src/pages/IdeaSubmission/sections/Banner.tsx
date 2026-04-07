import React from "react";
import { ideaBanner } from "@/assets";
import { BannerCard } from "@/components/ui";
import { Typography } from "@mui/material";



interface ShareIdeaBannerProps {
  handleOpenModal: () => void;
}
const titleSpanStyle = {
  color: "common.white",
  fontFamily: "Averta PE, sans-serif",
  fontSize: "32.187px",
  fontStyle: "italic",
  fontWeight: 900,
  lineHeight: "normal",
};
const titleStyle = {
  color: " #FFF",
  fontFamily: "Averta PE, sans-serif",
  fontSize: " 32.187px",
  fontStyle: " normal",
  fontWeight: " 600",
  lineHeight: " normal",
};

const Banner: React.FC<ShareIdeaBannerProps> = ({ handleOpenModal }) => {
  return (
    <BannerCard
      title={
        <Typography sx={titleStyle}>
          Welcome to{" "}
          <Typography component={"span"} sx={titleSpanStyle}>
            Launchpad
          </Typography>
        </Typography>
      }
      description={"Submit an idea, get it scored, and watch the best ones get built."}
      buttonText="Submit Idea"
      onClick={handleOpenModal}
      bannerImage={ideaBanner}
    />
  );
};

export default Banner;

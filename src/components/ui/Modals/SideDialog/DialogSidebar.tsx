import { OutlineLinkIcon } from "@/assets/icons";
import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

import { LinearProgressWithLabel } from "@/components/ui/Progress/LinearProgressWithLabel";
import { pxToRem } from "@/styles/Themes/typography";
import { StepNavigation } from "@/pages/ApprovalSequence/ManageSequence/sections/SequenceModal/Stepper/StepNavigation";

type Props = {
  activeStep: number;
  steps: string[];
  stepsIcon: ReactNode[];
  modalType: string;
  sidebarDescription: string;
  sidebarTitle: string;
  sidebarIcon?: ReactNode;
};

const DialogSidebar = ({
  steps,
  stepsIcon,
  activeStep,
  modalType,
  sidebarDescription,
  sidebarTitle,
  sidebarIcon,
}: Props) => {
  const theme = useTheme();
  const getRenderText = (modalType: string): string => {
    if (modalType === "add") {
      return "Create";
    } else if (modalType === "view") {
      return "View";
    } else if (modalType === "edit") {
      return "Edit";
    } else {
      return "";
    }
  };

  return (
    <Box
      sx={{
        width: {
          xs: "60px",
          md: "277px",
        },
        padding: {
          xs: "12px 5px 12px 0px",
          md: "35px 17px 35px 0px",
        },
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Stack gap={4}>
        <Stack gap={1}>
          <Stack direction={"row"} gap={pxToRem(10)}>
            {sidebarIcon ? (
              sidebarIcon
            ) : (
              <OutlineLinkIcon
                sx={{
                  fontSize: {
                    xs: "15px",
                    md: "1.5rem",
                  },
                }}
              />
            )}
            <Typography
              variant="subtitle2"
              sx={{
                marginBottom: "16px",
                color: "text.darker",
                fontSize: {
                  xs: "10px",
                  md: "14px",
                },
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              {`${getRenderText(modalType)} ${sidebarTitle ?? ""}`}
            </Typography>
          </Stack>
          <Typography
            variant="caption"
            color={alpha(theme?.palette?.text?.darker as string, 0.8)}
            lineHeight={pxToRem(23)}
            // width={'244px'}
            sx={{
              fontSize: {
                xs: "8px",
                md: "12px",
              },
              width: {
                xs: "80px",
                md: "244px",
              },
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            {sidebarDescription ?? ""}
          </Typography>
        </Stack>
        {/* Step Navigation as Buttons */}
        <StepNavigation
          activeStep={activeStep}
          steps={steps}
          stepsIcon={stepsIcon}
          modalType={modalType}
        />
      </Stack>
      <Box
        position={"absolute"}
        bottom={0}
        width={"100%"}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Typography
          color={"#7B868F"}
          fontSize={"10px"}
          fontWeight={500}
          lineHeight={"16px"}
        >
          Step {activeStep + 1} of {steps.length}
        </Typography>
        <LinearProgressWithLabel
          value={((activeStep + 1) / steps.length) * 100}
        />
      </Box>
    </Box>
  );
};

export default DialogSidebar;

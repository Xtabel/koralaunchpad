import { ArrowRightMini } from "@/assets/icons";
import { CustomButton } from "@/components/ui";
import { StyledTooltip } from "@/styles/StyledComponents/Tooltip/StyledTooltip";
import { Stack, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

type DialogActionsProps = {
  activeStep: number;
  steps: string[];
  handleBack: React.MouseEventHandler;
  handleNext: React.MouseEventHandler;
  disabled: boolean;
  disableNext?: boolean; // New prop for Next button only
  loading: boolean;
  modalType: string;
  handleView: React.MouseEventHandler;
  tooltipMsg?:string;
  actionText?:string;
};
const DialogActions = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
  disabled,
  disableNext,
  loading,
  modalType,
  handleView,
  tooltipMsg,
  actionText,
}: DialogActionsProps) => {
  const theme = useTheme();
  // const initialTooltipMsg = "Choose team(s) to proceed"
  // const [tooltipMsg, setTooltipMsg] = useState(initialTooltipMsg);
  // const teamsData = useAppSelector(theTeamsData);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Reset "clicked" state every time activeStep changes
    setClicked(false);
  }, [activeStep]);

  const handleContinue = (e: React.MouseEvent) => {
    // setClicked(true);
    handleNext(e);
  };

  // Determine the button text for the final step
  const getFinalStepButtonText = () => {
    if (modalType === "add") {
      return `Create ${actionText ?? ''}`;
    } else if (modalType === "update" || modalType === "edit") {
      return `Update ${actionText ?? ''}`;
    } else {
      // When modalType is not "add" or "update", show only actionText
      return actionText ?? 'Submit';
    }
  };
  const getStepButtonText = () => actionText ? actionText : "Continue";

  // Determine if Next button should be disabled
  const isNextDisabled = disableNext !== undefined ? disableNext : disabled;

  return (
    <Stack
      p={2}
      direction={"row"}
      justifyContent={"between"}
      width={"100%"}
      position={"sticky"}
      bottom={0}
      borderTop={"1px solid #DBDDE0"}
      bgcolor={"#fff"}
      height={"fit-content"}
    >
      {/* <Stack width={"180px"}>
                {modalType === "view" ? null : <CustomButton
                    onClick={() => console.log()}
                    sx={{ color: theme.palette.text.darker, width: '100%' }}
                    variant="text"
                >
                    Save to drafts
                </CustomButton>}
            </Stack> */}
      <Stack direction={"row"} justifyContent={"flex-end"} width={"100%"}>
       { activeStep > 0 && (
           <CustomButton
          variant="text"
          onClick={handleBack}
          disabled={disabled}
          sx={{ color: theme.palette.text.darker }}
        >
          Back
        </CustomButton>)}
        {/* <StyledTooltip arrow title={disabled ? tooltipMsg : ""} placement="top"> */}
        <StyledTooltip arrow title={isNextDisabled ? tooltipMsg : ""} placement="top">
          <span
            style={{ cursor: isNextDisabled || clicked ? "not-allowed" : "pointer" }}
          >
            {modalType !== "view" ? (
              <CustomButton
                variant="contained"
                onClick={handleContinue}
                endIcon={activeStep < steps.length - 1 && <ArrowRightMini />}
                disabled={isNextDisabled || clicked}
                loading={loading}
              >
                {activeStep === steps.length - 1
                  ? getFinalStepButtonText()
                  : getStepButtonText()}
              </CustomButton>
            ) : (
              <CustomButton variant="contained" onClick={handleView}>
                {activeStep === steps.length - 1 ? "Close" : "Continue"}
              </CustomButton>
            )}
          </span>
        </StyledTooltip>
      </Stack>
    </Stack>
  );
};

export default DialogActions;

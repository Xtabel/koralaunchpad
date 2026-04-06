import { StyledSplitModalDiv } from '@/styles/StyledComponents/ModalStyle'
import { pxToRem } from '@/styles/Themes/typography'
import { Dialog, DialogContent, useTheme } from '@mui/material'
import DialogMainContent, { StepComponent } from './DialogMainContent'
import DialogSidebar from './DialogSidebar'
import { LoaderMessage } from '../../Loader/Lottifiles/SideDialogLoader'

type Props = {
  open: boolean
  onClose: () => void
  steps: string[]
  stepsIcon: React.ReactNode[]
  activeStep: number
  modalType: string
  stepComponents: StepComponent[]
  title?: string
  subtitle?: string
  sidebarDescription: string
  sidebarTitle: string
  sidebarIcon?: React.ReactNode
  customTitle?: string
  appendToTitle?: {
    prepend?: boolean
    text?: string
  }
  handleNext: () => void
  handleBack: () => void
  actionText?: string
  disabled?: boolean
  disableNext?: boolean
  loadingContent?: boolean
  handleView?: () => void
  loading?: boolean
  loadingMsg?: string
  customLoadingMsg?: string
  loadingScreen?: boolean
  rightOffset?: number
  isCenter?: boolean
  stepDescriptionTemplate?: string
  tooltipMsg?:string
}

const   SideModal = ({
  open,
  steps,
  stepsIcon,
  activeStep,
  modalType,
  stepComponents,
  title,
  subtitle,
  sidebarDescription,
  sidebarTitle,
  sidebarIcon,
  appendToTitle,
  customTitle,
  handleNext,
  handleBack,
  actionText,
  onClose,
  disabled,
  disableNext,
  loadingContent,
  handleView,
  loadingMsg,
  customLoadingMsg,
  loading = false,
  loadingScreen,
  rightOffset = 0,
  isCenter = true,
  stepDescriptionTemplate,
  tooltipMsg,
}: Props) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          borderRadius: '12px',
          // p: pxToRem(25),
          p: {
            xs: pxToRem(8),
            md: pxToRem(25),
          },
          backgroundColor: '#FBFBFB',
          maxWidth: '1100px',
           // Conditionally apply positioning based on isCenter
          ...((!isCenter) && {
            position: 'fixed',
            right: `${rightOffset}px`,
            top: 0,
            bottom: 0,
            margin: '20px',
            transition: 'right 0.3s ease',
          }),
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            background: theme.palette.primary.main,
            opacity: '.3 !important',
          },
        },
      }}
    >
      <DialogContent
        sx={{ display: 'flex', padding: 0, width: '100%', overflow: 'auto' }}
      >
        {!loadingScreen ? (
          <StyledSplitModalDiv elevation={0}>
            {/* Sidebar for Steps */}
            <DialogSidebar
              steps={steps}
              stepsIcon={stepsIcon}
              activeStep={activeStep}
              modalType={modalType}
              sidebarDescription={sidebarDescription}
              sidebarTitle={sidebarTitle}
              sidebarIcon={sidebarIcon}
            />
            {/* Main Content Area */}
            <DialogMainContent
              activeStep={activeStep}
              steps={steps}
              stepComponents={stepComponents}
              title={title}
              subtitle={subtitle}
              appendToTitle={appendToTitle}
              customTitle={customTitle}
              stepDescriptionTemplate={stepDescriptionTemplate??"Step {step}: Kindly fill all {stepName} details below"}
              handleNext={handleNext}
              handleBack={handleBack}
              actionText={actionText}
              handleCloseModal={onClose}
              modalType={modalType}
              // handleView={handleView}
              disabled={disabled ?? false}
              disableNext={disableNext ?? false}
              loading={loading}
              stepComponentProps={{ modalType: 'leave' }}
              loadingContent={loadingContent}
              handleView={handleView}
              tooltipMsg={tooltipMsg}
            />
          </StyledSplitModalDiv>
        ) : (
          <LoaderMessage action={loadingMsg ?? ''} customAction={customLoadingMsg ?? ''} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SideModal

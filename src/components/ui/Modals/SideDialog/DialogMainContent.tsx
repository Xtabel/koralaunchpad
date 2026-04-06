import { CloseIcon } from '@/assets/icons'
import { CircularProgress, CustomIconButton } from '@/components/ui'
import { pxToRem } from '@/styles/Themes/typography'
import { alpha, Stack, styled, Typography, useTheme } from '@mui/material'
import React from 'react'
import DialogActions from './DialogActions'

export type StepComponent = {
  component: React.ComponentType<any> | JSX.Element
  props?: Record<string, unknown>
}

type Props = {
  // Step management
  activeStep: number
  steps: string[]
  stepComponents: StepComponent[]

  // Event handlers
  handleNext: React.MouseEventHandler
  handleBack: React.MouseEventHandler
  handleView?: React.MouseEventHandler
  handleCloseModal: React.MouseEventHandler

  // State
  disabled: boolean
  disableNext?: boolean
  loading: boolean

  // Content configuration
  title?: string
  subtitle?: string
  stepDescriptionTemplate?: string // Template for step description, e.g., "Step {step}: {stepName} for {context}"

  // Additional props for step components
  stepComponentProps?: Record<string, unknown>

  // Styling
  className?: string
  showCloseButton?: boolean
  customTitle?: string
  appendToTitle?: {
    prepend?: boolean
    text?: string
  }
  actionText?: string
  modalType?: string
  loadingContent?: boolean
  tooltipMsg?:string
}

const MainContentWrapper = styled('div')({
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: pxToRem(10),
  background: 'white',
  boxShadow: '10px 0px 4px 0px rgba(0, 0, 0, 0.20)',
  border: '1px solid #DBDDE0',
  // padding: "24px",
  overflow: 'hidden',
})

const HeaderSection = styled('div')({
  position: 'sticky',
  top: 0,
  backgroundColor: 'white',
  zIndex: 1,
  paddingBottom: '16px',
})

const ScrollableContent = styled('div')({
  flexGrow: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: 5,
    height: 5,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#fff',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#DCDCDC',
    borderRadius: 2,
  },
})

const DialogMainContent = ({
  activeStep,
  steps,
  stepComponents,
  handleNext,
  handleBack,
  handleView,
  handleCloseModal,
  disabled,
  disableNext,
  loading,
  title,
  subtitle,
  stepDescriptionTemplate = 'Step {step}: {stepName}',
  stepComponentProps = {},
  className,
  showCloseButton = true,
  appendToTitle = {
    text: '',
    prepend: false,
  },
  customTitle,
  actionText,
  modalType,
  loadingContent = false,
  tooltipMsg
}: Props) => {
  const theme = useTheme()

  const getCurrentStepComponent = () => {
    const currentStepConfig = stepComponents[activeStep]
    if (!currentStepConfig) return null

    const { component, props = {} } = currentStepConfig
    const combinedProps = {
      ...stepComponentProps,
      ...props,
    }

    // If it's a valid React element, return as is (clone to inject props if needed)
    if (React.isValidElement(component)) {
      return React.cloneElement(component, combinedProps)
    }
    // Otherwise, assume it's a component type
    return React.createElement(
      component as React.ComponentType<any>,
      combinedProps
    )
  }

  const getStepDescription = () => {
    if (subtitle) return subtitle

    return stepDescriptionTemplate
      .replace('{step}', (activeStep + 1).toString())
      .replace('{stepName}', steps[activeStep] || '')
  }

  const { text, prepend = false } = appendToTitle || {}
  const finalString = text
    ? prepend
      ? `${text} ${steps[activeStep]}` // Prepend and add description
      : `${steps[activeStep]} ${text}` // Append and add description
    : title ?? customTitle // Default to title or customTitle if no appendToTitle.text

  return (
    <MainContentWrapper
      className={className}
      sx={{
        padding: {
          xs: '10px',
          md: '24px',
        },
      }}
    >
      <HeaderSection>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack gap={0}>
            <Typography
              variant="subtitle1"
              color="text.darker"
              // lineHeight="28px"
              sx={{
                fontSize: {
                  xs: '10px',
                  md: '16px',
                },
                lineHeight: {
                  xs: '20px',
                  md: '28px',
                },
              }}
            >
              {finalString ?? ''}
            </Typography>
            <Typography
              variant="caption"
              // lineHeight="20px"
              color={alpha(theme.palette.text.darker as string, 0.8)}
              sx={{
                lineHeight: {
                  xs: '16px',
                  md: '20px',
                },
                fontSize: {
                  xs: '8px',
                  md: '12px',
                },
                marginY: 1,
              }}
            >
              {getStepDescription()}
            </Typography>
          </Stack>
          {showCloseButton && (
            <CustomIconButton onClick={handleCloseModal}>
              <CloseIcon />
            </CustomIconButton>
          )}
        </Stack>
      </HeaderSection>

      <ScrollableContent>
        {/* {getCurrentStepComponent()} */}
        {loadingContent ? (
          <Stack justifyContent={'center'} alignItems={'center'}>
            <CircularProgress />
            <Typography variant="body2">Loading...</Typography>
          </Stack>
        ) : (
          getCurrentStepComponent()
        )}
      </ScrollableContent>

      <DialogActions
        activeStep={activeStep}
        steps={steps}
        handleNext={handleNext}
        handleBack={handleBack}
        disabled={disabled}
        disableNext={disableNext}
        loading={loading}
        handleView={handleView ?? (() => {})}
        actionText={actionText}
        modalType={modalType ?? ''}
        tooltipMsg={tooltipMsg}
      />
    </MainContentWrapper>
  )
}

export default DialogMainContent

// Example usage for your original use case:
/*
import Step1 from './Stepper/Step1';
import Step2 from './Stepper/Step2';
import Step4 from './Stepper/Step4';

const leaveApprovalSteps = [
    { component: Step1, props: { modalType: 'leave' } },
    { component: Step2, props: { modalType: 'leave' } },
    { component: Step4, props: {} }
];

<DialogMainContent
    activeStep={activeStep}
    steps={['Configuration', 'Setup', 'Review']}
    stepComponents={leaveApprovalSteps}
    title="Leave Approval Sequence Configuration"
    stepDescriptionTemplate="Step {step}: {stepName} for Approval Workflow"
    handleNext={handleNext}
    handleBack={handleBack}
    handleCloseModal={handleCloseModal}
    handleView={handleView}
    disabled={disabled}
    loading={loading}
    stepComponentProps={{ modalType: 'leave' }}
/>
*/

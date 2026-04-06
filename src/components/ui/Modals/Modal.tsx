import React from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  useTheme,
  alpha,
  Slide,
  Fade,
} from '@mui/material'

import { ArrowRightMini, CloseIcon } from '@/assets/icons'

import { type TransitionProps } from '@mui/material/transitions'

import { CustomButton, CustomIconButton } from '../Button'
import type { CustomModalProps } from '@/types'
import { StyledDialog } from '@/styles/ModalStyle'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />
})
const TransitionCenter = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title = 'Your Custom Title',
  subtitle,
  children,
  primaryActionText = 'Continue',
  onPrimaryAction,
  secondaryActionText = 'Cancel',
  onSecondaryAction,
  hideSecondaryAction = false,
  customActions,
  maxWidth,
  fullScreen = false,
  fullWidth = true,
  width = '400px',
  height,
  confirm,
  error = false,
  isCenter = false,
  rightOffset = 0,
  primaryActionDisabled = false,
  loading = false,
  noActionButton = false,
  overflow,
}) => {
  const theme = useTheme()
  const isCaution = confirm?.type === 'caution'
  const isConfirm = confirm?.type === 'confirm'

  const getTitleColor = () => {
    if (!confirm) return theme.palette.text.secondary
    switch (confirm.type) {
      case 'caution':
        return theme.palette.error.main
      case 'success':
        return theme.palette.success.main
      default:
        return theme.palette.text.secondary
    }
  }

  const rightOffsetStyle = !isCenter ? `${rightOffset}px` : ''
  const topStyle = !isCenter ? 0 : 0
  const bottomStyle = !isCenter ? 0 : 0

  return (
    <StyledDialog
      open={isOpen}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      TransitionComponent={isCenter ? TransitionCenter : Transition}
      overflow={overflow}
      PaperProps={{
        sx: {
          position: 'fixed',
          right: rightOffsetStyle,
          overflowX: overflow ? 'auto' : 'hidden',
          ...(maxWidth === undefined && {
            ...(!fullScreen && {
              top: topStyle,
              bottom: bottomStyle,
              height: height || 'auto',
            }),
            width: fullScreen ? '100%' : width || 'auto',
          }),
          transition: 'right 0.3s ease',

          paddingBottom: noActionButton ? '20px' : 0,
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{ padding: confirm ? '16px 24px 0px' : '16px 24px 8px 24px' }}
        >
          <Box
            color={getTitleColor()}
            fontWeight={600}
            lineHeight="28px"
            sx={{
              fontSize: {
                xs: '12px',
                sm: '12px',
                lg: '16px',
                md: '16px',
              },
            }}
          >
            {title}
          </Box>
          {subtitle && (
            <Box
              color={alpha(
                theme.palette.text.secondary,
                0.8
              )}
              fontWeight={400}
              lineHeight="24px"
              sx={{
                fontSize: {
                  xs: '8px',
                  sm: '8px',
                  lg: '10px',
                  md: '12px',
                },
              }}
            >
              {subtitle}
            </Box>
          )}
          {!confirm && (
            <CustomIconButton
              onClick={onClose}
              sx={{ position: 'absolute', right: 8, top: 10 }}
            >
              <CloseIcon />
            </CustomIconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent
        sx={{
          fontSize: confirm ? '14px' : '16px',
          padding: {
            xs: '12px !important',
            md: '24px !important',
          },
        }}
      >
        {confirm ? confirm.message : children}
      </DialogContent>
      {!noActionButton && (
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <DialogActions sx={{ padding: '29px 32px 27px' }}>
            {customActions || (
              <>
                {!hideSecondaryAction && (
                  <CustomButton
                    onClick={onSecondaryAction || onClose}
                    sx={{ color: theme.palette.text.secondary }}
                    variant="text"
                  >
                    {secondaryActionText}
                  </CustomButton>
                )}
                <CustomButton
                  type="submit"
                  onClick={onPrimaryAction}
                  color={!error ? 'primary' : 'error'}
                  sx={{
                    backgroundColor:
                      confirm &&
                      (isCaution ? 'error.buttonbg' : isConfirm?'primary.main' :'success.buttonbg'),
                    '&:hover': {
                      backgroundColor:
                        confirm && (isCaution ? 'error.main' : isConfirm?'primary.main': 'success.main'),
                    },
                  }}
                  variant="contained"
                  endIcon={
                    primaryActionText?.toLowerCase() === 'continue' ? (
                      <ArrowRightMini
                        sx={{ color: theme.palette.common.white }}
                      />
                    ) : null
                  }
                  disabled={primaryActionDisabled}
                  loading={loading}
                >
                  {primaryActionText}
                </CustomButton>
              </>
            )}
          </DialogActions>
        </Box>
      )}
    </StyledDialog>
  )
}

export default CustomModal

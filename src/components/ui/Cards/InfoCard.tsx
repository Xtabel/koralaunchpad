import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  IconButton,
  Tooltip,
  Stack,
  useTheme,
  alpha,
  type SxProps,
} from '@mui/material'
import { InfoIcon, VerticalEllipsis, BrokenArrowRight } from '@/assets/icons'
import { CustomButton } from '../Button'


interface InfoCardProps {
  title: string
  icon: React.ReactNode
  workingDays?: number
  allowanceStatus?: string
  leave?: boolean
  hideTooltip?: boolean
  subtext?: string
  footer?: React.ReactNode | string
  onClick?: () => void | null
  disableCardClick?: boolean
  actionTextColor?: string
  onIconClick?: (event: React.MouseEvent<HTMLElement>) => void | null
  actionText?: string
  styles?: {
    title?: SxProps
    subtext?: SxProps
    description?: SxProps
    card?:SxProps
  }
  iconContainerSx?: SxProps
  iconBgColor?: string
  iconDirection?:'top'| 'left'
  infoMsg?: string
  noAction?: boolean
  status?: boolean
  isActive?: boolean
  setup?: boolean
  subtextPreLine?: boolean
  statusLabel?: string
  statusColor?: string
  subtextRight?: string
  subtextRightColor?: string
  subtextBelow?: React.ReactNode
  actionTextSx?: SxProps
  topSection?:React.ReactNode
  onactionButtonOnlyClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | null
  fixedCardHeight?:string
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  workingDays,
  allowanceStatus,
  leave,
  subtext,
  footer,
  onClick,
  disableCardClick,
  onIconClick,
  hideTooltip,
  actionText,
  actionTextColor,
  onactionButtonOnlyClick,
  styles = {
    title: { color: '#0D163A', fontSize: '13px' },
    subtext: { color: 'grey.600', fontSize: '10px' },
    description: { color: 'grey.600', fontSize: '10px' },
    card:{},
  },
  iconContainerSx,
  iconBgColor,
  iconDirection='left',
  infoMsg,
  noAction,
  isActive,
  status = false,
  setup = false,
  subtextPreLine = false,
  statusLabel,
  statusColor,
  subtextRight,
  subtextRightColor,
  subtextBelow,
  actionTextSx,
  topSection,
  fixedCardHeight
}) => {
  const theme = useTheme()

  const mergedStyles = {
    title: { ...styles.title },
    subtext: { ...styles.subtext },
    description: { ...styles.description },
    card:{...styles.card}
  }

  // Handle card click - prevent event bubbling from action button clicks
  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Don't trigger card click if clicking on action button or icon button
    if (
      (event.target as HTMLElement).closest('.action-button') ||
      (event.target as HTMLElement).closest('.icon-button')
    ) {
      return
    }

    if (!disableCardClick && onClick) {
      onClick()
    }
  }

  // Handle icon button click with event stopping
  const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation() // Prevent card click
    if (onIconClick) {
      onIconClick(event)
    }
  }

  // Handle action button click with event stopping
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation() // Prevent card click
    if (onClick) {
      onClick()
    }
    if(onactionButtonOnlyClick){
      onactionButtonOnlyClick(event)
    }
  }

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        borderRadius: '12px',
        padding: '20px',
        border: `1px solid ${
          theme.palette.mode === 'light'
            ? alpha('rgb(222, 222, 222)', 0.7)
            : theme.palette.grey[100]
        }`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',

        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          ...(onClick &&
            {
              // boxShadow: theme.shadows[2],
              // transform: 'translateY(-2px)',
              // borderColor: theme.palette.primary.main,
            }),
        },
         ...mergedStyles.card,
      }}
      elevation={0}
    >
      <CardContent sx={{ width: '100%', p: '0px' }}>
        <Stack gap={1}>
          {/* Top Section */}
          {topSection ?? ''}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box display="flex" alignItems={iconDirection==="top"?"flex-start":"center"} gap={1.5} flexDirection={iconDirection==="top"?"column":"row"}>
              <IconButton
                disableRipple
                className="icon-button"
                onClick={handleIconClick}
                sx={{
                  width: 45,
                  height: 45,
                  borderRadius: '50%',
                  border: '1px solid #EEEEEE',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `${
                    iconBgColor
                      ? iconBgColor
                      : alpha(theme.palette.grey[100], 0.3)
                  }`,
                  cursor: 'text',
                  ...iconContainerSx,
                }}
              >
                {icon}
              </IconButton>

              <Box>
                <Box display={'flex'} alignItems={'center'} gap={0.5}>
                  <Box
                    sx={{
                      fontWeight: 500,
                      lineHeight: '24px',
                      color: '#0D163A',
                      fontSize: {
                        xs: '13px',
                        md: '16px',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: '13px',
                          md: '16px',
                        },
                        ...mergedStyles.title,
                      }}
                    >
                      {' '}
                      {title.charAt(0).toUpperCase() + title.substring(1)}
                    </Typography>
                  </Box>
                  {!hideTooltip && !leave && (
                    <Tooltip title={infoMsg ?? 'more info'}>
                      <InfoIcon sx={{ fontSize: 'small' }} />
                    </Tooltip>
                  )}
                  {status && (
                    <Typography
                      sx={{
                        fontSize: '10px',
                        bgcolor: isActive ? '#55DA8A14' : 'grey.100',
                        color: isActive ? '#2AC769' : 'grey.600',
                        padding: '4px 6px 3px 6px',
                        borderRadius: '6px',
                      }}
                    >
                      {isActive ? 'Active' : 'Inactive'}
                    </Typography>
                  )}
                  {statusLabel ? (
                    <Box
                      sx={{
                        px: 0.75,
                        py: 0.25,
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: statusColor || '#0D163A',
                        backgroundColor: statusColor
                          ? alpha(statusColor, 0.1)
                          : alpha(theme.palette.success.main, 0.1),
                        ml: 0.5,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {statusLabel}
                    </Box>
                  ) : null}
                </Box>
                <Box display="flex" alignItems="center" gap={0.5} sx={{...(fixedCardHeight &&{height: fixedCardHeight, alignItems:"flex-start"})}}>
                  {subtextRight ? (
                    <Box sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 400,
                            lineHeight: '18px',
                            color: 'grey.600',
                            fontSize: { xs: '8px', md: '10px' },
                            ...mergedStyles.subtext,
                          }}
                        >
                          {leave
                            ? `Maximum of ${workingDays} working days`
                            : subtext}
                        </Typography>
                        <Box
                          sx={{
                            px: 0.75,
                            py: 0.25,
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: 600,
                            color: subtextRightColor || '#0D163A',
                            backgroundColor: subtextRightColor
                              ? alpha(subtextRightColor, 0.1)
                              : alpha(theme.palette.grey[500], 0.1),
                            ml: 1,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {subtextRight}
                        </Box>
                      </Box>
                      {subtextBelow && (
                        <Typography
                          sx={{
                            fontWeight: 400,
                            lineHeight: '18px',
                            color: 'grey.600',
                            fontSize: { xs: '8px', md: '10px' },
                            mt: 0.25,
                            ...(subtextPreLine
                              ? { whiteSpace: 'pre-line' }
                              : {}),
                            ...mergedStyles.description,
                          }}
                        >
                          {subtextBelow}
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <Box sx={{ width: '100%' }}>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          lineHeight: '18px',
                          color: 'grey.600',
                          fontSize: {
                            xs: '8px',
                            md: '10px',
                          },
                          ...(subtextPreLine ? { whiteSpace: 'pre-line' } : {}),
                          ...mergedStyles.subtext,
                        }}
                      >
                        {leave
                          ? `Maximum of ${workingDays} working days`
                          : subtext}
                      </Typography>
                      {subtextBelow && (
                        <Typography
                          sx={{
                            fontWeight: 400,
                            lineHeight: '18px',
                            color: 'grey.600',
                            fontSize: { xs: '8px', md: '10px' },
                            mt: 0.25,
                            ...(subtextPreLine
                              ? { whiteSpace: 'pre-line' }
                              : {}),
                            ...mergedStyles.description,
                          }}
                        >
                          {subtextBelow}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            {!noAction ? (
              <IconButton
                onClick={onIconClick}
                size="small"
                sx={{ position: 'absolute', top: 15, right: 15 }}
              >
                <VerticalEllipsis fontSize="medium" />
              </IconButton>
            ) : null}
          </Box>

          {/* Divider */}
          <Divider sx={{ marginY: 1.5 }} />

          {/* Bottom Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontSize: {
                  xs: '9px',
                  md: '11px',
                },
                fontWeight: 400,
                color: 'grey.600',
              }}
            >
              {leave || setup ? allowanceStatus || '' : footer}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: {
                  xs: '10px',
                  md: '12px',
                },
                fontWeight: 400,
                lineHeight: '18px',
                color: '#032240',
                whiteSpace: 'nowrap',
              }}
            >
              <CustomButton
                // onClick={onClick}
                className="action-button"
                onClick={handleActionClick}
                variant="text"
                endIcon={
                  <BrokenArrowRight
                    sx={{
                      fontSize: {
                        xs: '10px',
                        md: '14px',
                      },
                      color: actionTextColor || '#032240',
                    }}
                  />
                }
                sx={{
                  fontSize: {
                    xs: '10px',
                    md: '12px',
                  },
                  fontWeight: 400,
                  color: actionTextColor || '#032240',
                  '&:hover': {
                    background: 'none',
                  },
                  ...actionTextSx,
                }}
              >
                {actionText ?? (leave ? 'view setup' : 'view')}
              </CustomButton>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default InfoCard

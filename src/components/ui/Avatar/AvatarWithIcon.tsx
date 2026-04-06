import { Badge, Box, useTheme } from '@mui/material'
import AvatarInitials from './AvatarInitials'

interface AvatarTextWithIconProps {
  text: string
  icon: React.ReactNode
  bgColor?: string
}

const AvatarWithIcon = ({
  text,
  icon,
  bgColor = '',
}: AvatarTextWithIconProps) => {
  const theme = useTheme()

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor,
            borderRadius: '8px',
            width: {
              xs: '20px',
              sm: '20px',
              md: '32px',
              lg: '32px',
            },
            height: {
              xs: '14px',
              sm: '14px',
              md: '24px',
              lg: '24px',
            },
            border: `1.5px solid ${theme.palette.common.white}`,
          }}
        >
          {icon}
        </Box>
      }
      sx={{
        '& .MuiBadge-badge': {
          transform: 'translate(50%, 50%)',
        },
      }}
    >
      <AvatarInitials text={text} color={bgColor} bold />
    </Badge>
  )
}

export default AvatarWithIcon

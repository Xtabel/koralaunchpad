import { Box, type SxProps, Typography } from '@mui/material'
import AvatarInitials from './AvatarInitials'

const AvatarWithText = ({
  text,
  width,
  height,
  avatarStyles,
  sx,
}: {
  text: string
  width?: number
  height?: number
  avatarStyles?: SxProps
  sx?: SxProps
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <AvatarInitials
        text={text}
        width={width}
        height={height}
        // sx={avatarStyles}
        sx={{
          ...avatarStyles,
          width: {
            xs: 24,
          },
          height: 24,
        }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary', ...sx }}>
        {text ?? ''}
      </Typography>
    </Box>
  )
}

export default AvatarWithText

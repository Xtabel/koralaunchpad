// Replace the LoadingOverlay import with this inline component or put it in a separate file


import { Box, CircularProgress } from "@mui/material"


export const LoadingOverlay = ({
  active,
  children,
}: {
  active?: boolean
  children: React.ReactNode
  // ignoring the `styles` and `spinner` props since we won't need them
  styles?: unknown
  spinner?: boolean
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      {active && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(3, 34, 64, 0.08)', // matches your existing overlay style
            zIndex: 10,
            borderRadius: 'inherit',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}
import { Paper, useTheme, type SxProps } from '@mui/material'
import React from 'react'

// Extend the props to include an optional sx prop for additional styles
interface BackgroundProps {
    children: React.ReactNode;
    sx?: SxProps; 
}

const Background = ({ children, sx }: BackgroundProps) => {
    const theme = useTheme();
    return (
        <Paper
            elevation={0}
            sx={{
                backgroundColor: theme.palette.background.paper,
                // overflow: "hidden",
                position: "relative",
                borderRadius: "16px",
                border: `1px solid ${theme.palette.grey['A700']}`, 
                p:0,
                ...sx
            }}
        >
            {children}
        </Paper>
    )
}

export default Background
import { EmptyStates } from '@/assets/icons';
import { Stack, Typography } from '@mui/material';
import React from 'react';

interface EmptyTableStateProps {
    message?: string;
    icon?: React.ReactNode; 
}

const EmptyTableState: React.FC<EmptyTableStateProps> = ({ message = "No data available", icon }) => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
        >
            {icon || <EmptyStates.EmptyTableIcon sx={{ fontSize: "300px" }} />}
            <Typography
                variant="body1"
                sx={{
                    mt: 2,
                    color: "#667085",
                    fontSize: "16px",
                    cursor: "default",
                    userSelect: 'none',
                }}
            >
                {message}
            </Typography>
        </Stack>
    );
};

export default EmptyTableState;
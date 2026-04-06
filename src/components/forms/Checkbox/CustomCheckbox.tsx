import React from 'react';
import { Box, Checkbox, FormControlLabel, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { CheckboxIcon, CheckedCheckboxIcon, DisabledCheckedCheckboxIcon, InfoIcon } from '@/assets/icons';

interface CustomCheckboxProps {
  label?: string; 
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  infoMsg?: string;
  hasInfo?: boolean;
  textColor?: string;
  emptyCheckboxColor?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  infoMsg = "your message goes here",
  hasInfo = false,
  textColor,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" gap={0.5} >
      <FormControlLabel
        sx={{ marginRight: "0px" }}
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            disableRipple
            sx={{
              color: "#D2D5DA",
              borderRadius: "400px",
            }}
            icon={<CheckboxIcon />}
            checkedIcon={disabled ? <DisabledCheckedCheckboxIcon /> : <CheckedCheckboxIcon />}
            size="small"
            {...props}
          />
        }
        label={
          label ? (
            <Typography
              color={textColor ? textColor : theme.palette.text.darker}
              variant="caption"
            >
              {label}
            </Typography>
          ) : undefined
        }
      />
      {hasInfo && (
        <Box>
          <Tooltip title={infoMsg}>
            <InfoIcon sx={{ fontSize: "small" }} />
          </Tooltip>
        </Box>
      )}
    </Stack>
  );
};

export default CustomCheckbox;



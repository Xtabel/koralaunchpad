import React from 'react';
import {FormControl, FormGroup, FormHelperText, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import CustomCheckbox from './CustomCheckbox';
import { InfoIcon } from '@/assets/icons';


export interface CheckboxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  infoMsg?: string;
}

export interface CustomCheckboxGroupProps {
  // Required props
  options: CheckboxOption[];
  selectedValues: (string | number)[];
  onChange: (selectedValues: (string | number)[]) => void;
  
  // Optional props
  label?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  row?: boolean;
  size?: 'small' | 'medium';
  name?: string;
  infoMsg?: string;
}

const LabelStyles = {
  fontSize: {
    xs: '10px',
    sm: '10px',
    md: '10px',
    lg: '12px',
  },
  fontWeight: 500,
  lineHeight: '24px',
}

const CustomCheckboxGroup: React.FC<CustomCheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  label,
  disabled = false,
  error = false,
  helperText,
  required = false,
  row = false,
  infoMsg
}) => {
const theme = useTheme();
  const handleCheckboxChange = (value: string | number, checked: boolean) => {
    if (checked) {
      // Add to selected values
      onChange([...selectedValues, value]);
    } else {
      // Remove from selected values
      onChange(selectedValues.filter((item) => item !== value));
    }
  };

  const isChecked = (value: string | number) => selectedValues.includes(value);

  return (
    <FormControl 
      component="fieldset" 
      error={error}
      disabled={disabled}
      fullWidth
    >
      {label && (
        <Typography component='label' sx={LabelStyles}>
          {label}
          {required && (
            <Typography component="span" color="error.main" ml={0.5}>
              *
            </Typography>
          )}
          {infoMsg && (
          <Tooltip title={infoMsg}>
              <InfoIcon sx={{ fontSize: 'small', color:"grey.800", ml: 0.5 }} />
            </Tooltip>
          )}
        </Typography>
      )}
      
      <FormGroup row={row}>
        <Stack 
          direction={row ? "row" : "column"} 
        //   spacing={1}
          flexWrap={row ? "wrap" : "nowrap"}
          gap={row ? 2 : 0}
        >
          {options.map((option) => (
            <CustomCheckbox
              key={option.value}
              label={option.label}
              checked={isChecked(option.value)}
              onChange={(checked) => handleCheckboxChange(option.value, checked)}
              disabled={disabled || option.disabled}
              infoMsg={option.infoMsg}
              hasInfo={!!option.infoMsg}
              textColor={theme.palette.grey[600]}
            />
          ))}
        </Stack>
      </FormGroup>
      
      {helperText && (
        <FormHelperText error={error}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomCheckboxGroup;
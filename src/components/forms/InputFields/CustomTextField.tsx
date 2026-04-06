import { Stack, Tooltip, useTheme, Typography } from '@mui/material'
import { StyledTextField } from '@/styles/Overrides/InputFieldOverrides'
import { type TextFieldProps } from '@mui/material/TextField'
import React from 'react'
import { InfoIcon } from '@/assets/icons'
import { validatePercentage } from '@/utils/Helperfunc'

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
const minLabelStyles = {
  fontSize: '10px',
  fontWeight: 500,
  lineHeight: '24px',
}

type CustomTextFieldProps = {
  label?: string
  name?: string
  placeholder?: string
  required?: boolean
  readOnly?: boolean
  disabled?: boolean
  size?: 'small' | 'medium'
  customLabelStyles?: React.CSSProperties
  value: string | number
  info?: boolean
  infoMsg?: string
  endAdornment?: React.ReactNode | string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string | number
  ) => void // Enhanced onChange
} & Omit<TextFieldProps, 'onChange' | 'value'>

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  name,
  placeholder,
  required,
  readOnly,
  disabled,
  value,
  size = 'medium',
  customLabelStyles,
  onChange,
  InputProps,
  info,
  infoMsg,
  endAdornment,
  ...props
}) => {
  const theme = useTheme()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e?.target?.value
    if (props.type === 'currency') {
      const numericRegex = /^[0-9,.\b]*$/
      if (!numericRegex.test(inputValue)) return
    }
   if (props.type === "percentage") {
    const validValue = validatePercentage(inputValue);

    // Invalid → stop typing
    if (validValue === null) return;
  }

    if (onChange) {
      onChange(e, inputValue) // Pass the event and the value
    }
  }

  return (
    <Stack gap={0.5}>
      <Typography
        component='label'
        sx={{
          ...(size === 'medium' ? LabelStyles : minLabelStyles),
          ...customLabelStyles,
        }}
      >
        {label}{' '}
        {required ? (
          <span style={{ color: theme.palette.error.main }}>*</span>
        ) : null}{' '}
        {info ? (
          <Tooltip title={infoMsg}>
            <InfoIcon sx={{ fontSize: 'small' }} />
          </Tooltip>
        ) : null}
      </Typography>
      <StyledTextField
        {...props}
        fullWidth
        name={name}
        value={value}
        onChange={handleChange} // Bind handler
        placeholder={placeholder}
        disabled={disabled}
        InputProps={{
          readOnly: readOnly ?? false,
          endAdornment: (
                <React.Fragment>
                  {endAdornment}
                </React.Fragment>
              ),
          ...InputProps,
        }}
      />
    </Stack>
  )
}

export default CustomTextField
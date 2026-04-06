import React from "react";
import {
  FormControl,
  MenuItem,
  type SelectChangeEvent,
  Stack,
  useTheme,
  Checkbox,
  Chip,
  Box,
  alpha,
  Typography,
  FormHelperText,
  Tooltip,
} from "@mui/material";
import { StyledSelectField } from "@/styles/Overrides/InputFieldOverrides";
import { CloseIcon, InfoIcon } from "@/assets/icons";
import { AvatarInitials, AvatarWithText } from "@/components/ui/Avatar";


interface Option {
  value: string | number;
  label: string | React.ReactNode;
  chipColor?: string;
  textChipColor?: string;
  disabled?: boolean; // NEW
}

type CustomSelectFieldProps = {
  label?: string;
  value: string | number | (string | number)[];
  onChange: (value: string | number | (string | number)[]) => void;
  options: Option[];
  name?: string;
  fullWidth?: boolean;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  disabled?: boolean;
  placeholder?: string;
  labelSpacing?: string | number;
  required?: boolean;
  multiple?: boolean;
  autoWidth?: boolean;
  native?: boolean;
  optionTextStyle?: React.CSSProperties;
  avatarText?: boolean;
  helperText?: string;
  infoMsg?:string;
};

const LabelStyles = {
  fontSize: {
    xs: "10px",
    sm: "10px",
    md: "10px",
    lg: "12px",
  },
  fontWeight: 500,
  lineHeight: "24px",
};

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  name,
  fullWidth = true,
  variant = "outlined",
  size = "medium",
  disabled = false,
  placeholder,
  required,
  multiple = false,
  optionTextStyle = {},
  avatarText = false,
  helperText,
  infoMsg,
  ...props
}) => {
  const theme = useTheme();

  // Create a handler that satisfies both SelectChangeEvent and ChangeEvent
  const handleChange = (
    event:
      | SelectChangeEvent<unknown>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const selectedValue = event.target.value;

    if (multiple && Array.isArray(selectedValue)) {
      // Handle "Select All" functionality
      if (selectedValue.includes("select-all")) {
        const currentValues = value as (string | number)[];
        const allOptionValues = options
          .filter((opt) => !opt.disabled)
          .map((opt) => opt.value);

        // If all items are selected, deselect all
        if (currentValues.length === options.length) {
          onChange([]);
        } else {
          // Select all items
          onChange(allOptionValues);
        }
      } else {
        onChange(selectedValue as (string | number)[]);
      }
    } else {
      onChange(selectedValue as string | number);
    }
  };

  const getBgColor = (color: string) => alpha(color, 0.1);

  const handleDeleteChip = (
    event: React.MouseEvent,
    valueToDelete: string | number
  ) => {
    event.preventDefault();
    const updatedValues = (value as (string | number)[]).filter(
      (v) => v !== valueToDelete
    );
    onChange(updatedValues);
  };

  const isAllSelected =
    multiple &&
    Array.isArray(value) &&
    options.length > 0 &&
    options.every((option) => value.includes(option.value));

  return (
    <Stack gap={0}>
      {label && (
        <Typography component="label" sx={LabelStyles}>
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}>*</span>
          )}
          {infoMsg && (
            <Tooltip title={infoMsg}>
              <InfoIcon sx={{ fontSize: "small", ml:0.2 }} />
            </Tooltip>
          )}
        </Typography>
      )}

      <FormControl
        fullWidth={fullWidth}
        variant={variant}
        size={size}
        disabled={disabled}
      >
        <StyledSelectField
          {...props}
          value={value}
          onChange={handleChange}
          name={name}
          displayEmpty
          multiple={multiple}
          renderValue={(selected) => {
            if (multiple && Array.isArray(selected)) {
              if (selected.length === 0) {
                return (
                  <span style={{ color: theme.palette.grey[600] }}>
                    {placeholder}
                  </span>
                );
              }
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((val) => {
                    const option = options.find((opt) => opt.value === val);
                    const chipColor =
                      option?.chipColor || theme.palette.grey[300];
                    const textChipColor =
                      option?.textChipColor || theme.palette.grey[300];

                    return (
                      <Chip
                        key={val}
                        label={option?.label}
                        avatar={
                          avatarText && typeof option?.label === "string" ? (
                            <AvatarInitials
                              text={option?.label}
                              width={24}
                              height={24}
                              sx={{
                                fontSize: {
                                  xs: "8px",
                                  sm: "8px",
                                  md: "10px",
                                  lg: "10px",
                                },
                              }}
                            />
                          ) : undefined
                        }
                        deleteIcon={
                          <CloseIcon
                            onMouseDown={(event) => event.stopPropagation()}
                          />
                        }
                        onDelete={(event) => handleDeleteChip(event, val)}
                        size="small"
                        sx={{
                          height: "fit-content",
                          fontSize: {
                            xs: "8px",
                            sm: "8px",
                            md: "10px",
                            lg: "12px",
                          },
                          p: {
                            xs: "2px",
                            md: "5px",
                          },
                          borderRadius: "50px",
                          display: "flex",
                          justifyContent: "space-between",
                          border: `1px solid ${chipColor}`,
                          backgroundColor: getBgColor(chipColor),
                          color: textChipColor,
                          fontWeight: 600,
                          "& .MuiChip-deleteIcon": {
                            color: chipColor,
                            fontSize: {
                              xs: "12px",
                              sm: "12px",
                              md: "14px",
                              lg: "16px",
                            },
                            "&:hover": {
                              color: chipColor,
                            },
                          },
                        }}
                      />
                    );
                  })}
                </Box>
              );
            }

            if (!selected || selected === "") {
              return (
                <span style={{ color: theme.palette.grey[600] }}>
                  {placeholder}
                </span>
              );
            }

            const option = options.find((opt) => opt.value === selected);
            // return option?.label || ''
            return (
              <Typography
                sx={{
                  fontSize: {
                    xs: "8px",
                    sm: "8px",
                    md: "10px",
                    lg: "12px",
                  },
                  fontWeight: 500,
                }}
              >
                {option?.label}
              </Typography>
            );
          }}
        >
          {placeholder && (
            <MenuItem
              value=""
              disabled
              sx={{
                fontSize: {
                  xs: "8px",
                  sm: "8px",
                  md: "10px",
                  lg: "12px",
                },
              }}
            >
              {placeholder}
            </MenuItem>
          )}

          {multiple && (
            <MenuItem value="select-all">
              <Checkbox
                checked={isAllSelected}
                indeterminate={
                  !isAllSelected && Array.isArray(value) && value.length > 0
                }
              />
              Select All
            </MenuItem>
          )}

          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {multiple && (
                <Checkbox
                  checked={Array.isArray(value) && value.includes(option.value)}
                />
              )}
              {avatarText ? (
                <AvatarWithText
                  text={option?.label as string}
                  width={28}
                  height={28}
                  avatarStyles={{
                    fontSize: {
                      xs: "10px",
                      sm: "10px",
                      md: "10px",
                      lg: "12px",
                    },
                  }}
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "10px",
                      md: "12px",
                      lg: "14px",
                    },
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    ...optionTextStyle,
                    fontSize: {
                      xs: "8px",
                      sm: "8px",
                      md: "10px",
                      lg: "12px",
                    },
                  }}
                >
                  {option?.label}
                </Typography>
              )}
            </MenuItem>
          ))}
        </StyledSelectField>
        {helperText && (
          <FormHelperText sx={{ color: theme.palette.error.main }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
};

export default CustomSelectField;

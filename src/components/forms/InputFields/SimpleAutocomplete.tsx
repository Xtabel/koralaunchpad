import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { StyledTextField } from '@/styles/Overrides/InputFieldOverrides'
import { ArrowIOSDownIcon, InfoIcon } from '@/assets/icons'
import {
  Autocomplete,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'

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

interface Option {
  id: number | string
  title: string
  disabled?: boolean
}

interface SimpleAutocompleteProps {
  width?: number | string
  options: Option[]
  value: Option | null
  onChange: (value: Option | null) => void
  placeholder?: string
  label?: string
  formLabel?: string
  error?: boolean
  helperText?: string
  loadingText?: string
  noOptionsText?: string
  disabled?: boolean
  info?: boolean
  infoMsg?: string
  size?: 'small' | 'medium'
  required?: boolean
  customLabelStyles?: React.CSSProperties
  isLoading?: boolean
}

const SimpleAutocomplete: React.FC<SimpleAutocompleteProps> = ({
  width,
  options,
  value,
  onChange,
  label,
  error,
  helperText,
  placeholder = '--Select an option--',
  loadingText = 'Fetching options...',
  noOptionsText = 'No options available',
  disabled,
  info,
  infoMsg,
  size = 'medium',
  required,
  customLabelStyles,
  formLabel,
  isLoading,
}) => {
  const [open, setOpen] = React.useState(false)
  const loading = typeof isLoading === 'boolean' ? isLoading : open && options.length === 0
  const theme = useTheme()

  const normalizedValue = React.useMemo(() => {
    if (!value) return null
    return options.find((opt) => opt.id === value.id) || null
  }, [value, options])

  return (
    <Stack>
      {formLabel && (
        <Typography
          component="label"
          sx={{
            ...(size === 'medium' ? LabelStyles : minLabelStyles),
            ...customLabelStyles,
          } as React.CSSProperties}
        >
          {formLabel}{' '}
          {required && (
            <span style={{ color: theme.palette.error.main }}>*</span>
          )}{' '}
          {info && (
            <Tooltip title={infoMsg}>
              <InfoIcon sx={{ fontSize: 'small' }} />
            </Tooltip>
          )}
        </Typography>
      )}
      <Autocomplete
        sx={{ width }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(option, val) => {
          if (!option || !val) return false
          return option.id === val.id
        }}
        getOptionLabel={(option) => option?.title || ''}
        getOptionDisabled={(option) => option.disabled ?? false}
        disabled={disabled}
        options={options}
        loading={loading}
        value={normalizedValue}
        popupIcon={<ArrowIOSDownIcon />}
        onChange={(_, newValue) => {
          onChange(newValue as Option | null)
        }}
        noOptionsText={
          <Typography
            component="span"
            sx={{ fontSize: { xs: '8px', md: '12px' }, color: 'gray' }}
          >
            {noOptionsText}
          </Typography>
        }
        loadingText={
          <Typography
            component="span"
            sx={{ fontSize: { xs: '8px', md: '12px' }, color: 'gray' }}
          >
            {loadingText}
          </Typography>
        }
        renderOption={(props, option) => {
          const { ...rest } = props
          const isDisabled = option.disabled ?? false

          return (
            <li
              {...rest}
              style={{
                ...rest.style,
                backgroundColor:
                  normalizedValue?.id === option.id ? '#f0f7ff' : 'transparent',
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '10px', md: '14px' },
                  color: isDisabled ? 'text.disabled' : 'text.primary',
                }}
              >
                {option.title}
              </Typography>
            </li>
          )
        }}
        ListboxProps={{
          style: { maxHeight: 300 },
        }}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            placeholder={!normalizedValue ? placeholder : undefined}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            error={error}
            helperText={helperText}
            disabled={disabled}
            sx={{
              '& .MuiInputBase-root': {
                mb: 0,
              },
            }}
          />
        )}
      />
    </Stack>
  )
}

export default SimpleAutocomplete
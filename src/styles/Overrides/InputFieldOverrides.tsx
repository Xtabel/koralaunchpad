import { Select } from '@mui/material';
// src/styles/Overrides/InputFieldOverrides.ts
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

export type ExtendedVariant = TextFieldProps['variant'] | 'round';

type StyledTextFieldProps = Omit<TextFieldProps, 'variant'> & {
  /** Your custom variant control */
  customVariant?: ExtendedVariant;
};

export const StyledTextField = styled(TextField, {
  // ✅ Don't forward customVariant to the DOM / MUI TextField
  shouldForwardProp: (prop) => prop !== 'customVariant',
})<StyledTextFieldProps>(({ theme, customVariant }) => ({
  '.MuiTextField-root': {
    boxSizing: 'border-box',
  },

  '& .MuiInputBase-root': {
    borderRadius: '8px',
    marginBottom: 14,
    color: theme.palette.grey[900],
    fontSize: '12px',
    boxSizing: 'border-box',
  },

  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #D0D5DD',
    padding: 0,
  },

  '& .MuiOutlinedInput-input': {
    padding: '15px 17px',
  },

  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  },

  '& .Mui-disabled': {
    cursor: 'not-allowed',
  },

  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: theme.palette.text.readonly,
    fontSize: '12px',
  },

  '& .MuiFilledInput-root': {
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    padding: 0,
  },

  '& .MuiFilledInput-root:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.06),
  },

  '& .MuiFilledInput-root.Mui-focused': {
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
  },

  '& .MuiFilledInput-input': {
    padding: '15px 17px',
    color: theme.palette.text.darker,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
  },

  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
  },

  '& .MuiInputBase-root:before': {
    borderBottom: 'none !important',
  },

  '& .MuiInputBase-root:after': {
    borderBottom: 'none !important',
  },

  '& .MuiInputBase-root:hover': {
    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  },

  // ✅ Your custom "round" styling
  ...(customVariant === 'round' && {
    '& .MuiOutlinedInput-root': {
      borderRadius: '24px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '24px',
    },
    '& input::placeholder': {
      fontSize: '12px',
      opacity: 0.6,
    },
  }),
}));

export const StyledSelectField = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'InputProps',
})<StyledTextFieldProps>(() => ({
  '& .MuiSelect-select': {
    fontSize: '12px',
    borderRadius: '20px',
    padding: '15px 17px',
  },
  '& .MuiSelect-root': {
    borderRadius: '30px',
  },
  '& .MuiInputBase-root': {
    borderRadius: '70px',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '70px',
  },
  '& .MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
    borderRadius: '80px',
  },
}));

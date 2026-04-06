import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { SearchIcon } from '@/assets/icons';

interface SearchProps {
  size?: string;
  small?: boolean;
}

const Search = styled('div')<SearchProps>(({ theme, small }) => ({
  position: 'relative',
  borderRadius: small ? "8px" : "10px",
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[100]}`,
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

interface SearchIconWrapperProps {
  small?: boolean;
}

const SearchIconWrapper = styled('div')<SearchIconWrapperProps>(({ theme, small }) => ({
  padding: small ? theme.spacing(0, 1) : theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface SearchInputProps {
  small?: boolean;
}

const StyledInputBase = styled(InputBase)<SearchInputProps>(({ theme, small }) => ({
  fontSize: small ? '10px' : '12px',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: small ? theme.spacing(1, 0.5, 1, 0) : theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

interface SearchboxProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  size?: string;
  small?: boolean;
}

export default function CardSearchbox({ small, onChange, placeholder, value }: SearchboxProps) {
  // Add console log to debug
  // console.log("Searchbox value:", value);
  
  return (
    <Search small={small}>
      <SearchIconWrapper>
        <SearchIcon sx={{fontSize: small ? "16px" : "24px"}}/>
      </SearchIconWrapper>
      <StyledInputBase
      small={small}
        placeholder={placeholder || "Search..."}
        inputProps={{ 'aria-label': 'search' }}
        onChange={onChange} // Use onChange directly
        value={value || ""} // Make sure the value is set
      />
    </Search>
  );
}
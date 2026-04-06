import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { SearchIcon } from '@/assets/icons';

interface SearchProps {
  size?: string;
  borderRadius?: string | number;
  widthPx?: number | string;
  heightPx?: number | string;
}

const Search = styled('div')<SearchProps>(({ theme, borderRadius, widthPx, heightPx }) => ({
  position: 'relative',
  borderRadius: borderRadius ?? '100px',
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[100]}`,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  marginLeft: 0,
  width: widthPx ?? '100%',
  height: heightPx,
  [theme.breakpoints.up('sm')]: widthPx
    ? { marginLeft: theme.spacing(1) }
    : { marginLeft: theme.spacing(1), width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontSize: '12px',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
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
  inputWidthCh?: number; // controls input width in ch units on sm+
  borderRadius?: string | number; // controls container border radius
  containerWidthPx?: number; // fixed container width in px
  inputHeightPx?: number; // fixed input height in px
}

export default function Searchbox({ onChange, placeholder, value, inputWidthCh = 30, borderRadius, containerWidthPx, inputHeightPx }: SearchboxProps) {
  return (
    <Search borderRadius={borderRadius} widthPx={containerWidthPx} heightPx={inputHeightPx}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={placeholder || "Search"}
        inputProps={{ 'aria-label': 'search' }}
        onChange={onChange}
        value={value || ""}
        sx={(theme) => ({
          '& .MuiInputBase-input': {
            height: inputHeightPx,
            paddingTop: inputHeightPx ? 0 : undefined,
            paddingBottom: inputHeightPx ? 0 : undefined,
            lineHeight: inputHeightPx ? `${inputHeightPx}px` : undefined,
            [theme.breakpoints.up('sm')]: {
              width: `${inputWidthCh}ch`,
              '&:focus': {
                width: `${inputWidthCh}ch`,
              },
            },
          },
        })}
      />
    </Search>
  );
}
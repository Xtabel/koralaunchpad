import { createTheme } from '@mui/material';
import LIGHTPALETTE from '@/styles/Palette/lightPalette.json';
import { TypographyTheme } from './typography';
import GlobalStyleOverrides from '../Overrides/GlobalStyleOverrides';
import DataTableOverrides from '../Overrides/DataTableOverrides';


export const createCustomTheme = (mode: 'light' | 'dark') => {
  const palette = LIGHTPALETTE;
  const finalPalette = palette;

  // Initialize the theme variable
  const theme = createTheme({
    palette: {
      ...finalPalette,
      mode,
    },
    typography: TypographyTheme,
  });

  return {
    ...theme,
    components: {
      ...GlobalStyleOverrides(theme),
      ...DataTableOverrides(theme),
    },
  };
};


import { createMuiTheme } from '@material-ui/core';

const defaultTheme = createMuiTheme();

const palette = {
  primary: {
    main: '#257DC3',
    dark: '#1B4F94',
    light: '#48a7da',
  },
  background: {
    default: defaultTheme.palette.grey[50],
  },
};

export default createMuiTheme({
  typography: {
    h1: {
      fontSize: 75,
      fontWeight: 800,
    },
    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette,
});

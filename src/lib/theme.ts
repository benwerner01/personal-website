import { createMuiTheme } from '@material-ui/core/styles';

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
  overrides: {
    MuiTypography: {
      root: {
        '& a': {
          fontWeight: 800,
          borderBottom: 4,
          borderBottomStyle: 'solid',
          borderBottomColor: 'transparent',
          color: defaultTheme.palette.common.black,
          transition: defaultTheme.transitions.create(['border-bottom-color', 'color']),
          '&:hover': {
            borderBottomColor: defaultTheme.palette.common.black,
          },
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: 75,
      fontWeight: 800,
    },
    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette,
});

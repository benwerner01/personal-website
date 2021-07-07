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
    MuiContainer: {
      root: {
        paddingTop: defaultTheme.spacing(4),
        paddingBottom: defaultTheme.spacing(4),
        transition: defaultTheme.transitions.create(['padding-top', 'padding-bottom']),
        [defaultTheme.breakpoints.down('sm')]: {
          paddingTop: defaultTheme.spacing(2),
          paddingBottom: defaultTheme.spacing(2),
        },
      },
    },
    MuiButton: {
      endIcon: {
        marginLeft: defaultTheme.spacing(0.5),
      },
      outlined: {
        padding: defaultTheme.spacing(0.5, 1),
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 8,
      },
      elevation1: {
        boxShadow: '0 5px 10px rgba(0,0,0,0.12)',
      },
    },
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
      h3: {
        fontWeight: 800,
      },
    },
    MuiIconButton: {
      root: {
        padding: defaultTheme.spacing(0.5),
        borderRadius: 8,
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

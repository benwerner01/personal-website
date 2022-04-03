import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();

const palette = {
  primary: {
    main: "#257DC3",
    dark: "#1B4F94",
    light: "#48a7da",
  },
  background: {
    default: defaultTheme.palette.grey[50],
  },
};

export default createTheme({
  typography: {
    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: defaultTheme.spacing(4),
          paddingBottom: defaultTheme.spacing(4),
          transition: defaultTheme.transitions.create([
            "padding-top",
            "padding-bottom",
          ]),
          [defaultTheme.breakpoints.down("sm")]: {
            paddingTop: defaultTheme.spacing(2),
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        endIcon: {
          marginLeft: defaultTheme.spacing(0.5),
        },
        outlined: {
          padding: defaultTheme.spacing(0.5, 1),
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: "0 5px 10px rgba(0,0,0,0.12)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "& a": {
            fontWeight: 800,
            borderBottom: 4,
            borderBottomStyle: "solid",
            borderBottomColor: "transparent",
            color: defaultTheme.palette.common.black,
            transition: defaultTheme.transitions.create([
              "border-bottom-color",
              "color",
            ]),
            "&:hover": {
              borderBottomColor: defaultTheme.palette.common.black,
            },
          },
        },
        h1: {
          fontSize: "3rem",
          fontWeight: 800,
        },
        h2: {
          fontSize: "2.5rem",
        },
        h3: {
          fontSize: "2rem",
        },
        h4: {
          fontSize: "1.75rem",
        },
        h5: {
          fontSize: "1.5rem",
        },
        h6: {
          fontSize: "1.25rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: defaultTheme.spacing(0.5),
          borderRadius: 8,
        },
      },
    },
  },
});

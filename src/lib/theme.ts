import { createTheme, ThemeOptions } from "@mui/material";

const defaultTheme = createTheme();

export const createCustomTheme = (params: { dark: boolean }) => {
  const { dark } = params;

  const palette: ThemeOptions["palette"] = {
    primary: {
      main: "#257DC3",
      dark: "#1B4F94",
      light: "#48a7da",
    },
    background: {
      default: dark
        ? defaultTheme.palette.common.black
        : defaultTheme.palette.grey[50],
    },
    text: {
      primary: dark
        ? defaultTheme.palette.common.white
        : defaultTheme.palette.common.black,
    },
    mode: dark ? "dark" : "light",
  };

  return createTheme({
    typography: {
      fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    palette,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: defaultTheme.transitions.create("background-color"),
          },
        },
      },
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
              color: palette.text.primary,
              transition: defaultTheme.transitions.create([
                "border-bottom-color",
                "color",
              ]),
              "&:hover": {
                borderBottomColor: palette.text.primary,
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
};

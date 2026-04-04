import { createTheme, type ThemeOptions } from "@mui/material/styles";

export const createDynamicTheme = (customBackground?: string) => {
  const backgroundColor = customBackground || "#0D0D0D";
  
  const themeOptions: ThemeOptions = {
    palette: {
      mode: "dark",
      primary: {
        main: "#FFB4AB",
        light: "#FFCCC7",
        dark: "#CB9B91",
        contrastText: "#442726",
      },
      secondary: {
        main: "#E6C2BF",
        light: "#F0E1DF",
        dark: "#C69C98",
        contrastText: "#3D2826",
      },
      error: {
        main: "#F2B8B5",
        light: "#F7D7D4",
        dark: "#C8928D",
        contrastText: "#601410",
      },
      background: {
        default: backgroundColor,
        paper: "#1A1A1A",
      },
      text: {
        primary: "#FAFAFA",
        secondary: "#A0A0A0",
      },
      divider: "#2D2D2D",
    },
    typography: {
      fontFamily: '"Inter", "Product Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
      body1: {
        letterSpacing: "0",
      },
      body2: {
        letterSpacing: "0",
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: "smooth",
          },
          body: {
            backgroundColor: backgroundColor,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 8,
            padding: "10px 20px",
            letterSpacing: "0.01em",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
          outlined: {
            borderColor: "#3D3D3D",
            "&:hover": {
              borderColor: "#FFB4AB",
              backgroundColor: "rgba(255, 180, 171, 0.08)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            backgroundImage: "none",
            backgroundColor: "#1A1A1A",
            border: "1px solid #2D2D2D",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(13, 13, 13, 0.8)",
            backdropFilter: "blur(20px)",
            boxShadow: "none",
            borderBottom: "1px solid #2D2D2D",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
              "& fieldset": {
                borderColor: "#3D3D3D",
              },
              "&:hover fieldset": {
                borderColor: "#4D4D4D",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFB4AB",
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            minWidth: 100,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#1A1A1A",
            borderLeft: "1px solid #2D2D2D",
          },
        },
      },
      MuiSwitch: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            width: 52,
            height: 28,
            padding: 0,
          },
          switchBase: {
            padding: 2,
            "&.Mui-checked": {
              transform: "translateX(24px)",
              "& + .MuiSwitch-track": {
                backgroundColor: "#FFB4AB",
                opacity: 1,
              },
              "& .MuiSwitch-thumb": {
                backgroundColor: "#fff !important",
                color: "#fff",
              },
            },
          },
          thumb: {
            backgroundColor: "#fff",
            width: 24,
            height: 24,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            color: "#fff",
          },
          track: {
            backgroundColor: "#4a4a4a",
            borderRadius: 14,
            opacity: 1,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            backgroundColor: "#1A1A1A",
            border: "1px solid #2D2D2D",
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

export const theme = createDynamicTheme();
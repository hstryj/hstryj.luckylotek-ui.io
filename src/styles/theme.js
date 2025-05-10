import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#54b973", // szmaragdowa zieleń
    },
    secondary: {
      main: "#f0c867", // cieplejsze złoto
    },
    background: {
      default: "#143d2a", // ciemna zieleń tła
      paper: "#fef9ec", // jasne tło kart
    },
  },
  typography: {
    fontFamily: "'Quicksand', sans-serif",
    h1: {
      fontWeight: 700,
      color: "#d9d914",
      fontSize: "3rem"
    },
    h2: {
      fontWeight: 600,
      color: "#c0eb34",
    },
    h3: {
      fontWeight: 600,
      color: "#fff",
    },
    h4: {
      fontWeight: 600,
      color: "#d9d914",
    },
    h5: {
      fontWeight: 600,
      color: "#fff",
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Quicksand', sans-serif",
        },
        h1: {
          fontFamily: "'Quicksand', sans-serif",
          fontWeight: 700,
          color: "#fff",
        },
        h2: {
          fontFamily: "'Quicksand', sans-serif",
          fontWeight: 600,
          color: "#fff",
        },
        button: {
          fontFamily: "'Quicksand', sans-serif",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(135deg, #f9d976, #f39f36), url("/3px-tile.png")`,
          backgroundSize: "80px 80px",
          backgroundRepeat: "repeat",
          backgroundBlendMode: "soft-light",
          color: "#222",
          borderRadius: 16,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
          padding: "12px 24px",
          background: "linear-gradient(to right, #b4ec51, #429321)",
          color: "#fff",
          textTransform: "uppercase",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          fontSize: "1.2rem",
          '&:hover': {
            background: "linear-gradient(to right, #9bcf3f, #357c1e)",
            borderRadius: "999px",
            padding: "0.75rem 1.5rem",
            fontSize: "1.3rem",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#fffdd0",
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(to right, #cde880, #7ec850)",
          color: "#111",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        },
      },
    },
  },
});
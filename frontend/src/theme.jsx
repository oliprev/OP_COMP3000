import { createTheme } from '@mui/material/styles';

const darkCyberTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0ea5e9"
    },
    secondary: {
      main: "#64ffda"
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b"
    },
    text: {
      primary: "#e2e8f0",
      secondary: "#94a3b8",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(4px)",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "0.75rem",
        },
      },
    },
  },
});

export default darkCyberTheme;

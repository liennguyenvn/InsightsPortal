import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#00c8a0',
      light: '#26d9b0',
      dark: '#009d7e',
    },
    secondary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    success: {
      main: '#52c41a',
    },
    warning: {
      main: '#faad14',
    },
    error: {
      main: '#ff4d4f',
    },
    info: {
      main: '#1890ff',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

// Sidebar & Dashboard specific colors
export const sidebarStyles = {
  bgColor: '#0a2a2a',
  textColor: '#8bb5a5',
  activeColor: '#00c8a0',
  activeBg: '#123a3a',
};

export const chartColors = {
  blue: '#1976d2',
  purple: '#7b1fa2',
  orange: '#f57c00',
  teal: '#00c8a0',
  red: '#d32f2f',
  green: '#388e3c',
};

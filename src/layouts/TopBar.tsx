import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Breadcrumbs,
  Link,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  Logout,
} from '@mui/icons-material';
import { useAuth } from '../features/auth/AuthContext';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    window.location.href = '/login';
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: '#ffffff',
        color: '#333',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ flex: 1 }}>
          <Breadcrumbs sx={{ mb: 0.5 }}>
            <Link href="/" color="inherit" sx={{ cursor: 'pointer' }}>
              Home
            </Link>
            <span>Ai Merchant Insights Portal</span>
          </Breadcrumbs>
          <Box sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
            Ai Merchant Insights Portal
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>

          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ width: 32, height: 32, backgroundColor: '#00c8a0' }}>
              {user?.name.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>
              {user?.name} ({user?.role})
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ display: 'flex', gap: 1 }}>
              <Logout fontSize="small" /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

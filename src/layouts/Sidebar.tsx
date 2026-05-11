import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Collapse,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard,
  Apps,
  Security,
  People,
  PhoneAndroid,
  Assessment,
  Settings,
  ExpandLess,
  ExpandMore,
  CreateNewFolder,
} from '@mui/icons-material';
import { sidebarStyles } from '../theme';

const drawerWidth = 220;

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Dashboard /> },
  { id: 'report-designer', label: 'Report Designer', icon: <CreateNewFolder /> },
  {
    id: 'app-manager',
    label: 'App Manager',
    icon: <Apps />,
    children: [
      { id: 'app-1', label: 'App 1', icon: <Apps /> },
      { id: 'app-2', label: 'App 2', icon: <Apps /> },
    ],
  },
  {
    id: 'cloud-security',
    label: 'Cloud Security',
    icon: <Security />,
    children: [
      { id: 'security-1', label: 'Security 1', icon: <Security /> },
    ],
  },
  {
    id: 'stakeholders',
    label: 'Stakeholders',
    icon: <People />,
    children: [
      { id: 'stakeholder-1', label: 'Stakeholder 1', icon: <People /> },
    ],
  },
  {
    id: 'devices-manager',
    label: 'Devices Manager',
    icon: <PhoneAndroid />,
    children: [
      { id: 'device-1', label: 'Device 1', icon: <PhoneAndroid /> },
    ],
  },
  { id: 'audit-log', label: 'Audit Log', icon: <Assessment /> },
  { id: 'global-setting', label: 'Global Setting', icon: <Settings /> },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);

  const handleToggleExpand = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getNavigationPath = (itemId: string): string | null => {
    const pathMap: Record<string, string> = {
      dashboard: '/dashboard',
      'report-designer': '/report-designer',
    };
    return pathMap[itemId] || null;
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const navPath = getNavigationPath(item.id);
    const isActive = location.pathname === navPath;

    return (
      <React.Fragment key={item.id}>
        <ListItemButton
          onClick={() => {
            if (hasChildren) {
              handleToggleExpand(item.id);
            } else if (navPath) {
              navigate(navPath);
            }
            if (isMobile) onClose();
          }}
          selected={isActive}
          sx={{
            pl: 2 + level * 2,
            backgroundColor:
              isActive
                ? sidebarStyles.activeBg
                : 'transparent',
            color:
              isActive
                ? sidebarStyles.activeColor
                : sidebarStyles.textColor,
            '&:hover': {
              backgroundColor: sidebarStyles.activeBg,
              color: sidebarStyles.activeColor,
            },
            borderLeft:
              isActive
                ? `3px solid ${sidebarStyles.activeColor}`
                : 'none',
          }}
        >
          <ListItemIcon
            sx={{
              color: 'inherit',
              minWidth: 40,
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{ variant: 'body2' }}
          />
          {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((child) => renderNavItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          borderBottom: `1px solid ${sidebarStyles.textColor}`,
        }}
      >
        <Box
          sx={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: sidebarStyles.activeColor,
          }}
        >
          MMS
        </Box>
      </Box>
      <List sx={{ flex: 1, pt: 1 }}>
        {navItems.map((item) => renderNavItem(item))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={open}
          onClose={onClose}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: sidebarStyles.bgColor,
              color: sidebarStyles.textColor,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: sidebarStyles.bgColor,
              color: sidebarStyles.textColor,
              borderRight: 'none',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

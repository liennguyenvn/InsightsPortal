import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SettingsIcon from '@mui/icons-material/Settings';
import { WidgetConfig } from '../../types';
import { WidgetRenderer } from './WidgetRenderer';

interface WidgetWrapperProps {
  config: WidgetConfig;
  data: any[];
  loading: boolean;
  error?: string;
  onRefresh?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  config,
  data,
  loading,
  error,
  onRefresh,
  onEdit,
  onRemove
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExport = () => {
    const csv = convertToCSV(data);
    downloadCSV(csv, `${config.title}.csv`);
    handleMenuClose();
  };

  const handleEdit = () => {
    onEdit?.();
    handleMenuClose();
  };

  const handleRemove = () => {
    onRemove?.();
    handleMenuClose();
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={config.title}
        subheader={`Dataset: ${config.datasetId}`}
        action={
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        sx={{ backgroundColor: '#f5f5f5', pb: 1 }}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleExport}>
          <FileDownloadIcon sx={{ mr: 1 }} fontSize="small" />
          Export CSV
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <SettingsIcon sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
      </Menu>

      <CardContent sx={{ flex: 1, overflow: 'auto' }}>
        {loading ? (
          <Box>
            <Skeleton variant="rectangular" height={300} sx={{ mb: 2 }} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </Box>
        ) : (
          <WidgetRenderer config={config} data={data} error={error} />
        )}
      </CardContent>

      {onRefresh && (
        <CardActions>
          <Button size="small" onClick={onRefresh} disabled={loading}>
            Refresh
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

function convertToCSV(data: any[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const rows = data.map(row =>
    headers.map(header => {
      const value = row[header];
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      return value;
    }).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

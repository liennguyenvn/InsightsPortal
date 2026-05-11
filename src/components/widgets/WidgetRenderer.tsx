import React from 'react';
import { WidgetConfig } from '../../types';
import { LineChartWidget, BarChartWidget, PieChartWidget, DataTableWidget } from '../visualizations';
import { Box } from '@mui/material';

interface WidgetRendererProps {
  config: WidgetConfig;
  data: any[];
  loading?: boolean;
  error?: string;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({ config, data, loading, error }) => {
  if (loading) {
    return <Box sx={{ p: 2, textAlign: 'center' }}>Loading...</Box>;
  }

  if (error) {
    return <Box sx={{ p: 2, color: 'error.main' }}>Error: {error}</Box>;
  }

  switch (config.type) {
    case 'line':
      return <LineChartWidget data={data} dimensions={config.dimensions} measures={config.measures} />;
    case 'bar':
      return <BarChartWidget data={data} dimensions={config.dimensions} measures={config.measures} />;
    case 'pie':
      return <PieChartWidget data={data} dimensions={config.dimensions} measures={config.measures} />;
    case 'table':
      return <DataTableWidget data={data} columns={[...config.dimensions, ...config.measures]} />;
    default:
      return <Box sx={{ p: 2 }}>Unknown widget type: {config.type}</Box>;
  }
};

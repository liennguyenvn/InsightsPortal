import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ReportDesigner as ReportDesignerComponent } from '../components/designer';
import { useWidgets } from '../features/dashboard/WidgetsContext';
import { DatasetMetadata, WidgetConfig } from '../types';

/**
 * Report Designer Page
 * Metadata-driven UI for building custom reports and dashboards.
 * Features:
 * - Schema Explorer: browse datasets and fields
 * - Configuration Panel: configure charts and filters
 * - Live Preview: real-time visualization
 */

const MOCK_DATASETS: DatasetMetadata[] = [
  {
    id: 'sales',
    name: 'Sales Data',
    dimensions: [
      { id: 'date', name: 'Date', type: 'date' },
      { id: 'region', name: 'Region', type: 'category' },
      { id: 'product', name: 'Product', type: 'category' }
    ],
    measures: [
      { id: 'revenue', name: 'Revenue', type: 'sum' },
      { id: 'units_sold', name: 'Units Sold', type: 'sum' },
      { id: 'avg_price', name: 'Average Price', type: 'average' }
    ]
  },
  {
    id: 'traffic',
    name: 'Website Traffic',
    dimensions: [
      { id: 'date', name: 'Date', type: 'date' },
      { id: 'page', name: 'Page', type: 'category' },
      { id: 'device', name: 'Device', type: 'category' }
    ],
    measures: [
      { id: 'pageviews', name: 'Page Views', type: 'count' },
      { id: 'sessions', name: 'Sessions', type: 'count' },
      { id: 'avg_duration', name: 'Avg Duration', type: 'average' }
    ]
  }
];

interface ReportDesignerPageProps {
  onSave?: (config: WidgetConfig) => void;
  onCancel?: () => void;
}

export const ReportDesignerPage: React.FC<ReportDesignerPageProps> = ({
  onSave,
  onCancel
}) => {
  const navigate = useNavigate();
  const { addWidget } = useWidgets();

  const handleSave = (config: WidgetConfig) => {
    console.log('Report saved:', config);

    // Add widget to context/localStorage
    addWidget(config);

    // Call parent callback if provided
    onSave?.(config);

    // Navigate back to dashboard
    navigate('/dashboard', { replace: true });
  };

  const handleCancel = () => {
    console.log('Report designer cancelled');
    onCancel?.();

    // Navigate back to dashboard
    navigate('/dashboard', { replace: true });
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <ReportDesignerComponent
        datasets={MOCK_DATASETS}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default ReportDesignerPage;

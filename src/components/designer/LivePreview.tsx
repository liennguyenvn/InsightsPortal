import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { ReportDesignerState, WidgetConfig } from '../../types';
import { WidgetRenderer } from '../widgets/WidgetRenderer';
import { validateWidgetConfig } from '../../config/widget-registry';

interface LivePreviewProps {
  state: ReportDesignerState;
  data: any[];
}

export const LivePreview: React.FC<LivePreviewProps> = ({ state, data }) => {
  if (!state.selectedDataset) {
    return (
      <Alert severity="info">
        Please select a dataset to see the preview
      </Alert>
    );
  }

  const mockConfig: WidgetConfig = {
    id: 'preview',
    type: state.chartType,
    title: 'Preview',
    datasetId: state.selectedDataset.id,
    dimensions: state.selectedDimensions,
    measures: state.selectedMeasures,
    filters: state.filters
  };

  const validation = validateWidgetConfig(mockConfig);

  if (!validation.valid) {
    return (
      <Alert severity="warning">
        <Typography variant="body2" sx={{ mb: 1 }}>
          Configuration incomplete:
        </Typography>
        {validation.errors.map((error, idx) => (
          <Typography key={idx} variant="caption" display="block">
            • {error}
          </Typography>
        ))}
      </Alert>
    );
  }

  return (
    <Box sx={{ minHeight: 300 }}>
      <WidgetRenderer config={mockConfig} data={data} />
    </Box>
  );
};

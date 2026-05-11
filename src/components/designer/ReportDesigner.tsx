import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  Divider
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatasetMetadata, WidgetConfig, ReportDesignerState } from '../../types';
import { SchemaExplorer } from './SchemaExplorer';
import { ConfigurationPanel } from './ConfigurationPanel';
import { LivePreview } from './LivePreview';

interface ReportDesignerProps {
  datasets: DatasetMetadata[];
  onSave?: (config: WidgetConfig) => void;
  onCancel?: () => void;
  initialConfig?: WidgetConfig;
}

export const ReportDesigner: React.FC<ReportDesignerProps> = ({
  datasets,
  onSave,
  onCancel,
  initialConfig
}) => {
  const [state, setState] = useState<ReportDesignerState>({
    selectedDimensions: initialConfig?.dimensions || [],
    selectedMeasures: initialConfig?.measures || [],
    filters: initialConfig?.filters || [],
    chartType: initialConfig?.type || 'bar',
    selectedDataset: datasets.find(d => d.id === initialConfig?.datasetId)
  });

  const handleDimensionToggle = (dimensionId: string) => {
    setState(prev => ({
      ...prev,
      selectedDimensions: prev.selectedDimensions.includes(dimensionId)
        ? prev.selectedDimensions.filter(d => d !== dimensionId)
        : [...prev.selectedDimensions, dimensionId]
    }));
  };

  const handleMeasureToggle = (measureId: string) => {
    setState(prev => ({
      ...prev,
      selectedMeasures: prev.selectedMeasures.includes(measureId)
        ? prev.selectedMeasures.filter(m => m !== measureId)
        : [...prev.selectedMeasures, measureId]
    }));
  };

  const handleDatasetSelect = (dataset: DatasetMetadata) => {
    setState(prev => ({
      ...prev,
      selectedDataset: dataset,
      selectedDimensions: [],
      selectedMeasures: [],
      filters: []
    }));
  };

  const handleChartTypeChange = (type: WidgetConfig['type']) => {
    setState(prev => ({
      ...prev,
      chartType: type
    }));
  };

  const handleFilterAdd = (filter: any) => {
    setState(prev => ({
      ...prev,
      filters: [...prev.filters, filter]
    }));
  };

  const handleFilterRemove = (index: number) => {
    setState(prev => ({
      ...prev,
      filters: prev.filters.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!state.selectedDataset) return;

    const config: WidgetConfig = {
      id: initialConfig?.id || `widget-${Date.now()}`,
      type: state.chartType,
      title: initialConfig?.title || `New ${state.chartType} Report`,
      datasetId: state.selectedDataset.id,
      dimensions: state.selectedDimensions,
      measures: state.selectedMeasures,
      filters: state.filters
    };

    onSave?.(config);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Report Designer</Typography>
        <Divider />
      </Box>

      <Grid container spacing={3}>
        {/* Schema Explorer */}
        <Grid item xs={12} md={3}>
          <SchemaExplorer
            datasets={datasets}
            selectedDataset={state.selectedDataset}
            selectedDimensions={state.selectedDimensions}
            selectedMeasures={state.selectedMeasures}
            onDatasetSelect={handleDatasetSelect}
            onDimensionToggle={handleDimensionToggle}
            onMeasureToggle={handleMeasureToggle}
          />
        </Grid>

        {/* Configuration Panel */}
        <Grid item xs={12} md={3}>
          <ConfigurationPanel
            chartType={state.chartType}
            filters={state.filters}
            onChartTypeChange={handleChartTypeChange}
            onFilterAdd={handleFilterAdd}
            onFilterRemove={handleFilterRemove}
          />
        </Grid>

        {/* Live Preview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Live Preview</Typography>
            <LivePreview
              state={state}
              data={generateMockData()}
            />
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={!state.selectedDataset}
        >
          Save Report
        </Button>
      </Box>
    </Container>
  );
};

function generateMockData() {
  return Array.from({ length: 10 }, (_, i) => ({
    name: `Category ${i + 1}`,
    value: Math.floor(Math.random() * 1000),
    count: Math.floor(Math.random() * 100)
  }));
}

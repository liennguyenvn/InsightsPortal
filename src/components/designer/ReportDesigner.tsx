import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  TextField
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatasetMetadata, WidgetConfig, ReportDesignerState } from '../../types';
import { SchemaExplorer } from './SchemaExplorer';
import { ConfigurationPanel } from './ConfigurationPanel';
import { LivePreview } from './LivePreview';
import { mockDataGenerator } from '../../services/mockDataGenerator';

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
  const [title, setTitle] = useState(initialConfig?.title || '');
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
      title: title || `New ${state.chartType} Report`,
      datasetId: state.selectedDataset.id,
      dimensions: state.selectedDimensions,
      measures: state.selectedMeasures,
      filters: state.filters
    };

    onSave?.(config);
  };

  // Generate mock data based on selected dataset with filters applied
  const mockData = useMemo(() => {
    if (!state.selectedDataset) return [];

    const rawData = mockDataGenerator.generateMockData(state.selectedDataset.id);
    const filteredData = mockDataGenerator.applyFilters(rawData, state.filters);
    return filteredData;
  }, [state.selectedDataset, state.filters]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {initialConfig ? 'Edit Report' : 'Create New Report'}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Report Title Input */}
        <TextField
          label="Report Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter report title..."
          fullWidth
          sx={{ mb: 3 }}
        />
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
            selectedDataset={state.selectedDataset}
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
              data={mockData}
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

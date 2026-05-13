import React, { useState, useMemo } from 'react';
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { WidgetConfig, FilterCondition, DatasetMetadata } from '../../types';
import { WIDGET_REGISTRY } from '../../config/widget-registry';
import { mockDataGenerator } from '../../services/mockDataGenerator';

interface ConfigurationPanelProps {
  chartType: WidgetConfig['type'];
  filters: FilterCondition[];
  selectedDataset?: DatasetMetadata;
  onChartTypeChange: (type: WidgetConfig['type']) => void;
  onFilterAdd: (filter: FilterCondition) => void;
  onFilterRemove: (index: number) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  chartType,
  filters,
  selectedDataset,
  onChartTypeChange,
  onFilterAdd,
  onFilterRemove
}) => {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [filterForm, setFilterForm] = useState<FilterCondition>({
    field: '',
    operator: 'equals',
    value: ''
  });

  // Get available values for the selected field
  const availableValues = useMemo(() => {
    if (!selectedDataset || !filterForm.field) return [];
    return mockDataGenerator.getDimensionValues(selectedDataset.id, filterForm.field) ||
           mockDataGenerator.getAvailableValues(selectedDataset.id, filterForm.field);
  }, [selectedDataset, filterForm.field]);

  const handleAddFilter = () => {
    if (filterForm.field && filterForm.value !== '') {
      onFilterAdd(filterForm);
      setFilterForm({ field: '', operator: 'equals', value: '' });
      setOpenFilterDialog(false);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Configuration</Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Chart Type Selector */}
      <FormControl fullWidth sx={{ mb: 1 }}>        
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Chart Type</Typography>
        <Select value={chartType} onChange={(e) => onChartTypeChange(e.target.value as WidgetConfig['type'])}>
          {Object.entries(WIDGET_REGISTRY).map(([key, meta]) => (
            <MenuItem key={key} value={key}>
              {meta.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ my: 2 }} />

      {/* Filters Section */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Filters</Typography>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setOpenFilterDialog(true)}
        sx={{ mb: 2 }}
      >
        Add Filter
      </Button>

      {filters.map((filter, idx) => (
        <Stack
          key={idx}
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            p: 1,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            mb: 1
          }}
        >
          <Typography variant="body2" sx={{ flex: 1 }}>
            {filter.field} {filter.operator} {filter.value}
          </Typography>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onFilterRemove(idx)}
          >
            Remove
          </Button>
        </Stack>
      ))}

      {/* Add Filter Dialog */}
      <Dialog open={openFilterDialog} onClose={() => setOpenFilterDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Filter</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {/* Field Selector */}
            <FormControl fullWidth>
              <InputLabel>Field</InputLabel>
              <Select
                label="Field"
                value={filterForm.field}
                onChange={(e) => setFilterForm({ ...filterForm, field: e.target.value, value: '' })}
              >
                {selectedDataset && (
                  <>
                    {selectedDataset.dimensions?.map(dim => (
                      <MenuItem key={`dim-${dim.id}`} value={dim.id}>
                        {dim.name} (Dimension)
                      </MenuItem>
                    ))}
                    {selectedDataset.measures?.map(measure => (
                      <MenuItem key={`measure-${measure.id}`} value={measure.id}>
                        {measure.name} (Measure)
                      </MenuItem>
                    ))}
                  </>
                )}
              </Select>
            </FormControl>

            {/* Operator Selector */}
            <FormControl fullWidth>
              <InputLabel>Operator</InputLabel>
              <Select
                label="Operator"
                value={filterForm.operator}
                onChange={(e) => setFilterForm({ ...filterForm, operator: e.target.value as any })}
              >
                <MenuItem value="equals">Equals</MenuItem>
                <MenuItem value="contains">Contains</MenuItem>
                <MenuItem value="gt">Greater Than</MenuItem>
                <MenuItem value="lt">Less Than</MenuItem>
                <MenuItem value="gte">Greater or Equal</MenuItem>
                <MenuItem value="lte">Less or Equal</MenuItem>
                <MenuItem value="between">Between</MenuItem>
                <MenuItem value="in">In List</MenuItem>
              </Select>
            </FormControl>

            {/* Value Selector - Dropdown if values available, TextField otherwise */}
            {availableValues.length > 0 ? (
              <FormControl fullWidth>
                <InputLabel>Value</InputLabel>
                <Select
                  label="Value"
                  value={filterForm.value}
                  onChange={(e) => setFilterForm({ ...filterForm, value: e.target.value })}
                >
                  {availableValues.map((val) => (
                    <MenuItem key={`val-${val}`} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                label="Value"
                value={filterForm.value}
                onChange={(e) => setFilterForm({ ...filterForm, value: e.target.value })}
                fullWidth
                placeholder="Enter value manually"
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFilterDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddFilter}
            variant="contained"
            disabled={!filterForm.field || filterForm.value === ''}
          >
            Add Filter
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

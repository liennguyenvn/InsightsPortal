import React, { useState } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Typography,
  Divider,
  Collapse,
  ListItemButton
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StorageIcon from '@mui/icons-material/Storage';
import { DatasetMetadata } from '../../types';

interface SchemaExplorerProps {
  datasets: DatasetMetadata[];
  selectedDataset?: DatasetMetadata;
  selectedDimensions: string[];
  selectedMeasures: string[];
  onDatasetSelect: (dataset: DatasetMetadata) => void;
  onDimensionToggle: (dimensionId: string) => void;
  onMeasureToggle: (measureId: string) => void;
}

export const SchemaExplorer: React.FC<SchemaExplorerProps> = ({
  datasets,
  selectedDataset,
  selectedDimensions,
  selectedMeasures,
  onDatasetSelect,
  onDimensionToggle,
  onMeasureToggle
}) => {
  const [expandedDataset, setExpandedDataset] = useState<string | null>(selectedDataset?.id || null);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Schema Explorer</Typography>
      <Divider sx={{ mb: 2 }} />

      <List sx={{ maxHeight: 600, overflow: 'auto' }}>
        {datasets.map(dataset => (
          <div key={dataset.id}>
            <ListItemButton
              selected={selectedDataset?.id === dataset.id}
              onClick={() => {
                onDatasetSelect(dataset);
                setExpandedDataset(expandedDataset === dataset.id ? null : dataset.id);
              }}
              sx={{ backgroundColor: selectedDataset?.id === dataset.id ? '#f0f0f0' : 'transparent' }}
            >
              <ListItemIcon>
                <StorageIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={dataset.name}
                secondary={`${dataset.dimensions.length} dims, ${dataset.measures.length} measures`}
              />
              {expandedDataset === dataset.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>

            <Collapse in={expandedDataset === dataset.id && selectedDataset?.id === dataset.id}>
              <List sx={{ pl: 4 }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
                  Dimensions
                </Typography>
                {dataset.dimensions.map(dim => (
                  <ListItem key={dim.id} dense onClick={() => onDimensionToggle(dim.id)}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Checkbox
                        edge="start"
                        checked={selectedDimensions.includes(dim.id)}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={dim.name}
                      secondary={dim.type}
                    />
                  </ListItem>
                ))}

                <Typography variant="caption" sx={{ display: 'block', mt: 2, mb: 1, fontWeight: 600 }}>
                  Measures
                </Typography>
                {dataset.measures.map(measure => (
                  <ListItem key={measure.id} dense onClick={() => onMeasureToggle(measure.id)}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Checkbox
                        edge="start"
                        checked={selectedMeasures.includes(measure.id)}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={measure.name}
                      secondary={measure.type}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Paper>
  );
};

import { WidgetConfig } from '../types';

export type WidgetType = WidgetConfig['type'];

export interface WidgetMetadata {
  id: WidgetType;
  label: string;
  description: string;
  icon: string;
  requiredDimensions: number;
  requiredMeasures: number;
}

export const WIDGET_REGISTRY: Record<WidgetType, WidgetMetadata> = {
  line: {
    id: 'line',
    label: 'Line Chart',
    description: 'Display trends over time',
    icon: 'trending_up',
    requiredDimensions: 1,
    requiredMeasures: 1
  },
  bar: {
    id: 'bar',
    label: 'Bar Chart',
    description: 'Compare categories or values',
    icon: 'bar_chart',
    requiredDimensions: 1,
    requiredMeasures: 1
  },
  pie: {
    id: 'pie',
    label: 'Pie Chart',
    description: 'Show composition and proportions',
    icon: 'pie_chart',
    requiredDimensions: 1,
    requiredMeasures: 1
  },
  table: {
    id: 'table',
    label: 'Data Table',
    description: 'Display detailed data',
    icon: 'table_chart',
    requiredDimensions: 0,
    requiredMeasures: 0
  },
  gauge: {
    id: 'gauge',
    label: 'Gauge',
    description: 'Show single metric with threshold',
    icon: 'speed',
    requiredDimensions: 0,
    requiredMeasures: 1
  },
  scatter: {
    id: 'scatter',
    label: 'Scatter Plot',
    description: 'Analyze relationships between metrics',
    icon: 'scatter_plot',
    requiredDimensions: 0,
    requiredMeasures: 2
  }
};

export const getWidgetMetadata = (type: WidgetType): WidgetMetadata | undefined => {
  return WIDGET_REGISTRY[type];
};

export const validateWidgetConfig = (config: WidgetConfig): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const metadata = getWidgetMetadata(config.type);

  if (!metadata) {
    errors.push(`Unknown widget type: ${config.type}`);
    return { valid: false, errors };
  }

  if (config.dimensions.length < metadata.requiredDimensions) {
    errors.push(`${metadata.label} requires at least ${metadata.requiredDimensions} dimension(s)`);
  }

  if (config.measures.length < metadata.requiredMeasures) {
    errors.push(`${metadata.label} requires at least ${metadata.requiredMeasures} measure(s)`);
  }

  if (!config.title || config.title.trim() === '') {
    errors.push('Widget title is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

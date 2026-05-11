export interface Dimension {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'category';
  description?: string;
}

export interface Measure {
  id: string;
  name: string;
  type: 'sum' | 'count' | 'average' | 'min' | 'max';
  description?: string;
}

export interface DatasetMetadata {
  id: string;
  name: string;
  dimensions: Dimension[];
  measures: Measure[];
  lastModified?: string;
}

export interface FilterCondition {
  field: string;
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'between' | 'in';
  value: any;
}

export interface WidgetConfig {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'table' | 'gauge' | 'scatter';
  title: string;
  datasetId: string;
  dimensions: string[];
  measures: string[];
  filters: FilterCondition[];
  sorting?: { field: string; direction: 'asc' | 'desc' }[];
  refreshInterval?: number;
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: WidgetConfig[];
  gridLayout: GridLayout[];
}

export interface GridLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ReportDesignerState {
  selectedDataset?: DatasetMetadata;
  selectedDimensions: string[];
  selectedMeasures: string[];
  filters: FilterCondition[];
  chartType: WidgetConfig['type'];
  previewData?: any[];
}

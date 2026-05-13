import { FilterCondition } from '../types';

export interface MockDataRow {
  [key: string]: any;
}

// Mock data templates for each dataset
const MOCK_DATASETS: Record<string, { dimensions: Record<string, any[]>; rows: MockDataRow[] }> = {
  'sales': {
    dimensions: {
      date: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'],
      region: ['North', 'South', 'East', 'West'],
      product: ['Product A', 'Product B', 'Product C']
    },
    rows: [
      { date: '2024-01-01', region: 'North', product: 'Product A', revenue: 15000, units_sold: 150, avg_price: 100 },
      { date: '2024-01-01', region: 'North', product: 'Product B', revenue: 12000, units_sold: 120, avg_price: 100 },
      { date: '2024-01-01', region: 'South', product: 'Product A', revenue: 18000, units_sold: 180, avg_price: 100 },
      { date: '2024-01-01', region: 'South', product: 'Product B', revenue: 14000, units_sold: 140, avg_price: 100 },
      { date: '2024-01-01', region: 'East', product: 'Product C', revenue: 20000, units_sold: 200, avg_price: 100 },
      { date: '2024-01-01', region: 'West', product: 'Product A', revenue: 16000, units_sold: 160, avg_price: 100 },

      { date: '2024-01-02', region: 'North', product: 'Product A', revenue: 16000, units_sold: 160, avg_price: 100 },
      { date: '2024-01-02', region: 'North', product: 'Product C', revenue: 19000, units_sold: 190, avg_price: 100 },
      { date: '2024-01-02', region: 'South', product: 'Product A', revenue: 17000, units_sold: 170, avg_price: 100 },
      { date: '2024-01-02', region: 'East', product: 'Product B', revenue: 21000, units_sold: 210, avg_price: 100 },

      { date: '2024-01-03', region: 'North', product: 'Product B', revenue: 13000, units_sold: 130, avg_price: 100 },
      { date: '2024-01-03', region: 'South', product: 'Product C', revenue: 22000, units_sold: 220, avg_price: 100 },
      { date: '2024-01-03', region: 'East', product: 'Product A', revenue: 19000, units_sold: 190, avg_price: 100 },
      { date: '2024-01-03', region: 'West', product: 'Product B', revenue: 15000, units_sold: 150, avg_price: 100 },
    ]
  },
  'traffic': {
    dimensions: {
      date: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'],
      page: ['Homepage', 'About', 'Contact', 'Products'],
      device: ['Desktop', 'Mobile', 'Tablet']
    },
    rows: [
      { date: '2024-01-01', page: 'Homepage', device: 'Desktop', pageviews: 1500, sessions: 450, avg_duration: 45 },
      { date: '2024-01-01', page: 'Homepage', device: 'Mobile', pageviews: 2000, sessions: 600, avg_duration: 30 },
      { date: '2024-01-01', page: 'About', device: 'Desktop', pageviews: 800, sessions: 200, avg_duration: 60 },
      { date: '2024-01-01', page: 'About', device: 'Mobile', pageviews: 1200, sessions: 300, avg_duration: 35 },
      { date: '2024-01-01', page: 'Contact', device: 'Desktop', pageviews: 500, sessions: 150, avg_duration: 90 },

      { date: '2024-01-02', page: 'Homepage', device: 'Desktop', pageviews: 1600, sessions: 480, avg_duration: 48 },
      { date: '2024-01-02', page: 'Homepage', device: 'Mobile', pageviews: 2100, sessions: 630, avg_duration: 32 },
      { date: '2024-01-02', page: 'Products', device: 'Desktop', pageviews: 1000, sessions: 250, avg_duration: 75 },
      { date: '2024-01-02', page: 'Products', device: 'Mobile', pageviews: 1400, sessions: 350, avg_duration: 40 },
    ]
  }
};

export const mockDataGenerator = {
  /**
   * Generate mock data for a dataset
   */
  generateMockData(datasetId: string, count: number = 20): MockDataRow[] {
    const mockDataset = MOCK_DATASETS[datasetId];
    if (!mockDataset) return [];

    // Return predefined rows (can be extended with random generation)
    return mockDataset.rows;
  },

  /**
   * Get available dimension values for filtering
   */
  getDimensionValues(datasetId: string, dimensionId: string): any[] {
    const mockDataset = MOCK_DATASETS[datasetId];
    if (!mockDataset) return [];

    const values = mockDataset.dimensions[dimensionId];
    return values || [];
  },

  /**
   * Apply filters to mock data
   */
  applyFilters(data: MockDataRow[], filters: FilterCondition[]): MockDataRow[] {
    if (!filters || filters.length === 0) return data;

    return data.filter(row => {
      return filters.every(filter => {
        const value = row[filter.field];

        switch (filter.operator) {
          case 'equals':
            return value === filter.value;
          case 'contains':
            return String(value).includes(String(filter.value));
          case 'gt':
            return Number(value) > Number(filter.value);
          case 'lt':
            return Number(value) < Number(filter.value);
          case 'gte':
            return Number(value) >= Number(filter.value);
          case 'lte':
            return Number(value) <= Number(filter.value);
          case 'between':
            const [min, max] = filter.value;
            return Number(value) >= Number(min) && Number(value) <= Number(max);
          case 'in':
            return Array.isArray(filter.value) ? filter.value.includes(value) : false;
          default:
            return true;
        }
      });
    });
  },

  /**
   * Get all available values for a field from mock data
   */
  getAvailableValues(datasetId: string, fieldId: string): any[] {
    const data = this.generateMockData(datasetId);
    const values = data.map(row => row[fieldId]);
    return Array.from(new Set(values)).sort();
  }
};

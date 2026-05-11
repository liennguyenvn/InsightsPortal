import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

interface PieChartWidgetProps {
  data: any[];
  dimensions: string[];
  measures: string[];
}

export const PieChartWidget: React.FC<PieChartWidgetProps> = ({ data, dimensions, measures }) => {
  if (!data || data.length === 0) {
    return <Box sx={{ textAlign: 'center', p: 2 }}>No data available</Box>;
  }

  const colors = ['#1976d2', '#f57c00', '#388e3c', '#d32f2f', '#7b1fa2', '#00bcd4', '#e91e63'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey={measures[0] || 'value'}
          nameKey={dimensions[0] || 'name'}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, idx) => (
            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

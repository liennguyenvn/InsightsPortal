import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

interface LineChartWidgetProps {
  data: any[];
  dimensions: string[];
  measures: string[];
}

export const LineChartWidget: React.FC<LineChartWidgetProps> = ({ data, dimensions, measures }) => {
  if (!data || data.length === 0) {
    return <Box sx={{ textAlign: 'center', p: 2 }}>No data available</Box>;
  }

  const colors = ['#1976d2', '#f57c00', '#388e3c', '#d32f2f', '#7b1fa2'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dimensions[0] || 'name'} />
        <YAxis />
        <Tooltip />
        <Legend />
        {measures.map((measure, idx) => (
          <Line
            key={measure}
            type="monotone"
            dataKey={measure}
            stroke={colors[idx % colors.length]}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

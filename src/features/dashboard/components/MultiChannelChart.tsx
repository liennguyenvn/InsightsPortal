import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Link,
} from '@mui/material';
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MultiChannelDataPoint } from '../../../services/dashboardService';
import { chartColors } from '../../../theme';

interface MultiChannelChartProps {
  data: MultiChannelDataPoint[] | null;
}

export const MultiChannelChart: React.FC<MultiChannelChartProps> = ({ data }) => {
  if (!data) return null;

  return (
    <Card>
      <CardHeader
        title="Multi Channel Payment Ingestion"
        action={
          <Link
            href="#"
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: '#00c8a0',
              fontWeight: 500,
            }}
          >
            View More
          </Link>
        }
      />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={[0, 300]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="qrCode"
              stroke={chartColors.blue}
              fill={chartColors.blue}
              fillOpacity={0.2}
              name="QR Code"
            />
            <Area
              type="monotone"
              dataKey="crypto"
              stroke={chartColors.purple}
              fill={chartColors.purple}
              fillOpacity={0.2}
              name="Crypto"
            />
            <Area
              type="monotone"
              dataKey="bnpl"
              stroke={chartColors.orange}
              fill={chartColors.orange}
              fillOpacity={0.2}
              name="BNPL"
            />
            <Area
              type="monotone"
              dataKey="card"
              stroke={chartColors.teal}
              fill={chartColors.teal}
              fillOpacity={0.2}
              name="Card"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

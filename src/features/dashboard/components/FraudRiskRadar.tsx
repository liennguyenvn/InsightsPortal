import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Link,
} from '@mui/material';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { RadarDataPoint } from '../../../services/dashboardService';
import { chartColors } from '../../../theme';

interface FraudRiskRadarProps {
  data: RadarDataPoint[] | null;
}

export const FraudRiskRadar: React.FC<FraudRiskRadarProps> = ({ data }) => {
  if (!data) return null;

  return (
    <Card>
      <CardHeader
        title="Fraud & Risk Intelligence"
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
          <RadarChart data={data}>
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 80]} tick={{ fontSize: 12 }} />
            <Radar
              name="Low Risk"
              dataKey="Low Risk"
              stroke={chartColors.blue}
              fill={chartColors.blue}
              fillOpacity={0.15}
            />
            <Radar
              name="Elevated"
              dataKey="Elevated"
              stroke={chartColors.green}
              fill={chartColors.green}
              fillOpacity={0.15}
            />
            <Radar
              name="High"
              dataKey="High"
              stroke={chartColors.orange}
              fill={chartColors.orange}
              fillOpacity={0.15}
            />
            <Radar
              name="Critical"
              dataKey="Critical"
              stroke={chartColors.red}
              fill={chartColors.red}
              fillOpacity={0.15}
            />
            <Legend />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

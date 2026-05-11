import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { AuditConfidenceScore as AuditScoreData } from '../../../services/dashboardService';

interface AuditConfidenceScoreProps {
  data: AuditScoreData | null;
}

export const AuditConfidenceScore: React.FC<AuditConfidenceScoreProps> = ({
  data,
}) => {
  if (!data) return null;

  const chartData = [
    { name: 'Matched', value: data.score },
    { name: 'Unmatched', value: 100 - data.score },
  ];

  return (
    <Card>
      <CardHeader title="AI Audit Confidence Score" />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: 250,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                startAngle={180}
                endAngle={0}
              >
                <Cell fill="#52c41a" />
                <Cell fill="#f0f0f0" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Box sx={{ mt: -8, textAlign: 'center', zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                color: '#52c41a',
              }}
            >
              {data.score}%
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
              }}
            >
              {data.label}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

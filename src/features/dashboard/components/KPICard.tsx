import React from 'react';
import { Card, CardContent, Box, Chip, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface KPICardProps {
  label: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  unit?: string;
  badge?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  change,
  changeType = 'neutral',
  unit = '',
  badge,
}) => {
  const changeColor = {
    positive: '#52c41a',
    negative: '#ff4d4f',
    neutral: '#666',
  }[changeType];

  const changeIcon = change && change > 0 ? <TrendingUp /> : <TrendingDown />;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography color="textSecondary" variant="body2">
            {label}
          </Typography>
          {badge && (
            <Chip
              label={badge}
              size="small"
              color={changeType === 'positive' ? 'success' : 'default'}
              variant="outlined"
            />
          )}
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {value}
          {unit && <span style={{ fontSize: '0.8em', marginLeft: '4px' }}>{unit}</span>}
        </Typography>

        {change !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {changeIcon}
            <Typography
              variant="body2"
              sx={{
                color: changeColor,
                fontWeight: 500,
              }}
            >
              {change > 0 ? '+' : ''}{change}%
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

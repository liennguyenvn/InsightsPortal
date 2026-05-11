import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  Typography,
  Link,
} from '@mui/material';
import { PreAuthTracking as PreAuthTrackingData } from '../../../services/dashboardService';
import { chartColors } from '../../../theme';

interface PreAuthTrackingProps {
  data: PreAuthTrackingData | null;
}

const StatItem: React.FC<{
  label: string;
  value: number;
  color: string;
}> = ({ label, value, color }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography
      variant="h4"
      sx={{
        fontWeight: 600,
        color,
        mb: 1,
      }}
    >
      {value}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: '#666',
      }}
    >
      {label}
    </Typography>
  </Box>
);

export const PreAuthTracking: React.FC<PreAuthTrackingProps> = ({ data }) => {
  if (!data) return null;

  return (
    <Card>
      <CardHeader
        title="Pre-Auth Lifecycle Tracking"
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatItem
              label="Created"
              value={data.created}
              color={chartColors.teal}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatItem
              label="Increased"
              value={data.increased}
              color={chartColors.orange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatItem
              label="Partial Capture"
              value={data.partialCapture}
              color={chartColors.red}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatItem
              label="Complete"
              value={data.complete}
              color={chartColors.blue}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

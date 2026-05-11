import React from 'react';
import { Grid } from '@mui/material';
import { KPICard } from './KPICard';
import { KPIMetrics } from '../../../services/dashboardService';

interface KPICardsRowProps {
  metrics: KPIMetrics | null;
  loading?: boolean;
}

export const KPICardsRow: React.FC<KPICardsRowProps> = ({ metrics }) => {
  if (!metrics) return null;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard
          label="Total Transactions"
          value={metrics.totalTransactions.value / 1000}
          unit="k"
          change={metrics.totalTransactions.change}
          changeType={metrics.totalTransactions.change > 0 ? 'positive' : 'negative'}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard
          label="Approval Rate"
          value={metrics.approvalRate.value}
          unit="%"
          change={metrics.approvalRate.change}
          changeType={metrics.approvalRate.change > 0 ? 'positive' : 'negative'}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard
          label="Pre-Auth Open"
          value={metrics.preAuthOpen.value}
          change={metrics.preAuthOpen.change}
          changeType={metrics.preAuthOpen.change > 0 ? 'positive' : 'negative'}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard
          label="Active Disputes"
          value={metrics.activeDisputes.value}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard
          label="Fraud Risk Score"
          value={metrics.fraudRiskScore.value}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard
          label="AI Confidence Avg"
          value={metrics.aiConfidenceAvg.value}
          badge={metrics.aiConfidenceAvg.label}
        />
      </Grid>
    </Grid>
  );
};

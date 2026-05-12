import React, { useEffect, useState } from 'react';
import { Grid, Box, CircularProgress, Typography, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {
  KPIMetrics,
  MultiChannelDataPoint,
  RadarDataPoint,
  PreAuthTracking,
  AuditConfidenceScore,
  dashboardService,
} from '../../services/dashboardService';
import { useWidgets } from './WidgetsContext';
import { DashboardCanvas } from '../../components/layout/DashboardCanvas';
import { DashboardLayout as DashboardLayoutType, GridLayout } from '../../types';
import { KPICardsRow } from './components/KPICardsRow';
import { MultiChannelChart } from './components/MultiChannelChart';
import { FraudRiskRadar } from './components/FraudRiskRadar';
import { PreAuthTracking as PreAuthTrackingComponent } from './components/PreAuthTracking';
import { AuditConfidenceScore as AuditConfidenceScoreComponent } from './components/AuditConfidenceScore';
import { VideoSecurityOverlay } from './components/VideoSecurityOverlay';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { widgets, gridLayout, removeWidget, updateLayout } = useWidgets();
  const [loading, setLoading] = useState(true);
  const [kpiMetrics, setKPIMetrics] = useState<KPIMetrics | null>(null);
  const [multiChannelData, setMultiChannelData] =
    useState<MultiChannelDataPoint[] | null>(null);
  const [fraudRiskData, setFraudRiskData] = useState<RadarDataPoint[] | null>(
    null
  );
  const [preAuthTracking, setPreAuthTracking] =
    useState<PreAuthTracking | null>(null);
  const [auditScore, setAuditScore] = useState<AuditConfidenceScore | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [metrics, channels, fraud, preAuth, audit] = await Promise.all([
          dashboardService.getKPIMetrics(),
          dashboardService.getMultiChannelData(),
          dashboardService.getFraudRiskData(),
          dashboardService.getPreAuthTracking(),
          dashboardService.getAuditConfidenceScore(),
        ]);

        setKPIMetrics(metrics);
        setMultiChannelData(channels);
        setFraudRiskData(fraud);
        setPreAuthTracking(preAuth);
        setAuditScore(audit);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* KPI Cards Row */}
      <KPICardsRow metrics={kpiMetrics} />

      {/* Multi Channel Payment Ingestion - Full Width */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <MultiChannelChart data={multiChannelData} />
        </Grid>
      </Grid>

      {/* Fraud Radar (Left - Compact) with Right Section */}
      <Grid container spacing={3} sx={{ mb: 4 }} alignItems="stretch">
        {/* Left: Fraud Radar - Smaller */}
        <Grid item xs={12} md={5}>
          <Box sx={{ maxHeight: '350px' }}>
            <FraudRiskRadar data={fraudRiskData} />
          </Box>
        </Grid>

        {/* Right: Pre-Auth, Audit Score & Video in Unified Grid */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={3} alignItems="stretch">
            {/* Pre-Auth Tracking - Full Width */}
            <Grid item xs={12}>
              <PreAuthTrackingComponent data={preAuthTracking} />
            </Grid>

            {/* Audit Score - Half Width */}
            <Grid item xs={12} sm={6}>
              <AuditConfidenceScoreComponent data={auditScore} />
            </Grid>

            {/* Video Security Overlay - Half Width */}
            <Grid item xs={12} sm={6}>
              <VideoSecurityOverlay />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Custom Reports Section with Drag-Drop */}
      {widgets.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Custom Reports - Drag to reorder, resize widgets ✨
          </Typography>

          <DashboardCanvas
            layout={{
              id: 'custom-reports',
              name: 'Custom Reports',
              widgets: widgets,
              gridLayout: gridLayout,
            }}
            widgetData={Object.fromEntries(
              widgets.map((widget) => [
                widget.id,
                { data: generateMockData(), loading: false },
              ])
            )}
            onLayoutChange={updateLayout}
            onAddWidget={() => navigate('/report-designer')}
            onRemoveWidget={(widgetId) => removeWidget(widgetId)}
            onEditWidget={(widgetId) => console.log('Edit widget:', widgetId)}
            onRefreshWidget={(widgetId) => console.log('Refresh widget:', widgetId)}
          />
        </Box>
      )}

      {/* Add Report Button (when no widgets) */}
      {widgets.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            No custom reports yet. Create one to get started!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => navigate('/report-designer')}
          >
            Create Your First Report
          </Button>
        </Box>
      )}
    </Box>
  );
};

function generateMockData() {
  return Array.from({ length: 10 }, (_, i) => ({
    name: `Category ${i + 1}`,
    value: Math.floor(Math.random() * 1000),
    count: Math.floor(Math.random() * 100)
  }));
}

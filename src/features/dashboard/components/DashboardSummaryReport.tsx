import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DashboardSummary, dashboardSummaryApi } from '../../../services/dashboardSummaryApi';

export const DashboardSummaryReport: React.FC = () => {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const summary = await dashboardSummaryApi.getSummary();
      setData(summary);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(`API Error: ${errorMsg}. Make sure the API server is running on http://localhost:5298`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader
        title="Dashboard Summary Report"
        action={
          <Button
            size="small"
            startIcon={<RefreshIcon />}
            onClick={fetchData}
            disabled={loading}
          >
            Refresh
          </Button>
        }
      />
      <CardContent>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {data && !loading && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Total Transactions</TableCell>
                  <TableCell align="right">{data.totalTransactions}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Amount</TableCell>
                  <TableCell align="right">
                    ${data.totalAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Approval Rate</TableCell>
                  <TableCell align="right">{data.approvalRate}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Average Fraud Score</TableCell>
                  <TableCell align="right">
                    {data.avgFraudScore.toFixed(4)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Matched Count</TableCell>
                  <TableCell align="right">{data.matchedCount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mismatched Count</TableCell>
                  <TableCell align="right">{data.mismatchedCount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Missing POS Count</TableCell>
                  <TableCell align="right">{data.missingPosCount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Missing Pay Count</TableCell>
                  <TableCell align="right">{data.missingPayCount}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Matched Rate</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {data.matchedRate.toFixed(2)}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

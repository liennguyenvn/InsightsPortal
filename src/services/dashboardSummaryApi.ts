export interface DashboardSummary {
  totalTransactions: number;
  totalAmount: number;
  approvalRate: number;
  avgFraudScore: number;
  matchedCount: number;
  mismatchedCount: number;
  missingPosCount: number;
  missingPayCount: number;
  matchedRate: number;
}

// Mock data for fallback when API is unavailable
const MOCK_DASHBOARD_SUMMARY: DashboardSummary = {
  totalTransactions: 528,
  totalAmount: 172487100,
  approvalRate: 100,
  avgFraudScore: 0.10068842317570738,
  matchedCount: 180,
  mismatchedCount: 348,
  missingPosCount: 0,
  missingPayCount: 0,
  matchedRate: 34.09090909090909
};

export const dashboardSummaryApi = {
  getSummary: async (
    fromUtc: Date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    toUtc: Date = new Date()
  ): Promise<DashboardSummary> => {
    try {
      const fromUtcStr = fromUtc.toISOString();
      const toUtcStr = toUtc.toISOString();

      const response = await fetch(
        `/api/insights/dashboard/summary?fromUtc=${encodeURIComponent(fromUtcStr)}&toUtc=${encodeURIComponent(toUtcStr)}`
      );

      if (!response.ok) {
        console.warn(`API returned ${response.status}: ${response.statusText}. Using mock data instead.`);
        return MOCK_DASHBOARD_SUMMARY;
      }

      return response.json();
    } catch (error) {
      // If API call fails (network error, etc.), return mock data
      console.warn('Failed to fetch dashboard summary from API. Using mock data instead.', error);
      return MOCK_DASHBOARD_SUMMARY;
    }
  },
};

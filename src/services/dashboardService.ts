export interface KPIMetrics {
  totalTransactions: {
    value: number;
    change: number;
    unit: string;
  };
  approvalRate: {
    value: number;
    change: number;
    unit: string;
  };
  preAuthOpen: {
    value: number;
    change: number;
    unit: string;
  };
  activeDisputes: {
    value: number;
    unit: string;
  };
  fraudRiskScore: {
    value: number;
    unit: string;
  };
  aiConfidenceAvg: {
    value: number;
    unit: string;
    label: string;
  };
}

export interface MultiChannelDataPoint {
  time: string;
  qrCode: number;
  crypto: number;
  bnpl: number;
  card: number;
}

export interface RadarDataPoint {
  category: string;
  'Low Risk': number;
  Elevated: number;
  High: number;
  Critical: number;
}

export interface PreAuthTracking {
  created: number;
  increased: number;
  partialCapture: number;
  complete: number;
}

export interface AuditConfidenceScore {
  score: number;
  label: string;
}

export const dashboardService = {
  getKPIMetrics: async (): Promise<KPIMetrics> => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      totalTransactions: {
        value: 285800,
        change: 2,
        unit: 'k',
      },
      approvalRate: {
        value: 92.8,
        change: 2,
        unit: '%',
      },
      preAuthOpen: {
        value: 2341,
        change: -5,
        unit: '',
      },
      activeDisputes: {
        value: 58,
        unit: '',
      },
      fraudRiskScore: {
        value: 67,
        unit: '',
      },
      aiConfidenceAvg: {
        value: 89,
        unit: '',
        label: 'High',
      },
    };
  },

  getMultiChannelData: async (): Promise<MultiChannelDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return [
      { time: '00:00', qrCode: 120, crypto: 100, bnpl: 80, card: 140 },
      { time: '01:00', qrCode: 125, crypto: 110, bnpl: 85, card: 150 },
      { time: '02:00', qrCode: 130, crypto: 115, bnpl: 90, card: 160 },
      { time: '03:00', qrCode: 135, crypto: 120, bnpl: 250, card: 170 },
      { time: '04:00', qrCode: 240, crypto: 125, bnpl: 100, card: 180 },
      { time: '05:00', qrCode: 245, crypto: 130, bnpl: 105, card: 190 },
      { time: '06:00', qrCode: 250, crypto: 135, bnpl: 110, card: 800 },
      { time: '07:00', qrCode: 155, crypto: 140, bnpl: 115, card: 210 },
      { time: '08:00', qrCode: 160, crypto: 145, bnpl: 120, card: 220 },
      { time: '09:00', qrCode: 165, crypto: 150, bnpl: 125, card: 230 },
      { time: '10:00', qrCode: 170, crypto: 155, bnpl: 130, card: 240 },
      { time: '11:00', qrCode: 175, crypto: 160, bnpl: 135, card: 250 },
      { time: '12:00', qrCode: 180, crypto: 500, bnpl: 140, card: 260 },
      { time: '13:00', qrCode: 600, crypto: 160, bnpl: 135, card: 250 },
      { time: '14:00', qrCode: 170, crypto: 155, bnpl: 130, card: 240 },
      { time: '15:00', qrCode: 165, crypto: 150, bnpl: 125, card: 230 },
      { time: '16:00', qrCode: 360, crypto: 145, bnpl: 120, card: 220 },
      { time: '17:00', qrCode: 355, crypto: 140, bnpl: 115, card: 210 },
      { time: '18:00', qrCode: 360, crypto: 200, bnpl: 400, card: 220 },
      { time: '19:00', qrCode: 165, crypto: 150, bnpl: 740, card: 230 },
      { time: '20:00', qrCode: 170, crypto: 155, bnpl: 130, card: 240 },
      { time: '21:00', qrCode: 175, crypto: 160, bnpl: 135, card: 250 },
      { time: '22:00', qrCode: 180, crypto: 165, bnpl: 140, card: 260 },
      { time: '23:00', qrCode: 185, crypto: 170, bnpl: 145, card: 270 },
      { time: '23:05', qrCode: 190, crypto: 180, bnpl: 145, card: 270 },
      { time: '23:10', qrCode: 200, crypto: 190, bnpl: 145, card: 270 },
      { time: '23:30', qrCode: 500, crypto: 200, bnpl: 145, card: 270 },
    ];
  },

  getFraudRiskData: async (): Promise<RadarDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return [
      {
        category: 'Behavioral Risk',
        'Low Risk': 75,
        Elevated: 60,
        High: 45,
        Critical: 20,
      },
      {
        category: 'Transaction Pattern Anomaly',
        'Low Risk': 80,
        Elevated: 65,
        High: 50,
        Critical: 25,
      },
      {
        category: 'Cross-Device Correlation',
        'Low Risk': 70,
        Elevated: 55,
        High: 40,
        Critical: 15,
      },
      {
        category: 'Evidence Strength',
        'Low Risk': 85,
        Elevated: 70,
        High: 55,
        Critical: 30,
      },
      {
        category: 'Early Warning Signal',
        'Low Risk': 65,
        Elevated: 50,
        High: 35,
        Critical: 10,
      },
    ];
  },

  getPreAuthTracking: async (): Promise<PreAuthTracking> => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      created: 5,
      increased: 6,
      partialCapture: 2,
      complete: 7,
    };
  },

  getAuditConfidenceScore: async (): Promise<AuditConfidenceScore> => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      score: 91,
      label: 'Matched',
    };
  },
};

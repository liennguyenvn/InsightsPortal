# InsightsPortal - AI Merchant Insights Dashboard

A modern, feature-rich Self-Service BI (Business Intelligence) platform with AI-powered merchant insights dashboard. Built with React, TypeScript, Material-UI, and powered by metadata-driven architecture. Designed to be scalable and enterprise-ready.

## 🎯 Architecture Overview

InsightsPortal follows a **Feature-Based Architecture** with three main subsystems:

### 1. **Dashboard System** (AI Merchant Insights)
Real-time merchant analytics with KPI metrics, payment channel analysis, fraud detection, and AI audit scoring.

```
Dashboard (Features)
├─ KPI Cards Row (6 key metrics with trends)
├─ Multi-Channel Payment Chart (Area chart - hourly breakdown)
├─ Fraud & Risk Intelligence (Radar chart - 5 axes, 4 risk levels)
├─ Pre-Auth Lifecycle Tracking (Lifecycle stats)
├─ AI Audit Confidence Score (Gauge - 91% matched)
└─ Video Security Overlay (Video widget)
```

### 2. **Report Designer** (Metadata-Driven BI)
Legacy system for building custom reports from datasets.

```
Report Designer
├─ Schema Explorer (Browse dimensions & measures)
├─ Configuration Panel (Filter, sort, customize)
├─ Live Preview (Real-time preview)
└─ Widget Registry (Extensible widget system)
```

### 3. **Layout System**
Responsive multi-layout support for desktop and mobile.

```
Page Layouts
├─ Sidebar (Dark green #0a2a2a, collapsible)
├─ Top Bar (Header with breadcrumbs, notifications)
└─ Dashboard Canvas (react-grid-layout for drag-drop)
```

## 🚀 Key Features

### Dashboard Features
- **Real-time KPI Metrics** - Transaction volume, approval rates, disputes, fraud scores
- **Multi-Channel Analytics** - Payment channel breakdown by hour
- **Fraud Intelligence** - Risk radar with behavioral and transaction patterns
- **AI Confidence Scoring** - Audit confidence gauge with risk assessment
- **Pre-Auth Tracking** - Lifecycle metrics (Created, Increased, Partial, Complete)
- **Video Security** - Integrated video overlay widget

### Authentication
- JWT-based authentication with localStorage persistence
- Protected routes with automatic redirect to login
- User session management
- Role-based access control ready

### Responsive Design
- Desktop: Fixed sidebar (220px), full layout
- Tablet: Sidebar drawer, optimized grid
- Mobile: Full-width drawer, stacked cards (1 column)

### Report Designer (Legacy)
- Drag-and-drop interface for building reports
- Multi-dataset support
- Advanced filtering capabilities
- Instant preview of changes
- Export data to CSV

## 📁 Project Structure

```
src/
├── features/
│   ├── auth/
│   │   ├── AuthContext.tsx          # Auth state management
│   │   └── LoginPage.tsx            # Login UI
│   ├── users/
│   │   └── (placeholder for user features)
│   └── dashboard/
│       ├── DashboardPage.tsx        # Main dashboard page
│       └── components/
│           ├── KPICard.tsx          # Individual KPI card
│           ├── KPICardsRow.tsx      # Row of 6 KPI cards
│           ├── MultiChannelChart.tsx # Area chart (Recharts)
│           ├── FraudRiskRadar.tsx   # Radar chart
│           ├── PreAuthTracking.tsx  # Lifecycle stats
│           ├── AuditConfidenceScore.tsx # Gauge chart
│           └── VideoSecurityOverlay.tsx # Video widget
├── layouts/
│   ├── Sidebar.tsx                  # Navigation sidebar
│   ├── TopBar.tsx                   # Header bar
│   └── DashboardLayout.tsx          # Main page layout
├── components/
│   ├── designer/                    # Report Designer (legacy)
│   │   ├── ReportDesigner.tsx
│   │   ├── SchemaExplorer.tsx
│   │   ├── ConfigurationPanel.tsx
│   │   └── LivePreview.tsx
│   ├── layout/
│   │   └── DashboardCanvas.tsx      # Drag-drop grid
│   ├── visualizations/              # Chart components (legacy)
│   │   ├── LineChartWidget.tsx
│   │   ├── BarChartWidget.tsx
│   │   ├── PieChartWidget.tsx
│   │   └── DataTableWidget.tsx
│   └── widgets/
│       ├── WidgetRenderer.tsx
│       └── WidgetWrapper.tsx
├── services/
│   ├── authService.ts               # Auth (mock JWT)
│   └── dashboardService.ts          # Dashboard data (mock API)
├── theme/
│   └── index.ts                     # MUI theme config
├── routes/
│   └── index.tsx                    # React Router v6 setup
├── types/
│   └── index.ts                     # TypeScript interfaces
├── App.tsx                          # Entry component
└── main.tsx                         # Vite entry point
```

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety & strict mode
- **Material-UI (MUI) 5** - Component library
- **React Router v6** - Client-side routing
- **Vite 4** - Build tool & dev server
- **Recharts 2** - Chart visualizations
- **react-grid-layout** - Drag-drop grid system
- **Emotion** - CSS-in-JS styling
- **@mui/icons-material** - Icon library

## 🚗 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens **http://localhost:3000** in your browser with hot-reload enabled.

### Production Build

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

### Preview Build

```bash
npm run preview
```

Preview the production build locally before deployment.

### Type Checking

```bash
npm run lint
```

Run ESLint checks.

## 🔐 Authentication

### Login Flow
1. User navigates to `/login`
2. Enters email and password (any combination works in mock mode)
3. System generates fake JWT token and stores in localStorage
4. Redirects to `/dashboard`
5. Protected routes check localStorage for valid token

### Mock Auth
- **Token Key**: `auth_token` (localStorage)
- **User Key**: `auth_user` (localStorage)
- **Token Format**: Base64-encoded JSON payload with 24-hour expiry
- **Valid Duration**: 24 hours from login

## 📊 Dashboard Data Flow

All dashboard data is mock-based with simulated API delays (100ms):

```typescript
// Example: Get KPI Metrics
dashboardService.getKPIMetrics()
→ Simulates API call delay
→ Returns: { totalTransactions, approvalRate, preAuthOpen, activeDisputes, fraudRiskScore, aiConfidenceAvg }
```

Mock services in `src/services/dashboardService.ts`:
- `getKPIMetrics()` - 6 key metrics
- `getMultiChannelData()` - 24-hour hourly breakdown (4 channels)
- `getFraudRiskData()` - Radar data (5 axes, 4 series)
- `getPreAuthTracking()` - Lifecycle stats (4 metrics)
- `getAuditConfidenceScore()` - Gauge data (91% score)

## 🎨 Theme System

Centralized theme in `src/theme/index.ts`:

### Color Palette
- **Primary**: `#00c8a0` (teal - active items, badges)
- **Sidebar**: `#0a2a2a` (dark green - background)
- **Sidebar Text**: `#8bb5a5` (muted teal)
- **Content Background**: `#f4f6f8` (light gray)
- **Success**: `#52c41a` (green)
- **Warning**: `#faad14` (amber)
- **Error**: `#ff4d4f` (red)

### Change Theme
Edit `src/theme/index.ts` to customize colors, fonts, and spacing globally.

## 🔌 Core Concepts

### Widget Config (Legacy Report Designer)

```typescript
interface WidgetConfig {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'table' | 'gauge' | 'scatter';
  title: string;
  datasetId: string;
  dimensions: string[];        // X-axis, categories
  measures: string[];          // Y-axis, values to aggregate
  filters: FilterCondition[];
  sorting?: SortConfig[];
  refreshInterval?: number;
}
```

### Dashboard KPI Structure

```typescript
interface KPIMetrics {
  totalTransactions: { value: number; change: number; unit: string };
  approvalRate: { value: number; change: number; unit: string };
  preAuthOpen: { value: number; change: number; unit: string };
  activeDisputes: { value: number; unit: string };
  fraudRiskScore: { value: number; unit: string };
  aiConfidenceAvg: { value: number; unit: string; label: string };
}
```

## 🌐 Responsive Breakpoints

```typescript
// Material-UI breakpoints
lg: 1200px  // Desktop - KPI cards 6-column, charts side-by-side
md: 996px   // Tablet - KPI cards 3-column
sm: 768px   // Mobile - KPI cards 2-column, charts stacked
xs: 480px   // Small phone - KPI cards 1-column
```

## 🔮 Future Enhancements

### Phase 1: Backend Integration
- [ ] Connect to real metadata API
- [ ] Fetch datasets dynamically
- [ ] Save/load dashboards from database
- [ ] Real authentication service

### Phase 2: Advanced Features
- [ ] Role-based widget visibility
- [ ] Dashboard sharing & collaboration
- [ ] Scheduled report delivery
- [ ] Custom calculations & formulas
- [ ] Real-time data streaming (WebSocket)

### Phase 3: Performance
- [ ] Query result caching
- [ ] Pagination for large datasets
- [ ] Virtual scrolling for tables
- [ ] Progressive data loading

### Phase 4: Mobile & Extended
- [ ] Native mobile app (React Native)
- [ ] Offline support
- [ ] Push notifications
- [ ] Dark mode toggle

## 📝 Development Notes

### Adding a New Dashboard Widget

1. Create component in `src/features/dashboard/components/MyWidget.tsx`
2. Accept data props and render with MUI + Recharts
3. Add to DashboardPage grid layout
4. Call service from DashboardPage useEffect
5. Test responsive design at all breakpoints

### Adding a New Route

1. Create page component in `src/features/<feature>/`
2. Add route to `src/routes/index.tsx`
3. Import and register in Routes config
4. Wrap with ProtectedRoute if needed

### Customizing Auth

1. Replace mock authService calls in `src/services/authService.ts`
2. Connect to real JWT provider
3. Update localStorage keys if needed
4. Ensure token refresh logic

## 🧪 Mock Data

Dashboard includes realistic mock datasets:
- **KPI Metrics**: Transaction volume, approval rates, disputes
- **Multi-Channel**: QR Code, Crypto, BNPL, Card payments by hour
- **Fraud Data**: 5-axis radar with 4 risk levels
- **Pre-Auth**: Lifecycle tracking (Created, Increased, Partial, Complete)
- **Audit Score**: 91% confidence gauge

Replace with real API calls in production by updating `src/services/dashboardService.ts`.

## 📄 License

MIT

## 👨‍💻 Author

Built with attention to scalability, maintainability, and responsive design. Ready for enterprise deployment with authentication, protected routes, and comprehensive dashboard widgets.

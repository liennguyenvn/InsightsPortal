# Report Designer - Complete Guide

## 🎯 Overview

Report Designer là một **metadata-driven UI** cho phép bạn:
- 🔍 Duyệt các datasets và fields (dimensions/measures)
- ⚙️ Cấu hình biểu đồ (chart type, filters, sorting)
- 👁️ Xem trước real-time khi thay đổi
- 💾 Lưu reports thành widgets trên Dashboard

---

## 🚀 Cách Truy Cập Report Designer

### Cách 1: Từ Sidebar Navigation (✨ Mới)
1. Mở app tại http://localhost:3000
2. Đăng nhập (bất kỳ email/password)
3. Nhìn vào **Sidebar (bên trái)**
4. Click **"Report Designer"** (icon folder)
5. → Mở Report Designer page

### Cách 2: URL Direct
- Trực tiếp vào: `http://localhost:3000/report-designer`

---

## 📊 Report Designer Interface

```
┌─────────────────────────────────────────────────┐
│ Report Designer                                  │
├──────────────┬──────────────┬──────────────────┤
│              │              │                  │
│   Schema     │ Configuration│   Live Preview   │
│  Explorer    │    Panel     │   (Real-time)    │
│              │              │                  │
│ • Datasets   │ • Chart Type │ • Live chart    │
│ • Dimensions │ • Filters    │ • Error alerts  │
│ • Measures   │ • Sorting    │ • Validation    │
│              │ • Save       │                  │
└──────────────┴──────────────┴──────────────────┘
```

### 3 Phần Chính:

#### 1️⃣ **Schema Explorer** (Bên trái)
- **Datasets** - Chọn nguồn dữ liệu
  - Sales Data
    - Dimensions: Date, Region, Product
    - Measures: Revenue, Units Sold, Average Price
  - Website Traffic
    - Dimensions: Date, Page, Device
    - Measures: Page Views, Sessions, Avg Duration

- **Cách dùng**:
  - Click dataset để mở/đóng
  - Checkbox dimensions để chọn fields X-axis
  - Checkbox measures để chọn fields Y-axis

#### 2️⃣ **Configuration Panel** (Giữa)
- **Chart Type** - Chọn loại biểu đồ:
  - 📈 Line Chart (xu hướng)
  - 📊 Bar Chart (so sánh)
  - 🥧 Pie Chart (thành phần)
  - 📋 Table (chi tiết)
  - 🎯 Gauge (KPI)
  - 📍 Scatter (mối quan hệ)

- **Filters** - Lọc dữ liệu:
  - Click "Add Filter"
  - Chọn field → operator → value
  - Ví dụ: Region equals "North"

- **Save Report**:
  - Click "Save Report"
  - Auto thêm vào Dashboard

#### 3️⃣ **Live Preview** (Bên phải)
- Xem trước biểu đồ real-time
- Cập nhật ngay khi bạn thay đổi cấu hình
- Hiển thị validation errors nếu cấu hình không đúng

---

## 📝 Step-by-Step: Tạo Report Đầu Tiên

### Ví dụ: Tạo Bar Chart "Revenue by Region"

**Step 1: Chọn Dataset**
```
1. Bên trái (Schema Explorer)
2. Click "Sales Data" để mở
3. Checkbox "Region" (dimension)
4. Checkbox "Revenue" (measure)
```

**Step 2: Cấu hình Chart**
```
1. Giữa (Configuration Panel)
2. Chart Type → Chọn "Bar Chart"
3. Ngoài ra có thể:
   - Add Filter: Region equals "North" (tùy chọn)
   - Để sorting mặc định
4. Nhập Title: "Revenue by Region"
```

**Step 3: Xem Trước**
```
1. Bên phải (Live Preview)
2. Thấy bar chart với 4 bars (North, South, East, West)
3. Nếu có lỗi, sẽ thấy validation message
```

**Step 4: Lưu Report**
```
1. Click "Save Report" button
2. Report được thêm vào Dashboard
3. Redirect về Dashboard
4. Thấy widget mới trên trang
```

---

## 🔧 Mock Datasets Có Sẵn

### Sales Data
```typescript
Dimensions:
  - Date (loại: date)
  - Region (loại: category) → North, South, East, West
  - Product (loại: category) → Product A, B, C

Measures:
  - Revenue (type: sum)
  - Units Sold (type: sum)
  - Average Price (type: average)
```

### Website Traffic
```typescript
Dimensions:
  - Date (loại: date)
  - Page (loại: category) → Homepage, About, Contact
  - Device (loại: category) → Desktop, Mobile, Tablet

Measures:
  - Page Views (type: count)
  - Sessions (type: count)
  - Avg Duration (type: average)
```

---

## 🎨 Chart Types Support

| Chart Type | Best For | Requires |
|-----------|----------|----------|
| **Line** | Trends over time | 1+ dimension, 1+ measure |
| **Bar** | Category comparison | 1+ dimension, 1+ measure |
| **Pie** | Composition (%) | 1 dimension, 1 measure |
| **Table** | Detailed data | Any dimensions/measures |
| **Gauge** | Single KPI | 1 measure (displayed as %) |
| **Scatter** | Relationship | 2 dimensions, 2 measures |

---

## 🛡️ Validation Rules

Hệ thống sẽ hiển thị **lỗi validation** nếu:

❌ **Thiếu required fields:**
```
- Chart type là Line/Bar nhưng thiếu dimensions
- Không chọn measure nào
- Thiếu title report
```

✅ **Valid configuration:**
```
✓ Chọn chart type
✓ Chọn ít nhất 1 dimension
✓ Chọn ít nhất 1 measure
✓ Nhập title
```

---

## 💾 Lưu & Quản Lý Reports

### Lưu Report
```
1. Hoàn tất cấu hình
2. Click "Save Report"
3. Auto-generate ID: widget-{timestamp}
4. Auto-generate Title: "New {chartType} Report" (nếu trống)
5. Redirect về Dashboard
```

### Reports trên Dashboard
- Sau khi lưu, reports xuất hiện ngay trên Dashboard
- Sắp xếp dạng grid drag-drop
- Có thể resize từng widget
- Click "..." menu → Export CSV, Edit, Remove

---

## 🔄 Advanced Features

### Filters
```typescript
// Ví dụ filter
Field: Region
Operator: equals
Value: "North"

// Multiple filters có thể add
```

### Operators
- `equals` - Bằng
- `contains` - Chứa
- `gt` - Lớn hơn
- `lt` - Nhỏ hơn
- `between` - Trong khoảng
- `in` - Trong list

### Sorting
- Sắp xếp ascending/descending
- Có thể sort theo dimension hoặc measure

---

## 🚀 Workflow: Dashboard + Report Designer

```
┌─────────────────────────────────────────┐
│     Dashboard (Main Analytics)          │
│                                         │
│  [KPI Cards] [Charts] [Stats] [Video]  │
│                                         │
│  + "Report Designer" button/menu        │
└─────────────────────────────────────────┘
              ↓ Click
┌─────────────────────────────────────────┐
│     Report Designer (Create Reports)    │
│                                         │
│  Schema | Config | Preview              │
└─────────────────────────────────────────┘
              ↓ Save
┌─────────────────────────────────────────┐
│     Dashboard (New Widget Added!)       │
│                                         │
│  [KPI Cards] [Charts] [Stats]           │
│  [Your New Report] ← Added here!        │
└─────────────────────────────────────────┘
```

---

## 🔧 Technical Details

### Files
- `src/pages/ReportDesigner.tsx` - Page wrapper
- `src/components/designer/ReportDesigner.tsx` - Main component
- `src/components/designer/SchemaExplorer.tsx` - Dataset browser
- `src/components/designer/ConfigurationPanel.tsx` - Config UI
- `src/components/designer/LivePreview.tsx` - Preview component
- `src/layouts/Sidebar.tsx` - Navigation menu

### Routes
```
/dashboard → Dashboard page
/report-designer → Report Designer page
```

### Data Flow
```
1. User selects dataset → SchemaExplorer updates state
2. User configures chart → ConfigurationPanel updates state
3. State changes → LivePreview renders with mock data
4. User clicks Save → Widget added to Dashboard
```

---

## 🐛 Troubleshooting

### "Live Preview" không hiển thị chart
**Nguyên nhân**: Chưa chọn dimensions hoặc measures
**Giải pháp**: Check Schema Explorer → checkbox dimensions/measures

### Filter không hoạt động
**Nguyên nhân**: Mock data có thể không match filter value
**Giải pháp**: Dùng values có sẵn (North, South, East, West cho Region)

### Save button grayed out
**Nguyên nhân**: Validation failed (thiếu title hoặc fields)
**Giải pháp**: Check error message → fix configuration

### Báo lỗi "Unknown widget type"
**Nguyên nhân**: Chart type không được support
**Giải pháp**: Chọn một trong: line, bar, pie, table, gauge, scatter

---

## 📚 Next Steps

1. **Test Report Designer** - Tạo vài reports để quen
2. **Try Different Charts** - Thử line, bar, pie charts
3. **Add Filters** - Thử lọc dữ liệu
4. **Customize Dashboard** - Sắp xếp widgets, resize

---

## 🎓 Tips & Tricks

✨ **Tip 1**: Chọn dimension đầu tiên sẽ là X-axis
✨ **Tip 2**: Có thể chọn multiple measures → multiple lines/bars
✨ **Tip 3**: Live Preview update real-time → thấy ngay changes
✨ **Tip 4**: Title auto-generate nếu bạn không nhập
✨ **Tip 5**: Filters là optional → có thể bỏ qua

---

**Happy Report Creating! 🎉**

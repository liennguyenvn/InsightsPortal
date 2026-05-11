import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Box, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DashboardLayout, WidgetConfig, GridLayout as GridLayoutType } from '../../types';
import { WidgetWrapper } from '../widgets/WidgetWrapper';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardCanvasProps {
  layout: DashboardLayout;
  widgetData: Record<string, { data: any[]; loading: boolean; error?: string }>;
  onLayoutChange?: (newLayout: GridLayoutType[]) => void;
  onAddWidget?: () => void;
  onEditWidget?: (widgetId: string) => void;
  onRemoveWidget?: (widgetId: string) => void;
  onRefreshWidget?: (widgetId: string) => void;
}

export const DashboardCanvas: React.FC<DashboardCanvasProps> = ({
  layout,
  widgetData,
  onLayoutChange,
  onAddWidget,
  onEditWidget,
  onRemoveWidget,
  onRefreshWidget
}) => {
  const gridLayout: GridLayoutType[] = layout.gridLayout.length > 0
    ? layout.gridLayout
    : generateDefaultLayout(layout.widgets);

  const handleLayoutChange = (newLayout: Layout[]) => {
    const updatedLayout = newLayout.map(item => ({
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h
    }));
    onLayoutChange?.(updatedLayout);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <h1>{layout.name}</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddWidget}
        >
          Add Widget
        </Button>
      </Stack>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: gridLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
        rowHeight={60}
        width={1200}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={handleLayoutChange}
        containerPadding={[0, 0]}
        margin={[16, 16]}
      >
        {layout.widgets.map((widget) => {
          const widgetInfo = widgetData[widget.id];
          return (
            <Box
              key={widget.id}
              sx={{
                '& > *': {
                  height: '100%'
                }
              }}
            >
              <WidgetWrapper
                config={widget}
                data={widgetInfo?.data || []}
                loading={widgetInfo?.loading || false}
                error={widgetInfo?.error}
                onRefresh={() => onRefreshWidget?.(widget.id)}
                onEdit={() => onEditWidget?.(widget.id)}
                onRemove={() => onRemoveWidget?.(widget.id)}
              />
            </Box>
          );
        })}
      </ResponsiveGridLayout>
    </Box>
  );
};

interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

function generateDefaultLayout(widgets: WidgetConfig[]): GridLayoutType[] {
  return widgets.map((widget, idx) => ({
    i: widget.id,
    x: (idx % 2) * 6,
    y: Math.floor(idx / 2) * 4,
    w: 6,
    h: 4
  }));
}

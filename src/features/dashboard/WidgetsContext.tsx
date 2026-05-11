import React, { createContext, useContext, useState, useEffect } from 'react';
import { WidgetConfig, GridLayout } from '../../types';

interface WidgetsContextType {
  widgets: WidgetConfig[];
  gridLayout: GridLayout[];
  addWidget: (widget: WidgetConfig) => void;
  removeWidget: (widgetId: string) => void;
  updateWidget: (widget: WidgetConfig) => void;
  updateLayout: (newLayout: GridLayout[]) => void;
  loadWidgets: () => void;
}

const WidgetsContext = createContext<WidgetsContextType | undefined>(undefined);

const WIDGETS_STORAGE_KEY = 'dashboard_widgets';
const LAYOUT_STORAGE_KEY = 'dashboard_layout';

export const WidgetsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [gridLayout, setGridLayout] = useState<GridLayout[]>([]);

  // Load widgets and layout from localStorage on mount
  useEffect(() => {
    loadWidgets();
  }, []);

  const loadWidgets = () => {
    try {
      const stored = localStorage.getItem(WIDGETS_STORAGE_KEY);
      if (stored) {
        setWidgets(JSON.parse(stored));
      }

      const layoutStored = localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (layoutStored) {
        setGridLayout(JSON.parse(layoutStored));
      }
    } catch (error) {
      console.error('Failed to load widgets:', error);
    }
  };

  const addWidget = (widget: WidgetConfig) => {
    setWidgets((prev) => {
      const updated = [...prev, widget];
      localStorage.setItem(WIDGETS_STORAGE_KEY, JSON.stringify(updated));

      // Auto-generate layout for new widget
      const newLayout: GridLayout = {
        i: widget.id,
        x: 0,
        y: gridLayout.length > 0 ? Math.max(...gridLayout.map((l) => l.y + l.h)) : 0,
        w: 6,
        h: 4,
      };
      setGridLayout((prevLayout) => {
        const updated = [...prevLayout, newLayout];
        localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      return updated;
    });
  };

  const removeWidget = (widgetId: string) => {
    setWidgets((prev) => {
      const updated = prev.filter((w) => w.id !== widgetId);
      localStorage.setItem(WIDGETS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    setGridLayout((prev) => {
      const updated = prev.filter((l) => l.i !== widgetId);
      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateWidget = (widget: WidgetConfig) => {
    setWidgets((prev) => {
      const updated = prev.map((w) => (w.id === widget.id ? widget : w));
      localStorage.setItem(WIDGETS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateLayout = (newLayout: GridLayout[]) => {
    setGridLayout(newLayout);
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(newLayout));
  };

  return (
    <WidgetsContext.Provider
      value={{
        widgets,
        gridLayout,
        addWidget,
        removeWidget,
        updateWidget,
        updateLayout,
        loadWidgets,
      }}
    >
      {children}
    </WidgetsContext.Provider>
  );
};

export const useWidgets = () => {
  const context = useContext(WidgetsContext);
  if (!context) {
    throw new Error('useWidgets must be used within WidgetsProvider');
  }
  return context;
};

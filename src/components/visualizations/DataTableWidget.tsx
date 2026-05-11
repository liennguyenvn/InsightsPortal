import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

interface DataTableWidgetProps {
  data: any[];
  columns: string[];
}

export const DataTableWidget: React.FC<DataTableWidgetProps> = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <Box sx={{ textAlign: 'center', p: 2 }}>No data available</Box>;
  }

  const tableColumns = columns.length > 0 ? columns : Object.keys(data[0] || {});

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            {tableColumns.map((col) => (
              <TableCell key={col} sx={{ fontWeight: 600 }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(0, 10).map((row, idx) => (
            <TableRow key={idx}>
              {tableColumns.map((col) => (
                <TableCell key={`${idx}-${col}`}>
                  {String(row[col] ?? '-')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  IconButton,
} from '@mui/material';
import { PlayArrow, ChevronRight } from '@mui/icons-material';

export const VideoSecurityOverlay: React.FC = () => {
  return (
    <Card>
      <CardHeader
        title="Video Security Overlay"
        action={
          <IconButton size="small">
            <ChevronRight />
          </IconButton>
        }
      />
      <CardContent>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            backgroundColor: '#2a2a2a',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundImage:
              'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
          }}
        >
          {/* Placeholder for video thumbnail */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <PlayArrow sx={{ fontSize: 48 }} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

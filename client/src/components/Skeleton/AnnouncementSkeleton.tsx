import React from 'react';
import {
  Paper,
  Box,
  Skeleton,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const AnnouncementTableSkeleton: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const skeletonCount = 4;

  return (
    <Box component={Paper} sx={{ p: isSmallScreen ? 2 : 4 }}>
      {/* Header skeleton */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Skeleton variant="text" width={180} height={36} />
        <Skeleton variant="text" width={40} height={24} />
      </Box>

      {/* Rows skeleton */}
      {Array.from({ length: skeletonCount }).map((_, idx) => (
        <Box
          key={idx}
          display="flex"
          flexDirection={isSmallScreen ? 'column' : 'row'}
          alignItems={isSmallScreen ? 'flex-start' : 'center'}
          gap={2}
          p={0}
          mb={2}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
            width={isSmallScreen ? '100%' : 250}
          >
            <Skeleton variant="circular" width={50} height={50} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="60%" height={24} />
              <Skeleton width="40%" height={20} />
            </Box>
          </Box>

          {!isSmallScreen && (
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            />
          )}

          <Box flex={1} sx={{ wordWrap: 'break-word' }}>
            <Skeleton width="100%" height={40} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AnnouncementTableSkeleton;

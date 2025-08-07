import React from 'react';
import {
  Paper,
  Avatar,
  Typography,
  Box,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import type { Announcement } from '../store/announcementSlice';

interface Props {
  data: Announcement[];
  onAllClick: () => void;
}

const AnnouncementTable: React.FC<Props> = ({ data, onAllClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box component={Paper} sx={{ p: isSmallScreen ? 2 : 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Recent Announcements</Typography>
        <Typography
          variant="body2"
          sx={{ color: '#1976d2', fontWeight: 500, cursor: 'pointer' }}
          onClick={onAllClick}
        >
          All
        </Typography>
      </Box>
      {data.slice(0, 4).map((row) => (
        <Box
          key={row._id}
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
            <Avatar
              alt={row.user?.username}
              src={row.user?.image}
              sx={{ width: 50, height: 50 }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {row.user?.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {row.user?.subject}
              </Typography>
            </Box>
          </Box>

          {/* Divider line */}
          {!isSmallScreen && (
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            />
          )}

          {/* Right: Content */}
          <Box flex={1} sx={{ wordWrap: 'break-word' }}>
            <Typography variant="body2" color="text.secondary" >{row.content}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AnnouncementTable;

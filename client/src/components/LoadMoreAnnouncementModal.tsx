import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, Box, Typography, Avatar, Stack
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements } from '../store/announcementSlice';
import type { RootState, AppDispatch } from '../store/store';

const LoadMoreAnnouncementModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { announcements, loading, hasMore } = useSelector((state: RootState) => state.announcements);
  const [skip, setSkip] = useState(0);
  const limit = 5;

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      dispatch(fetchAnnouncements({ skip: 0, limit }));
      setSkip(limit);
    }
  }, [dispatch, open]);

  const handleScroll = () => {
    const container = contentRef.current;
    if (
      container &&
      container.scrollTop + container.clientHeight >= container.scrollHeight - 10 &&
      !loading &&
      hasMore
    ) {
      dispatch(fetchAnnouncements({ skip, limit }));
      setSkip((prev) => prev + limit);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>All Announcements</DialogTitle>
      <DialogContent
        dividers
        ref={contentRef}
        onScroll={handleScroll}
        sx={{ maxHeight: 400, overflowY: 'auto' }}
      >
        <Stack spacing={2}>
          {announcements.map((row) => (
            <Box key={row._id} display="flex" gap={2}>
              <Avatar src={row.user?.image} alt={row.user?.username} />
              <Box>
                <Typography fontWeight="bold">{row.user?.username}</Typography>
                <Typography variant="body2" color="text.secondary">{row.user?.subject}</Typography>
                <Typography mt={1}>{row.content}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!hasMore && !loading && announcements.length > 0 && (
          <Box textAlign="center" mt={2} fontSize={14} color="gray">
            No more announcements to load.
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadMoreAnnouncementModal;

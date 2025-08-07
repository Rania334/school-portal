import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, Stack, Box
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../store/taskSlice'
import type { RootState, AppDispatch } from '../store/store'
import DueCard from './DueCard'

const LoadMoreModal: React.FC<{ open: boolean, onClose: () => void }> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { tasks, loading, hasMore } = useSelector((state: RootState) => state.tasks)

  const [skip, setSkip] = useState(0)
  const limit = 5

  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open) {
      dispatch(fetchTasks({ skip: 0, limit }))
      setSkip(limit)
    }
  }, [dispatch, open])

  // 🔁 Load more when reaching the bottom
  const handleScroll = () => {
    const container = contentRef.current
    if (
      container &&
      container.scrollTop + container.clientHeight >= container.scrollHeight - 10 &&
      !loading &&
      hasMore
    ) {
      dispatch(fetchTasks({ skip, limit }))
      setSkip(prev => prev + limit)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>All Due Tasks</DialogTitle>

      <DialogContent
        dividers
        ref={contentRef}
        onScroll={handleScroll}
        sx={{ maxHeight: 400, overflowY: 'auto' }}
      >
        <Stack spacing={2}>
          {tasks.map((task, index) => (
            <Box key={index}>
              <DueCard
                type={task.type}
                course={task.course}
                topic={task.topic}
                dueDate={new Date(task.dueDate).toLocaleString('en-US')}
              />
            </Box>
          ))}
        </Stack>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!hasMore && !loading && tasks.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 2, fontSize: 14, color: 'gray' }}>
            No more tasks to load.
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoadMoreModal

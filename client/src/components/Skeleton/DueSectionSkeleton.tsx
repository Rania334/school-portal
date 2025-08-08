import React from 'react'
import {
  Card,
  Stack,
  Box,
  Skeleton,
} from '@mui/material'

export interface DueItem {
  type: 'quiz' | 'assignment'
  course: string
  topic: string
  dueDate: string
  onClick?: () => void
}

interface DueSectionSkeletonProps {
  itemCount?: number
}

export const DueSectionSkeleton: React.FC<DueSectionSkeletonProps> = ({ itemCount = 2 }) => {
  return (
    <Card
      elevation={3}
      sx={{
        p: 2,
        minWidth: 300,
        borderRadius: 2,
        backgroundColor: '#ffffff',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Skeleton variant="text" width={120} height={24} />
        <Skeleton variant="text" width={40} height={20} />
      </Stack>

      <Stack spacing={2}>
        {[...Array(itemCount)].map((_, i) => (
          <Box key={i}>
            <DueCardSkeleton />
          </Box>
        ))}
      </Stack>
    </Card>
  )
}

export const DueCardSkeleton: React.FC = () => {
  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        minWidth: 300,
        borderRadius: 2,
      }}
    >
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={60} height={20} />
        </Stack>

        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />

        <Skeleton variant="rectangular" height={36} sx={{ mt: 1, borderRadius: 1 }} />
      </Stack>
    </Card>
  )
}

import React from 'react'
import {
  Card,
  Typography,
  Stack,
  Box,
} from '@mui/material'
import DueCard from './DueCard'
import { useTranslation } from 'react-i18next'

export interface DueItem {
  type: 'quiz' | 'assignment'
  course: string
  topic: string
  dueDate: string
  onClick?: () => void
}

interface DueSectionProps {
  items: DueItem[]
  onAllClick: () => void
}

const DueSection: React.FC<DueSectionProps> = ({ items, onAllClick }) => {
  const { t } = useTranslation() 

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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" fontWeight={600}>
          {t('whats_due')}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#1976d2', fontWeight: 500, cursor: 'pointer' }}
          onClick={onAllClick}
        >
          {t('all')}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {items.slice(0, 2).map((item, index) => (
          <Box key={index}>
            <DueCard {...item} />
          </Box>
        ))}
      </Stack>
    </Card>
  )
}

export default DueSection

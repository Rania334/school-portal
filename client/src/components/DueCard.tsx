// src/components/DueCard.tsx
import React from 'react'
import {

  Card,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import QuizIcon from '@mui/icons-material/Quiz'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

interface DueCardProps {
  type: 'quiz' | 'assignment'
  course: string
  topic: string
  dueDate: string
  onClick?: () => void
}

const DueCard: React.FC<DueCardProps> = ({
  type,
  course,
  topic,
  dueDate,
  onClick,
}) => {
  const isQuiz = type === 'quiz'
  const userInfo = useSelector((state: RootState) => state.auth.user)
  const isTeacher = !!userInfo?.subject

  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        minWidth: 300,
        borderRadius: 2,
      }}
    >


      <Divider sx={{ my: 1 }} />

      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {isQuiz ? <QuizIcon sx={{ color: '#3A8694' }} fontSize="small" /> : <AssignmentIcon sx={{ color: '#3A8694' }} fontSize="small" />}
          <Typography fontWeight={500}>
            {isQuiz ? 'Quiz' : 'Assignment'}
          </Typography>
        </Stack>

        <Typography variant="body2">
          <strong>Course:</strong> {course}
        </Typography>

        <Typography variant="body2">
          <strong>Topic:</strong> {topic}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">
            <strong>Due:</strong> {dueDate}
          </Typography>
        </Stack>
        {!isTeacher &&
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1, color: "#3A8694" }}

            onClick={onClick}
          >
            {isQuiz ? 'Start Quiz' : 'Solve Assignment'}
          </Button>}
      </Stack>
    </Card>
  )
}

export default DueCard

import React, { useState } from 'react'
import {
  Button,
  Card,
  MenuItem,
  TextField,
  Typography,
  Box,
} from '@mui/material'

const TeacherPostForm: React.FC = () => {
  const [postType, setPostType] = useState<'announcement' | 'quiz'>('announcement')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [course, setCourse] = useState('')
  const [topic, setTopic] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const token = localStorage.getItem('token')

    try {
      const url =
        postType === 'announcement'
          ? 'https://school-backend-e6bh.onrender.com/api/announcements'
          : 'https://school-backend-e6bh.onrender.com/api/quizzes'

      const body =
        postType === 'announcement'
          ? { title, content }
          : { type: postType, course, topic, dueDate }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Failed to post')
      }

      alert('Posted successfully!')
      setTitle('')
      setContent('')
      setCourse('')
      setTopic('')
      setDueDate('')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        backgroundColor: '#ffffff',

        mx: 'auto',
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, fontSize: '0.95rem' }}>
        {postType === 'announcement' ? 'New Announcement' : 'New Quiz'}
      </Typography>

      <TextField
        select
        size="small"
        label="Type"
        value={postType}
        onChange={(e) => setPostType(e.target.value as 'announcement' | 'quiz')}
        fullWidth
        sx={{ mb: 1 }}
      >
        <MenuItem value="announcement">Announcement</MenuItem>
        <MenuItem value="quiz">Quiz</MenuItem>
      </TextField>

      {postType === 'announcement' ? (
        <>
          <TextField
            label="Title"
            size="small"
            fullWidth
            sx={{ mb: 1 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Write something..."
            fullWidth
            size="small"
            multiline
            minRows={2}
            maxRows={4}
            sx={{ mb: 1 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </>
      ) : (
        <>
          <TextField
            label="Course"
            size="small"
            fullWidth
            sx={{ mb: 1 }}
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <TextField
            label="Topic"
            size="small"
            fullWidth
            sx={{ mb: 1 }}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <TextField
            label="Due Date"
            type="datetime-local"
            size="small"
            fullWidth
            sx={{ mb: 1 }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      )}

      <Box textAlign="right">
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            mt: 1,
            textTransform: 'none',
            fontWeight: 500,
            px: 2.5,
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#115293',
            },
          }}
        >
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </Box>
    </Card>
  )
}

export default TeacherPostForm

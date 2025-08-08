import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  MenuItem,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Divider,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

type TeacherPostFormProps = {
  onPostSuccess?: (type: 'announcement' | 'quiz') => void
}

type Announcement = {
  _id: string
  title: string
  content: string
  createdAt?: string
}

const TeacherPostForm: React.FC<TeacherPostFormProps> = ({ onPostSuccess }) => {
  const [postType, setPostType] = useState<'announcement' | 'quiz'>('announcement')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [course, setCourse] = useState('')
  const [topic, setTopic] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (postType === 'announcement') {
      fetchAnnouncements()
    }
  }, [postType])

  const fetchAnnouncements = async () => {
  try {
    const res = await fetch('https://school-backend-e6bh.onrender.com/api/announcements/teacher', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch announcements');
    const data = await res.json();
    setAnnouncements(data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    setSnackbarMessage(err.message || 'Failed to load announcements');
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  }
};

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const url =
        postType === 'announcement'
          ? editId
            ? `https://school-backend-e6bh.onrender.com/api/announcements/${editId}`
            : 'https://school-backend-e6bh.onrender.com/api/announcements'
          : 'https://school-backend-e6bh.onrender.com/api/quizzes'

      const method = postType === 'announcement' && editId ? 'PUT' : 'POST'

      const body =
        postType === 'announcement'
          ? { title, content }
          : { type: postType, course, topic, dueDate }

      const res = await fetch(url, {
        method,
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

      setSnackbarMessage(isEditing ? 'Updated successfully!' : 'Posted successfully!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setTitle('')
      setContent('')
      setCourse('')
      setTopic('')
      setDueDate('')
      setIsEditing(false)
      setEditId(null)

      if (postType === 'announcement') {
        fetchAnnouncements()
      }

      if (onPostSuccess) {
        onPostSuccess(postType)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setSnackbarMessage(err.message || 'An error occurred')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (announcement: Announcement) => {
    setIsEditing(true)
    setEditId(announcement._id)
    setTitle(announcement.title)
    setContent(announcement.content)
    setPostType('announcement')
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return
    try {
      setLoading(true)
      const res = await fetch(`https://school-backend-e6bh.onrender.com/api/announcements/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Failed to delete')
      }
      setSnackbarMessage('Deleted successfully!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      fetchAnnouncements()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setSnackbarMessage(err.message || 'An error occurred')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          backgroundColor: '#ffffff',
          m: 3,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, fontSize: '0.95rem' }}>
          {isEditing ? 'Edit Announcement' : postType === 'announcement' ? 'New Announcement' : 'New Quiz'}
        </Typography>

        <TextField
          select
          size="small"
          label="Type"
          value={postType}
          onChange={(e) => {
            setPostType(e.target.value as 'announcement' | 'quiz')
            setIsEditing(false)
            setEditId(null)
            setTitle('')
            setContent('')
            setCourse('')
            setTopic('')
            setDueDate('')
          }}
          fullWidth
          sx={{ mb: 1 }}
          disabled={isEditing}
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
            {loading ? (isEditing ? 'Updating...' : 'Posting...') : isEditing ? 'Update' : 'Post'}
          </Button>
          {isEditing && (
            <Button
              size="small"
              onClick={() => {
                setIsEditing(false)
                setEditId(null)
                setTitle('')
                setContent('')
              }}
              sx={{ ml: 1, mt: 1 }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Card>

      {postType === 'announcement' && (
        <Card sx={{ p: 2, m: 3, backgroundColor: '#fafafa' }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Your Announcements
          </Typography>
          {announcements.length === 0 ? (
            <Typography>No announcements yet.</Typography>
          ) : (
            <List>
              {announcements.map((ann) => (
                <React.Fragment key={ann._id}>
                  <ListItem
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEdit(ann)}
                          size="small"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(ann._id)}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <ListItemText
                      primary={ann.title}
                      secondary={ann.content}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          )}
        </Card>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default TeacherPostForm

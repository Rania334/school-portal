// components/Sidebar.tsx
import React from 'react'
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EventNoteIcon from '@mui/icons-material/EventNote'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import GradeIcon from '@mui/icons-material/Grade'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CampaignIcon from '@mui/icons-material/Campaign'

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Schedule', icon: <EventNoteIcon />, path: '/schedule' },
  { text: 'Courses', icon: <MenuBookIcon />, path: '/courses' },
  { text: 'Gradebook', icon: <GradeIcon />, path: '/gradebook' },
  { text: 'Performance', icon: <EmojiEventsIcon />, path: '/performance' },
  { text: 'Announcement', icon: <CampaignIcon />, path: '/announcement' },
]

interface SidebarProps {
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: 240,
        background: 'linear-gradient(180deg, #0c3145ff 42%, #3A8694 79%);',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        paddingTop: 4,
        fontFamily: 'Segoe UI, sans-serif',
      }}
      onClick={onClose}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 5,
        }}
      >
        Coligo
      </Typography>

      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <ListItem key={item.text} sx={{ mb: 1, p: 0 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  color: '#fff',
                  borderRadius: 1,
                  backgroundColor: isActive ? '#6c899aff' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#03547c',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 15,
                        fontFamily: 'Segoe UI, sans-serif',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default Sidebar

import React from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EventNoteIcon from '@mui/icons-material/EventNote'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import GradeIcon from '@mui/icons-material/Grade'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CampaignIcon from '@mui/icons-material/Campaign'
import LogoutIcon from '@mui/icons-material/Logout'
import { logout } from '../store/authSlice'
import { useTranslation } from 'react-i18next'

const Sidebar: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const menuItems = [
    { key: 'dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { key: 'schedule', icon: <EventNoteIcon />, path: '/schedule' },
    { key: 'courses', icon: <MenuBookIcon />, path: '/courses' },
    { key: 'gradebook', icon: <GradeIcon />, path: '/gradebook' },
    { key: 'performance', icon: <EmojiEventsIcon />, path: '/performance' },
    { key: 'announcement', icon: <CampaignIcon />, path: '/announcement' },
  ]

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Box
      sx={{
        width: 240,
        background: 'linear-gradient(180deg, #0c3145ff 42%, #3A8694 79%)',
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

      <Box sx={{ flexGrow: 1 }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <ListItem key={item.key} sx={{ mb: 1, p: 0 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: '#fff',
                    borderRadius: 1,
                    backgroundColor: isActive ? '#6c899aff' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#adb2b4ff',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#fff', minWidth: 36 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={t(item.key)}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontFamily: 'Segoe UI, sans-serif',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', m: 2 }} />

      <Box sx={{ px: 5, pb: 5 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            color: '#fff',
            borderRadius: 1,
            backgroundColor: '#d32f2f',
            '&:hover': {
              backgroundColor: '#9a0007',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#fff', minWidth: 36 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary={t('logout')}
            primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  )
}

export default Sidebar

import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
// import { login } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { loginUser } from '../store/authSlice'
import type { AppDispatch } from '../store/store'


const LoginPage: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  const handleLoginTeacher = () => {
    dispatch(loginUser({ email: 'salma@school.com', password: '123456' }))
      .unwrap()
      .then(() => {
        navigate('/dashboard')
      })
      .catch((err) => {
        console.error('Login failed:', err)
      })
  }

  const handleLoginStudent = () => {
    dispatch(loginUser({ email: 'Rania@school.com', password: '123456' }))
      .unwrap()
      .then(() => {
        navigate('/dashboard')
      })
      .catch((err) => {
        console.error('Login failed:', err)
      })
  }


  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Card
        elevation={6}
        sx={{
          width: '100%',
          borderRadius: 3,
          px: 3,
          py: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent>
          <Box textAlign="center" mb={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Login to your account
            </Typography>
          </Box>

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginTeacher}
              sx={{
                flex: 1,
                py: 1.2,
                fontWeight: 'bold',
                borderRadius: 3,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              {t('loginAsTeacher')}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleLoginStudent}
              sx={{
                flex: 1,
                py: 1.2,
                fontWeight: 'bold',
                borderRadius: 3,
                backgroundColor: '#9c27b0',
                '&:hover': {
                  backgroundColor: '#7b1fa2',
                },
              }}
            >
              {t('loginAsStudent')}
            </Button>
          </Box>

          <Box mt={2} textAlign="center">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              Forgot your password?
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default LoginPage

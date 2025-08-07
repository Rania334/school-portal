import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'

import Home from './routes/Home'
import Dashboard from './pages/Dashboard'
import requireAuth from './components/HOC/requireAuth'

import { Box } from '@mui/material'
import './App.css'

function App() {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)
  const ProtectedDashboard = requireAuth(Dashboard)

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/dashboard" replace /> : <Home />}
          />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App

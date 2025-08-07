// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import Home from './routes/Home'
import Dashboard from './pages/Dashboard'
import requireAuth from './components/requireAuth'
import { Box } from '@mui/material'
import './App.css'

function App() {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)
  const ProtectedDashboard = requireAuth(Dashboard)

  return (
    <Router>
      {loggedIn ? (
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<ProtectedDashboard />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
        </Routes>
      )}
    </Router>
  )
}

export default App

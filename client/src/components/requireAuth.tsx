import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '../store/store'

const requireAuth = (Component: React.FC) => {
  return () => {
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)
    return loggedIn ? <Component /> : <Navigate to="/" />
  }
}

export default requireAuth

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '../store/store'

const requireAuth = (Component: React.FC) => {
  return () => {
    const { loggedIn, token } = useSelector((state: RootState) => state.auth)

    return loggedIn && token ? <Component /> : <Navigate to="/" />
  }
}


export default requireAuth

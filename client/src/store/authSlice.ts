// store/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface User {
  _id: string
  username: string
  email: string
  image?: string
  subject?: string
}

interface AuthState {
  loggedIn: boolean
  token: string | null
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  loggedIn: false,
  token: null,
  user: null,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      return {
        token: data.token,
        user: data.user,
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.loggedIn = false
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    checkToken(state) {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        state.loggedIn = true
        state.token = token
        state.user = JSON.parse(user)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.loggedIn = true
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, checkToken } = authSlice.actions
export default authSlice.reducer

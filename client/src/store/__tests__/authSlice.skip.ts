import authReducer, { logout, checkToken, loginUser } from '../authSlice'
import type { AuthState } from '../authSlice'
import { vi } from 'vitest'

const initialState: AuthState = {
  loggedIn: false,
  token: null,
  user: null,
  loading: false,
  error: null,
}

describe('authSlice', () => {
  afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle logout', () => {
    localStorage.setItem('token', 'test-token')
    localStorage.setItem('user', JSON.stringify({ _id: '1', username: 'test', email: 'a@a.com' }))

    const loggedInState: AuthState = {
      loggedIn: true,
      token: 'test-token',
      user: { _id: '1', username: 'test', email: 'a@a.com' },
      loading: false,
      error: null,
    }

    const nextState = authReducer(loggedInState, logout())
    expect(nextState).toEqual(initialState)
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })

  it('should handle checkToken with valid token/user', () => {
    localStorage.setItem('token', 'abc123')
    localStorage.setItem('user', JSON.stringify({ _id: '1', username: 'rania', email: 'r@r.com' }))

    const nextState = authReducer(initialState, checkToken())
    expect(nextState.loggedIn).toBe(true)
    expect(nextState.token).toBe('abc123')
    expect(nextState.user?.username).toBe('rania')
  })

  it('should handle loginUser.fulfilled', () => {
    const payload = {
      token: 'mock-token',
      user: { _id: '1', username: 'test', email: 'test@example.com' },
    }

    const action = { type: loginUser.fulfilled.type, payload }
    const nextState = authReducer(initialState, action)
    expect(nextState.loggedIn).toBe(true)
    expect(nextState.token).toBe(payload.token)
    expect(nextState.user).toEqual(payload.user)
    expect(nextState.loading).toBe(false)
  })

  it('should handle loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'Invalid credentials',
    }
    const nextState = authReducer(initialState, action)
    expect(nextState.error).toBe('Invalid credentials')
    expect(nextState.loading).toBe(false)
  })
})

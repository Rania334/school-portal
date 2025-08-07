import { describe, it, expect, vi, beforeEach } from 'vitest'
import reducer, { fetchTasks } from '../taskSlice'
import type { TaskState } from '../taskSlice'
import { Action } from '@reduxjs/toolkit'

vi.mock('axios')

describe('taskSlice', () => {
  const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
    skip: 0,
    hasMore: true,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should handle initial state', () => {
    expect(reducer(undefined, {} as Action)).toEqual(initialState)
  })

  it('should handle fetchTasks.pending', () => {
    const action = { type: fetchTasks.pending.type }
    const state = reducer(initialState, action)
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('should handle fetchTasks.fulfilled (initial load)', () => {
    const payload = {
      data: [{ _id: '1', type: 'quiz', course: 'Math', topic: 'Algebra', dueDate: '2025-08-10' }],
      skip: 0,
    }
    const action = { type: fetchTasks.fulfilled.type, payload }
    const state = reducer(initialState, action)

    expect(state.loading).toBe(false)
    expect(state.tasks).toEqual(payload.data)
    expect(state.skip).toBe(0)
    expect(state.hasMore).toBe(true)
  })

  it('should handle fetchTasks.fulfilled (pagination)', () => {
    const prevState: TaskState = {
      ...initialState,
      tasks: [{ _id: '1', type: 'quiz', course: 'Math', topic: 'Algebra', dueDate: '2025-08-10' }],
    }

    const payload = {
      data: [{ _id: '2', type: 'assignment', course: 'Science', topic: 'Biology', dueDate: '2025-08-12' }],
      skip: 5,
    }

    const action = { type: fetchTasks.fulfilled.type, payload }
    const state = reducer(prevState, action)

    expect(state.tasks.length).toBe(2)
    expect(state.tasks[1]._id).toBe('2')
    expect(state.skip).toBe(5)
  })

  it('should handle fetchTasks.rejected', () => {
    const action = {
      type: fetchTasks.rejected.type,
      payload: 'Failed to fetch tasks',
    }
    const state = reducer(initialState, action)
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Failed to fetch tasks')
  })
})

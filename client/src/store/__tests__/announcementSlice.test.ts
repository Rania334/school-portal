import { describe, it, expect, beforeEach, vi } from 'vitest'
import reducer, {
  fetchAnnouncements,
} from '../announcementSlice'
import type { Announcement } from '../announcementSlice'
import type { AnnouncementState } from '../announcementSlice'

vi.mock('axios')

describe('announcementSlice', () => {
  let initialState: AnnouncementState

  beforeEach(() => {
    initialState = {
      announcements: [],
      loading: false,
      error: null,
      skip: 0,
      hasMore: true,
    }
  })

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle fetchAnnouncements.pending', () => {
    const nextState = reducer(initialState, fetchAnnouncements.pending('', { skip: 0, limit: 5 }))
    expect(nextState.loading).toBe(true)
    expect(nextState.error).toBeNull()
  })

  it('should handle fetchAnnouncements.fulfilled on first load', () => {
    const mockData: Announcement[] = [
      {
        _id: '1',
        title: 'Title 1',
        content: 'Content 1',
        createdAt: new Date().toISOString(),
      },
    ]

    const action = {
      type: fetchAnnouncements.fulfilled.type,
      payload: {
        data: mockData,
        skip: 0,
      },
    }

    const nextState = reducer(initialState, action)

    expect(nextState.loading).toBe(false)
    expect(nextState.announcements).toEqual(mockData)
    expect(nextState.skip).toBe(0)
    expect(nextState.hasMore).toBe(true)
  })

  it('should handle fetchAnnouncements.fulfilled on load more', () => {
    const prevState: AnnouncementState = {
      ...initialState,
      announcements: [
        {
          _id: '1',
          title: 'Title 1',
          content: 'Content 1',
          createdAt: new Date().toISOString(),
        },
      ],
      skip: 0,
    }

    const newAnnouncements: Announcement[] = [
      {
        _id: '2',
        title: 'Title 2',
        content: 'Content 2',
        createdAt: new Date().toISOString(),
      },
    ]

    const action = {
      type: fetchAnnouncements.fulfilled.type,
      payload: {
        data: newAnnouncements,
        skip: 5,
      },
    }

    const nextState = reducer(prevState, action)

    expect(nextState.loading).toBe(false)
    expect(nextState.announcements.length).toBe(2)
    expect(nextState.skip).toBe(5)
    expect(nextState.hasMore).toBe(true)
  })

  it('should handle fetchAnnouncements.rejected', () => {
    const action = {
      type: fetchAnnouncements.rejected.type,
      payload: 'Failed to fetch announcements',
    }

    const nextState = reducer(initialState, action)

    expect(nextState.loading).toBe(false)
    expect(nextState.error).toBe('Failed to fetch announcements')
  })
})

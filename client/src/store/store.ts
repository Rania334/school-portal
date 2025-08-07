import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import announcementReducer from './announcementSlice';
import taskReducer from './taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    announcements: announcementReducer,
    tasks: taskReducer,

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

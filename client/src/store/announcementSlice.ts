// src/redux/announcementSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  user?: {
    username?: string;
    subject?: string;
    image?: string;
  };
}

interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcements: [],
  loading: false,
  error: null,
};

// Thunk to fetch data
export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAll',
  async () => {
    const res = await axios.get('http://localhost:5000/api/announcements');
    return res.data;
  }
);

const announcementSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.announcements = action.payload;
        state.loading = false;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load announcements';
      });
  },
});

export default announcementSlice.reducer;

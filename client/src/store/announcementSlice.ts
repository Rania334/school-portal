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

export interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
  skip: number;
  hasMore: boolean;
}

const initialState: AnnouncementState = {
  announcements: [],
  loading: false,
  error: null,
  skip: 0,
  hasMore: true,
};

export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAll',
  async (
    { skip = 0, limit = 5 }: { skip?: number; limit?: number },
    thunkAPI
  ) => {
    try {
      const res = await axios.get('https://school-backend-e6bh.onrender.com/api/announcements', {
        params: { skip, limit },
      });
      return { data: res.data, skip };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch announcements');
    }
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
        const { data, skip } = action.payload;
        state.loading = false;

        if (skip === 0) {
          state.announcements = data;
        } else {
          state.announcements = [...state.announcements, ...data];
        }

        state.skip = skip;
        state.hasMore = data.length > 0;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default announcementSlice.reducer;

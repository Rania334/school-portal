import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Task {
    _id: string
    type: 'quiz' | 'assignment'
    course: string
    topic: string
    dueDate: string

}

interface TaskState {
    tasks: Task[]
    loading: boolean
    error: string | null
    skip: number // 🔄 track skip for Load More
    hasMore: boolean
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
    skip: 0,
    hasMore: true
}

// ✅ Updated thunk to accept pagination params
export const fetchTasks = createAsyncThunk(
    'tasks/fetchAll',
    async (
        { skip = 0, limit = 5 }: { skip?: number; limit?: number },
        thunkAPI
    ) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/quizzes`, {
                params: { skip, limit },
            })
            return { data: response.data, skip }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(
                    error.response.data?.error || 'Failed to fetch tasks'
                )
            }
            return thunkAPI.rejectWithValue('Failed to fetch tasks')
        }
    }
)

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                const { data, skip } = action.payload
                state.loading = false
                state.skip = skip

                if (skip === 0) {
                    state.tasks = data
                } else {
                    state.tasks = [...state.tasks, ...data]
                }

                // ✅ Check if more data is available
                state.hasMore = data.length > 0
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default taskSlice.reducer

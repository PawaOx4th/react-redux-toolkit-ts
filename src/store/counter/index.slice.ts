import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface Todo {
  id: number
  title: string
  completed: boolean
  userId: number
}
interface CounterState {
  count: number
  loading: boolean
  todo: Todo | null
}

const initialState: CounterState = {
  count: 0,
  loading: false,
  todo: null,
}

export const onFetchTodoById = createAsyncThunk(
  "counter/fetchTodoById",
  async (id: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    )
    const todo = await response.json()
    return todo as Todo
  }
)

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    onIncrement: (state, action: PayloadAction<number | undefined>) => {
      if (typeof action.payload === "undefined") {
        state.count += 1
        return
      }
      state.count += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onFetchTodoById.fulfilled, (state, action) => {
      state.loading = false
      state.count = action.payload.id
      state.todo = action.payload
    }),
      builder.addCase(onFetchTodoById.pending, (state) => {
        state.loading = true
      })
  },
})

export const { onIncrement } = counterSlice.actions

export const counterSelector = (state: RootState) => state.counter

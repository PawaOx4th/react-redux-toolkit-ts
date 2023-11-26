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

// const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState
//   dispatch: AppDispatch
//   rejectValue: string
//   extra: { s: string; n: number }
// }>()

export const onFetchTodoById = createAsyncThunk<
  Todo | null,
  number,
  { state: RootState; extra: { s: string; n: number } }
>("counter/fetchTodoById", async (id, { getState, extra }) => {
  console.log("[LOG] 🦁   :", extra)
  const { count } = getState().counter
  if (count === id) return getState().counter.todo

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  )
  const todo = await response.json()
  return todo as Todo
})

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
    onResetCount: (state) => {
      state.count = initialState.count
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onFetchTodoById.fulfilled, (state, action) => {
      state.loading = false

      if (action.payload && Object.keys(action.payload).length > 0) {
        state.count = action.payload.id
        state.todo = action.payload
      }
    }),
      builder.addCase(onFetchTodoById.pending, (state) => {
        state.loading = true
      })
  },
})

export const { onIncrement, onResetCount } = counterSlice.actions

export const counterSelector = (state: RootState) => state.counter

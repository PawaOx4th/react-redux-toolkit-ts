import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface CounterState {
  count: number
  loading: boolean
}

const initialState: CounterState = {
  count: 0,
  loading: false,
}

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
})

export const { onIncrement } = counterSlice.actions
export const counterSelector = (state: RootState) => state.counter

import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit"
import { counterSlice } from "./counter/index.slice"

const exampleMiddleware = createListenerMiddleware()

exampleMiddleware.startListening({
  effect: () => {
    console.log("[LOG] 🚀   :", action)
  },
})

export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
  middleware: (getDefaultMiddleware) => {
    console.log("[LOG] 🚀   :")
    return getDefaultMiddleware({
      thunk: {
        extraArgument: { s: "s", n: 1 },
      },
    }).prepend(exampleMiddleware.middleware)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

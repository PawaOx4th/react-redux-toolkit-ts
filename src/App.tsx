import "./App.css"
import { onIncrement } from "./store/counter/index.slice"
import { useAppDispatch, useAppSelector } from "./store/useStore"

function App() {
  const counter = useAppSelector((state) => state.counter.count)
  const dispatch = useAppDispatch()

  const handleIncrement = (arg?: Parameters<typeof onIncrement>[0]): void => {
    dispatch(onIncrement(arg))
  }
  return (
    <>
      <div>
        <h1>Counter</h1>
        <p>{counter}</p>
        <button
          onClick={() => handleIncrement()}
          className="bg-blue-400 px-8 py-2 rounded-md text-white text-2xl active:bg-blue-600 transition-all"
        >
          +
        </button>
      </div>
    </>
  )
}

export default App

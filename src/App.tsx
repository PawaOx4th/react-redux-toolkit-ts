import "./App.css"
import {
  onIncrement,
  onFetchTodoById,
  onResetCount,
} from "./store/counter/index.slice"
import { useAppDispatch, useAppSelector } from "./store/useStore"
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid"

function App() {
  const { count, todo, loading } = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  const handleIncrement = (arg?: Parameters<typeof onIncrement>[0]): void => {
    dispatch(onIncrement(arg))
  }

  const handleFetchTodoById = async (
    id: Parameters<typeof onFetchTodoById>[0]
  ) => {
    try {
      await dispatch(onFetchTodoById(id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleResetCounter = () => {
    dispatch(onResetCount())
  }

  return (
    <>
      <button
        className="bg-lime-400 px-4 py-2 rounded-md text-white text-lg flex items-center font-bold"
        onClick={() => handleResetCounter()}
      >
        <ArrowPathRoundedSquareIcon className="w-8 h-full text-white inline-block" />
        : Reset counter
      </button>
      <div className="flex flex-col items-start gap-5 mt-5">
        <div>
          <h1>Counter</h1>
          <p>{count}</p>
          <button
            onClick={() => handleIncrement()}
            className="bg-blue-400 px-8 py-2 rounded-md text-white text-2xl active:bg-blue-600 transition-all"
          >
            +
          </button>
        </div>

        <hr className="border-t-2 border-dashed border-t-lime-500 w-full" />
        <button
          className="bg-purple-400 px-8 py-2 rounded-md text-white text-2xl active:bg-purple-600 transition-all"
          onClick={() => handleFetchTodoById(count)}
        >
          Fetch todo with ID :{count}
        </button>
        {loading ? (
          <div>
            <small>Loading...</small>
          </div>
        ) : (
          <div>
            <pre>
              <code>{JSON.stringify(todo, null, 2)}</code>
            </pre>
          </div>
        )}
      </div>
    </>
  )
}

export default App

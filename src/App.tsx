import "./App.css"
import { onIncrement, onFetchTodoById } from "./store/counter/index.slice"
import { useAppDispatch, useAppSelector } from "./store/useStore"

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

  return (
    <>
      <div>
        <h1>Counter</h1>
        <p>{count}</p>
        <button
          onClick={() => handleIncrement()}
          className="bg-blue-400 px-8 py-2 rounded-md text-white text-2xl active:bg-blue-600 transition-all"
        >
          +
        </button>
        <br />
        <hr />
        <br />
        <button
          className="bg-blue-400 px-8 py-2 rounded-md text-white text-2xl active:bg-blue-600 transition-all"
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

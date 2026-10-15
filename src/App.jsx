import { useReducer, useCallback } from 'react'
import tasksReducer, { initialState, TASK_ACTIONS } from './hooks/useTasksReducer'
import { ThemeProvider } from './contexts/ThemeProvider'
import { useTheme } from './hooks/useTheme'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import Controls from './components/Controls'

const Dashboard = () => {
  const [state, dispatch] = useReducer(tasksReducer, initialState)
  const { theme, toggleTheme } = useTheme()

  const handleAdd = useCallback((title) => {
    dispatch({ type: TASK_ACTIONS.ADD, payload: title })
  }, [])

  const handleRemove = useCallback((id) => {
    dispatch({ type: TASK_ACTIONS.REMOVE, payload: id })
  }, [])

  const handleToggle = useCallback((id) => {
    dispatch({ type: TASK_ACTIONS.TOGGLE, payload: id })
  }, [])

  const handleFilter = useCallback((filter) => {
    dispatch({ type: TASK_ACTIONS.FILTER, payload: filter })
  }, [])

  const handleSort = useCallback((sort) => {
    dispatch({ type: TASK_ACTIONS.SORT, payload: sort })
  }, [])

  return (
    <div className={`dashboard ${theme}`}>
      <header>
        <h1>Gestor de Tareas</h1>
        <button onClick={toggleTheme}>
          Cambiar a {theme === 'light' ? '🌙 Oscuro' : '☀️ Claro'}
        </button>
      </header>

      <TaskForm onAdd={handleAdd} />
      <Controls
        filter={state.filter}
        sort={state.sort}
        onFilter={handleFilter}
        onSort={handleSort}
      />
      <TaskList
        tasks={state.items}
        filter={state.filter}
        sort={state.sort}
        onRemove={handleRemove}
        onToggle={handleToggle}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}
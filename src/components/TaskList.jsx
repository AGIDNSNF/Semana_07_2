import { useMemo, useCallback, useRef, useEffect } from 'react'

const TaskList = ({ tasks, filter, sort, onRemove, onToggle }) => {
  const inputRef = useRef(null)

  // useMemo: filtra y ordena solo cuando cambian las dependencias
  const processedTasks = useMemo(() => {
    let result = [...tasks]

    if (filter === 'completed') {
      result = result.filter((t) => t.completed)
    } else if (filter === 'pending') {
      result = result.filter((t) => !t.completed)
    }

    result.sort((a, b) =>
      sort === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    )

    return result
  }, [tasks, filter, sort])

  // useCallback: handlers estables
  const handleRemove = useCallback(
    (id) => {
      onRemove(id)
    },
    [onRemove]
  )

  const handleToggle = useCallback(
    (id) => {
      onToggle(id)
    },
    [onToggle]
  )

  // useEffect: focus al input oculto cuando se añade tarea
  useEffect(() => {
    if (tasks.length > 0) {
      inputRef.current?.focus()
    }
  }, [tasks.length])

  if (processedTasks.length === 0) {
    return (
      <div className="task-list">
        <p className="empty">No hay tareas para mostrar</p>
        <input ref={inputRef} className="hidden-input" />
      </div>
    )
  }

  return (
    <div className="task-list">
      <ul>
        {processedTasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
            />
            <span>{task.title}</span>
            <button onClick={() => handleRemove(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <input ref={inputRef} className="hidden-input" />
    </div>
  )
}

export default TaskList

// Comenta esto temporalmente:
// const processedTasks = useMemo(() => {
//   ...
// }, [tasks, filter, sort])

// Reemplaza por:
const processedTasks = [...tasks].filter(t => {
  if (filter === 'completed') return t.completed
  if (filter === 'pending') return !t.completed
  return true
}).sort((a, b) => sort === 'asc' 
  ? a.title.localeCompare(b.title) 
  : b.title.localeCompare(a.title))

// Y comenta los useCallback:
// const handleRemove = useCallback(...)
const handleRemove = (id) => onRemove(id)
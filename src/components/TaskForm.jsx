import { useState, useRef } from 'react'

const TaskForm = ({ onAdd }) => {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text.trim())
    setText('')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe una tarea..."
      />
      <button type="submit">Agregar</button>
    </form>
  )
}

export default TaskForm
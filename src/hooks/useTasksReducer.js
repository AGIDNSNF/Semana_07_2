export const TASK_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  TOGGLE: 'TOGGLE',
  FILTER: 'FILTER',
  SORT: 'SORT',
}

export const initialState = {
  items: [],
  filter: 'all', // all | completed | pending
  sort: 'asc',   // asc | desc
}

export function tasksReducer(state, action) {
  switch (action.type) {
    case TASK_ACTIONS.ADD:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: crypto.randomUUID(),
            title: action.payload,
            completed: false,
            createdAt: Date.now(),
          },
        ],
      }

    case TASK_ACTIONS.REMOVE:
      return {
        ...state,
        items: state.items.filter((task) => task.id !== action.payload),
      }

    case TASK_ACTIONS.TOGGLE:
      return {
        ...state,
        items: state.items.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      }

    case TASK_ACTIONS.FILTER:
      return { ...state, filter: action.payload }

    case TASK_ACTIONS.SORT:
      return { ...state, sort: action.payload }

    default:
      return state
  }
}

export default tasksReducer